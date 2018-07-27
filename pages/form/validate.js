class Validator {
  constructor() {
    this.cache = [];
    this.strategies = {};
  }
  //初始化策略
  init() {
    this.strategies = {
      isNonEmpty: function (value, errorMsg) {
        if (value == "") {
          return errorMsg;
        }
      },
      minLength: function (value, length, errorMsg) {
        if (value.length < length) {
          return errorMsg;
        }
      },
      isMobile: function (value, errorMsg) {
        if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
          return errorMsg;
        }
      }
    };
  }
  add(value, rules) {
    var self = this;
    self.init();
    for (var i = 0; i < rules.length; i++) {
      (function (rule) {
        var arr = rule.strategy.split(":");
        var errorMsg = rule.errorMsg;
        //将函数都压入数组
        self.cache.push(function () {
          //拿出策略字串备用
          var strategy = arr.shift();
          //将值放在数组头一个
          arr.unshift(value);
          //报错信息放在数组最后一个
          arr.push(errorMsg);
          return self.strategies[strategy](...arr);//省略号语法代替apply
        });
      })(rules[i]);
    }
  }
  start() {
    for (var i = 0; i < this.cache.length; i++) {
      var msg = this.cache[i]();
      if (msg)
        return msg;
    }
  }
}
module.exports = Validator;