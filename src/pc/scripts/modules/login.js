/**
 * Created by Gavin Li on 12/4/2017.
 */
import $ from 'jquery'
import _ from 'underscore'
import '@/styles/login.less'
import login from '@/scripts/common/loginDialog';
import util from '^/utils'


new login({
  callBack(){
     let  _href = util.urlArgs()['to'];
     location.href = (_href ? decodeURIComponent(_href) : '/article-list.html')
  }
});

$('.mz-mask').remove();

