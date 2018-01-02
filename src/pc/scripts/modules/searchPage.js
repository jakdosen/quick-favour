/**
 * Created by shiyang.yao on 2017/12/21.
 */
import '@/styles/hotGoods.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Swiper from 'swiper'
import util from '^/utils'
import { list } from '^/services/mall'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;

const
  searchTemplate =
    '<@ obj.length && _.each(obj,function(item){@>'+
    '<span><@-item@></span>'+
    '<@})@>';

// 搜索模块
const Search = VIEW.extend({
  events:{
    'keyup .qb-search-content input':function (e) {
      this.model.set('keywords',$(e.currentTarget).val());
    },
    'click .qb-search-history span':'searchWord',
    'click .qb-search-content span': 'search',
    'click .select-nav li':'sortSearch'
  },
  initialize(options){
    this.options = options;
    this.goodList = null;
    // 注册model
    this.createModel();
    // 从本地存储里取出搜索历史
    this.searchHistory();
    // 首页开始搜索
    this.search();
  },
  createModel(){
    let Model = MODEL.extend({
      defaults:{
        keywords:'',
        category_id:'',
        goods_type:'',
        sort_by:'price_desc',
        count:12,
        page:1
      }
    });
    this.model = new Model();
    this.options.keywords && this.model.set({keywords:this.options.keywords,category_id:this.options.category_id});
    this.$('input[name="search"]').val(this.options.keywords);
  },
  searchHistory(){
    let
      elem = this.$('.qb-search-history'),
      searchHistory = window.localStorage.getItem('searchHistory')||'';
    elem.empty().append(_.template(searchTemplate)(searchHistory&&searchHistory.split(',')||[]));
  },
  search(){
    list(this.model.toJSON()).then(data=>{
         // 存搜索词
         let
             history = window.localStorage.getItem('searchHistory')||'',
             oldSearch = history.split(',')||[],
             keyWord = this.model.get('keywords');
         if(!~oldSearch.indexOf(keyWord)){
           oldSearch.unshift(keyWord);
           window.localStorage.setItem('searchHistory',oldSearch.slice(0,10).join(','))
         }
         this.goodList = new GoodList({
            model: this.model,
            el:$('body'),
            data:data
         })
    });
  },
  searchWord(e){
    let val = $(e.currentTarget).text();
    this.$('input[name="search"]').val(val);
    this.model.set('keywords',val);
    this.search();
  },
  sortSearch(e){
    let $elem= $(e.currentTarget);
    $elem.addClass('active').siblings().removeClass('active');
    this.model.set(
      {goods_type:String($elem.data('goodstype'))||this.model.get('goods_type'),
      sort_by:$elem.data('sortby')||'price_desc'});
    this.search();
  }
});

// 底部搜索模块
const GoodList= VIEW.extend({
  initialize(options){
     this.options = options;
      // 渲染列表
      this.render(this.options.data.data);
      this.curPageNum = 1;
      //渲染分页
      this.initPagination(this.options.data.meta)
  },
  fetchDate(page){
    list({...this.model.toJSON(),page}).then(data=>{
         this.render(data.data);
    });
  },
  render(data){
     this.$('.select-content').empty().append(_.template($('#ad-goods').html())(data));
  },
  initPagination({pagination}){
    let page$el = this.$('.js-pagination');
      page$el.unbind();
      page$el.pagination(pagination.total, {
        link_to:'javascript:;',
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: this.changePageNum.bind(this),
        items_per_page: pagination.per_page, //每页显示10项
        prev_text: "前一页",
        next_text: "后一页"
      });
  },
  changePageNum(pageNum){
    if(this.curPageNum == pageNum+1) return
    this.curPageNum = pageNum+1
    this.fetchDate(pageNum + 1);
  }
});

const App =  VIEW.extend({
  initialize(){
    // 传递搜索词
     this.urlParams  = util.urlArgs();
     // 绑定VIew
     this.setView();
  },
  setView(){
     // 处理搜索模块
     this.search = new Search({
        el:$('body'),
        keywords: this.urlParams.keywords,
        category_id: this.urlParams.category_id || ''
     });
  }
});

new App({
  el:$('body')
});
