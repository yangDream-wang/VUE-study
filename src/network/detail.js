import request from './request'
/**获取banner图 */
export function getSongDetail(ids) {
  return request({
    url: `/song/detail?ids=${ids}`
  })
}
export class swiperData{
  constructor(data){
    this.swiperdata = typeof data.songs[0].al.picUrl == 'string' ? [{'imageUrl':data.songs[0].al.picUrl}] : null
  }
}