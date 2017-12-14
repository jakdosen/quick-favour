/**
 * Created by shiyang.yao on 2017/12/14.
 */
import api from '^/utils/api'
const { order } = api
import axios from 'axios'

// 秒购轮播
export function done(params = {}) {
  return axios.post(
    order.done,
    {...params},
  );
}

// 确认支付
export function prepay(params = {}) {
  return axios.post(
    order.prepay,
    {...params},
  );
}

// 获取用户列表
export function addressList(params = {}) {
  return axios.get(
    order.addressList,
    {params},
  );
}
