/**
 * Created by shiyang.yao on 2017/12/5.
 */
import '@/styles/loginDialog.less'
import Dialog from '@/scripts/common/dialog'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'

const tmpl = `
<!--弹框登录-->
<div class="mz-c-login" id="common-login-popup-window">
  <!--用户-->
  <div class="form-group">
    <label>用户名</label>
    <div class="mz-input" data-error="只能输入11位手机号">
      <input type="text" placeholder="请输入11位手机号码">
    </div>
  </div>
  <!--密码-->
  <div class="form-group">
    <label>密&nbsp;&nbsp;码</label>
    <div class="mz-input" data-error="只能输入11位手机号">
      <input type="text" placeholder="请输入11位手机号码">
    </div>
  </div>
  <a class="mz-btn-register" href="javascript:;">注册</a>
  <p><span>没有账号？<a href="javascript:;">立即注册</a></span><a href="javascript:;">忘记密码</a></p>
  <div class="mz-login-others">
    <fieldset>
      <legend align="center">使用第三方登录</legend>
    </fieldset>
    <div class="mz-login-others-link">
        <a href=""></a>
        <a href=""></a>
    </div>
  </div>
</div>
`

const login = Dialog.extend({
  events:{

  },
  initialize(){
    this.constructor.__super__.initialize.apply(this, arguments);
    //合并父类的events
    if (this.constructor.prototype.events) {
      this.events = $.extend( true,{},this.constructor.__super__.events,this.events);
      this.delegateEvents();
    }
    this.render()
  },
  content(){
      return  _.template(tmpl)();
  }
});

export default login;
