import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: (resolve) =>{
        require(['@/components/HelloWorld'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) =>{
        require(['@/router/login/login'], resolve)
      }
    }
  ]
})
