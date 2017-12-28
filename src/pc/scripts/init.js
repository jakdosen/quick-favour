/**
 * Created by Gavin.Li on 2017/12/6.
 */
import Promise from 'promise-polyfill';
import axios from 'axios'
import store from 'store'
import Backbone from 'backbone'
import _ from 'underscore'
import $ from 'jquery'
import toast from './libs/jquery-toast-plugin/jquery.toast'
import lazyload from './libs/jquery-lazyload-plugin/jquery.lazyload'
import pagination from './libs/jqyery-pagination-plugin/jquery.pagination'
import magnifier from './libs/goods-detail/magnifier'
import slideVerification from './libs/jquery-slideVerification-plugin/slideVerification'
import LoginDialog from '@/scripts/common/loginDialog'

//初始化加载样式文件
import '@/styles/login.less'
import '@/styles/loginDialog.less'
import './libs/jquery-toast-plugin/jquery.toast.less'
import '@/scripts/common/header'
//绑定toast 插件
toast($,window,document);
//绑定 lazyload 插件
lazyload($,window,document);
//绑定 pagination 插件
pagination($,window,document);
// 绑定商品详情页商品图片展示
magnifier($,window,document);
// 滑动验证
slideVerification($,window,document);

if (!window.Promise) {
  window.Promise = Promise;
}
// 全局对象 bus
let bus =  window.bus = {}
let events = bus.events =  _.extend({},Backbone.Events)
/**
 * checkIsLogin
 * 检测是否登录
 */
bus.checkIsLogin = ()=>{
  return store.get('user')
};
/**
 * showLoginPopup
 * 显示登录弹框
 */
bus.showLoginPopup = ()=>{
  //防止多个登录弹框
  if(!$('#common-login-popup-window').length){
    new LoginDialog()
  }
};

// --------------underscore 模板配置----------------
_.templateSettings = {
  evaluate: /<@([\s\S]+?)@>/g, interpolate: /<@=([\s\S]+?)@>/g, escape: /<@-([\s\S]+?)@>/g
};
// --------------axios 配置----------------
axios.defaults.timeout = 5000;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.get('user')) {
      if(config.method.toLowerCase() == 'get'){
        config.params['api_token'] = store.get('user').token;
      }
      if(config.method.toLowerCase() == 'post'){
        try{
          config.data.params['api_token'] = store.get('user').token;
        }catch (e){
          config.data['api_token'] = store.get('user').token;
        }
      }
      config.headers.Authorization = `token ${store.get('user').token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data && response.data.code === 200){
      return response.data.datas
    }else{
      let resp = response.data || {message:'未知错误'}
      $.toast({
        heading: '错误提示',
        text: resp.message,
        position: 'top-right',
        stack: false,
        icon: 'error'
      })
      return Promise.reject(resp)
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.remove('user')
          events.trigger("logout");
      }
    }
    return Promise.reject(error.response && error.response.data || error)
  });
