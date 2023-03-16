const db = require('../models')
const Store = db.Store;
const sequelize = db.Sequelize
const loanableCup = db.loanableCup
const returnCup = db.returnCup
const User = db.User
const historyCup = db.historyCup
const historyController = {

    history: async (req, res) => {
        // First, access the store database 
        var storeNames = []
        var storeCupNum = []
        var storereturnCupNum = []
        var historyCupNum = []
        var storeId = []
        var result = []
        result = await Store.findAll().catch(error => {
            req.flash('errorMessage', `${error}`);
            res.redirect('/home');
        });
        result.forEach(storeItem => {
            storeNames.push(storeItem.dataValues.storeName)
            storeId.push(storeItem.dataValues.id)
            storeCupNum.push(0)
            historyCupNum.push(0)
            storereturnCupNum.push(0)
        });

        // Second,
        // I'm not sure what to show... 


        // Final, access the loanableCup database 
        /* 這樣寫會沒辦法確定await完 需要用一個Promise包起來才可以確保for裡面的每個await有被等到
        for ( i=0 ; i < storeId.length ; i++ ){
            await loanableCup.findAll({
                where: { storeId: storeId[i] }
            }).then(response => {
                queryResult = response;
                var loanableCupCode = [];
                queryResult.forEach(cupItem => {
                    loanableCupCode.push(cupItem.dataValues.code);
                });
                storeCupNum.push(loanableCupCode.length);
                
            }); 
        }
        // 這樣寫還是會查詢過多次的sql
        try {
            await Promise.all(storeId.map(async (item, index, array) => {
                await loanableCup.findAll({
                    where: { storeId: item }
                }).then(response => {
                    storeCupNum[index] = response.length;
                });
            }));
        } catch (error) {
            req.flash('errorMessage', `${error}`);
            res.redirect('/home');
        } 
        */
        await historyCup.findAll(
            {
                group: 'storeId',
                attributes: [
                    'storeId',
                    [sequelize.fn('COUNT', sequelize.col('*')), 'nums']
                ]
            }
        ).then(response => {
            response.map((item, index, array) => {
                console.log(item)
                historyCupNum[item.dataValues.storeId - 1] = item.dataValues.nums;
            })
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            res.redirect('/home');
        })

        await User.findAll(
            {
                group: 'borrowStoreId',
                attributes: [
                    'borrowStoreId',
                    [sequelize.fn('COUNT', sequelize.col('*')), 'nums']
                ]
            }
        ).then(response => {
            response.map((item, index, array) => {
                console.log(item)
                storereturnCupNum[item.dataValues.borrowStoreId - 1] = item.dataValues.nums;
            })
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            res.redirect('/home');
        })

        await loanableCup.findAll(
            {
                group: 'storeId',
                attributes: [
                    'storeId',
                    [sequelize.fn('COUNT', sequelize.col('*')), 'nums']
                ]
            }
        ).then(response => {
            response.map((item, index, array) => {
                console.log(item)
                storeCupNum[item.dataValues.storeId - 1] = item.dataValues.nums;
            })
            console.log(storeCupNum, storereturnCupNum)
            res.render('history', { storeList: storeNames, storeIdList: storeId, storeCupNumList: storeCupNum, storeCupreturnNumList: storereturnCupNum, historyCupList: historyCupNum });
        }).catch((error) => {
            req.flash('errorMessage', `${error}`);
            res.redirect('/home');
        })


    },
};

module.exports = historyController;