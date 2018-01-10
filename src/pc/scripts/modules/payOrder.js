/**
 * Created by shiyang.yao on 2017/12/18.
 */
import '@/styles/payOrder.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import util from '^/utils'
import { orderPay } from '^/services/order'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;


const App = VIEW.extend({
  events:{
    'click .order-confirm a':'orderConfirm'
  },
  initialize(){
    // 传递搜索词
    this.urlParams  = util.urlArgs();
    // 获取数据并且渲染
    this.fetchDate(this.urlParams);
  },
  fetchDate({ order_ids }){
    orderPay({order_ids}).then(data=>{
         this.render(data);
     })
  },
  orderConfirm(){

  },
  render(data){
     this.$('.order-cart').empty().append(_.template($('#order').html())(data));
  }
});

new App({
  el:$('body')
});
