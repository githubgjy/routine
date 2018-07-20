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
        img: "http://localhost:9999/images/addNew-img.png",
        title: "网购床垫种类繁杂不乏浑水摸鱼",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "鞋子摆放也有风水，快来看看吧！",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "书房风水布置有三宝：书桌+衣柜+桌椅",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "床垫保养小技巧，快来看看收藏吧！",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。现在消费者的习惯改变了，我们也在适应这个变化带来的方便"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "网购床垫种类繁杂不乏浑水摸鱼",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "鞋子摆放也有风水，快来看看吧！",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "书房风水布置有三宝：书桌+衣柜+桌椅",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "床垫保养小技巧，快来看看收藏吧！",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      },
      {
        img: "http://localhost:9999/images/addNew-img.png",
        title: "购买沙发时需要谨慎，不然要吃大亏了啊",
        content:
          "网上买电器，买家具，甚至买建材，都早已不是什么新鲜事，消费者对此似乎都已经习以为常了。"
      }
    ]
  });
});
//模拟下拉请求
app.get("/listone", function(req, res) {
  res.send({
    code: 200,
    data: [
      {
        img: "http://localhost:9999/images/mui-teacher-bg-blue.jpg",
        title: "济州岛汉拿山宫",
        address: "韩国,济州岛",
        content:
          "据说半个亚洲的女生都想去权志龙的咖啡厅上班。要是你也想去济州岛的蓝天白云下喝咖啡，偶遇权志龙，那么将是一件非常令人兴奋的事情！"
      },
      {
        img: "http://localhost:9999/images/mui-teacher-bg-red.jpg",
        title: "东横Inn温泉酒店",
        address: "日本,东京",
        content:
          "据说半个亚洲的女生都想去权志龙的咖啡厅上班。要是你也想去济州岛的蓝天白云下喝咖啡，偶遇权志龙，那么将是一件非常令人兴奋的事情！"
      },
      {
        img: "http://localhost:9999/images/mui-teacher-bg-violet.jpg",
        title: "拉斯维加斯赌城",
        address: "美国,阿拉斯加",
        content:
          "据说半个亚洲的女生都想去权志龙的咖啡厅上班。要是你也想去济州岛的蓝天白云下喝咖啡，偶遇权志龙，那么将是一件非常令人兴奋的事情！"
      }
    ]
  });
});
//模拟带参数的数据请求
app.get("/listparams/:num", function(req, res) {
  var num = req.params.num; //页码
  var arr = [];
  (function() {
    for (var i = num * 5 - 5; i < num * 5; i++) {
      var obj = {
        id: i + 1,
        img: "http://localhost:9999/images/mui-teacher-bg-blue.jpg",
        title: "这是第" + (i + 1) + "条数据",
        address: "韩国，济州岛",
        content:
          "据说半个亚洲的女生都想去权志龙的咖啡厅上班。要是你也想去济州岛的蓝天白云下喝咖啡，偶遇权志龙，那么将是一件非常令人兴奋的事情！"
      };
      arr.push(obj);
    }
  })();
  res.send({
    code: 200,
    page: num,
    data: arr
  });
});
//图文混排的请求（解析html标签）
app.get("/detail/", function(req, res) {
  var title = "年货送什么？不如送书";
  var author = "鹏鹏鸟";
  var time = "2017-1-11";
  var content =
    '<div><span style="color:#ccc;">送年货是一件很头疼的事情...</span><img src="https://www.baidu.com/img/bd_logo1.png" /></div>';
  res.send({
    code: 200,
    data: { title: title, author: author, time: time, content: content }
  });
});
app.listen(9999); //监听端口
console.log("200");
