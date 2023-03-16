require('dotenv').config();  //載入env變數
const express = require('express');   //導入框架
const session = require('express-session');
const flash = require('connect-flash');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();  //宣告框架變數
const port = process.env.SERVER_PORT; //定義本地伺服端port
const routes = require('./routes');
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 限制5分鐘
  max: 1000 // 限制請求數量
})

app.set('view engine', 'ejs');
app.use(limiter)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(flash());

app.listen(port, () => {        //伺服器運行的Function
  console.log(`Server listening at http://localhost:${port}`)  //運作提示字樣
})

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.message = req.flash('message');
  res.locals.username = req.session.username;
  next();
});
app.use('/', routes);

module.exports = app