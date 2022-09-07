import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// 如果baseURL需要多项，可以利用克隆
// const request = axios.create()克隆axios
const request = axios.create({
//   timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
