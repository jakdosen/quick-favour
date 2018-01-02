/**
 * Created by shiyang.yao on 2017/12/6.
 */
import login from '@/scripts/common/loginDialog';
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import store from 'store'
import { unReadNotic } from '^/services/user'
import { getCartList } from '^/services/mall'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;


const  Header = VIEW.extend({
  events:{
    'click #toLogin':'toLogin',
    'click .outLogin':'logout'
  },
  initialize(options){
     this.options = options;
     this.bus = window.bus;
     // 渲染用户信息
     this.render();
     // 用来区别是否获取用户消息树
     if(!this.bus.checkIsLogin()) return;
     // 渲染用户消息数
     this.renderMessage();
     // 渲染购物车数量
     this.renderCart();
     // 注册改变购物车事件；
     this.bus.events.on('add:cart',this.addListener,this);
  },
  toLogin(){
     new login();
  },
  logout(){
     this.bus.events.trigger('logout');
  },
  render(){
    if(!this.bus.checkIsLogin()){
        this.$('.waitLoad').show();
        return;
    }
    this.$('.getLoadInfo .loaded').empty()
      .append(_.template($('#tpl-login').html())(store.get('user')));
    this.$('.getLoadInfo').show()
  },
  renderMessage(){
    unReadNotic().then(res =>{
        this.$('.getLoadInfo .message b').text(res.notice_num||0);
    })
  },
  renderCart(){
    getCartList().then( res =>{
      const { total } = res;
      this.addListener(total.goods_count||0);
    })
  },
  addListener(num){
    let elem = this.$('.header-tip-num');
    elem.text(Number(elem.text())+Number(num));
  }
});

export  default  Header;
