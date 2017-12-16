/**
 * Created by Gavin.Li on 2017/11/22.
 */
import {getList,getAd} from '^/services/article'
import _ from "underscore";
export default {
  namespaced: true,
  state: {
    swiperList:[],
    articleList:[]
  },
  actions: {
    fetchSwiperData ({ commit ,state}) {
      getAd().then(({data})=>{
        commit('fetchSwiperData',data.map(d=>({
          url: d.adv_link,
          img: d.adv_code,
          // title: d.adv_name
        })))
      })
    },
    fetchArticleData({ commit ,state}){
      getList().then(({data})=>{
        commit('fetchArticleData',data)
      })
    }
  },
  mutations: {
    fetchSwiperData(state, payload){
      state.swiperList = payload
    },
    fetchArticleData(state, payload){
      state.articleList = payload
    }
  }
}
