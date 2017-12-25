/**
 * Created by shiyang.yao on 2017/11/21.
 */
import router from '@/router/index'
import {  checkorder, directcheckorder} from '^/services/mall'
import {  done, prepay, addressList, success, orderPay} from '^/services/order'
// import {  getWxSignature } from '^/services/auth'

export default {
  namespaced: true,
  state: {
    goods_list:[],
    trueCash:'', //实际应要付的价格
    order_list:[],
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
    addressList:[],
    paySuccessObject:{}
  },
  actions: {
    checkOrder : async ({commit,state},payload) =>{
       let res;
       if(!payload['cart_id']){
         // 是立即购买时候的状态
         const { cart_id, ...others} =payload;
         res = await directcheckorder(others);
       }else{
         // 根据购物车加载
         res = await checkorder(payload);
       }
       const { goods_list,user_account, cash_pay, cashcoin_pay, user_address} = res;
       let addressCount = user_address;
       if(state.nowSelectAddressId&&state.addressList.length){
         addressCount = state.addressList.filter(obj => obj.id=== state.nowSelectAddressId)[0]
       }
       commit('update',{ goods_list, user_account, cash_pay, cashcoin_pay,user_address:addressCount});
    },
    submitOrder:async ({commit,state},payload) =>{
      const res = await done(payload);
      const { order_ids,payment_id } = res;
      if(!payload.trueCash){
        router.push({path:'/payOrderSuccess',query:{payment_id}})
      }else{
        router.push({path:'/confirmOrder',query:{order_ids}})
      }
    },
    // prepay:async ({commit,state},payload) =>{
    //   const res = await prepay(payload);
    //   const { payment_id } = res;
    //   router.push({path:'/payOrderSuccess',query:{payment_id}})
    // },
    // getWxSignature: async ({commit,state},payload)=>{
    //   const res = await getWxSignature();
    //   const { timestamp, nonceStr, signType, paySign} =  res
    //   wx.ready();
    // },
    addressListFn:async ({commit,state},payload) =>{
      const res = await addressList(payload);
      const { data } = res;
      commit('update',{addressList:data})
    },
    success:async ({commit,state},payload) =>{
      const res = await success(payload);
      commit('update',{paySuccessObject:res})
    },
    orderPay:async ({commit,state},payload) =>{
      const res = await orderPay(payload);
      const { order_amount, goods_list} = res;
      commit('update',{trueCash:order_amount,order_list:goods_list})
    }
  },
  mutations: {
    update (state, payload) {
      Object.assign(state,payload);
    }
  }
}
