/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/scripts/libs/social-share/css/share.less'
import '@/styles/article-detail.less'
import '@/scripts/libs/social-share/js/qrcode'
// import '@/scripts/libs/social-share/js/social-share'
import $ from 'jquery'
import _ from 'underscore'
import util from '^/utils'
import {getDetail,getCommentList} from '^/services/article'
import {Model,Collection,View} from 'backbone'

/**
 * App
 */
let App = View.extend({
  template:_.template($('#comment-item-tpl').html()),
  initialize(){
    this.urlParams  = util.urlArgs();
    if(!this.urlParams.id) return
    this.commentList = new Collection();
    this.commentList.bind('reset',this.renderCommentList,this)
    this.fetchArticleData(this.urlParams.id);
    this.fetchArticleCommentList(this.urlParams.id);
    this.initSocialShare();
  },
  initSocialShare(){
    require.ensure([], function(require){
      require('@/scripts/libs/social-share/js/social-share');
      socialShare('.js-article-share');
    });
		// socialShare('.js-article-share');
  },
  //获取文章列表信息
  fetchArticleData(article_id){
    getDetail({
      article_id
    }).then((data)=>{
      this.renderArticleContent(data)
    })
  },
  renderArticleContent(article){
    this.$('[data-key]').each((index,el)=>{
      let key = $(el).data('key').split('|');
      let content = article[key[0]],method = key[1] || 'text';
      $(el)[method](content);
    })
  },
  fetchArticleCommentList(article_id){
    getCommentList({
      article_id,
      page:1
    }).then(({data,meta})=>{
      this.commentList.reset(data);
    })
  },
  renderCommentList(){
    this.commentList.each(comment=>{
      this.$('.comment-list').append(this.template(comment.toJSON()))
    })
  }
});
new App({
  el:document.body
});
