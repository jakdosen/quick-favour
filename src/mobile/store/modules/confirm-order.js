/**
 * Created by shiyang.yao on 2017/11/21.
 */
import router from '@/router/index'
import {  checkorder, directcheckorder} from '^/services/mall'

export default {
  namespaced: true,
  state: {
    sourceList:{}
  },
  actions: {
    checkOrder : async ({commit,state},payload) =>{
       checkorder().then((data)=>{
           commit('update',{sourceList:data})
       })
    }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state,payload);
    }
  }
}
