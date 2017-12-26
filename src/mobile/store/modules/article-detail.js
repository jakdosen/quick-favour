/**
 * Created by Gavin.Li on 2017/11/22.
 */
import {getDetail,getCommentList,addComment} from '^/services/article'
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
        article_id:params.articleId,
        share_id:params.share_id,
        share_code:params.share_code
      }).then(({title,created_at,like_num,comment_num,click_num,content,id,desc,cover})=>{
        commit('fetchArticleDetail',{
          id,
          title,
          desc,
          cover,
          date:created_at,
          likeNum:like_num,
          commentNum:comment_num,
          clickNum:click_num,
          detail:content
        })
      })
    },
    changeNode({ commit ,state},noteText){
      commit('changeNode',noteText)
    },
    //发送留言
    postNote({state},params){
      return addComment({
        id_value:params.articleId,
        content:state.note
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
