/**
 * Created by shiyang.yao on 2017/11/24.
 */
import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    searchWord: '',
    list2: ['综合', '现金商品', '现金&秒币', '秒币商品', '价格'],
    isLoading:false
  },
  actions: {
    submitInto ({commit, state}) {
      router.push({'path': '/login'})
    }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state, payload);
    },
  }
}
