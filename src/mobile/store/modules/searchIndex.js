/**
 * Created by shiyang.yao on 2017/11/24.
 */
import router from '@/router/index'
import { list } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    list2: ['综合', '现金商品', '现金&秒币', '秒币商品', '价格'],
    isLoading:false,
    pagination:{},
    sourceList:[],
    isLoadingPage:true
  },
  actions: {
    submitInto ({commit, state}) {
      router.push({'path': '/login'})
    },
    search: async ({commit, state},payload)=>{
        const res = await list(payload);
        const { data, meta } = res;
        const {  pagination } = meta;
        commit('update',{isLoading: false,pagination:pagination})
        commit('updateSourceList',data)
    },
    pageSearch : async ({commit, state},payload)=>{
      const res = await list(payload);
      const { data, meta } = res;
      const {  pagination } = meta;
      commit('updateSourceList',data)
      commit('update',{pagination:pagination})
      commit('update', {isLoadingPage: true});
    },
  },
  mutations: {
    update (state, payload) {
      Object.assign(state, payload);
    },
    updateSourceList(state, payload){
      state.sourceList = state.sourceList.concat(payload)
    }
  }
}
