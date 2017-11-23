/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {
    article:{
      title:'',
      date:'',
      likeNum:0,
      detail:''
    },
    //是否可分享
    sharable:true,
    note:''
  },
  actions: {
    fetchArticleDetail ({ commit ,state}) {
      commit('fetchArticleDetail',{
        title:'计划经济',
        date:'2017-5-30',
        likeNum:2000,
        detail:'<a style="color: red"> 分享内容详情</a>'
      });
    },
  },
  mutations: {
    fetchArticleDetail(state, payload){
      Object.assign(state.article,payload)
    }
  }
}
