import request from '@/utils/request'
// import store from '@/store'

// user.js是根据后端接口文档划分
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // 请求头参数 用headers bearer和store需要加空格
    // store需要手动引入

    // 封装在utils的请求拦截器中
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}
