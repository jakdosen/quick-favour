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
      getAd().then(data=>{
        commit('fetchSwiperData',data.map(d=>({
          url: d.ad_link,
          img: d.ad_code,
          title: d.ad_name
        })))
      })
    },
    fetchArticleData({ commit ,state}){
      getList().then((data)=>{
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
