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
      // 放置数据刷新失败 放置在插件中持久化
      const { tokenObj, myChannels, histories } = state
      return { tokenObj, myChannels, histories }
    }
  })],
  state: {
    // tokenObj: JSON.parent( window.localStorage.setItem('SET_TOKEN', JSON.stringify(token)))
    tokenObj: {},
    myChannels: [],
    histories: []
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
    },
    /**
     * @param {*} channels 删除或添加后最新的频道数组
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    /**
     *
     * @param {*} state
     * @param {*} histories 增删改查后的新数据 数组形式
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
