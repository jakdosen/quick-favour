const CTX = '/api'
const HOST = 'http://t13.zetadata.com.cn:8082'
const rootPath = `${HOST}${CTX}`
export default {
    //用户相关
    user:{
      login:``,
      logout:``,
      register:``,
    },
    //秒赞文章
    article:{
      list:`${rootPath}/article/tglist`,
      adList:`${rootPath}/article/home/cycleimage`,
    },
    //商城
    mall:{

    }
}
