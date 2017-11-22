/**
 * Created by shiyang.yao on 2017/11/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import login from './modules/login'
import register from './modules/register'
import buyIndex from './modules/buyIndex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    common,
    login,
    register,
    buyIndex
  }, strict: debug
})
