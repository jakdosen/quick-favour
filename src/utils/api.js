const CTX = '/api'
// const HOST = 'http://t13.zetadata.com.cn'
const HOST = 'http://localhost:8082'
const rootPath = `${HOST}${CTX}`
export default {
    //秒赞文章
    article:{
      list:`${rootPath}/article/tglist`,
      adList:`${rootPath}/article/home/cycleimage`,
      //参数：article_id
      detail:`${rootPath}/article/detail`,
      //参数：article_id,page
      getComment:`${rootPath}/article/comment`,
      //参数：id_value,content
      addComment:`${rootPath}/article/comment/create`,
      shareCallback:`${rootPath}/article//share/callback`
    },
    //用户相关
    auth:{
      register:`${rootPath}/auth/register`,
      login:`${rootPath}/auth/login`,
      thirdRegister:`${rootPath}/auth/thirdRegister`,
      resetPassword:`${rootPath}/auth/resetPassword`,
      sendCode:`${rootPath}/auth/sendCode`,
      wx_bindPhone:`${rootPath}/auth/weChat/wx_bindPhone`,
      wx_signature:`${rootPath}/auth/weChat/wxSignature`
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
      create:`${rootPath}/cart/create`,
      cartList:`${rootPath}/cart/list`,
      cartDel:`${rootPath}/cart/delete`,
      cartUpdate:`${rootPath}/cart/update`,
      cartCheck:`${rootPath}/cart/checked`,
      checkorder:`${rootPath}/cart/checkorder`,
      directcheckorder:`${rootPath}/cart/directcheckorder`
    },
    // 订单相关的
    order :{
      done:`${rootPath}/order/done`,
      prepay:`${rootPath}/pay/prepay`,
      addressList:`${rootPath}/address/addressList`
    },
    // 地址相关
    // address:{
    //   addressList:`${rootPath}/address/addressList`
    // }
}
