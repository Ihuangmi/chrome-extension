chrome.runtime.onInstalled.addListener(function () {
  console.log('插件已被安装')

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0]?.id!,
      { greeting: 'hello，我是后台，主动发消息给content-script' },
      function (response) {
        console.log(response)
      },
    )
  })
})

// chrome.contextMenus.create({
//   title: "测试右键菜单",
//   onclick: function () {
//     alert("您点击了右键菜单！")
//   },
// })

// chrome.contextMenus.create({
//   title: "使用度娘搜索：%s", // %s表示选中的文字
//   contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
//   onclick: function (params) {
//     // 注意不能使用location.href，因为location是属于background的window对象
//     chrome.tabs.create({
//       url:
//         "https://www.baidu.com/s?ie=utf-8&wd=" +
//         encodeURI(params.selectionText || ""),
//     })
//   },
// })

// setInterval(() => {
//   console.log(new Date().toLocaleTimeString())

//   chrome.notifications.create(null, {
//     type: 'basic',
//     iconUrl: '../face.png',
//     title: '活动一下吧',
//     message: '您已经连续坐着工作很久了，起身活动一下吧',
//   })
// }, 60000 * 30)
