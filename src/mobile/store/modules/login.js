/**
 * Created by shiyang.yao on 2017/11/21.
 */
import * as axiosStore from 'store'
import router from '@/router/index'
import { login } from '^/services/user'

export default {
  namespaced: true,
  state: {
    userPhone: '',
    userPassWord:''
  },
  actions: {
    loginInto : async ({ commit ,state},payload) => {
       const res = await login(payload);
       const { api_token } = res;
       if(api_token){
         axiosStore.set('api_token',api_token);
         router.push({path:'/'});
       }
    }
  },
  mutations: {
    updateUserPhone (state, payload) {
      state.userPhone = payload
    },
    updateUserPassWord (state, payload) {
      state.userPassWord = payload
    }
  }
}
