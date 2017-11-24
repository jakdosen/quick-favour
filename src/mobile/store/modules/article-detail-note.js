/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {
    //文章详情数据
    article:{
      title:'',
      date:'',
      likeNum:0
    },
    //留言信箱
    notes:{
      total:0,
      list:[]
    }
  },
  actions: {
    //获取文章详情
    fetchArticleDetail ({ commit ,state},params) {
      //todo
      commit('fetchArticleDetail',{
        title:'朝鲜释放的美国人被烧死路边 警方:系意外或自杀',
        date:'2017-5-30',
        likeNum:2000,

      });
    }
  },
  mutations: {
    fetchArticleDetail(state, payload){
      Object.assign(state.article,payload)
    }
  }
}
