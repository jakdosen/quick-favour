/**
 * Created by Gavin.Li on 2017/12/6.
 */

import axios from 'axios'
import store from 'store'
import Backbone from 'backbone'
import _ from 'underscore'
// 全局对象 bus
let bus =  window.bus = {}
let events = bus.events =  _.extend({},Backbone.Events)

// --------------underscore 模板配置----------------
_.templateSettings = {
  evaluate: /<@([\s\S]+?)@>/g, interpolate: /<@=([\s\S]+?)@>/g, escape: /<@-([\s\S]+?)@>/g
};
// --------------axios 配置----------------
axios.defaults.timeout = 5000;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.get('user')) {
      config.headers.Authorization = `token ${store.get('user').token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.remove('user')
          events.trigger("logout");
      }
    }
    return Promise.reject(error.response.data)
  });
