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
  fetchArticleCommentList(article_id,pageNum){
    getCommentList({
      article_id,
      page:pageNum||1
    }).then(({data,meta})=>{
      this.commentList.reset(data);
      this.initPagination(meta)
    })
  },
  renderCommentList(){
    this.$('.comment-list').empty();
    this.commentList.each(comment=>{
      this.$('.comment-list').append(this.template(comment.toJSON()))
    })
    !this.commentList.length && this.$('.comment-list').append('<h3>暂无评论</h3>')
    this.$('img.lazy').lazyload({effect: "fadeIn"});
  },
  initPagination({pagination}){
    let page$el = this.$('.js-pagination');
    if(page$el[0].selectPage){
      //todo
    }else{
      page$el.pagination(pagination.total, {
        link_to:'javascript:;',
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: this.changePageNum.bind(this),
        items_per_page: pagination.per_page, //每页显示10项
        prev_text: "前一页",
        next_text: "后一页"
      });
    }

  },
  changePageNum(pageNum){
    this.fetchArticleCommentList(this.urlParams.id,pageNum + 1);
  }
});
new App({
  el:document.body
});
