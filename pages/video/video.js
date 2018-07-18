// pages/video/video.js
Page({
  data: {
    videoList: []//视频列表
  },
  //上传视频
  uploadVideo: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://localhost:1200/postformdata', //nodeJS数据接口
          filePath: tempFilePaths[0],
          name: 'my_video',//这个前后台名称需要保持一致，别乱写。
          success: function (res) {
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
        console.log(res.tempFilePath);//临时路径，可以用wx.saveFile保存在本地
        console.log("下载成功")
      },
      error: function () {
        console.log('下载失败');
      }
    })
  }
});