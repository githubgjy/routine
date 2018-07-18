//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    myText: "我是程序员",
    myText2: "I am a programer",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arr: [{
      "name": "李华",
      "age": 18
    }, {
      "name": "李宪华",
      "age": 28
    }],
    remoteInfo: '',
    myImg: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  register: function () {
    wx.navigateTo({
      title:"返回",
      url: '../login/login'
    })
  },
//保存图片
  imgsave: function () {
    wx.navigateTo({
     
      url: '../imgsave/imgsave'
    })
  },
  //图表
  gocharts:function() {
    wx.navigateTo({
      title: "返回",
      url: '../charts/charts'
    })
  },
  //图片上传
  upload: function () {
    wx.navigateTo({
      title: "返回",
      url: '../upload/upload'
    })
  },
  //视频上传
  uploadVideo: function () {
    wx.navigateTo({
      title: "返回",
      url: '../video/video'
    })
  },
  //自定义函数
  myTap: function() {
    this.setData({
      myText: "我是中国人"
    });
    var that = this;
    //选择图片，如果是手机就是打开相册。
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        that.setData({
          myImg: tempFilePaths
        });
      }
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    //保存this，在回调里面使用
    var that = this;
    //调用远程数据
    wx.request({
      url: 'https://raw.githubusercontent.com/jiangzy27/how_to_react/master/score.json',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          remoteInfo: res.data.data
        });
      }
    });

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})