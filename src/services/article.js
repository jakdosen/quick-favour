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
    params,
  )
}
