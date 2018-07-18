//login.js
Page({
  data: {
    userName: '',//用户名
    userPass: '',//密码
  },
  //表单提交函数，每个input需要有name，否则获取不到值。
  formSubmit: function (e) {
    console.log(e.detail.value);//返回格式：Object {userName: "hello", userPass: "123"}
    var obj = e.detail.value;
    if (obj.userName && obj.userPass) {
      //本地存储用户名和密码
      wx.setStorageSync('userName', obj.userName);
      wx.setStorageSync('userPass', obj.userPass);
    }
  },
  //加载事件，如果判断有缓存信息，就读取并显示在input里。
  onLoad: function () {
    var name = wx.getStorageSync('userName');
    var password = wx.getStorageSync('userPass');
    if (name) {
      this.setData({ userName: name });
    }
    if (password) {
      this.setData({ userPass: password });
    }
  }
})