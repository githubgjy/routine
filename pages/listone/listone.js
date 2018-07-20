// pages/list/list.js
Page({
  data: {
    list: [],
    page:1,
    isRefesh:false,//是否
    isLoading:true
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({ isRefesh: true });//刷新条出现
    wx.request({
      url: 'http://localhost:9999/listparams/1',
      method: 'GET',
      success: function (res) {
        var listdata = res.data.data;
        setTimeout(function () {
          wx.stopPullDownRefresh;//停止下拉刷新效果
          that.setData({ page: 1 });//重置页码
          that.setData({ list: listdata, isRefesh: false });//重新设置列表项和刷新条消失
        }, 1000);

      }
    });
  },
  //滑到底部加载
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    var oldData = this.data.list;//老数据
    that.setData({ isLoading: false });//loading出现
    wx.request({
      url: 'http://localhost:9999/listparams/' + page,
      method: 'GET',
      success: function (res) {
        var allData = [];
        var listdata = res.data.data;//新数据
        allData = oldData.concat(listdata);//老数据和新数据合并
        that.setData({ list: allData, page: page });//重新设置列表项和页码
        setTimeout(function () {
          that.setData({ isLoading: true });//loading消失
        }, 1000);
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ isLoading: false });//loading出现
    wx.request({
      url: 'http://localhost:9999/listparams/1',
      method: 'GET',
      success: function (res) {
        var listdata = res.data.data;
        that.setData({ list: listdata });
        setTimeout(function () {
          that.setData({ isLoading: true });//loading消失
        },1000)
      }
    })
  }
});