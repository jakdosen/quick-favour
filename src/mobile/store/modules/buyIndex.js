/**
 * Created by shiyang.yao on 2017/11/22.
 */

import { homeCycleImage, suggestlist, list } from '^/services/mall'

export default {
  namespaced: true,
  state: {
    cycleImage: [],
    suggestlist:[],
    pagination:{}
  },
  actions: {
    cycleImage:async ({ commit }) =>{
        const res =await homeCycleImage();
      res.status===200 && commit('update',{cycleImage:res.data.datas})
    },
    suggestlist: async ({ commit , state  }, payload) =>{
         const res =await suggestlist(payload);
         if (res.status !=200) return;
         const { data, meta } = res.data.datas;
         const {  pagination } = meta;
         commit('updateSuggestlist',data)
         commit('update',{pagination:pagination})
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
