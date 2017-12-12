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
  return  new Promise((resolve, reject)=>{
    let xhr = axios.get(
      mall.category,
      {params},
    );
    xhr.then((date)=>{
      resolve(date);
    },(msg)=>{
      reject(msg);
    })
  });
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
