// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import permission  from './permission'
import axios from 'axios'
import * as axiosStore from 'store'

Vue.use(VueRouter)
Vue.use(Vuex)
import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin,  DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
import Promise from "promise-polyfill";
// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})
// plugins
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
// Vue.use(BusPlugin)
Vue.use(DatetimePlugin)
Vue.use(CloseDialogsPlugin, router)
sync(store, router)
FastClick.attach(document.body)

Vue.config.productionTip = false
const history = window.sessionStorage
history.clear();
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
// 假设api_token=任意一个数
// axiosStore.set('api_token','18068017185');
let initApiToken = (window.location.search.match(/api_token=([^=&]+)/)||[]);
initApiToken[1] && axiosStore.set('api_token',initApiToken[1]);
axios.defaults.timeout = 10000;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //防止缓存
    if(config.method.toLowerCase() == 'get'){
      config.params['r'] = Math.floor(Date.now()/30000) * 30000;
    }
    if (axiosStore.get('api_token')) {
      if(config.method.toLowerCase() == 'get'){
        config.params['api_token'] = axiosStore.get('api_token');
      }
      if(config.method.toLowerCase() == 'post'){
        try{
          config.data.params['api_token'] = axiosStore.get('api_token');
        }catch (e){
          config.data['api_token'] = axiosStore.get('api_token');
        }
      }
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
      Vue.$vux.toast.text(response.data.message);
      return Promise.reject(response.data || {message:'未知错误'})
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status||error.response.code) {
        case 203||'203':
          store.dispatch('common/toLogin')
      }
    }
    return Promise.reject(error.message)
  });

// 配置loading
router.beforeEach(function (to, from, next) {
  // 取出api_token 对象
  to.query['api_token'] && axiosStore.set('api_token',to.query['api_token'])
  // 需要控制权限，并且没有token值
  if(!!~permission.perPath.indexOf(String(to.path))&& !axiosStore.get('api_token')){
    store.dispatch('common/toLogin',{callback:to.path});
    return;
  }
  store.commit('common/updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('common/updateDirection', {direction: 'forward'})
    } else {
      store.commit('common/updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('common/updateDirection', {direction: 'forward'})
  }
  next()
})

router.afterEach(function (to) {
  store.commit('common/updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
