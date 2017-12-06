/**
 * Created by Gavin.Li on 2017/12/5.
 */

import api from './api'
let urlArgs = ()=>{
  let args = {};
  let query = location.search ? location.search : location.hash;
  if(!query){
    return args;
  }
  query = query.substring(1);
  let pairs = query.split('&');
  for(let i = 0; i < pairs.length; i++){
    let pos = pairs[i].indexOf('=');
    if(pos == -1) continue;
    let name = pairs[i].substring  (0, pos);
    let value = pairs[i].substring(pos + 1);
    value = decodeURIComponent(value);
    args[name] = value;
  }
  return args;
}
/**
 * getCookie
 * @param sName
 */
let getCookie = (sName)=>{
  let
    sRE = "(?:; )?"+sName+"=([^;]*);?",
    oRE = new RegExp(sRE);
  if (oRE.test(document.cookie)) {
    return decodeURIComponent(RegExp["$1"]);
  } else {
    return null;
  }
};
/**
 * setCookie
 * @param sName
 * @param sValue
 * @param oExpires
 * @param sPath
 * @param sDomain
 * @param bSecure
 * @returns {*}
 */
let setCookie = (sName, sValue, oExpires, sPath, sDomain, bSecure)=>{
  let sCookie = sName + "=" + encodeURIComponent(sValue),d;
  if (oExpires) {
    if (typeof oExpires == "string") {
      d = new Date();
      d.setTime(new Date().getTime() + parseInt(oExpires));
      oExpires = d.toGMTString();
    }else{
      oExpires = oExpires.toGMTString();
    }
    sCookie += "; expires=" + oExpires;
  }
  if (sPath) {
    sCookie += "; path=" + sPath;
  }
  if (sDomain) {
    sCookie += "; domain=" + sDomain;
  }
  if (bSecure) {
    sCookie += "; secure";
  }
  document.cookie = sCookie;
};
/**
 * removeCookie
 * @param sName
 * @param sPath
 * @param sDomain
 * @param bSecure
 */
let removeCookie = (sName, sPath, sDomain, bSecure)=>{
  setCookie(sName,"", new Date(0), sPath,sDomain,bSecure);
};
export default {
  api,
  urlArgs,
  getCookie,
  setCookie,
  removeCookie
}
