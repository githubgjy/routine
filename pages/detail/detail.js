// pages/detail/detail.js
var WxParse = require("../../wxParse/wxParse.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    author: null,
    time: null,
    content: null
  },
  onLoad: function (options) {
    //页面初始化，options为页面跳转带来的参数
    var that = this;
    wx:wx.request({
      url: 'http://localhost:9999/detail',
      success: function(res) {
        console.log(res.data.data);
        var data = res.data.data;
        that.setData({title:data.title,author:data.author,time:data.time});
        var con=data.content;//待转义的html代码
        WxParse.wxParse('content','html',con,that);//转义，数据自动绑定到data对象上
      },
      fail: function(res) {},
      complete: function(res) {},
    });
  }
});