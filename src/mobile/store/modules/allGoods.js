
/**
 * Created by shiyang.yao on 2017/11/22.
 */

import { category } from '^/services/mall'

export default {
  namespaced: true,
  state: {
     sourceList:[]
  },
  actions: {
    category: async ({ commit, state},payload)=>{
        const res = await category();
        commit('update',{sourceList:res});
    }
  },
  mutations: {
    update(state,payload){
      Object.assign(state,payload);
    }
  }
}
