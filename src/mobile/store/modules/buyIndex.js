/**
 * Created by shiyang.yao on 2017/11/22.
 */

import { homeCycleImage, suggestlist, list } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    cycleImage: [],
    suggestlist:[],
    pagination:{},
    isLoading:true,
  },
  actions: {
    cycleImage:async ({ commit }) =>{
        const res =await homeCycleImage();
        const { data }=res;
        commit('update',{cycleImage:data})
    },
    suggestlist: async ({ commit , state  }, payload) =>{
         const res =await suggestlist(payload);
         const { data, meta } = res;
         const {  pagination } = meta;
         commit('updateSuggestlist',data)
         commit('update',{pagination:pagination})
         commit('update', {isLoading: true});
    }
  },
  mutations: {
    update(state,payload){
      Object.assign(state,payload);
    },
    updateUserPhone (state, payload) {
      state.userPhone = payload
    },
    updateUserPassWord (state, payload) {
      state.userPassWord = payload
    },
    updateSuggestlist (state, payload) {
      state.suggestlist = state.suggestlist.concat(payload)
    }
  }
}
