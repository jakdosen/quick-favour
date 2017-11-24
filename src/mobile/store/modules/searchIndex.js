/**
 * Created by shiyang.yao on 2017/11/24.
 */
import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    searchWord: '',
    list2: ['综合', '现金商品', '现金&秒币', '秒币商品', '价格']
  },
  actions: {
    submitInto ({commit, state}) {
      console.log(state.userPhone + state.userNewPassWord + state.stateCode)
      router.push({'path': '/login'})
    }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state,payload);
    },
  }
}
