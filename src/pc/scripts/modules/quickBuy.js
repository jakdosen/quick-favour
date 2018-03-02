/**
 * Created by shiyang.yao on 2017/12/7.
 */
import '@/styles/quickBuy.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Swiper from '../libs/swiper/swiper'
import { homeCycleImage, suggestlist, list, category } from '^/services/mall'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;

const
  searchTemplate =
    '<@ obj.length && _.each(obj,function(item){@>'+
    '<span><@-item@></span>'+
    '<@})@>';

const
    menuNav =
        '<@ obj.length && _.each(obj,function(item,index){@>'+
        '<@ if(item.cat_name) {@>'+
        '<li class="iconfont icon-arrow-right" data-flag="menu-<@- index @>"><@-item.cat_name@></li>'+
        '<@ } @>'+
        '<@})@>',
    menuContent=
      '<@ obj.length && _.each(obj,function(item,index){@>'+
      '<ul data-flag="menu-<@- index @>" style="display:none">'+
      '<@  item["children"] && item.children.length && _.each(item.children,function(child){@>'+
      '<li><a href="searchPage.html?keywords=<@- child.cat_name@>&category_id=<@- child.id@>">'+
      '<div class="img-box"><img src="<@- child.category_img@>" alt=""></div>'+
      '<span><@- child.cat_name@></span></a>'+
      '<@})@>'+
      '</ul>'+
      '<@})@>';

// 搜索模块
const Search = VIEW.extend({
  events:{
     'keyup .qb-search-content input':function (e) {
         this.model.set('keywords',$(e.currentTarget).val());
     },
     'click .qb-search-content span': 'searchMore',
     'click .qb-search-history span': 'doSearchHistory'
  },
  initialize(){
     // 注册model
     this.createModel();
     // 从本地存储里取出搜索历史
     this.searchHistory();
  },
  createModel(){
    this.model = new MODEL();
  },
  searchHistory(){
    let
      elem = this.$('.qb-search-history'),
      searchHistory = window.localStorage.getItem('searchHistory');
    elem.empty();
    elem.append(_.template(searchTemplate)(searchHistory&&searchHistory.split(',')||[]));
  },
  searchMore(){
     location.href="searchPage.html?keywords="+(this.model.get('keywords')||this.$('.qb-search-content input').val());
  },
  doSearchHistory(e){
    location.href="searchPage.html?keywords="+$(e.currentTarget).text();
  }
});

// 菜单模块
const Menu =   VIEW.extend({
  events:{
    'mouseover .qb-menu-detail-hide li': 'changeNav',
    'mouseleave .qb-menu-detail': 'hideContent'
  },
  initialize(){
    // 渲染首页幻灯列表
    this.fetchDateAboutCycleImage();
    // 获取数据&渲染列表
    this.fetchDate();
  },
  changeNav(e){
    let select = '  [data-flag="'+$(e.currentTarget).data('flag')+'"]'
    this.$('.qb-menu-detail-hide '+select).addClass('active').siblings().removeClass('active');
    this.$('.qb-menu-detail-show '+select).siblings().css('display','none');
    this.$('.qb-menu-detail-show '+select).fadeIn();
  },
  fetchDateAboutCycleImage(){
    homeCycleImage().then( data => {
      this.renderCycleImage(data.data)
    })
  },
  hideContent(){
    this.$('.qb-menu-detail-show ul').fadeOut();
    this.$('.qb-menu-detail-hide li').removeClass('active')
  },
  fetchDate(){
     category().then( data => {
          this.render(data)
     })
  },
  render(data){
     // 渲染菜单
     this.$('.qb-menu-detail-hide ul').empty().append(_.template(menuNav)(data));
     // 渲染菜单明细
     this.$('.qb-menu-detail-show').empty().append(_.template(menuContent)(data));
  },
  renderCycleImage(data){
    this.$('.js-slider-cot').empty().append(_.template($('#ad-item-tpl').html())(data));
    let swiperOption = {
      pagination:this.$('.pagination-ga'),
      autoplay : 5000,
      speed:500,
      paginationClickable :true,
      loop : true,
    }
    data.length<2 && this.$('.pagination-ga').hide();
    new Swiper(this.$('.swiper-container'),swiperOption)
  },
});

// 热门商品
const HotGoods = VIEW.extend({
  initialize(){
    // 获取数据&渲染列表
    this.fetchDate();
  },
  fetchDate(){
    suggestlist({action_type:'hot',count:6,page:1}).then(data =>{
            this.render(data)
    })
  },
  render(data){
     this.$('.qb-hot-goods-box').empty().append(_.template($('#ad-hot-goods').html())(data));
  }
})

// 秒币商城
const CoinStore = VIEW.extend({
  initialize(){
    // 获取数据&渲染列表
    this.fetchDate();
  },
  fetchDate(){
    suggestlist({action_type:'coin',count:6,page:1}).then(data =>{
      this.render(data)
    })
  },
  render(data){
    this.$('.qb-store-box').empty().append(_.template($('#ad-coin-store').html())(data));
  }
})

// 推荐商品
const Recommend = VIEW.extend({
  initialize(){
    // 建立分页model
    this.createModel()
     // 获取数据并且加载数据
    this.fetchDate();
  },
  createModel(){
    let Recommend = MODEL.extend({
      defaults:{
        action_type:'tuijian',
        count:8,
        page:1,
        total:1
      }
    });
     this.model = new Recommend();
  },
  fetchDate(){
    suggestlist(this.model.toJSON()).then(data =>{
      this.render(data)
      !this.reSlider&&this.model.set({total:data.meta.pagination.total_pages});
      //加载幻灯效果
      !this.reSlider && this.slider()
    })
  },
  slider(){
    let _this = this;
    _this.reSlider = new Swiper(this.$('.swiper-container'),{
      setWrapperSize:true,
      speed:1000,
    })
    $('.controlArrow .next').click(()=>{
      let  nowPage=_this.model.get('page'),nowIndex= Math.ceil((_this.reSlider.activeIndex+1)/2);
      if(  nowPage <= nowIndex && nowIndex<_this.model.get('total')){
        _this.model.set('page',nowPage+1)
        _this.fetchDate();
      }
      _this.reSlider.swipeNext()
    });
    $('.controlArrow .pre').click(()=>_this.reSlider.swipePrev());

    // _this.reSlider.on('slideChange',function(){
    //
    // })
  },
  render(data){
    let html = [];
    html.push( _.template($('#hot-recommend').html())(data.data.slice(0,4)));
    if(data.data.length>4){
      html.push( _.template($('#hot-recommend').html())(data.data.slice(4,8)));
    }
    !this.reSlider
    && html.map((item) => this.$('.recommend-slider').append(item))
    || html.map((item) =>  this.reSlider.appendSlide(item))
  }
});

const App = VIEW.extend({
  initialize(){
     this.bindView();
  },
  bindView(){
     // 绑定Search模块
     this.Search = new Search({
       el:$('.qb-search')
     });
    // 绑定菜单模块
    this.Menu = new Menu({
      el:$('.qb-menu')
    });
    // 绑定热门推荐
    this.recommend = new Recommend({
      el:$('.qb-recommend-goods')
    });
    setTimeout(()=>{
      // 绑定热门商品模块
      this.hotGoods = new HotGoods({
        el:$('.qb-hot-goods')
      });
      // 绑定秒币商城
      this.coinStore = new CoinStore({
        el:$('.qb-store')
      });
    },100)
  }
})

new App({
  el:$('body')
});
