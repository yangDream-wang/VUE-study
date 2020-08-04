import {
  INC_NUM,
  DEC_NUM,
  CONLOG_ERROR,
  CONLOG_SUCCESS
} from './fine'
export default {
  /**方法 */
  [INC_NUM](state) {
      state.num++;
    },
  [DEC_NUM](state) {
    state.num--;
  },

  [CONLOG_ERROR]() {
    console.log(`已经收藏过了`);
  },
  [CONLOG_SUCCESS](state,payload) {
    console.log(`进来了`);
    state.collections.push(payload)
    console.log(`收藏成功`);
  },
}