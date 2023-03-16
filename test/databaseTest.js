let { assert, should } = require('chai')
const app = require('../app')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = require('chai').expect
const redisClient = require('../libs/redisClient')
chai.use(chaiHttp)

describe('database init', async () => {
    //初始化測試
    before(async () => {

    })

    //初始化每個測試
    beforeEach(async () => {

    });

    //關閉每個測試
    afterEach(async () => {

    })

    it("connection test", async (done) => {
        done()
    })
})

describe('redis test', async () => {
    //初始化測試
    before(async () => {

    })

    //初始化每個測試
    beforeEach(async () => {

    });

    //關閉每個測試
    afterEach(async () => {

    })

    it("connection test", async (done) => {
        await redisClient.set('key', 'value');
        //const value = await redisClient.get('key');
        //console.log(value)
        //done()
    })
})

/* Get 
chai.request(app)
    .get('/test')
    .end((err, res) => {
        assert.equal(404, res.status)
        assert.equal("can't find url", res.text)
        done()
    })
*/

/* Post 
chai.request(app)
    .post('/api/v1/urls')
    .set('content-type', 'application/json')
    .send({ url: 'test', expireAt: '2022-02-18T02:55:00.000Z' })
    .end((err, res) => {
        assert.equal(404, res.status)
        assert.equal('wrong url', res.text)
        done()
    })
*/