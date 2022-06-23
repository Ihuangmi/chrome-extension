import 'windi.css';

import { Avatar, Button, Col, Input, Row, Tabs, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginOutlined, UserOutlined } from '@ant-design/icons';

import { data } from './DataSource';
import styles from './index.module.less';

const { TabPane } = Tabs
const backUrl = 'http:///test.e.newrank.cn/feed/dashboard'

const Home = () => {
  const navigate = useNavigate()
  const [text, setText] = useState<string>('')
  const [userName, setUserName] = useState<string>()
  const [headImgUrl, setHeadImgUrl] = useState<string>()


  document.addEventListener('DOMContentLoaded', () => {
    console.log('这是 popup中的 DOMContentLoaded')
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
      function (tabs) {
        const url = new URL(tabs[0].url || '')
        chrome.cookies.getAll({
          domain: url.host
        }, (cookies) => {
          const cs = cookies.map(c => c.name + "=" + c.value).join(';')
          console.log(`cookies=`, cookies);

        })
      }
    );
  })

  useEffect(() => {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({ username: '', password: '' }, function (items) {
      setUserName(items.username)
      console.log(items.username, items.password)
    })
  }, [])

  function getUserInfo() {
    axios
      .get('http://test-gw.newrank.cn:18080/api/nr-trade-security/xdnphb/adinsight/security/user/getUserInfo', {
        headers: {
          'n-token': '342bdbf6864146f59730fbd6eace18f9',
        },
      })
      .then(function ({ data }) {
        console.log(data)
        if (data?.data) {
          setUserName(data.data?.nickName)
          setHeadImgUrl(data.data.headImgUrl)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  function sendMessageToContentScript(message: any, callback: (response: any) => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0]?.id!, message, function (response) {
        if (callback) callback(response)
      })
    })
  }

  function sendMessage() {
    sendMessageToContentScript({ text: text }, (response) => {
      console.log('来自content的回复：' + response)
    })
  }

  function handleLink(e: any) {
    console.log(e.target.innerText)

    const web = data.filter((d) => d.label === e.target.innerText)
    if (web.length > 0) {
      chrome.tabs.create({ url: web[0].url })
    }
  }

  return (
    <div className={styles.tabsWarper}>
      {userName ? (
        <Tabs centered className="h-[100%]">
          <TabPane tab="工具" key="1">
            <div className="p-10px" onClick={handleLink}>
              <Row>
                {data.map((item) => (
                  <Col key={item.url} span={6} className="mb-8px font-bold">
                    <a>{item.label}</a>
                  </Col>
                ))}
              </Row>
            </div>
          </TabPane>

          <TabPane tab="管理" key="2">
            <div className="p-14px text-gray-700">
              <Button
                type="primary"
                onClick={() => {
                  // chrome.runtime.openOptionsPage()
                  chrome.tabs.create({
                    url: 'chrome-extension://' + chrome.runtime.id + '/options.html',
                  })
                }}
              >
                打开Options
              </Button>
              <div className="my-10px">向content发送消息：</div>
              <div className="flex">
                <Input placeholder="请输入内容" value={text} onChange={(e) => setText(e.target.value)} />
                <Button type="primary" onClick={() => sendMessage()}>
                  发送
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="设置" key="3" className="h-[100%]">
            <div className="h-[100%] flex flex-col">
              <div className="flex-1 ml-14px">
                <Space>
                  <Avatar src={headImgUrl} icon={<UserOutlined />} />
                  <span>{userName}</span>
                </Space>
              </div>
              <div
                className="text-center h-50px cursor-pointer"
                onClick={() => {
                  chrome.storage.sync.remove('username', function () {
                    setUserName(undefined)
                  })
                }}
              >
                <LoginOutlined />
                退出登录
              </div>
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <div className="h-[100%] flex justify-center items-center">
          <div className="text-center">
            <div className="mb-10px">要使用小插件，请先登录哦</div>
            <Button
              type="primary"
              onClick={() => {
                chrome.tabs.create({
                  url: `http://test.main.newrank.cn/user/login?displayType=login&backUrl=${backUrl}&source=130&type=121&scene=adinsight_login`,
                })
              }}
            >
              登录
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
