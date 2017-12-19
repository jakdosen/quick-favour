/**
 * Created by shiyang.yao on 2017/12/6.
 */
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import '@/styles/dialog.less'

const tmpl = `
  <div class="mz-dialog" style="display: none">
   <!--新建mask蒙层 -->
   <div class="mz-mask"></div>
   <!--新建内容区域-->
   <div class="mz-mask-content">
    <div class="clearfix" style="margin-top: -50%;margin-left: -50%;padding:40px 20px;background: #fff">
     <div class="mz-mask-content-header hide">
        <span class="title"><@- obj.title@></span>
        <span class="close">×</span>
     </div>
     <div class="mz-mask-content-body"></div>
     <div class="mz-mask-content-footer hide"></div>
    </div>
   </div>
  </div>
`

const Dialog = Backbone.View.extend({
  events: {
    "click .close": "close",
    "click .mz-mask":"close"
  },
  initialize: function (options) {
    this.render();
  },
  footer(){
     return  false;
  },
  close(){
    $('.mz-dialog').remove();
  },
  content(){
    return  false;
  },
  render: function () {
    var
      options = this.options,
      title = { title : this.title||''},
      $box = $(_.template(tmpl)(title));
    this.setElement($box);
    $('.mz-dialog').length > 0 && $('.mz-dialog').remove();
    this.$el.appendTo(document.body);
    this.title && this.$('.mz-mask-content-header').removeClass('hide');
    this.footer() && this.$('.mz-mask-content-footer').removeClass('hide').html(this.footer);
    this.$('.mz-mask-content-body').html(this.content());
    this.$el.show()
  }
})

export default Dialog;
