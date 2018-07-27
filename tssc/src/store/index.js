import Vue from 'vue'
import Vuex from 'vuex'
import logintypes from './modules/logintypes'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)

const state = {
  login: false,   // 是否登录
  userInfo: null, // 用户信息
  usertype:1,   //1是老师，2是学生
  showList:false,
  userId:10,
  userName:"lanq",//暂时测试的用户名
  pNumber:"11",//pad的唯一标识
  degree:1    //1 小学  2 初中 3 高中
}

export default new Vuex.Store({
  state,
  action,
  mutations
})
