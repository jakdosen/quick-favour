/**
 * Created by shiyang.yao on 2017/12/8.
 */
import api from '^/utils/api'
import { getCookie } from '^/utils/index'
const { address } = api
import axios from 'axios'
import store from 'store'

// 获取用户地址列表
export function addressList(params = {}) {
  return  new Promise((resolve, reject)=>{

    let xhr = axios.get(
      address.addressList,
      {params},
    );
    xhr.then((date)=>{
      resolve(date);
    },(msg)=>{
      reject(msg);
    })
  });
}
