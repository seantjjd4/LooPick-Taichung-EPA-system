require('dotenv').config();  //載入env變數
const express = require('express');   //導入框架
const router = express.Router();
const homeController = require('../controllers/home')
const userController = require('../controllers/user')
const managerController = require('../controllers/manager')
const storeController = require('../controllers/store')
const historyController = require('../controllers/history');
const { store } = require('../controllers/store');

function checkLogin(req, res, next) {
  if (!req.session.username) return res.redirect('/login');
  next();
}

function back(req, res) {
  res.redirect('back');
}

function home(req, res) {
  res.redirect('home')
}

router.get('/register', managerController.register);
router.post('/register', managerController.handleRegister, back);

router.get('/login', managerController.login);
router.post('/login', managerController.handleLogin, back);
router.get('/logout', managerController.logout);

router.get('/', managerController.login);


router.get('/home', checkLogin, homeController.home)
router.get('/user', checkLogin, userController.user)
router.get('/store', checkLogin, storeController.store, back)
router.get('/history', checkLogin, historyController.history)

//新增店家頁面 & 新增店家操作
/*
router.get('/storeAdd', checkLogin, storeController.addPage)
router.post('/storeAdd', checkLogin, storeController.add)
*/

//分配頁面 & 儲存暫存 & 確認分配
router.post('/storeChoose', checkLogin, storeController.handleChoose, home)
router.get('/storeAssign', checkLogin, storeController.assign, back)
router.post('/storeObjectAdd', checkLogin, storeController.addTempId)
router.get('/storeObjectClear', checkLogin, storeController.clearTempId)
router.get('/storeAssignConfirm', checkLogin, storeController.confirm)

router.get('/storeDetail/:storeId', checkLogin, storeController.handleStoreDetail)

router.post('/user', checkLogin, userController.handleuser);
router.get('/user/cancel', checkLogin, userController.handlecancel);
router.get('/user/result', checkLogin, userController.handleresult);



module.exports = router;