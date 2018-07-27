import Vue from "vue"
import { setStore } from '@/utils/storage'
//声明state对象
const state = { 
  
};
//声明mutations
const mutations = {
   /*切换当前的用户类型*/
  changeType(state, obj) {
    state.usertype = obj.type;
    state.userId = obj.id
  },
  //记录登录后的用户信息
  recorderInfo(state, obj) {
    state.userInfo = obj.info
    state.login = true
    setStore('userInfo', obj.info)
  }
};

const actions = {
  // async getUserInfo({commit,recorderInfo}) {
	// 	let res = await getUser();
	// 	commit(getuserInfo, res)
	// },
};
//导出积分模块
export default {
  state,
  mutations,
  actions
};
