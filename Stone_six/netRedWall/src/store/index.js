import Vue from 'vue';
import Vuex from 'vuex';
import {
  localKey
} from '@/api/config/ip-config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    tenant: "store1",
    user: {},
    socketStatus: 2,
    // 1连接, 2连接断开   
    loginStatus: 1,
    //1需要 2不需要 
    userId: '',
    scrollStatus: 1,
    anyId: '',
    saleId: '',
    salerAvatar: '',
    salerName: '',
    footageobject: {},
    videoCommentNum: 0,
    objs: {},
    storeId: 1002
  },
  getters: {
    getStoreId: state => {
      return state.storeId
    },
    getUser: state => {
      if (state.userInfo.id) {
        return state.userInfo
      } else {
        return JSON.parse(localStorage.getItem(localKey + 'user'))
      }
    },
    getUserInfo: state => {
      if (state.userInfo.id) {
        return state.userInfo
      } else {
        let r = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
        return r ? r : '';
      }
    },
    getScrollStatus: state => {
      if (state.scrollStatus) {
        return state.scrollStatus
      } else {
        let r = localStorage.getItem(localKey + 'scrollStatus')
        return r ? r : '';
      }
    },
    getUserId: state => {
      if (state.userId) {
        return state.userId
      } else {
        let r = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
        return r ? r.id : '';
      }
    },
    getSocketStatus: state => {
      if (state.socketStatus) {
        return state.socketStatus
      } else {
        return sessionStorage.getItem(localKey + 'socketStatus');
      }
    },
    getloginStatus: state => {
      if (state.loginStatus) {
        return state.loginStatus
      } else {
        let r = localStorage.getItem(localKey + 'loginStatus')
        return r ? r : '';
      }
    },
    getAnyId: state => {
      if (state.anyId) {
        return state.anyId
      } else {
        let r = localStorage.getItem(localKey + 'anyId')
        return r ? r : '';
      }
    },
    getSaleId: state => {
      if (state.saleId) {
        return state.saleId
      } else {
        let r = localStorage.getItem(localKey + 'saleId')
        return r ? r : '';
      }
    },
    getSalerAvatar: state => {
      if (state.salerAvatar) {
        return state.salerAvatar
      } else {
        let r = localStorage.getItem(localKey + 'salerAvatar')
        return r ? r : '';
      }
    },
    getSalerName: state => {
      if (state.salerName) {
        return state.salerName
      } else {
        let r = localStorage.getItem(localKey + 'salerName')
        return r ? r : '';
      }
    },
  },
  actions: {
    setSocketStatus({
      commit
    }, socketStatus) {
      console.log('setSocketStatus');
      commit('SET_SOCKETSTATUS', socketStatus)
    },
  },
  mutations: {
    SET_STOREID: (state, storeId) => {
      state.storeId = storeId;
    },

    listmessage: (state, data) => {

      state.objs = data;
    },
    FOO_TAGEOBJUCT: (state, footageobject) => {
      state.footageobject = footageobject;
    },
    SET_VIDEOCOMMENTNUM: (state, videoCommentNum) => {
      state.videoCommentNum = videoCommentNum;
    },
    SETUSERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      state.userId = userInfo.id;
      localStorage.setItem(localKey + 'userInfo', JSON.stringify(userInfo));
    },
    SET_SOCKETSTATUS: (state, socketStatus) => {
      state.socketStatus = socketStatus;
      sessionStorage.setItem(localKey + 'socketStatus', socketStatus);
      localStorage.setItem(localKey + 'socketStatus', socketStatus);
    },
    SETLOGINSTATUS: (state, loginStatus) => {
      state.loginStatus = loginStatus
      localStorage.setItem(localKey + 'loginStatus', JSON.stringify(loginStatus))
    },
    SETSCROLLSTATUS: (state, scrollStatus) => {
      state.scrollStatus = scrollStatus
      localStorage.setItem(localKey + 'scrollStatus', scrollStatus)
    },
    SETANYID(state, anyId) {
      state.anyId = anyId
      localStorage.setItem(localKey + 'anyId', anyId)
    },
    SETSALEID: (state, saleId) => {
      state.saleId = saleId;
      localStorage.setItem(localKey + 'saleId', saleId);
    },
    SETSALERAVATAR: (state, salerAvatar) => {
      state.salerAvatar = salerAvatar;
      localStorage.setItem(localKey + 'salerAvatar', salerAvatar);
    },
    SETSALERNAME: (state, salerName) => {
      state.salerName = salerName;
      localStorage.setItem(localKey + 'salerName', salerName);
    },
  },
  modules: {}
})