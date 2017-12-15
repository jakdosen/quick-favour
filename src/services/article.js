/**
 * Created by Gavin.Li on 2017/12/6.
 */
import api from '^/utils/api'
const {article} = api
import axios from 'axios'
/**
 * getList获取文章列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getList(params = {}) {
  return axios.get(
    article.list,
    {params},
  )
}

/**
 * getAd 获取轮播广告
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getAd(params = {}) {
  return axios.get(
    article.adList,
    {params},
  )
}
/**
 * getDetail 获取文章详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getDetail(params = {}) {
  return axios.get(
    article.detail,
    {params},
  )
}

/**
 * getCommentList 获取文章评论
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function getCommentList(params = {page:1}) {
  return axios.get(
    article.getComment,
    {params},
  )
}

/**
 * addComment 添加评论
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function addComment(params = {}) {
  return axios.post(
    article.addComment,
    {...params},
  )
}
/**
 * shareCallback 分享成功回调
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function shareCallback(params = {}) {
  return axios.post(
    article.shareCallback,
    {...params},
  )
}
