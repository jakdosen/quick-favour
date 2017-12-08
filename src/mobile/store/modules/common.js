/**
 * Created by shiyang.yao on 2017/11/20.
 */
import router from '@/router/index'
export default {
  namespaced: true,
  state: {
    isLoading: false,
    direction: 'forward'
  },
  actions:{
    toLogin ({ commit ,state},payload) {
      router.push({'path': '/login',query:payload})
    }
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
}
