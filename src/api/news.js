// 所有关于新闻的接口
import request from '@/utils/request'

/**
 *获取文章
 * @param {String | Number} id 频道的id
 * @param  timetamp 请求新的推荐数据传当前时间戳
 * @returns
 */
export const getArticle = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
