/**
 * Created by shiyang.yao on 2017/12/5.
 */
import '@/styles/register.less'
import '@/scripts/common/header'
import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import { register, sendCode } from '^/services/user'

const  VIEW = Backbone.View;
const  MODEL = Backbone.Model;

const App = VIEW.extend({
  events:{
    'click .mz-sendCode': 'sendStateCode',
    'keyup .account input': function (e) {
      this.inValid('account') && this.model.set('account',$(e.currentTarget).val());
    },
    'keyup .code input': function (e) {
      this.inValid('code') && this.model.set('code',$(e.currentTarget).val());
    },
    'keyup .passWord input': function (e) {
      this.inValid('password') && this.model.set('passWord',$(e.currentTarget).val());
    },
    'click .mz-btn-register':'register',
    "click .changeType":function (e) {
        var elem = $(e.currentTarget);
        elem.toggleClass('open')
      !elem.hasClass('open')
      && elem.siblings('input').attr('type','text')
      || elem.siblings('input').attr('type','password')
    }
  },
  initialize(){
     // 加载滑动验证
     this.loadVerify();
     // 新建model
     this.createModel();
  },
  createModel(){
      let Register = MODEL.extend({
        defaults: {
          "account":  "",
          "password":"",
          "code":""
        }
      });
      this.model = new Register();
  },
  loadVerify(){
      let _this =this;
        $.sliderVerification({
          callBack(){
            _this.$('input[name="isVerify"]').val('Success');
            _this.$('.verify-success').fadeIn();
          }
        });
  },
  inValid(key){
     var _this =this;
     return {
       account(){
          let elem = _this.$('.account'),value = $('input',elem).val();
          if(!!value && /^1(3|4|5|7|8)\d{9}$/.test(value)){
            elem.removeClass('error')
            return  true;
          }else{
             elem.addClass('error').data('error','请输入正确的手机号码格式')
             return  false;
          }
       },
       password(){
           let elem = _this.$('.password'),value = $('input',elem).val();
           if(!!value){
             elem.removeClass('error')
             return  true;
           }else{
             elem.addClass('error').data('error','请输入密码')
             return  false;
           }
       },
       code(){
         let elem = _this.$('.code'),value = $('input',elem).val();
         if(!!value){
           elem.removeClass('error')
           return  true;
         }else{
           elem.addClass('error').data('error','请输入验证码')
           return  false;
         }
       }
     }[key+'']();
  },
  sendStateCode(){
    let elem = this.$('.mz-sendCode'),text =elem.text();
    if(text !== '发送验证码') return;
    if(!this.inValid('account')) return;
    // 发送异步；
    sendCode({account:this.model.get('account')});
    let time = 59;
    const timeOut = ()=>{
      setTimeout(()=>{
        let nowTime = time--
        if(!nowTime){
          elem.html('发送验证码');
          return;
        }
        timeOut();
        elem.html(nowTime+'s');
      },1000);
    }
    timeOut();
  },
  register(){
     if(this.inValid('account')&&this.inValid('code')&&this.inValid('password')){
         debugger;
         register(this.model.toJSON()).then(function () {
              window.location.href="";
         })
     }
  }
});

new App({
  el:$('.register-page')
});
