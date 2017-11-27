/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {

  },
  actions: {
    //获取购物车列表
    fetchCartList ({ commit ,state},params) {
      //todo
      commit('fetchCartList',{});
    },
    //结算
    checkOut:function () {

    }
  },
  mutations: {
    fetchCartList(state, payload){
      Object.assign(state.article,payload)
    }
  }
}
