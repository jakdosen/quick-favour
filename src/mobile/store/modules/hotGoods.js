/**
 * Created by shiyang.yao on 2017/11/22.
 */

import { suggestlist } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    cycleImage:[],
    sourceList:[],
    pagination:{},
    isLoading:true
  },
  actions: {
    suggestlist: async ({ commit , state  }, payload) =>{
      const res =await suggestlist(payload);
      const { data, meta, ads } = res;
      const {  pagination } = meta;
      if( pagination.current_page === 1){
        // 第一页的时候更新广告位
        commit('update',{cycleImage:ads.data});
      }
      commit('updateSourceList',data)
      commit('update',{pagination:pagination})
      commit('update', {isLoading: true});
    }
  },
  mutations: {
    update(state,payload){
      Object.assign(state,payload);
    },
    updateSourceList (state, payload) {
      state.sourceList = state.sourceList.concat(payload)
    }
  }
}
