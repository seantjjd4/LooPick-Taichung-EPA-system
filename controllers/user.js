const redis = require('../libs/redisClient')
const redisClient = require('../libs/redisClient')
const db = require('../models');
const { PushReturnMessageToUser } = require('../libs/lineBot')
const { User } = db;
const { returnCup, loanableCup } = db;
// function sleep(delay) {
//     var start = (new Date()).getTime();
//     while ((new Date()).getTime() - start < delay) {
//         // 使用  continue 实现；
//         continue; 
//     }
// }
const userController = {
    user: async (req, res) => {
        let currentList = await redisClient.sMembers("testset")
        res.render('user', { tempList: currentList });
    },
    handleuser: async (req, res) => {

        try {
            const {
                orderId
            } = req.body;
            if (orderId === '' || !/^[lL][pP].*[a-zA-Z0-9_].*[tT][cC]$/.test(orderId)) {
                req.flash('errorMessage', '沒掃描成功喔');
                return res.redirect('/user');
            }

            // redisClient.set("test", orderId);
            await redisClient.sAdd("testset", orderId)
            req.flash('errorMessage', '編號 ' + orderId + '，已歸還成功');
            return res.redirect('/user');
        } catch (error) {
            return res.redirect('/user');
        }

    },
    handlecancel: async (req, res) => {
        await redisClient.flushAll('ASYNC');
        req.flash('errorMessage', '已清除所有暫存');
        return res.redirect('/user');
    },
    handleresult: async (req, res) => {
        let currentList = await redisClient.sMembers("testset");
        var returnTotal = 0
        var returnMessage;
        try {
            await Promise.all(currentList.map(async (item, index, array) => {
                let user = await User.findOne({ where: { orderId: item } });
                if (user) {
                    let result = await PushReturnMessageToUser(user.dataValues.userId, user.dataValues.orderId)
                }
            }));
            let result = await loanableCup.destroy({ where: { code: currentList } });
            returnMessage = `本次歸還有${result}個杯子未被使用者租借過`
            returnTotal += result
            result = await User.destroy({ where: { orderId: currentList } });
            returnTotal += result
            await returnCup.destroy({ where: { code: currentList } });
            return res.render('user_result', { tempList: currentList, returnMessage: returnMessage, returnTotal: returnTotal });
        }
        catch (error) {
            returnMessage = ""
            return res.render('user_result', { tempList: currentList, returnMessage: returnMessage, returnTotal: returnTotal });
        }
    },

};

module.exports = userController;
