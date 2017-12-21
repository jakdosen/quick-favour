/**
 * Created by shiyang.yao on 2017/12/18.
 */
import '@/styles/payOrder.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Swiper from 'swiper'
import util from '^/utils'
import { order } from '^/services/order'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;


const App = VIEW.extend({
  initialize(){
    // 传递搜索词
    this.urlParams  = util.urlArgs();
    // 获取数据并且渲染
    this.fetchDate(this.urlParams);
  },
  fetchDate({ order_ids }){
     order({order_ids}).then(data=>{
         this.render(data);
     })
  },
  render(data){
     this.$('.order-cart').empty().append(_.template($('#order').html())(data));
  }
});

new App({
  el:$('body')
});
