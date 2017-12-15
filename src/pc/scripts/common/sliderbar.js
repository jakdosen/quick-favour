/**
 * Created by shiyang.yao on 2017/12/12.
 */
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import '@/styles/sliderbar.less'

const tmpl = `
  <div class="mz-sliderBar">
   <!--新建内容区 -->
   <div class="mz-sliderBar-content">
      <div class="mz-sliderBar-center">
         <ul>
           <li>
              <a href="" class="to-home"></a>
           </li>
           <li>
             <span class="iconfont icon-shopping-cart"></span>
             <span>购物车</span> 
             <b class="toAction">11</b>
           </li>
           <li>
              <span class="online-QQ"></span>
              <span class="online-phone">
                 <img src="" alt="">
                 <b style="display:none">15365577888</b>
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
     "click .online-phone":'onlinePhone'
   },
   initialize: function (options) {
     this.options =options;
     this.render();
   },
   onlineQQ(){

   },
   onlinePhone(){

   },
   render(){
      var  $box = $(_.template(tmpl)());
      this.setElement($box);
      $('.mz-sliderBar').length > 0 && $('.mz-sliderBar').remove();
      this.$el.appendTo(document.body);
   }
});

export  default  sliderBar;


