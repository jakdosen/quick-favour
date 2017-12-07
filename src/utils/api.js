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
      //参数：article_id
      detail:`${rootPath}/article/detail`,
      //参数：article_id,page
      comment:`${rootPath}/article/comment`
    },
    //商城
    mall:{

    }
}
