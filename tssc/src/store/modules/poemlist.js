import Vue from "vue"
//声明state对象
const state = { 
    goods:{}   //诗的详情
};
//声明mutations
const mutations = {
   /*切换当前的用户类型*/
  poemchan(state, obj) {
    state.usertype = obj.type;
    state.userId = obj.id
  },
  //记录登录后的用户信息
  recorderInfo(state, obj) {
    state.userInfo = obj.info
    state.login = true
    setStore('userInfo', obj.info)
  },
  //获取用户信息
   // 获取用户信息
  getuserInfo(state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
};
//声明actions
const actions = {
    
};
//导出积分模块
export default {
  state,
  mutations,
  actions
};
