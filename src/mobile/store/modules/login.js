/**
 * Created by shiyang.yao on 2017/11/21.
 */
export default {
  namespaced: true,
  state: {
    userPhone: '',
    userPassWord:''
  },
  actions: {
    loginInto ({ commit ,state}) {
      console.log(state.userPhone + state.userPassWord)
      // context.commit('increment')
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
