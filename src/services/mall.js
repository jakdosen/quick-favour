/**
 * Created by shiyang.yao on 2017/12/8.
 */

import api from '^/utils/api'
const { mall } = api
import axios from 'axios'

// 秒购轮播
export function homeCycleImage(params = {}) {
  return  new Promise((resolve, reject)=>{
      let xhr = axios.get(
        mall.homeCycleImage,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },(msg)=>{
        reject(msg);
      })
  });
}

// 秒购轮播
export function search(params = {}) {
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    params['keywords']  || errorMsg.push({keywords:'请填写搜索关键词'});
    if(!errorMsg.length){
      let xhr = axios.get(
        mall.search,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },(msg)=>{
        errorMsg.push({others:msg})
        reject(errorMsg);
      })
    }else{
      reject(errorMsg);
    }
  });
}

// 推荐商品列表
export function suggestlist(params = {}) {
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    if(!params['actionType']) params['actionType']='tuijian';
    if(!params['count']) params['count']='10';
      let xhr = axios.get(
        mall.suggestlist,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },(msg)=>{
        errorMsg.push({others:msg})
        reject(errorMsg);
      })
  });
}

// 商品列表
export function list(params = {}) {
  return  new Promise((resolve, reject)=>{
    if(!params['count']) params['count']=10;
    let xhr = axios.get(
      mall.list,
      {params},
    );
    xhr.then((date)=>{
      resolve(date);
    },(msg)=>{
      reject(msg);
    })
  });
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
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    params['goods_id']  || errorMsg.push({goods_id:'请输入合法商品ID'});
    if(!errorMsg.length){
      let xhr = axios.get(
        mall.detail,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },(msg)=>{
        errorMsg.push({others:msg})
        reject(errorMsg);
      })
    }else{
      reject(errorMsg);
    }
  });
}
