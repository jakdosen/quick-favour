/**
 * Created by shiyang.yao on 2017/11/21.
 */
import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    userPhone: '',
    userNewPassWord:'',
    stateCode:'',
    stateCodeSuggest:'发送验证码',
    isForgetPassWord: 'add',
    navTitle:{add:'注册',forget:'忘记密码',bindNoPhone:'绑定手机',bindPhone:'绑定手机'},
    btnTitle:{add:'提交',forget:'找回',bindNoPhone:'完成',bindPhone:'完成'}
  },
  actions: {
    submitInto ({ commit ,state}) {
      console.log(state.userPhone + state.userNewPassWord + state.stateCode)
      router.push({'path': '/login'})
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
