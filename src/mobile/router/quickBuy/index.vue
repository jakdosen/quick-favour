/**
* Created by shiyang.yao on 2017/11/22.
*/
<template>
  <div class="clearfix" style="height:100%;width:100%;min-height:100%;background: #f0f0f0" >
    <vue-better-scroll
      style="height:100%"
      class="wrapper"
      ref="scroll"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp">
      <!--头部-->
      <div class="buy-head">
        <!--首页幻灯-->
        <div class="buy-swiper">
          <swiper :show-desc-mask="false" :show-dots="cycleImage>1" :auto="true" dots-position="center" :loop="true"
                  height="15rem">
             <swiper-item v-for="(item, index) in cycleImage" :key="index"><router-link to="'/goods/'+item.id"><img style="width: 100%;height: auto" :src="item.adv_code"></router-link></swiper-item>
          </swiper>
        </div>
        <!--首页导航-->
        <div class="buy-nav">
          <grid>
            <grid-item link="/hot" :label="'热门商品'" class="change-width-height">
              <span slot="icon" class="buyIndex-01"></span>
            </grid-item>
            <grid-item link="/quick" :label="'秒币商品'">
              <span slot="icon" class="buyIndex-02"></span>
            </grid-item>
            <grid-item link="/all" :label="'全部商品'">
              <span slot="icon" class="buyIndex-03"></span>
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
      <div class="buy-goods-list clearfix">
        <ul class="clearfix">
          <li v-for="(item , index) in suggestlist" :key="index">
            <router-link :to="'/goods/'+item.id">
              <div class="buy-goods-detail">
                <div class="buy-image">
                  <!--<x-img container="#vux_view_box_body"   :offset="100"  default-src="//misc.360buyimg.com/lib/skin/e/i/error-jd.gif" :src="item.goods_img"></x-img>-->
                  <img style="width: 100%; height: auto" :src="item.goods_img">
                </div>
                <div class="buy-content">
                  <p>{{item.goods_name}}</p>
                  <span><small>￥</small>{{item.cash_price}}</span>
                  <div class="buy-icon">
                    <em><small>m</small>{{item.coin_price}}</em>
                    <i>元</i>
                    <b>秒</b>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </vue-better-scroll>
  </div>
</template>

<script>
  import {Divider, Swiper, SwiperItem, Grid, GridItem, Sticky, XInput, Icon, XImg, ViewBox  } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import VueBetterScroll  from 'vue2-better-scroll'
  export default {
    components: {
      Divider,
      Swiper,
      Grid,
      GridItem,
      SwiperItem,
      Sticky,
      XInput,
      Icon,
      XImg,
      ViewBox,
      VueBetterScroll
    },
    created(){
        // 获取上面导航
        this.$store.dispatch('buyIndex/cycleImage');
        // 重置列表数据
        this.$store.commit('buyIndex/update',{suggestlist:[]});
        // 获取推荐列表
        this.$store.dispatch('buyIndex/suggestlist',{page:1});
    },
    data(){
        return {
          pullUpLoadObj: {
            threshold: 20,
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了'
            }
          }
        }
    },
    computed: {
      ...mapState('buyIndex', ['cycleImage','isLoading','suggestlist','pagination'])
    },
    methods: {
//        箭头函数会导致this指向错误
        openSearchPage() {
           this.$router.push({path:'/search'})
        },
        onPullingUp(){
          // 防止请求多次
          if(!this.isLoading)  return;
          const {current_page, total_pages} = this.pagination;
          this.$store.dispatch('buyIndex/suggestlist', {page: current_page + 1});
          this.$store.commit('buyIndex/update', {isLoading: false});
          setTimeout(()=>{
            if (current_page < total_pages) {
              this.$refs.scroll.forceUpdate(true)
            } else {
              this.$refs.scroll.forceUpdate(false)
            }
          },300);
        }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "~@/lib/style/flex.less";
  @import '~@/common.less';
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
    z-index: 99;
  }
  .buy-search .searchBtn{
      border-radius: 2.5rem;
      background: #fff;
      height: 3.5rem;
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
    border-bottom: 8px solid #f0f0f0;
  }
  .buy-goods-list li:nth-child(2n+1){
      border-right: 4px solid #f0f0f0;
  }
  .buy-goods-list li:nth-child(2n){
      border-left: 4px solid #f0f0f0;
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
    color: #666;
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
  .buyIndex-01,.buyIndex-02,.buyIndex-03{
      display: block;
      width: 100%;
      height: 100%;
  }
  .buyIndex-02{
    background: url('~@/publice/img/buyIndex-02.png') no-repeat;
    background-size: contain;
  }
  .buyIndex-03{
    background: url('~@/publice/img/buyIndex-03.png') no-repeat;
    background-size: contain;
  }
  .buyIndex-01{
    background: url('~@/publice/img/buyIndex-01.png') no-repeat;
    background-size: contain;
  }
  .wrapper{
    -webkit-overflow-scrolling: touch;
  }
</style>
