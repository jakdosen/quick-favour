/**
 * Created by shiyang.yao on 2017/12/12.
 */
import '@/styles/hotGoods.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Swiper from '../libs/swiper/swiper'
import { homeCycleImage, suggestlist, list, category } from '^/services/mall'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;

const App = VIEW.extend({
  initialize(options){
     this.curPageNum = 1;
     // 请求接口
     this.payload = {action_type:options.type,count:12}
     // 获取数据
     this.fetchDate(true);
  },

  fetchDate(isLoading,page){
    suggestlist({...this.payload,page:page||1}).then(data => {
         // 渲染幻灯片
         isLoading && this.renderSlider(data.ads);
         // 渲染底部数据
         this.renderGoods(data.data);
         // 渲染分页
          isLoading &&this.initPagination(data.meta);
    });
  },
  renderSlider(data){
      this.$('.swiper-wrapper').empty().append(_.template(this.$('#ad-item-tpl').html())(data));
    let swiperOption = {
      pagination:this.$('.pagination-ga'),
      autoplay : 5000,
      speed:500,
      paginationClickable :true,
      loop : data.length<2 ? false : true,
    }
    data.length<2 && this.$('.pagination-ga').hide();
    new Swiper(this.$('.swiper-container'),swiperOption)
  },
  renderGoods(data){
    this.$('.select-content').empty().append(_.template(this.$('#ad-goods').html())(data));
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
    if(this.curPageNum == pageNum+1) return
    this.curPageNum = pageNum+1
    this.fetchDate(false,pageNum + 1);
  }
});

new App({
  el:$('body'),
  type:'hot'
});
