import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 封装本地存储， vuex-persistedstate
// vuex-persistedstate --> 持久化state
// 下载
// - yarn add vuex-persistedstate@3.2.1
// 引入
// - import createPersistedState from "vuex-persistedstate";
// 调用
// - plugins: [createPersistedState()],

// plugins配置项：
// key:默认值是vuex
// storage:默认是本地
// reducer:函数 return一个对象,对象是存储的value  key:value

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'HEIMA_TOUTIAO',
    // storage: window.sessionStorage,
    reducer(state) {
      // return {} 指定state里面的tokenobj数据
      const { tokenObj } = state
      return { tokenObj }
    }
  })],
  state: {
    // tokenObj: JSON.parent( window.localStorage.setItem('SET_TOKEN', JSON.stringify(token)))
    tokenObj: {}
  },

  getters: {
    islogin(state) {
      // state.tokenObj.token有值 为真 再取反为假
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将token存在vuex中
      state.tokenObj = token
      // window.localStorage.setItem('SET_TOKEN', JSON.stringify(token))
    }
  },
  actions: {},
  modules: {}
})
