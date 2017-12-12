/**
 * Created by Gavin.Li on 2017/11/22.
 */
import {getDetail,getCommentList,addComment} from '^/services/article'
import _ from 'underscore'
export default {
	namespaced: true,
	state: {
		//文章详情数据
		article: {
			title: '',
			date: '',
			likeNum: 0
		},
		//留言信息
		notes: [],
    //分页信息
    pagination:{
      total: 0,
      count: 0,
      per_page: 0,
      current_page: 0,
      total_pages: 0,
      links: {
        next: null
      }
    }
	},
	actions: {
    fetchDetail ({commit, state}, params) {
      getCommentList({
        article_id:params.articleId,
        page:params.page
      }).then(({data,meta,article})=>{
        //文章详情
        commit('setArticleDetail',{
          title:article.title,
          date:article.created_at,
          likeNum:article.like_num
        });
        //页码信息
        commit('setPagination',meta.pagination);
        //评论数据
        commit('setArticleNoteList',data.map(comment=>{
          return {
            id:comment.id,
            desc:comment.content,
            user:comment.user
          }
        }));
      })
		}
	},
	mutations: {
    setArticleDetail(state, payload){
			Object.assign(state.article, payload)
		},
		setArticleNoteList(state, payload){
      state.notes = [...state.notes,...payload]
		},
    setPagination(state, payload){
      Object.assign(state.pagination, payload)
    },
	}
}
