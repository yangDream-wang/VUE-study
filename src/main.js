import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from "./network/request"
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

Vue.prototype.$request = request;

/**解决移动端300毫秒的延迟 */
FastClick.attach(document.body);
/**图片懒加载 */
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
// request({
//   url: '/home/multidata',
// }).then((res) => {
//   console.log(`回调`,res);
// })

new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')
