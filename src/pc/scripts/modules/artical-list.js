/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/article-list.less'
import $ from 'jquery'
import _ from 'underscore'
import * as util from '^/utils'
import {getList} from '^/services/article'
import {Dialog} from '../common/ui'
console.log($)
console.log(_)
console.log('login')
console.log(JSON.stringify(util))

let dialog = new Dialog();
document.body.appendChild(dialog.el)
// dialog.$el.append(JSON.stringify(api))
getList().then(({data})=>{
  console.log(data.datas)
})

