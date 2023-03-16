require('dotenv').config();  //載入env變數
const https = require('https');
const axios = require('axios');
var request = require('request');
const HOST = process.env.FLASK_HOST
const PORT = process.env.FLASK_PORT
const URL = `${HOST}:${PORT}`
/*
const Client = require('@line/bot-sdk').Client;
const client = new Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
});
*/

//回傳使用者歸還的杯子編號給使用者
const PushReturnMessageToUser = async (_userId, _code) => {
    console.log(`userId: ${_userId}`)
    console.log(`orderId: ${_code}`)
    console.log(`${HOST}:${PORT}`)
    let result = 0
    request.post(
        `${HOST}:${PORT}/returnSuccess`,
        {
            json:
            {
                userId: _userId,
                orderId: _code
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                result =  1
            }
        }
    );
    return result
}

module.exports = { PushReturnMessageToUser }
