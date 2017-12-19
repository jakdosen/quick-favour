import Router from 'vue-router'
export default new Router({
  // mode: 'history',
  routes: [
    // 404页面
    {
      path:'*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'main',
      component: resolve => require(['@/router/main'], resolve),
      children:[
        {
          path:'(article)*',
          component:resolve =>  require(['@/router/main/article'], resolve),
          children:[
            {
              path:'',
              component:resolve =>  require(['@/router/main/article/list'], resolve),
            },

          ]
        },
				{
					path:'/article/rule',
					component:resolve =>  require(['@/router/main/article/rule'], resolve),
				},
        {
          path:'mall',
          component:resolve =>  require(['@/router/quickBuy'], resolve)
        },
        //购物车
        {
            path:'/mall/cart',
            component:resolve =>  require(['@/router/quickBuy/cart.vue'], resolve)
        },
        //订单
        {
            path:'/mall/order',
            component:resolve =>  require(['@/router/quickBuy/order.vue'], resolve)
        },
        //秒杀
        {
          path:'quick',
          component:resolve =>  require(['@/router/main/building'], resolve)
        },
        //秒筹
        {
          path:'raise',
          component:resolve =>  require(['@/router/main/building'], resolve)
        },
      ]
    },
    //文章详情独立
    {
      path:'/article/detail/:articleId',
      component:resolve =>  require(['@/router/main/article/detail'], resolve),
    },
    {
      path:'/article/detail/:articleId/note',
      name:'article-detail-note',
      component:resolve =>  require(['@/router/main/article/detail-note'], resolve),
    },
    // 登录页面
    {
      path: '/login',
      component: resolve =>  require(['@/router/login/login'], resolve)
    },
    // 注册页面
    {
      path: '/register',
      component: resolve => require(['@/router/login/register'], resolve)
    },
    // 搜索页面
    {
      path: '/search',
      component: resolve => require(['@/router/quickBuy/searchIndex'], resolve)
    },
    // 热门商品
    {
      path: '/hot',
      component: resolve => require(['@/router/quickBuy/hotGoods'], resolve)
    },
    // 秒购商城
    {
      path: '/quickMall',
      component: resolve => require(['@/router/quickBuy/quickMoney'], resolve)
    },
    // 全部商品
    {
      path: '/all',
      component: resolve => require(['@/router/quickBuy/allGoods'], resolve)
    },
    // 产品列表
    {
      path: '/goods/:id',
      component: resolve => require(['@/router/goodsDetail'], resolve),
      children:[
        {
          path:'(index)*',
          component:resolve =>  require(['@/router/goodsDetail/home'], resolve),
        },
        // 产品更多评论
        {
          path:'rater',
          component:resolve =>  require(['@/router/goodsDetail/rater'], resolve)
        }
      ]
    },
    // 确认订单
    {
      path: '/submitOrder',
      component: resolve => require(['@/router/order'], resolve)
    },
    // 支付订单
    {
      path: '/confirmOrder',
      component: resolve => require(['@/router/order/confirmOrder'], resolve)
    },
    // 确认订单中-地址选择
    {
      path: '/choseAddress',
      component: resolve => require(['@/router/order/choseAddress'], resolve)
    },
    // 订单支付成功
    {
      path: '/payOrderSuccess',
      component: resolve => require(['@/router/order/payOrderSuccess'], resolve)
    }
  ]
})
