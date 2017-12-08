/**
 * Created by Gavin.Li on 2017/11/22.
 */
import {getDetail,getCommentList} from '^/services/article'
export default {
  namespaced: true,
  state: {
    //文章详情数据
    article:{
      title:'',
      date:'',
      likeNum:0,
      detail:''
    },
    //是否可分享
    sharable:true,
    //留言内容
    note:''
  },
  actions: {
    //获取文章详情
    fetchArticleDetail ({ commit ,state},params) {
      getDetail({
        article_id:params.articleId
      }).then(({title,created_at,like_num,content})=>{
        commit('fetchArticleDetail',{
          title,
          date:created_at,
          likeNum:like_num,
          detail:content
        })
      })
    },
    changeNode({ commit ,state},noteText){
      commit('changeNode',noteText)
    },
    //发送留言
    postNote({state}){
      //todo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(state.note)
        }, 1000)
      })
    }
  },
  mutations: {
    fetchArticleDetail(state, payload){
      Object.assign(state.article,payload)
    },
    changeNode(state, payload){
      state.note = payload
    }
  }
}
