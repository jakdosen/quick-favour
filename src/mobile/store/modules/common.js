/**
 * Created by shiyang.yao on 2017/11/20.
 */
import router from '@/router/index'
import * as axiosStore from 'store'
export default {
  namespaced: true,
  state: {
    isLoading: false,
    direction: 'forward',
    isLogin:!!axiosStore.get('api_token')
  },
  actions:{
    toLogin ({ commit ,state},payload) {
      axiosStore.remove('api_token');
      commit('updateLoginStatus',false)
      router.push({'path': '/login',query:payload})
    },
    // //登陆成功设置
    loginSuccess({ commit ,state},params){
      commit('updateLoginStatus',true)
      axiosStore.set('api_token',params)
    }
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateLoginStatus(state,payload){
      state.isLoading = payload
    }
  }
}
