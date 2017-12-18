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
      this.renderAd(data);
    })
  },
  //获取文章列表信息
  fetchArticleListData(){
    getList().then(({data})=>{
      this.dataBase = data.slice(0);
      this.renderArticleGroup(_.pluck(this.dataBase,'group'));
    })
  },
  renderAd(list){
    _.each(list,item=>{
      this.$('.js-slider-cot').append(
        this.template.ad({
          name:item.adv_name,
          link:item.adv_link,
          src:item.adv_code
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
    });
    this.$('img.lazy').lazyload({effect: "fadeIn"});
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
