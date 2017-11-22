/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {
    swiperList:[],
    articleList:[]
  },
  actions: {
    fetchSwiperData ({ commit ,state}) {
      commit('fetchSwiperData',[
        {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/1.jpg',
          title: '送你一朵fua'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/2.jpg',
          title: '送你一辆车'
        }, {
          url: 'javascript:',
          img: 'https://static.vux.li/demo/5.jpg',
          title: '送你一次旅行',
          fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }
      ]);
    },
    fetchArticleData({ commit ,state}){
      commit('fetchArticleData',[
        {
          date:"今天",
          list:[{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://assets.servedby-buysellads.com/p/manage/asset/id/26626',
            likeNum:98
          },{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://assets.servedby-buysellads.com/p/manage/asset/id/26626',
            likeNum:98
          },{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://assets.servedby-buysellads.com/p/manage/asset/id/26626',
            likeNum:98
          }]
        },
        {
          date:"2011-10-1",
          list:[{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://static.vux.li/demo/2.jpg',
            likeNum:88
          }]
        },
        {
          date:"2011-10-2",
          list:[{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://static.vux.li/demo/2.jpg',
            likeNum:88
          }]
        },
        {
          date:"2011-10-3",
          list:[{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://static.vux.li/demo/2.jpg',
            likeNum:88
          }]
        },
        {
          date:"2011-10-4",
          list:[{
            id:2323,
            title:"sfsafsdf",
            desc:"flsfj fsdfsdf",
            img:'https://static.vux.li/demo/2.jpg',
            likeNum:88
          }]
        }
      ]);
    }
  },
  mutations: {
    fetchSwiperData(state, payload){
      state.swiperList = payload
    },
    fetchArticleData(state, payload){
      state.articleList = payload
    }
  }
}
