/**
* Created by shiyang.yao on 2017/11/22.
*/
<template>
  <div style="width:100%;height: 100%;background: #e4e4e4">
    <!--头部  -->
    <div class="buy-head">
      <!--首页幻灯-->
      <div class="buy-swiper">
        <swiper :show-desc-mask="false" :auto="true" :list="dataSource" dots-position="center" :loop="true"
                height="18rem"></swiper>
      </div>
      <!--首页导航-->
      <div class="buy-nav">
        <grid>
          <grid-item link="/hot" :label="'热门商品'">
            <img slot="icon" src="">
          </grid-item>
          <grid-item link="/quick" :label="'秒币商品'">
            <img slot="icon" src="">
          </grid-item>
          <grid-item link="/all" :label="'全部商品'">
            <img slot="icon" src="">
          </grid-item>
        </grid>
      </div>
      <!--首页搜索框-->
      <div class="buy-search">
        <Sticky offset="15">
          <div class="toCenter" @click="openSearchPage">
            <x-input class="searchBtn" placeholder="输入商品名称进行搜索"  :readonly="true" >
              <icon slot="label" style="display:block;margin-right: 5px" type="search"></icon>
            </x-input>
          </div>
        </Sticky>
      </div>
    </div>
    <!--产品列表-->
    <div class="buy-goods-list">
      <ul>
        <li>
          <div class="buy-goods-detail">
            <div class="buy-image">
              <x-img :src="'//pic4.40017.cn/zzy/rimage/2016/10/10/18/AVVJjh_242x150_00.jpg'"></x-img>
            </div>
            <div class="buy-content">
              <p>苹果iphone6s pluse1111111111</p>
              <span><small>￥</small>3888.00</span>
              <div class="buy-icon">
                <em><small>m</small>120000</em>
                <i>元</i>
                <b>秒</b>
              </div>
            </div>
          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Divider, Swiper,Grid, GridItem, Sticky ,XInput,Icon,XImg  } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    components: {
      Divider,
      Swiper,
      Grid,
      GridItem,
      Sticky,
      XInput,
      Icon,
      XImg
    },
    computed: {
      ...mapState('buyIndex', {
        dataSource: 'dataSource'
      })
    },
    methods: {
//        箭头函数会导致this指向错误
        openSearchPage: function () {
           this.$router.push({path:'/search'})
        }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../lib/style/flex.less";
  @import '../../common.less';
  .buy-head {
    background: #fff;
    margin-bottom: 2rem;
    position: relative;
  }
  .buy-head  .weui-grids:before,.buy-head  .weui-grids:after{
     border: none;
  }
  .buy-head .weui-grid:before{
     border:none;
  }
  .buy-search{
    position: absolute;
    top: 2rem;
    width: 100%;
  }
  .buy-search .searchBtn{
      border-radius: 2.5rem;
      background: #fff;
      height: 2.5rem;
      width: 80%;
  }
  .toCenter{
  .flexbox;
  .justify-content(center);
  }
  .buy-goods-detail{
    width: 100%;
    height: 100%;
  }
  .buy-goods-list li{
    float: left;
    background: #fff;
    box-sizing: border-box;
    width: 50%;
    height: 22rem;
    margin-bottom: 4px;
  }
  .buy-goods-list li:nth-child(2n+1){
      border-right: 2px solid #e4e4e4;
  }
  .buy-goods-list li:nth-child(2n){
      border-left: 2px solid #e4e4e4;
  }
  .buy-image{
    width: 100%;
    height: 65%;
    overflow: hidden;
  }
  .buy-content{
    padding:0 .8rem;
  }
  .buy-content p{
    width: 100%;
    font-size: 1.4rem;
    line-height: 2;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .buy-content span{
     font-size: 1.2rem;
     color: @color1;
  }
  .buy-icon{
    text-align: right;
  }
  .buy-icon em small{
    font-size: 1rem;
  }
  .buy-icon em{
    font-size: 1.4rem;
    color: @color1;
    float: left;
  }
  .buy-icon>i,.buy-icon>b{
     color: #fff;
     padding: 0 4px;
     display: inline-block;
     background: @color3;
  }
</style>
