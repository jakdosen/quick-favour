import Router from 'vue-router'
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve =>  require(['@/router/login/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/router/login/register'], resolve)
    }
  ]
})
