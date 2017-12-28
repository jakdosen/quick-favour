/**
 * Created by shiyang.yao on 2017/12/12.
 */
import api from '^/utils/api'
const { auth } = api
import axios from 'axios'

// 用户登录
export function login(params = {}) {
  return axios.post(
    auth.login,
    {...params},
  );
}

// 用户注册
export function register(params = {}) {
  return axios.post(
    auth.register,
    {...params},
  );
}

// 用户忘记密码
export function resetPassword(params = {}) {
  return axios.post(
    auth.resetPassword,
    {...params},
  );
}


// 绑定手机号码
export function wx_bindPhone(params = {}) {
  return axios.post(
    auth.wx_bindPhone,
    {...params},
  );
}

// 发送手机验证码
export function sendCode(params = {}) {
  return axios.get(
    auth.sendCode,
    {params},
  );
}

// 获取用户信息
export function userInfo(params = {}) {
  return axios.get(
    auth.userInfo,
    {params},
  );
}
// 获取未读信息数
export function unReadNotic(params = {}) {
  return axios.get(
    auth.unReadNotic,
    {params},
  );
}
