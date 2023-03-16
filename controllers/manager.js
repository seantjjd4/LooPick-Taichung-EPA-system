/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const saltRounds = 10;

const db = require('../models');

const { Manager } = db;


const managerController = {
  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填哦！');
      return next();
    }
    Manager.findOne({
      where: {
        username,
      },
    })
      .then((manager) => {
        if (!manager) {
          req.flash('errorMessage', '使用者帳號或密碼錯誤');
          return next();
        }
        bcrypt.compare(password, manager.password, (err, result) => {
          if (err || !result) {
            req.flash('errorMessage', '使用者帳號或密碼錯誤');
            return next();
          }
          req.session.username = manager.username;
          res.redirect('/home');
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/login');
  },

  register: (req, res) => {
    res.render('register');
  },

  handleRegister: (req, res, next) => {
    const { username, password, password2 } = req.body;
    if (!username || !password || !password2) {
      req.flash('errorMessage', '該填的沒填哦');
      return next();
    }
    if (password !== password2) {
      req.flash('errorMessage', '輸入的密碼不一致');
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      Manager.findOne({
        where: {
          username,
        },
      }).then((manager) => {
        if (manager === null || manager.username !== username) {
          Manager.create({
            username,
            password: hash,
          })
            .then(() => {
              req.session.username = username;
              res.redirect('/home');
            })
            .catch((err2) => {
              req.flash('errorMessage', err2.toString());
              return next();
            });
        } else {
          req.flash('errorMessage', '使用者已存在');
          return next();
        }
      });
    });
  },

  home: (req, res, next) => {
    
    if( req.method == "GET" )										//GET method
		{
      // 如果 get 收到參數 name == "店家名"，則顯示此店家名，之後會加資料庫的資料進來
      if(req.query.name == "店家名")
      {  
        global.storename = req.query.name
        return next();
      }
    }
    res.render('index');
  },

  manage: (req, res) => {
    res.render('home');
  },
};

module.exports = managerController;
