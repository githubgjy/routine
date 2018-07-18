// pages/upload/upload.js
Page({
  data: {
    imgList: []//图片列表
  },
  //上传图片
  uploadImg: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://localhost:9998/postformdata', //nodeJS数据接口
          filePath: tempFilePaths[0],
          name: 'my_upload',//这个前后台名称需要保持一致，别乱写。
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data);//返回来的是字符串格式。
            var arr = that.data.imgList;
            arr.push(data.path);
            that.setData({ imgList: arr });//只有这种方式才能更新视图
            console.log(that.data.imgList);
            wx.showToast({
              title: '文件上传成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  //预览图片
  previewImg: function (e) {
    var index = e.target.dataset.imgid;//获取图片的id
    var that = this;
    console.log(index);
    wx.previewImage({
      current: that.data.imgList[index],//当前的图片
      urls: that.data.imgList // 需要预览的图片http链接列表
    });
  }
})