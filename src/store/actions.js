import {
  INC_NUM,
  DEC_NUM,
  CONLOG_ERROR,
  CONLOG_SUCCESS
} from './fine'
export default {
  /**方法 */
  testaction(context, payload) {
    return new Promise((resalve, reject) => {
      setTimeout(() => {
        context.commit(INC_NUM)
        resalve(`执行成功返回回调的参数`)
      }, 1000);
    })
  },
  /**收藏歌曲 */
  collectionSong(context, payload) {
    const collections = context.state.collections
    if (collections.indexOf(payload) != -1) {
      context.commit(CONLOG_ERROR)
    }else{
      return new Promise((resalve, reject) => {
        // setTimeout(()=>{
          context.commit(CONLOG_SUCCESS, payload)
          resalve(payload)
        // },1000)
      })
    }
    
    // console.log((context.state.collections));
  }
}