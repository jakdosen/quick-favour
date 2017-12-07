/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/scripts/libs/swiper/swiper.less'
import '@/styles/article-list.less'
import $ from 'jquery'
import _ from 'underscore'
import {getList,getAd} from '^/services/article'
import {Model,Collection,View} from 'backbone'
import Swiper from '../libs/swiper/swiper'

/**
 * App
 */
let App = View.extend({
  template:{
    ad:_.template($('#ad-item-tpl').html()),
    article:_.template($("#article-item-tpl").html())
  },
  events:{
    'click .js-tab-item':'showArticleListByGroup'
  },
  initialize(){
    this.fetchAdListData();
    this.fetchArticleListData();
    this.dataBase = null;
    this.filter = new Model({
      dateName:null
    });
    this.articleList = new Collection();
    this.filter.bind('change:dateName',this.changeDateName,this);
    this.articleList.bind('reset',this.renderArticleList,this);
  },
  //获取广告信息
  fetchAdListData(){
    getAd().then(({data})=>{
      this.renderAd(data.datas);
    })
  },
  //获取文章列表信息
  fetchArticleListData(){
    getList().then(({data})=>{
      this.dataBase = data.datas.slice(0);
      this.renderArticleGroup(_.pluck(this.dataBase,'group'));
    })
  },
  renderAd(list){
    list.push({
        "id": 1,
        "position_id": 1,
        "ad_name": "首页广告1",
        "ad_link": "http://www.baidu.com",
        "ad_code": "http://img.ivsky.com/img/bizhi/slides/201711/16/thor_ragnark-010.jpg",
        "created_at": "1970-01-01"
      },
      {
        "id": 2,
        "position_id": 1,
        "ad_name": "首页广告2",
        "ad_link": "http://www.baidu.com",
        "ad_code": "http://www.adquan.com/adimages/1511936645065b9ef849bda63e.jpeg",
        "created_at": "1970-01-01"
      })
    _.each(list,item=>{
      this.$('.js-slider-cot').append(
        this.template.ad({
          name:item.ad_name,
          link:item.ad_link,
          src:item.ad_code
        })
      );
    });
    new Swiper(this.$('.swiper-container'),{
      pagination:this.$('.pagination-ga'),
      autoplay : 5000,
      speed:500,
      paginationClickable :true,
      loop : true,
    })
  },
  renderArticleGroup(group){
    _.each(group,name=>{
      this.$('.article-tab').append(`<a class="tab-item js-tab-item" data-name="${name}">${name}</a>`);
    })
    this.filter.set({
      dateName:group[0]
    });
  },
  renderArticleList(){
    this.$('.article-list').empty();
    this.articleList.each(article=>{
      this.$('.article-list').append(this.template.article(article.toJSON()))
    })
  },
  changeDateName(){
    let currentDateName = this.filter.get('dateName');
    this.$(`.js-tab-item.active`).removeClass('active');
    this.$(`.js-tab-item[data-name='${currentDateName}']`).addClass('active');
    let group = _.find(this.dataBase,item=>{
      return item.group == currentDateName
    });
    this.articleList.reset(group && group.list||[])

  },
  showArticleListByGroup(e){
    let dataName = $(e.currentTarget).data('name');
    this.filter.set({
      dateName:dataName
    });
  }
});
new App({
  el:document.body
});
