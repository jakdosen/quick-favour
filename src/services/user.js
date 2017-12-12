/**
 * Created by shiyang.yao on 2017/12/12.
 */
import api from '^/utils/api'
const { auth } = api
import axios from 'axios'

// 用户登录
export function login(params = {}) {
  return axios.get(
    auth.login,
    {params},
  );
}

// 用户注册
export function register(params = {}) {
  return axios.get(
    auth.register,
    {params},
  );
}

// 用户忘记密码
export function resetPassword(params = {}) {
  return axios.get(
    auth.resetPassword,
    {params},
  );
}


// 绑定手机号码
export function thirdRegister(params = {}) {
  return axios.get(
    auth.thirdRegister,
    {params},
  );
}
