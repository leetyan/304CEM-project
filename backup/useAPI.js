// const http = require('http');

// const login = require('./api/login');

// const server = http.createServer(login);

// server.listen(3000);

var bodyparser = require('body-parser');    // 解析 HTTP 請求主體的中介軟體
var express = require('express');
 
var conf = require('../conn');
var accounts = require('../api/routes/getAndPost');
 
var app = express();
 
// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 
app.use('/user', accounts);
 
app.listen(conf.port, function () {
    console.log('app listening on port ' + conf.port + '!');
});