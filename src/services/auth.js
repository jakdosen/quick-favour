/**
 * Created by shiyang.yao on 2017/12/8.
 */
import api from '^/utils/api'
const { auth } = api
import axios from 'axios'

// 注册接口
export function register(params = {}) {
  return  new Promise((resolve, reject)=>{
      let errorMsg = [];
      params['account'] && (/^1[3|4|5|8][0-9]\d{4,8}$/).test(params['account']) || errorMsg.push({account:'手机号码不可为空'});
      params['password'] || errorMsg.push({password:'密码不可为空'});
      params['code'] || errorMsg.push({code:'验证码不可为空'});
      if(!errorMsg.length){
        let xhr = axios.post(
          auth.register,
          {params},
        );
        xhr.then((date)=>{
          resolve(date);
        },()=>{
          errorMsg.push({others:'接口异常'});
          reject(errorMsg);
        })
      }else{
        reject(errorMsg);
      }
  });
}

// 登录接口
export function login(params = {}) {
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    params['account'] && (/^1[3|4|5|8][0-9]\d{4,8}$/).test(params['account']) || errorMsg.push({account:'手机号码不可为空'});
    params['password'] || errorMsg.push({password:'密码不可为空'});
    if(!errorMsg.length){
      let xhr = axios.post(
        auth.login,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },()=>{
        errorMsg.push({others:'接口异常'});
        reject(errorMsg);
      })
    }else{
      reject(errorMsg);
    }
  });
}

// 绑定手机号码
export function thirdRegister(params = {}) {
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    params['openKey']  || errorMsg.push({openKey:'登录异常'});
    params['type']  || errorMsg.push({openKey:'登录异常'});
    params['mobile'] && (/^1[3|4|5|8][0-9]\d{4,8}$/).test(params['mobile']) || errorMsg.push({account:'手机号码格式不对'});
    params['password'] || errorMsg.push({password:'密码不可为空'});
    if(!errorMsg.length){
      let xhr = axios.post(
        auth.thirdRegister,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },()=>{
        errorMsg.push({others:'接口异常'});
        reject(errorMsg);
      })
    }else{
      reject(errorMsg);
    }
  });
}

// 忘记密码
export function resetPassword(params = {}) {
  return  new Promise((resolve, reject)=>{
    let errorMsg = [];
    params['account'] && (/^1[3|4|5|8][0-9]\d{4,8}$/).test(params['mobile']) || errorMsg.push({account:'手机号码格式不对'});
    params['password'] || errorMsg.push({password:'密码不可为空'});
    params['code'] || errorMsg.push({code:'验证码不可为空'});
    if(!errorMsg.length){
      let xhr = axios.post(
        auth.resetPassword,
        {params},
      );
      xhr.then((date)=>{
        resolve(date);
      },()=>{
        errorMsg.push({others:'接口异常'});
        reject(errorMsg);
      })
    }else{
      reject(errorMsg);
    }
  });
}

/**
 * getWxSignature 获取微信签名
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getWxSignature(params = {}) {
  return axios.get(
    auth.wx_signature,
    {params},
  )
}
