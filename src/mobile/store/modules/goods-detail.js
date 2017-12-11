/**
 * Created by shiyang.yao on 2017/12/11.
 */
import router from '@/router/index'
import { detail, rater } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    list:[],
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
      commit('update',{raterPagination:pagination});
      commit('update',{raterIsLoading:true});
    },
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
