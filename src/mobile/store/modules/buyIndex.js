/**
 * Created by shiyang.yao on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {
    dataSource: [{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg' }, { url: 'javascript:', img: 'https://static.vux.li/demo/5.jpg', fallbackImg: 'https://static.vux.li/demo/3.jpg' }]
  },
  actions: {

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
