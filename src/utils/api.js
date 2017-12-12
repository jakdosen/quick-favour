const CTX = '/api'
const HOST = 'http://t13.zetadata.com.cn:8082'
const rootPath = `${HOST}${CTX}`
export default {
    //秒赞文章
    article:{
      list:`${rootPath}/article/tglist`,
      adList:`${rootPath}/article/home/cycleimage`,
      //参数：article_id
      detail:`${rootPath}/article/detail`,
      //参数：article_id,page
      comment:`${rootPath}/article/comment`
    },
    //用户相关
    auth:{
      register:`${rootPath}/auth/register`,
      login:`${rootPath}/auth/login`,
      thirdRegister:`${rootPath}/auth/thirdRegister`,
      resetPassword:`${rootPath}/auth/resetPassword`
    },
    //商城相关
    mall:{
      homeCycleImage:`${rootPath}/goods/home/cycleimage`,
      search:`${rootPath}/goods/search`,
      suggestlist:`${rootPath}/goods/suggestlist`,
      list:`${rootPath}/goods/list`,
      category:`${rootPath}/goods/category`,
      detail:`${rootPath}/goods/detail`,
      rater:`${rootPath}/goods/commentlist`,
      /*购物车*/
      cartList:`${rootPath}/cart/list`,
      cartDel:`${rootPath}/cart/delete`,
      cartUpdate:`${rootPath}/cart/update`,
      cartCheck:`${rootPath}/cart/checked`,
    },
    // 地址相关
    address:{
      addressList:`${rootPath}/address/addressList`
    }
}
