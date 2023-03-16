const fs = require("fs")
var csvFile = []

//將csv轉成json
const TransferCsvToJson = (path) => {
    var data = fs.readFileSync(path, "utf8")
    data = data.split("\r\n")
    var stores = []
    data.forEach(element => {
        let storeData = element.split(',')
        let temp = {
            storeName: storeData[2] + storeData[3],
            storeAddress: storeData[5],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        stores.push(temp)
    })
    let str = JSON.stringify(stores, null, "\t")
    fs.writeFile(path.replace("csv", "json"), str, function (err) {
        if (err) { console.log('fail') }
        else { console.log('success') }
    })
}

//閱讀json 
const ReadJson = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) { reject('fail') }
            else {
                csvFile = JSON.parse(data)
                resolve('success')
            }
        })
    })
}

//將json List 回傳給sequelize-cli
const GetJson = async (path) => {
    let jsonFile = []
    await ReadJson(path);
    csvFile.forEach((value, index) => {
        //console.log(value)
        let temp = {
            storeName: value.storeName,
            storeAddress: value.storeAddress,
            createdAt: new Date(value.createdAt),
            updatedAt: new Date(value.updatedAt)
        }
        jsonFile.push(temp)
    })
    return jsonFile
}

//TransferCsvToJson('libs/111-stores.csv')
module.exports = { GetJson }