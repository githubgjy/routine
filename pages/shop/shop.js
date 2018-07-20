// pages/shop/shop.js
Page({
  data: { images: null },
  onLoad: function (options) {
    var arr = [
      { picurl: "../../images/mui-teacher-bg-blue.jpg" },
      { picurl: "../../images/mui-teacher-bg-red.jpg" },
      { picurl: "../../images/mui-teacher-bg-violet.jpg" }
    ];
    this.setData({ images: arr });
  },
  locatePos: function () {
    //获取当前定位
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        //使用微信内置地图查看位置
        wx.openLocation({
          latitude: latitude,
          longitude: longitude
        });
      }
    });
  },
  call: function () {
    //打电话
    wx.makePhoneCall({
      phoneNumber: "0532-7758521", //仅为示例，并非真实的电话号码
      success: function () {
        console.log("成功拨打电话")
      }
    });
  },
  swiperchange:function(e){
    let current = e.detail.current;
    console.log(current)
    console.log(e)
  }
});
