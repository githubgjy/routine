import {
  RECORD_USERINFO,
  GET_USERINFO,
  SHOW_LIST,
  USER_TYPE,
  CHANGE_DEGREE,
  CHANGE_INFO
} from "./mutation-types";
import { setStore } from "../utils/storage";
export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore("userInfo", info);
  },
  [SHOW_LIST](state) {
    state.showList = true;
  },
  // 获取用户信息
  [GET_USERINFO](state, info) {
    if (state.userInfo && state.userInfo.username !== info.username) {
      return;
    }
    if (!state.login) {
      return;
    }
    if (!info.message) {
      state.userInfo = { ...info };
    } else {
      state.userInfo = null;
    }
  },
  /*切换当前的用户类型*/
  [USER_TYPE](state, info) {
    state.usertype = info;
  },
  /*记录当前的访问年级*/
  [CHANGE_DEGREE](state, info) {
    state.degree = info.degree;
  },
  //记录当前的访问信息（id  pnumber）
  [CHANGE_INFO](state, info) {
    state.userId = info.Id;
    state.pNumber = info.pNumber;
  }
};
