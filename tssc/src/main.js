// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
/*路由*/
import router from "./router";
/*引入图片懒加载*/
//获取用户信息
import { userInfo } from "@/api/author.js";
import { getStore } from "@/utils/storage.js";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: "/static/imglazyload/loading-bars.svg"
});
// 将全局样式文件写在 main.js
import "@ass/scss/reset.scss";
import "@ass/scss/const.scss";
import "@ass/scss/mixin.scss";

// Mint UI
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);

import "@ass/scss/my-mint.scss";
/*生产模式*/
Vue.config.productionTip = false;
/*这个是注册到根示例的方法*/
import store from "./store";
import FastClick from "fastclick";
/*引入自适应的js(rem)*/
import "lib-flexible/flexible.js";
/*判断是否存在，然后做FastClick.attach(document.body)应用*/
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}
/*第二次弹出的时候获得焦点*/
Vue.directive("focus", function(el) {
  el.focus();
});

//暂时模拟的功能，接口数据
// router.beforeEach(function (to, from, next) {
//   let params = {
//     params: {
//       token: getStore('token')
//     }
//   }
//   userInfo(params).then(res => {
//     if (res.result.state != 1) { // 没登录
//         next('/login')
//     } else {
//       store.commit('RECORD_USERINFO', {info: res.result})
//       if (to.path === '/login') { //  跳转到
//         next({path: '/'})
//       }
//       next()
//     }
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
