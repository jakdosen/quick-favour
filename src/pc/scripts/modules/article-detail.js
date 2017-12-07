/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/scripts/libs/social-share/css/share.less'
import '@/styles/article-detail.less'
import '@/scripts/libs/social-share/js/social-share'
import '@/scripts/libs/social-share/js/qrcode'
import $ from 'jquery'
import _ from 'underscore'
import util from '^/utils'
import {getDetail} from '^/services/article'
import {Model,Collection,View} from 'backbone'

/**
 * App
 */
let App = View.extend({
  initialize(){
    this.fetchArticleData();

  },
  //获取文章列表信息
  fetchArticleData(){
    let search = util.urlArgs();
    if(!search.id) return
    getDetail({
      article_id:search.id
    }).then(({data})=>{
      console.log(data.datas);

    })
  },
});
new App({
  el:document.body
});
