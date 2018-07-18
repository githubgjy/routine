// var http = require('http');

// http.createServer(function (request, response) {

//     发送 HTTP 头部
//     HTTP 状态值: 200 : OK
//     内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     发送响应数据 "Hello World"
//     response.end('Hello World,i just have a try,do not laugh at me\n');
// }).listen(8888);

// 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

var express = require("express");
var app = express();

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var questions = [
  {
    "data": 213,
    "num": 444,
    "age": 12
  },
  {
    "data": 456,
    "num": 678,
    "age": 13
  }
];

var answer = [
    {
      "data": 255,
      "num": 644,
      "age": 42
    },
    {
      "data": 2256,
      "num": 678,
      "age": 18
    }
  ];

//写个接口123
app.get("/questions", function(req, res) {
  res.status(200), res.json(questions);
});
app.get("/answer", function(req, res) {
    res.status(200), res.json(answer);
  });

//配置服务端口
var server = app.listen(3000, function() {
  var host = server.address().address;

  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
