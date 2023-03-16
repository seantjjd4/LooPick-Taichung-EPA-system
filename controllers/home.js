const redisClient = require('../libs/redisClient')
const homeController = {
    home: async (req, res) => {
        await redisClient.flushAll('ASYNC');
        res.render('home');
    },
};

module.exports = homeController;