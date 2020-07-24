export default {
  /**方法 */
  testaction(context, payload) {
    return new Promise((resalve, reject) => {
      setTimeout(() => {
        context.commit('incNum')
        resalve(`执行成功返回回调的参数`)
      }, 1000);
    })
  }
}