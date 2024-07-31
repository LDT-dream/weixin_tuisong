const fs = require('fs').promises; // 使用内置的fs模块来读取文件
const axios = require('axios'); // 使用axios库来发起HTTP请求

const { getMyHTML } = require('./utils');

// 读取本地HTML文件的异步函数
async function readHtmlFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8'); // 读取文件内容
    return data;
  } catch (error) {
    console.error('读取文件失败:', error);
  }
}





// 发送wxpusher消息的异步函数
async function sendWxPusherMessage(appToken, uids, htmlContent) {
  console.log('进入发送函数')
  const postData = {
    appToken: appToken,
    content: htmlContent, // 使用从HTML文件中读取的内容
    contentType: 2, // 表示发送的内容是HTML
    uids: uids, // 接收消息的用户的UID数组
  };

  try {
    const response = await axios.post('https://wxpusher.zjiecode.com/api/send/message', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      console.log('消息发送成功');
    } else {
      console.error('发送消息失败:', response.data.msg);
    }
  } catch (error) {
    console.error('发送消息请求失败:', error);
  }
}

// 你的wxpusher appToken和UID
// 每日早安: AT_jBiL1NDyFu0FgIMq1Gkd4xh2GTn4sPss
const appToken = 'AT_jBiL1NDyFu0FgIMq1Gkd4xh2GTn4sPss'; // 替换成你的appToken
const uids = ['UID_yek1XSn2h6ElIeqTO29gZTna56vq']; // 替换成你的目标用户的UID

// 要读取的HTML文件路径
const htmlFilePath = '../../test.html';

// 读取HTML文件内容并发送消息
(async () => {
  // const htmlContent = await readHtmlFile(htmlFilePath);
  console.log('开始执行代码')
  const htmlContent = await getMyHTML();
  console.log('拿到content', htmlContent)
  if (htmlContent) {
    await sendWxPusherMessage(appToken, uids, htmlContent);
  }
})();