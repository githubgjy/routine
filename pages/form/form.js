var Validator = require('./validate.js');//验证类
Page({
  data: {
    country: [{ name: 'USA', value: '美国' },
    { name: 'CHN', value: '中国', checked: 'true' },
    { name: 'BRA', value: '巴西' },
    { name: 'JPN', value: '日本' },
    { name: 'ENG', value: '英国' },
    { name: 'TUR', value: '法国' }],
    date: '2016-09-01',
    cabin: '经济舱'
  },
  chooseCabin: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['尊享舱', '经济舱', '商务舱'],//数组长度最大为6个
      itemColor: "darkred",//文字颜色
      success: function (res) {
        console.log(res.tapIndex);//用户点击的按钮，从上到下的顺序，从0开始
        var cabinName = null;
        switch (res.tapIndex) {
          case 0:
            cabinName = "尊享舱";
            break;
          case 1:
            cabinName = "经济舱";
            break;
          case 2:
            cabinName = "商务舱";
            break;
        }
        //点击取消时
        if (res.tapIndex != undefined)
          that.setData({ cabin: cabinName });
        else
          that.setData({ cabin: that.data.cabin });
      }
    })
  },
  chooseBirthday: function (e) {
    //console.log(e.detail.value);
    var now = Date.parse(new Date());
    var birthday = Date.parse(new Date(e.detail.value));
    if (birthday >= now) {
      wx.showToast({
        title: '老兄，您不可能生于未来吧~~',
        icon: 'success',
        duration: 2000
      });
    } else {
      this.setData({
        date: e.detail.value
      });
    }

  },
  //绑定验证策略
  bindForm: function (form) {
    //console.log(form.userName);
    //初始化验证类
    var validator = new Validator();
    //*****添加校验规则******//
    validator.add(form.userName, [
      { strategy: 'isNonEmpty', errorMsg: '名字不能为空' },
      { strategy: 'minLength:5', errorMsg: '名字长度不能少于5位' }

    ]);
    validator.add(form.phone, [
      { strategy: 'isNonEmpty', errorMsg: '手机号不能为空' },
      { strategy: 'isMobile', errorMsg: '手机号码格式不正确' }

    ]);
    //收集报错信息
    var errorMsg = validator.start();
    return errorMsg;
  },
  sub: function (e) {
    var errorMsg = this.bindForm(e.detail.value);
    console.log(errorMsg);
    if (errorMsg) {
      wx.showToast({ title: errorMsg });
    } else {
      wx.showToast({ title: "OK" });
    }

  }
})