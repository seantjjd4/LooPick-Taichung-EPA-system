const redis = require('../libs/redisClient')
const db = require('../models')
const Store = db.Store;
const loanableCup = db.loanableCup
const historyCup = db.historyCup
const { AddListUnique, GetList } = require('../libs/redisList')
const { IsValueInList } = require('../libs/list')
const redisClient = require('../libs/redisClient')

const storeController = {
    store: async (req, res, next) => {
        await redisClient.flushAll('ASYNC');
        req.session.storeName = null
        req.session.storeId = null
        var storeNames = []
        var result;
        await Store.findAll().then(response => {
            result = response;
            result.forEach(storeItem => {
                storeNames.push(storeItem.dataValues.storeName)
            });
            res.render('store', { storeList: storeNames });
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            next();
        })
    },
    handleChoose: async (req, res, next) => {
        let storeName = req.body.storeName
        await Store.findOne({
            where: {
                storeName: req.body.storeName
            }
        }).then(response => {
            let storeId = response.dataValues.id
            req.session.storeId = storeId
            req.session.storeName = storeName
            res.redirect('/storeAssign');
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            next();
        })
    },
    assign: async (req, res, next) => {
        const { storeId, storeName } = req.session;
        await redisClient.sMembers(storeName).then(response => {
            res.render('storeAssign', { storeName: storeName, tempList: response });
        }).catch(error => {
            console.log('ERROR')
            req.flash('errorMessage', `${error}`);
            next();
        })

    },
    addTempId: async (req, res) => {
        const { storeId, storeName } = req.session;
        let tempId = req.body.tempId
        if (tempId === '' || !/^[lL][pP].*[a-zA-Z0-9_].*[tT][cC]$/.test(tempId)) {
            req.flash('errorMessage', '沒掃描成功喔');
            return res.redirect('/storeAssign');
        }
        var loanableCupCode = []
        var queryResult;
        await loanableCup.findAll({
            where: { storeId: storeId }
        }).then(res => {
            queryResult = res;
            queryResult.forEach(cupItem => {
                loanableCupCode.push(cupItem.dataValues.code)
            });
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            res.redirect('/store');
        })
        if (IsValueInList(loanableCupCode, tempId)) {
            req.flash('errorMessage', '條碼已經登記過了唷');
            res.redirect('/storeAssign');
        }
        else {
            let number = await redisClient.sAdd(storeName, tempId)
            if (number == 0) {
                console.log('hi')
                req.flash('errorMessage', '條碼已經登記過了唷');
                res.redirect('/storeAssign');
            }
            else {
                req.flash('errorMessage', '編號 ' + tempId + '，已分配成功');
                res.redirect('/storeAssign');
            }
        }
    },
    clearTempId: async (req, res) => {
        await redisClient.flushAll('ASYNC');
        req.flash('errorMessage', '已清除所有暫存');
        res.redirect('/storeAssign');
    },
    confirm: async (req, res) => {
        const { storeId, storeName } = req.session;
        let currentList = await redisClient.sMembers(storeName)
        try {
            await Promise.all(currentList.map(async (item, index, array) => {
                await loanableCup.create({
                    storeId: storeId,
                    code: item,
                });
            }));
            await Promise.all(currentList.map(async (item, index, array) => {
                await historyCup.create({
                    storeId: storeId,
                    code: item,
                });
            }));
        } catch (error) {
            req.flash('errorMessage', `${error}`);
            res.redirect('/storeAssign');
        }
        await redisClient.del(storeName)
        res.render('storeAssignResult', { storeName: storeName, tempList: currentList });
    },
    handleStoreDetail: async (req, res) => {
        let storeId = req.params.storeId
        let storeName;
        let loanableList = []
        try {
            await loanableCup.findAll({
                where: { storeId: storeId }
            }).then(res => {
                res.map((value) => {
                    loanableList.push(value.dataValues.code)
                })
            })
            let result = await Store.findOne({
                where: { id: storeId }
            })
            storeName = result.dataValues.storeName
            res.render('storeDetail', { storeName: storeName, loanableList: loanableList })
        } catch (error) {
            req.flash('errorMessage', `${error}`)
            res.redirect('/history')
        }
    },

};

module.exports = storeController;
