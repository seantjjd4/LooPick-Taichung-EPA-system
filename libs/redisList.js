const { modules } = require('redis');
const redisClient = require('./redisClient')

//判斷value有無跟list裡的值重複
const IsInList = (list, value) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == value) {
            return true
        }
    }
    return false;
}

//不重複填入 
//key是key值 & value是待放入list的值[itemA, itemB, ....]
const AddListUnique = async (key, value) => {
    var length = await redisClient.lLen(key);
    var currentList = await redisClient.lRange(key, 0, length - 1);
    console.log(currentList);
    var readyList = [];
    value.forEach(element => {
        if (IsInList(currentList, element) == false) {
            readyList.push(element);
        }
    });
    console.log(readyList)
    if (readyList.length > 0) {
        let currentLength = await redisClient.lPush(key, readyList);
    }
}

//取出目前所有
const GetList = async (key) => {
    var length = await redisClient.lLen(key);
    var currentList = await redisClient.lRange(key, 0, length - 1);
    return currentList
}

module.exports = { AddListUnique, GetList }
