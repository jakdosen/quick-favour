import Router from 'vue-router'
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: resolve => require(['@/router/main'], resolve),
      children:[
        {
          path:'(article)*',
          component:resolve =>  require(['@/router/main/article'], resolve)
        },
        {
          path:'mall',
          component:resolve =>  require(['@/router/main/mall'], resolve)
        }
      ]
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
