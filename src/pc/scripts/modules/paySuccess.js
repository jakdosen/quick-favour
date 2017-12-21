/**
 * Created by shiyang.yao on 2017/12/19.
 */
import '@/styles/paySuccess.less'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import Swiper from 'swiper'
import util from '^/utils'
import { success } from '^/services/order'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;

new sliderBar();


const App = VIEW.extend({
  initialize(){
    // 传递搜索词
    this.urlParams  = util.urlArgs();
    // 获取数据并且渲染
    this.fetchDate(this.urlParams);
  },
  fetchDate({ payment_id }){
    success({ payment_id }).then(data=>{
      this.$('.pay-order-info span').text('￥'+data.order_amount);
      this.render(data);
    })
  },
  render({ address }){
    this.$('.pay-order-user-info').empty().append(_.template($('#address').html())(address));
  }
});

new App({
  el:$('body')
});
