import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
import modleA from "./modules/moduleA"

const store = new Vuex.Store({
  state:{
    num: 10,
    collections: []
  },
  /**方法 */
  mutations,
  actions,
  getters,
  modules:{
    modleA,
  }
})
export default store