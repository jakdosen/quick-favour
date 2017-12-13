/**
 * Created by Gavin.Li on 2017/11/22.
 */
import _ from 'underscore'
import router from '@/router/index'
import {getCartList, changeCartChecked, updateCartNum, delCart} from '^/services/mall'
const goodTypeDesc = {
  cash_goods:'现金商品',
  coin_goods:'秒币商品',
  cashcoin_goods:'现金&秒币'
}

let mockData = {
  "carts": {
    "cash_goods": [],
    "coin_goods": [
      {
        "cart_id": 14,
        "goods_id": 460,
        "goods_name": "菲律宾香蕉约1.5kg",
        "cash_price": "5.00",
        "coin_price": "24",
        "goods_type": 2,
        "goods_number": 2,
        "goods_attr_id": "4044,4049",
        "goods_attr_str": "越南 8成熟",
        "is_checked": 1,
        "is_on_sale": 1,
        "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/460_G_1459126720606.jpg"
      }
    ],
    "cashcoin_goods": [
      {
        "cart_id": 1,
        "goods_id": 430,
        "goods_name": "以色列葡萄柚4个约250g/个",
        "cash_price": "30.00",
        "coin_price": "40.00",
        "goods_type": 3,
        "goods_number": 1,
        "goods_attr_id": "4044,4049",
        "goods_attr_str": null,
        "is_checked": 1,
        "is_on_sale": 1,
        "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/430_G_1459971655294.jpg"
      }
    ]
  },
  "total": {
    "goods_checked": 2,
    "goods_count": 2,
    "cash_total": "40.00",
    "coin_total": 88
  }
};
/**
 * parseCartListData 解析购物车数据
 * @param data
 * @returns {Array}
 */
let parseCartListData = data=>{
  let cartList = [];
  _.each(_.pairs(data.carts || []), pair => {
    let type = pair[0],subObj;
    cartList.push( subObj = {
      type,
      name:goodTypeDesc[type],
      list:[]
    })
    pair[1].forEach(cart => {
      subObj.list.push(cart)
    })
  })
  return cartList
};
export default {
  namespaced: true,
  state: {
    //是否编辑状态
    isEditMode:false,
    //商品列表
    goodsList:[

    ]
  },
  actions: {
    //获取购物车列表
    fetchCartList ({ commit ,state},params) {
      getCartList().then((data) => {
        commit('fetchCartList',parseCartListData(data))
      });

      commit('fetchCartList',parseCartListData(mockData))

    },
    //结算
    checkOut() {
      router.push({'path': '/submitOrder'})
    },
    //编辑购物车
    startEditMode({commit}){
      commit('changeEditMode',true)
    },
    //结束编辑
    stopEditMode({commit}){
      commit('changeEditMode',false)
    },
    //选择单个商品
    changeSelectSingleGoods({commit},params){
      changeCartChecked({
        cart_id: params.cart_id,
        is_checked: params.selected|0
      }).then((data) => {

      })
      commit('changeSelectSingleGoods',params)
    },
    //选择多个商品
    changeSelectBatchGoods({commit},params){
      commit('changeSelectBatchGoods',params)
    },
    //选择所有商品
    changeSelectAllGoods({commit},selected){
      commit('changeSelectAllGoods',selected)
    },
    //移除选中商品
    removeSelectedGoods({commit}){
      commit('removeSelectedGoods')
      commit('changeEditMode',false)
    },
    //改变商品数量
    changeQuantity({commit},payload){
      updateCartNum({
        cart_id: payload.cart_id,
        new_number: payload.num
      }).then((data) => {

      })
      commit('changeQuantity',{
        specId:payload.cart_id,
        type:payload.type,
        num:payload.num
      })
    }
  },
  mutations: {
    fetchCartList(state, payload){
      state.goodsList = [...state.goodsList,...payload]
    },
    changeEditMode(state, payload){
      state.isEditMode = payload;
    },
    //选择单个商品
    changeSelectSingleGoods(state, payload){
      let goods = _.chain(state.goodsList).pluck('list').flatten().filter(item=>item.cart_id == payload.cart_id).value();
      if(goods.length){
        goods[0].is_checked = payload.selected | 0;
      }
    },
    //选择多个商品
    changeSelectBatchGoods(state, payload){
      let goodsBatch = state.goodsList.find(item=>item.type == payload.type);
      if(!goodsBatch) return
      goodsBatch.list.forEach(item=>item.is_checked = payload.selected|0)
    },
    //选择所有商品
    changeSelectAllGoods(state, payload){
      state.goodsList.forEach(item=>{
        item.list.forEach(obj=>{
          obj.is_checked = payload | 0
        })
      })
    },
    //改变商品数量
    changeQuantity(state, payload){
      let {specId,type,num} = payload;
      let goods = _.chain(state.goodsList).pluck('list').flatten().filter(item=>item.cart_id == specId).value();
      if(goods.length){
        num > 0 && ( goods[0].goods_number = num)
      }
    },
    removeSelectedGoods(state){
      state.goodsList.forEach(subList=>{
        subList.list = subList.list.filter(item=>item.is_checked != 1)
      })
    }
  }
}
