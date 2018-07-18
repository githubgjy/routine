// pages/charts/charts.js
var wxCharts = require('wxcharts.js');
Page({
  data: {},
  onLoad: function (options) {
    // var data1 = [0.15, 0.2, 0.45, 0.37, 0.4, 0.8];
    // var data2 = [0.30, 0.37, 0.65, 0.78, 0.69, 0.94];

    //建立连接
    wx.connectSocket({
      url: 'ws://localhost:8000',//这里连接的就是服务端的socket

    });
    //连接成功监听
    wx.onSocketOpen(function (res) {
      //发送信息
      wx.sendSocketMessage({
        data: "stock"
      });
      console.log('WebSocket连接已打开！')
    });
    //连接失败监听
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    });
    //接收数据
    wx.onSocketMessage(function (res) {
      //收到的信息
      console.log('收到服务器内容：' + res.data);
      var obj = JSON.parse(res.data);
      console.log(obj);
      //绘制图表，利用canvas绘图技术。
      new wxCharts({
        canvasId: 'lineCanvas',//指定canvas的id
        type: 'line',//类型是线形图
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],

        series: [{
          name: '成交量1',
          data: obj.data,//websocket接收到的数据
          format: function (val) {
            if (typeof val == "string") {
              val = parseFloat(val);
            }
            return val.toFixed(2) + '万';
          }
        },
        {
          name: '成交量2',
          data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
          format: function (val) {
            return val.toFixed(2) + '万';
          }
        }],
        yAxis: {
          title: '成交金额 (万元)',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: 320,
        height: 200
      });
    });


  }

})