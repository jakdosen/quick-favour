/**
 * Created by shiyang.yao on 2017/11/21.
 */
export default {
  namespaced: true,
  state: {
    userPhone: '',
    userNewPassWord:'',
    stateCode:'',
    stateCodeSuggest:'发送验证码',
    isForgetPassWord: false
  },
  actions: {
    submitInto ({ commit ,state}) {
      console.log(state.userPhone + state.userNewPassWord + state.stateCode)
      // context.commit('increment')
    }
  },
  mutations: {
    updateCommon (state, payload) {
       Object.assign(state,payload);
    },
    updateSendStateCode (state, payload) {
      state.stateCodeSuggest = payload
    }
  }
}
