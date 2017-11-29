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

Vue.use(VueRouter)
Vue.use(Vuex)
import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin,  DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'
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
// 配置loading
router.beforeEach(function (to, from, next) {
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
