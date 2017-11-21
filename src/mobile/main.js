// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'


Vue.use(VueRouter)


FastClick.attach(document.body)

Vue.config.productionTip = false

// 配置loading
router.beforeEach(function (to, from, next) {
  store.commit('loadingStore/updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('loadingStore/updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
