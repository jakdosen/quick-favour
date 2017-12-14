/**
 * Created by shiyang.yao on 2017/11/21.
 */
import router from '@/router/index'
import { register, resetPassword, wx_bindPhone, sendCode } from '^/services/user'
import * as axiosStore from 'store'

export default {
  namespaced: true,
  state: {
    stateCodeSuggest:'发送验证码',
    isForgetPassWord: 'add',
    navTitle:{add:'注册',forget:'忘记密码',bindNoPhone:'绑定手机',bindPhone:'绑定手机'},
    btnTitle:{add:'提交',forget:'找回',bindNoPhone:'完成',bindPhone:'完成'}
  },
  actions: {
    register: async ({ commit ,state},payload) => {
      const res  =await register(payload)
      const { api_token } = res;
      if(api_token){
        axiosStore.set('api_token',api_token);
        router.push({path:'/'});
      }
    },
    resetPassword: async ({ commit ,state},payload) => {
      const res  =await resetPassword(payload)
      router.push({path:'/login'});
    },
    thirdRegister: async ({ commit ,state}) => {
      const res  =await wx_bindPhone(payload)
      const {  api_token } =res;
      if(api_token){
        axiosStore.set('api_token',api_token);
        router.push({path:'/'});
      }
    },
    sendCode: async ({ commit ,state},payload) => {
      await sendCode(payload)
    },
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
