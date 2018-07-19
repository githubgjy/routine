// pages/list/list.js
Page({
  data: {
    list: []
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:9999/list',
      method: 'GET',
      success: function (res) {
        var listdata = res.data.data;
        that.setData({ list: listdata });
      }
    })
  }
});