/**
 * Created by shiyang.yao on 2017/12/8.
 */

import api from '^/utils/api'
const { mall } = api
import axios from 'axios'

// 秒购轮播
export function homeCycleImage(params = {}) {
  return axios.get(
    mall.homeCycleImage,
    {params},
  );
}

// 秒购轮播
export function search(params = {}) {
  return  new Promise((resolve, reject)=>{
      return  axios.get(
        mall.search,
        {params},
      );
  });
}

// 推荐商品列表
export function suggestlist(params = {}) {
  if(!params['action_type']) params['action_type']='tuijian';
  if(!params['count']) params['count']=10;
  return axios.get(
    mall.suggestlist,
    {params},
  );
}

// 商品列表
export function list(params = {}) {
    if(!params['count']) params['count']=10;
    if(!params['sort_by']) params['sort_by']='price_desc';
    return axios.get(
      mall.list,
      {params},
    );
}

// s商品分类
export function category(params = {}) {
  return axios.get(
    mall.category,
    {params},
  );
}

// 商品详情
export function detail(params = {}) {
  return  axios.get(
    mall.detail,
    {params},
  );
}

// 获取评论列表
export function rater(params = {}) {
  return  axios.get(
    mall.rater,
    {params},
  );
}

// 加入购物车
export function create(params = {}) {
  return  axios.get(
    mall.create,
    {params},
  );
}

// 订单确认页面提交接口
export function directcheckorder(params = {}) {
  return  axios.get(
    mall.directcheckorder,
    {params},
  );
}

// 订单确认页面显示接口
export function checkorder(params = {}) {
  return  axios.get(
    mall.checkorder,
    {params},
  );
}

/**
 * getCartList 获取购物车列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export  function getCartList(params = {}) {
  return axios.get(
    mall.cartList,
    {params},
  );
}

/**
 * changeCartChecked 改变购物车选择状态
 * @param params
 * @returns {AxiosPromise<any>}
 */
export  function changeCartChecked(params = {}) {
  return axios.post(
    mall.cartCheck,
    {params},
  );
}

/**
 * updateCartNum 更新购物车数量
 * @returns {AxiosPromise<any>}
 */
export function updateCartNum(params = {}) {
  return axios.post(
    mall.cartUpdate,
    {params},
  );
}

/**
 * delCart 删除购物车
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function delCart(params = {}) {
  return axios.post(
    mall.cartDel,
    {params}
  )
}
