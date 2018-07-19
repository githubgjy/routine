var express = require("express");
var fs = require("fs");
var app = express();
//处理静态资源
app.use(express.static("./"));
app.get("/list", function(req, res) {
  res.send({
    code: 200,
    data: [
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "网购床垫种类繁杂不乏浑水摸鱼",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "鞋子摆放也有风水，快来看看吧！",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "书房风水布置有三宝：书桌+衣柜+桌椅",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "床垫保养小技巧，快来看看收藏吧！",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "网购床垫种类繁杂不乏浑水摸鱼",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "鞋子摆放也有风水，快来看看吧！",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "书房风水布置有三宝：书桌+衣柜+桌椅",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "床垫保养小技巧，快来看看收藏吧！",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        "img": "http://localhost:9999/images/addNew-img.png",
        "title": "购买沙发时需要谨慎，不然要吃大亏了啊",
        "content":"网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      }
    ]
  });
});
app.listen(9999); //监听端口
console.log("200")