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
          component:resolve =>  require(['@/router/quickBuy/buyIndex'], resolve)
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
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/router/quickBuy/search/searchIndex'], resolve)
    },
    {
      path: '/hot',
      name: 'hot',
      component: resolve => require(['@/router/quickBuy/hotGoods/hotGoods'], resolve)
    },
    {
      path: '/quick',
      name: 'quick',
      component: resolve => require(['@/router/quickBuy/quickMoney/quickMoney'], resolve)
    },
    {
      path: '/all',
      name: 'all',
      component: resolve => require(['@/router/quickBuy/allGoods/allGoods'], resolve)
    }
  ]
})
