import request from '@/utils/request'

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
