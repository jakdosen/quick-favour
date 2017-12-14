/**
 * Created by shiyang.yao on 2017/11/21.
 */
import router from '@/router/index'
import {  checkorder, directcheckorder} from '^/services/mall'
import {  done, prepay, addressList } from '^/services/order'

export default {
  namespaced: true,
  state: {
    goods_list:{},
    trueCash:'', //实际应要付的价格
    user_account:{
      run_money: "0.00",
      m_coin: 0,
      can_use_run_money: "0.00",
      can_use_m_coin: 0
    },
    cash_pay:{
      cash_total: 60.01
    },
    cashcoin_pay:{
      cash_total: "40.00",
      coin_total: 120030
    },
    user_address: null,
    nowSelectAddressId:"",
    addressList:[]
  },
  actions: {
    checkOrder : async ({commit,state},payload) =>{
       if(!payload['cart_id'] && !payload['buyNow']){
         return;
       }
       let res;
       if(payload['buyNow']){
         // 是立即购买时候的状态
         const { buyNow, ...others} =payload;
         res = await directcheckorder(others);
         router.push({path:'/'});
       }else{
         // 根据购物车加载
         res = await checkorder(payload);
       }
       const { goods_list,user_account, cash_pay, cashcoin_pay, user_address} = res;
       let addressCount = user_address;
       if(state.nowSelectAddressId&&state.addressList.length){
         addressCount = state.addressList.filter(obj => obj.id=== state.nowSelectAddressId)
       }
       commit('update',{ goods_list, user_account, cash_pay, cashcoin_pay,user_address:addressCount});
    },
    submitOrder:async ({commit,state},payload) =>{
      const res = await done(payload);
      const { order_ids } = res;
      router.push({path:'/confirmOrder',query:{order_ids}})
    },
    prepay:async ({commit,state},payload) =>{
      const res = await prepay(payload);
      const { payment_id } = res;
      router.push({path:'/payOrderSuccess',query:{payment_id}})
    },
    addressListFn:async ({commit,state},payload) =>{
      const res = await addressList(payload);
      const { data } = res;
      commit('update',{addressList:data})
    }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state,payload);
    }
  }
}
