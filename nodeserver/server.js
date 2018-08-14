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
var fs = require("fs");
var app = express();
app.use(express.static("./"));
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
    data: 213,
    num: 444,
    age: 12
  },
  {
    data: 456,
    num: 678,
    age: 13
  }
];
var indexdata = {
  img: [
    {
      src: "http://localhost:8100/images/b1.jpg",
      id: 1
    },
    {
      src: "http://localhost:8100/images/b2.jpg",
      id: 2
    },
    {
      src: "http://localhost:8100/images/b3.jpg",
      id: 3
    }
  ],
  theme: [
    {
      src: "http://localhost:8100/images/s1.png",
      id: 1
    },
    {
      src: "http://localhost:8100/images/s2.png",
      id: 2
    },
    {
      src: "http://localhost:8100/images/s3.png",
      id: 3
    }
  ],
  last: [
    {
      src: "http://localhost:8100/images/s4.png",
      id: 1,
      name: "瓜子",
      zl: "100g",
      price: "0.01"
    },
    {
      src: "http://localhost:8100/images/s5.png",
      id: 2,
      name: "芹菜",
      zl: "半斤",
      price: "0.02"
    },
    {
      src: "http://localhost:8100/images/s6.png",
      id: 3,
      name: "素米",
      zl: "375g",
      price: "0.03"
    }
  ]
};

var answer = [
  {
    data: 255,
    num: 644,
    age: 42
  },
  {
    data: 2256,
    num: 678,
    age: 18
  }
];

//写个接口123
app.get("/questions", function(req, res) {
  res.status(200), res.json(questions);
});
app.get("/answer", function(req, res) {
  res.status(200), res.json(answer);
});
app.get("/indexdata", function(req, res) {
  res.status(200), res.json(indexdata);
});
//配置服务端口
var server = app.listen(8100, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
