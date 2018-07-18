//获取应用实例
const app = getApp()

Page({
  data: {
    imgPath: ''
  },
  //事件处理函数
  
  //自定义函数
  //保存图片
  keepImg: function () {
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        //将本地照片保存在小程序内
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath;//图片成功存储在本地后的路径
            console.log(savedFilePath);

            if (!wx.getStorageSync('storageImgPath')) {
              //数据存储，保存图片的路径
              wx.setStorageSync('storageImgPath', savedFilePath);
            }
            that.setData({ imgPath: wx.getStorageSync('storageImgPath') });
          }
        })
      }
    })
  },
  //删除图片
  deleteImg:function(){
    wx.removeStorageSync('storageImgPath');//从数据缓存中删除
    var that = this;
    wx.getSavedFileList({//获取本地的文件列表
      success: function (res) {
        console.log(res.errMsg);
        var files = res.fileList;
        if (res.fileList.length > 0) {
          //删除第一张图片
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            success: function (res) {
              //提示语
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
            }
          });
        }
      }
    });
  },
  //加载的时候
  onLoad: function () {
    var that = this
    //刷新页面、关闭或退出小程序，图片都会存在，
    //说明图片已经保存在了小程序里（具体应该是你本机微信安装目录的某个文件夹）。
    if (wx.getStorageSync('storageImgPath')) {
      that.setData({ imgPath: wx.getStorageSync('storageImgPath') });
    }
  }

})