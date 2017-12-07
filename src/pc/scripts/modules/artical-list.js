/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/scripts/libs/swiper/swiper.less'
import '@/styles/article-list.less'
import $ from 'jquery'
import _ from 'underscore'
import * as util from '^/utils'
import {getList,getAd} from '^/services/article'
import {Model,Collection,View} from 'backbone'
import Swiper from '../libs/swiper/swiper'

/**
 * App
 */
let App = View.extend({
  template:{
    ad:_.template($('#ad-item-tpl').html())
  },
  initialize(){
    this.fetchAdListData()
    this.fetchArticleListData()
  },
  //获取广告信息
  fetchAdListData(){
    getAd().then(({data})=>{
      this.renderAd(data.datas)
    })
  },
  //获取文章列表信息
  fetchArticleListData(){
    getList().then(({data})=>{
      console.log(data.datas)
    })
  },
  renderAd(list){
    list.push({
        "id": 1,
        "position_id": 1,
        "ad_name": "首页广告1",
        "ad_link": "http://www.baidu.com",
        "ad_code": "http://img.ivsky.com/img/bizhi/slides/201711/16/thor_ragnark-010.jpg",
        "created_at": "1970-01-01"
      },
      {
        "id": 2,
        "position_id": 1,
        "ad_name": "首页广告2",
        "ad_link": "http://www.baidu.com",
        "ad_code": "http://www.adquan.com/adimages/1511936645065b9ef849bda63e.jpeg",
        "created_at": "1970-01-01"
      })
    _.each(list,item=>{
      this.$('.js-slider-cot').append(
        this.template.ad({
          name:item.ad_name,
          link:item.ad_link,
          src:item.ad_code
        })
      );
    });
    new Swiper(this.$('.swiper-container'),{
      pagination:this.$('.pagination-ga'),
      // autoplay : 5000,
      speed:500,
      paginationClickable :true,
      loop : true,
    })
  }
});
new App({
  el:document.body
});



