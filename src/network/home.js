import request from './request'
/**获取banner图 */
export function getBannerList() {
  return request({ url: '/banner?type=0' })
}
/**获取推荐歌单 */
export function getRecommendSongSheet(data) {
  return request({
    url: '/personalized',
    data:data
  })
}
/**获取推荐MV */
export function getRecommendMv(data) {
  return request({
    url: "/personalized/mv",
    data:data
  })
}
/**获取新音乐 */
export function getRecommendNew(data) {
  return request({
    url: "/personalized/newsong",
    data:data
  })
}