/**
 * Created by shiyang.yao on 2017/11/20.
 */
export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
}
