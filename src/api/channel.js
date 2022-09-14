// 所有频道接口

import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 删除指定用户频道
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *设置用户频道
 * @param {String|Number} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
