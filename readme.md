---
title: '環保局管理系統'
disqus: hackmd
---

###### tags: `Loopick`

環保局管理系統
===

## 檔案結構

```bash
.
├── Dockerfile
├── app.js
├── config
│   └── config.json
├── controllers
│   ├── history.js
│   ├── home.js
│   ├── manager.js
│   ├── store.js
│   └── user.js
├── docker-compose.yml
├── docs
│   └── store_system_design.pdf
├── dump.rdb
├── libs
│   ├── 111-stores.csv
│   ├── csvRead.js
│   ├── list.js
│   ├── redisClient.js
│   └── redisList.js
├── migrations
│   ├── 20220828101442-create-store.js
│   ├── 20220828102615-create-user.js
│   ├── 20220829124711-create-manager.js
│   ├── 20220901034845-create-loanable-cup.js
│   ├── 20220901034856-create-return-cup.js
│   └── 20220914144014-create-history-cup.js
├── models
│   ├── historycup.js
│   ├── index.js
│   ├── loanablecup.js
│   ├── manager.js
│   ├── returncup.js
│   ├── store.js
│   └── user.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   ├── images
│   ├── js
│   └── styles
├── readme.md
├── routes
│   └── index.js
├── seeders
│   └── 20220901040242-initialize.js
├── test
│   └── databaseTest.js
└── views
    ├── history.ejs
    ├── home.ejs
    ├── login.ejs
    ├── register.ejs
    ├── store.ejs
    ├── storeAssign.ejs
    ├── storeAssignResult.ejs
    ├── templates
    ├── user.ejs
    └── user_result.ejs
```

## 系統開發架構

1. 本系統為本程式為 MVC 架構之 express 程式
2. 主要分成 3 個部分`models`、`views`和`controllers`
3. 需依照 MVC 流程開發

### 架構圖
![](https://i.imgur.com/5gyZWuv.png)


## 開發環境設定

### ENV 環境變數設定

```bash
#在資料夾建立.env
cd Loopick_EPA_System
touch .env

#在.env裡建立以下的變數
SERVER_PORT = 8888
NODE_ENV = development
TTL_TIME = 36000
REDIS_PORT = 6379
REDIS_HOST = localhost
REDIS_PASSWORD = root
```

### Sequelize 環境變數設定
 - 修改config/config.json 來設定資料庫連結資訊

```bash
# 如是本地端測試環境(macOs or linux)
{
    "development": {
      "username": <根據你的mysql設定>,
      "password": <根據你的mysql設定>,
      "database": "loopick_epa_system",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
    
# 如是docker環境
{
    "development": {
      "username": root,
      "password": root,
      "database": "loopick_epa_system",
      "host": "mysql",
      "dialect": "mysql"
    }
```

### Docker 環境

```bash
# 新增完.env後
docker-compose up

# 需進入 nodejs container環境
docker exec -it <backend container id> env = ANG=C.UTF=8 /bin/bash

# 進入環境好執行以下指令
bash> npm run init
```

### Linux 系統 (僅參考)

```bash
# 請先安裝以下程式
sudo apt install nodejs
sudo apt install npm

# 安裝本系統依賴庫
npm install

# 安裝mysql
sudo apt-get install mysql-server
sudo mysql
# 在 mysql 的 shell 內執行
# mynewpassword 為欲設定的密碼
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by 'mynewpassword'; 
mysql> FLUSH PRIVILEGES

# 用這個 script 設定密碼最快，照著操作一直按 y 即可 XD
sudo mysql_secure_installation

# 使用以下指令可以直接完成所有初始化設定
npm run reset

# 使用以下指令建立資料庫
npm run createDb

# 使用以下指令刪除資料庫
npm run dropDb

# 使用 migration 在 database 建立 table
npm run migrate
npm run seed

# 安裝redis
sudo apt-get update
sudo apt-get install redis

# 啟動redis server
redis-server
```

### Mac (M1)系統

```bash
# 請先安裝node & npm

# 安裝本系統依賴庫
npm install

# 安裝mysql 
arch -arm64 brew install mysql

# 啟動mysql server
mysql.server start

# 照著操作 即可設定密碼
sudo mysql_secure_installation

# 使用以下指令可以直接完成所有初始化設定
npm run reset

# 使用以下指令建立資料庫
npm run createDb

# 使用以下指令刪除資料庫
npm run dropDb

# 使用 migration 在 database 建立 table
npm run migrate
npm run seed

# 安裝redis
brew install redis

# 啟動redis server
redis-server
```

### 運行伺服器

```bash
# 會運用nodemon來運行app.js
npm run server

# 修改程式或重新整理可以輸入以下指令來hot reload server
rs
```

### 執行測試

```bash
# 會自動運行所有在test/.*js的測試檔
npm test
```

## 參考文件連結

### Database

> [How To Use Sequelize with Node.js and MySQL | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql)
> [Redis Document](https://www.runoob.com/redis/redis-lists.html)
