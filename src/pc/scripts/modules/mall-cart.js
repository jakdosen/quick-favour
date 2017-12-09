/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/login.less'
import '@/styles/loginDialog.less'
import '@/styles/mall-cart.less'
import $ from 'jquery'
import _ from 'underscore'
import {getCartList} from '^/services/mall'
import {Model,Collection,View} from 'backbone'
let bus = window.bus;
/**
 * App
 */
let App = View.extend({
  initialize(){
/*    if(!bus.checkIsLogin()){
      bus.showLoginPopup();
      return this
    }*/

  },
  fetchCartListData(){
    getCartList().then((data)=>{
      this.dataBase = data.slice(0);
      this.renderArticleGroup(_.pluck(this.dataBase,'group'));
    })
  },
  renderCartList(){
    this.$('.article-list').empty();
    this.articleList.each(article=>{
      this.$('.article-list').append(this.template.article(article.toJSON()))
    })
  }
});
new App({
  el:document.body
});
