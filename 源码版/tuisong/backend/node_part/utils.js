const fs = require('fs').promises; // 使用fs.promises来获取返回Promise的方法
const path = require('path');

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
            box-shadow: 0 0.25em rgba(67, 71, 85, 0.27), 0 0.25em 1em rgba(90, 125, 188, 0.05);
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
        <h1 style="text-align: center;color: ${usefulData.date.color}">${usefulData.date.value}</h1>
        <div class="weather-info">
            <p style="font-size: 60px; text-align: center; color: ${usefulData.min_temperature.color}">${usefulData.min_temperature.value} ~ ${usefulData.max_temperature.value}</p>
            <div class="flex">
                <p style="color: #EC7063; font-size: 25px;color: ${usefulData.weather.color}">🌡️ ${usefulData.weather.value}</p>
                <p style="color: #5DADE2; font-size: 15px;color: ${usefulData.pop.color}">💧 ${usefulData.pop.value} </p>
                <p style="color: #5DADE2; font-size: 15px;color: ${usefulData.tips.color}">💧 ${usefulData.tips.value} </p>
            </div>
            <p style="text-align: center; color: #AAB7B8; font-size: 10px;color: ${usefulData.city.color}">📍 ${usefulData.city.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.note_en.color}"> ${usefulData.note_en.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.pipi.color}"> ${usefulData.pipi.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.lucky.color}"> ${usefulData.lucky.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.lizhi.color}"> ${usefulData.lizhi.value}</p>
        </div>
        <div>
            <p style="margin-top: 10px; color: ${usefulData.health.color}"> ${usefulData.health.value}</p>
        </div>
        <p class="love-msg"color: ${usefulData.love_day.color}>❤ 相恋已经 ${usefulData.love_day.value} 天! ❤</p>
        <p class="love-msg"color: ${usefulData.birthday1.color}>❤ 还有 ${usefulData.birthday1.value} 天就到你的生日啦 ❤</p>
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


// 使用示例



// 导出函数
module.exports = {
  getMyHTML,
};