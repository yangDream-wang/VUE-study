import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from "./network/request"

Vue.config.productionTip = false

Vue.prototype.$request = request;

// request({
//   url: '/home/multidata',
// }).then((res) => {
//   console.log(`回调`,res);
// })

new Vue({
  router,store,
  render: h => h(App),
}).$mount('#app')
