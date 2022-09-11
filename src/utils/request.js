import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// 如果baseURL需要多项，可以利用克隆
// const request = axios.create()克隆axios
const request = axios.create({
//   timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器：
// config是每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 必须return config
    // 登陆了，所有的请求都加上Authorization
    const {
      getters: { islogin },
      state: { tokenObj }
    } = store

    if (islogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token} `
    }
    return config
  }
)
export default request
