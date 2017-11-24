/**
 * Created by shiyang.yao on 2017/11/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import login from './modules/login'
import register from './modules/register'
import articleIndex from './modules/article-index'
import articleList from './modules/article-list'
import articleDetail from './modules/article-detail'
import buyIndex from './modules/buyIndex'
import hotGoods from './modules/hotGoods'
import searchIndex from './modules/searchIndex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    common,
    login,
    register,
    articleIndex,
    articleList,
    articleDetail,
    buyIndex,
    hotGoods,
    searchIndex
  }, strict: debug
})
