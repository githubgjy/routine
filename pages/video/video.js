// pages/video/video.js
Page({
  data: {
    videoList: []//视频列表
  },
  //上传视频
  uploadVideo: function () {
    var that = this;
    wx.chooseVideo({
      success: function (res) {
        var tempFilePaths = res.tempFilePath;
        console.log(res)
        wx.uploadFile({
          url: 'http://localhost:1200/postformdata', //nodeJS数据接口
          filePath: tempFilePaths,
          
          name: 'my_video',//这个前后台名称需要保持一致，别乱写。
          success: function (res) {
            console.log(res);
            var data = JSON.parse(res.data);//返回来的是字符串格式。
            var arr = that.data.videoList;
            arr.push(data.path);
            that.setData({ videoList: arr });//只有这种方式才能更新视图
            console.log(that.data.videoList);
            wx.showToast({
              title: '视频上传成功',
              icon: 'success',
              duration: 2000
            });

          }
        })
      }
    })
  },
  //下载视频,这个方法在不通过审核的情况下有限制。
  downloadVideo: function (e) {
    var index = e.target.dataset.videoid;//获取视频的id
    var that = this;
    console.log(index);
    console.log(that.data.videoList[index]);
    wx.downloadFile({
      url: that.data.videoList[index],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePath
        wx.saveFile({
          tempFilePath: tempFilePaths,
          success: function (res) {
            console.log(res)
            var savedFilePath = res.savedFilePath;
            wx.showToast({
              title: '视频下载成功',
              icon: 'success',
              duration: 2000
            });
            console.log("下载成功");
            wx.setStorageSync('videofile', res.savedFilePath)
          }
        })
      },
      error: function () {
        console.log('下载失败');
      }
    })
  },
  //加载的时候判断有没有缓存视频在，如果有的话就读取缓存的视频
    //加载事件，如果判断有缓存信息，就读取并显示在input里。
  onLoad: function () {
    //var that=this;
    //var video = wx.getStorageSync('savedFilePath');
    //console.log(video)
    //that.setData({ videoList: video});
    var video = wx.getStorageSync('videofile');
    console.log(video)
    //this.setData({ videoList: video });
    console.log("间隔")
    if (video){
      this.data.videoList.push(video)
      console.log(this.data.videoList)
      this.setData({ videoList: this.data.videoList });
    }
    
    wx.getSavedFileList({
      success: function (res) {
        console.log(res.fileList)
      }
    })
  }
});