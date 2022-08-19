import { Button, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values)
    // storage中设置值
    chrome.storage.sync.set({ username: values.username, password: values.password }, function () {
      console.log('登录成功')
    })
    navigate('/home')
  }

  return (
    <>
      <div className="h-[100%] flex justify-center items-center">
        <Form
          name="basic"
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="账号" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
