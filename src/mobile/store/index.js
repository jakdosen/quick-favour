/**
 * Created by shiyang.yao on 2017/11/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import loadingStore from './modules/loadingStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    loadingStore
  }, strict: debug
})
