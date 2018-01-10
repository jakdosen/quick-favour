/**
 * Created by shiyang.yao on 2017/12/5.
 */
import '@/styles/loginDialog.less'
import Dialog from '@/scripts/common/dialog'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import { login, userInfo } from '^/services/user'
import store from 'store'

const  MODEL = Backbone.Model;

const tmpl = `
<!--弹框登录-->
<div class="mz-c-login" id="common-login-popup-window">
  <div class="logo-img">
     <span>秒赞</span>
  </div>
  <!--用户-->
  <div class="form-group">
    <label>用户名</label>
    <div class="mz-input account" data-error="只能输入11位手机号">
      <input type="text" placeholder="请输入11位手机号码">
    </div>
  </div>
  <!--密码-->
  <div class="form-group">
    <label>密&nbsp;&nbsp;码</label>
    <div class="mz-input password" data-error="输入密码">
      <input type="passWord" placeholder="输入密码">
    </div>
  </div>
  <a class="mz-btn-register toLogin" href="javascript:;">登录</a>
  <p><span>没有账号？<a href="/register.html">立即注册</a></span><a href="/accountSafe.html">忘记密码</a></p>
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

const Login = Dialog.extend({
  events:{
    'keyup .account input': function (e) {
      this.inValid('account') && this.model.set('account',$(e.currentTarget).val());
    },
    'keyup .password input': function (e) {
      this.inValid('password') && this.model.set('password',$(e.currentTarget).val());
    },
    'click .toLogin': 'toLogin'
  },
  initialize(options){
    this.constructor.__super__.initialize.apply(this, arguments);
    //合并父类的events
    if (this.constructor.prototype.events) {
      this.events = $.extend( true,{},this.constructor.__super__.events,this.events);
      this.delegateEvents();
    }
    // 新建model
    this.createModel();
    // 渲染Dom
    this.render();
    // options 有个callBack方法，用来表示登录后操作
    this.options = options;
  },
  createModel(){
    let login = MODEL.extend({
      defaults: {
        "account":  "",
        "password":""
      }
    });
    this.model = new login();
  },
  inValid(key){
    var _this =this;
    return {
      account(){
        let elem = _this.$('.mz-c-login .account'),value = $('input',elem).val();
        if(!!value && /^1(3|4|5|7|8)\d{9}$/.test(value)){
          elem.removeClass('error')
          return  true;
        }else{
          elem.addClass('error').data('error','请输入正确的手机号码格式')
          return  false;
        }
      },
      password(){
        let elem = _this.$('.mz-c-login .password'),value = $('input',elem).val();
        if(!!value){
          elem.removeClass('error')
          return  true;
        }else{
          elem.addClass('error').data('error','请输入密码')
          return  false;
        }
      }
    }[key+'']();
  },
  toLogin(){
    let _this = this;
    login (_this.model.toJSON()).then( res => {
      const { api_token } = res;
      if(api_token){
        store.set('user',{token:api_token});
        userInfo().then(data =>{
          const { account, nickname, avatar, fund, api_token} = data;
          store.set('user',{token:api_token,account,nickname,avatar,fund});
          if(!!_this.options.callBack){
            _this.options.callBack()
          }else{
            window.location.reload();
          }
        });
      }
    });
  },
  content(){
      return  _.template(tmpl)();
  }
});

export default Login;
