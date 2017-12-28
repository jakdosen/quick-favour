/**
 * Created by shiyang.yao on 2017/12/12.
 */
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import '@/styles/sliderbar.less'
import { getCartList } from '^/services/mall'

const tmpl = `
  <div class="mz-sliderBar">
   <!--新建内容区 -->
   <div class="mz-sliderBar-content">
      <div class="mz-sliderBar-center">
         <ul>
           <li>
              <a href="/article-list.html" class="to-home"></a>
           </li>
           <li>
             <a href="/mall-cart.html">
               <span class="iconfont icon-shopping-cart"></span>
               <span>购物车</span> 
               <b class="toAction">0</b>
             </a>
           </li>
           <li>
              <span class="online-QQ"></span>
              <span class="online-phone">
                 <img src="" alt="tel">
                 <b>15365577888</b>
             </span>
           </li>
         </ul>
      </div>
   </div>
  </div>
`
const sliderBar = Backbone.View.extend({
   events:{
     "click .online-QQ":'onlineQQ',
   },
   initialize: function (options) {
     this.options =options;
     this.render();
     // 获取当前购物车数据
     this.fetchDate()
   },
   onlineQQ(){

   },
   fetchDate(){
     getCartList().then( res =>{
         const { total } = res;
         this.addToMall(total.goods_count);
     })
   },
   addToMall(num){
      let elem = this.$('.toAction');
      elem.text(Number(elem.text())+Number(num));
   },
   render(){
      let  $box = $(_.template(tmpl)());
      this.setElement($box);
      $('.mz-sliderBar').length > 0 && $('.mz-sliderBar').remove();
      this.$el.appendTo(document.body);
   }
});

export  default  sliderBar;


