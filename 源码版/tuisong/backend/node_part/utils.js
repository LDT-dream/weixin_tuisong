const fs = require('fs').promises; // 使用fs.promises来获取返回Promise的方法
const path = require('path');
const axios = require('axios');


/**
 * 从指定的log文件中读取数据，并转换为JSON格式。
 * 
 * @param {string} filePath - 要读取的文件路径。
 * @param {Function} callback - 完成读取和转换后调用的回调函数，参数为可能的错误和转换后的JSON数据。
 */


// 将函数定义为async，这意味着你可以在其中使用await
async function readAndParseJSON(filePath) {
  try {
      // 使用async/await读取文件内容
      const fileContents = await fs.readFile(path.join(__dirname, filePath), 'utf8');
      
      // 使用JSON.parse()解析JSON字符串
      const jsonObject = JSON.parse(fileContents);
      
      // 这里jsonObject就是你需要的JavaScript对象
      return jsonObject; // 可以选择返回这个对象
  } catch (error) {
      console.error('在读取或解析文件时发生错误:', error);
      throw error; // 可以选择抛出错误，以便调用者可以处理它
  }
}

const drawHTMLContentDirectly = function(data){
  // console.log('看看数据', data)
  const usefulData = data.data
  const   htmlContent =`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>每日早安</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(14, 30, 37, 0.12), 0 2px 16px rgba(14, 30, 37, 0.32);
            border-radius: 10px;
        }
        .weather-info {
          box-shadow:  rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          border-radius: 5px;
          padding: 20px;
        }
        .weather-info p {
            margin: 5px 0;
        }
        .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .day-info, .night-info {
            margin-top: 20px;
        }
        .love-msg {
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>


<body>
    <div class="container">
        <div style="font-size: 20px; color: ${usefulData.date.color}; margin-bottom: 15px">🗓 ${usefulData.date.value}</div>
        <div class="weather-info">
            <p style="font-size: 20px; text-align: center; color: ${usefulData.min_temperature.color}">🌡️气温: ${usefulData.min_temperature.value} ~ ${usefulData.max_temperature.value}</p>
            <div class="flex">
                <p style="font-size: 15px;color: ${usefulData.weather.color}"> ☁ 天气:${usefulData.weather.value}</p>
                <p style="font-size: 15px;color: ${usefulData.pop.color}">💧 降水量:${usefulData.pop.value} mm </p>
            </div>
            <p style="font-size: 15px;color: ${usefulData.tips.color}"> 
            今日建议:<br>${usefulData.tips.value} </p>
            <p style="text-align: center; font-size: 15px;color: ${usefulData.city.color}">📍 ${usefulData.city.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.note_en.color}"> 每日一句: <br>${usefulData.note_en.value} <br> ${usefulData.note_ch.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.pipi.color}"> 今日彩虹屁: <br> ${usefulData.pipi.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.lucky.color}"> 今日星座运势: <br> ${usefulData.lucky.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.lizhi.color}"> 今日励志: <br> ${usefulData.lizhi.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.health.color}"> 今日健康小提醒:<br> ${usefulData.health.value}</p>
        </div>
        <p class="love-msg"color: ${usefulData.love_day.color}>❤ 今天是我们恋爱的第 ${usefulData.love_day.value} 天! ❤</p>
        <p class="love-msg"color: ${usefulData.birthday1.color}>❤ 距离宝贝的生日还有 ${usefulData.birthday1.value} 天! ❤</p>
    </div>
</body>
</html>
`
  return htmlContent
}


const getMyHTML = async function(wayToGetHTML = 'directly'){
  const logFilePath = '../python_part/output/output.log';

  
  if(wayToGetHTML === 'directly') {

    const jsonData = await readAndParseJSON(logFilePath);
    const htmlContent = drawHTMLContentDirectly(jsonData);
    return htmlContent;

  }
}


/**
 * 获取当前订阅应用的用户UID数组
 * 
 * @param {string} appToken 应用密钥标志
 * @param {number} [page=1] 请求数据的页码，默认为1
 * @param {number} [pageSize=20] 分页大小，默认为20，不能超过100
 * @returns {Promise<Array>} 包含用户UID的Promise对象
 */
 async function fetchSubscribedUsersUIDs(appToken, page = 1, pageSize = 20) {
  const requestUrl = 'https://wxpusher.zjiecode.com/api/fun/wxuser/v2';
  try {
      const response = await axios.get(requestUrl, {
          params: {
              appToken: appToken,
              page: page,
              pageSize: pageSize,
              type: 0 // 查询关注应用的用户
          }
      });

      if (response.data.success) {
          return response.data.data.records.map(record => record.uid);
      } else {
          throw new Error(response.data.msg);
      }
  } catch (error) {
      console.error('请求失败:', error);
      throw error;
  }
}



// 使用示例
// 导出函数
module.exports = {
  getMyHTML,
  fetchSubscribedUsersUIDs,
};