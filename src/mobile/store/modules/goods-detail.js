/**
 * Created by shiyang.yao on 2017/12/11.
 */
import router from '@/router/index'
import { detail, rater,create, directcheckorder } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    list:[],
    popupShowOpen:false,
    popupShowButton:0, //0表示显示两个按钮 1表示显示加入购物车，2表示显示立即购买
    selectSpec:[],
    raterData:[],
    raterPagination:[],
    raterCommentsCount:[],
    raterIsLoading:true
  },
  actions: {
    search: async ({commit, state},payload)=>{
      const res = await detail(payload);
       commit('update',{list:res});
    },
    raterList: async ({commit, state},payload)=>{
      const res = await rater(payload);
      const {data, meta, commentsCount} = res;
      const { pagination } = meta;
      if(pagination.current_page === 1){
        commit('update',{raterCommentsCount:commentsCount});
      }
      commit('updateRaterData',data);
      commit('update',{raterPagination:pagination,raterIsLoading:true});
    },
    create: async ({commit, state},payload)=>{
      const res = await create(payload);
       commit('update',{popupShowOpen:false,popupShowButton:0})
       router.push({path: '/mall/cart'});
    },
    // toSubmitOrder: async ({commit, state},payload)=>{
    //   const res = await directcheckorder(payload);
    //   router.push({path: '/submitOrder'});
    // }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state, payload);
    },
    updateRaterData (state, payload) {
      state.raterData = state.raterData.concat(payload)
    }
  }
}
