/**
* Created by shiyang.yao on 2017/11/22.
*/
<template>
  <div class="clearfix" style="height:100%;width:100%;min-height:100%;background: #f0f0f0" >
    <vue-better-scroll
      style="height:100%"
      class="wrapper"
      ref="scroll"
      :listenScroll="true"
      :pullUpLoad="pullUpLoadObj"
      @scroll="scrollEvent"
      @pullingUp="onPullingUp">
      <!--头部-->
      <div class="buy-head">
        <!--首页幻灯-->
        <div class="buy-swiper">
          <swiper :show-desc-mask="false" :show-dots="cycleImage.length>1" :auto="true" dots-position="center" :loop="true"
                  height="15rem">
             <swiper-item v-for="(item, index) in cycleImage" :key="index"><router-link :to="'/goods/'+item.id"><img style="width: 100%;height: auto" :src="item.adv_code"></router-link></swiper-item>
          </swiper>
        </div>
        <!--首页导航-->
        <div class="buy-nav">
          <grid>
            <grid-item link="/hot" :label="'热门商品'" class="change-width-height">
              <span slot="icon" class="buyIndex-01"></span>
            </grid-item>
            <grid-item link="/quickMall" :label="'秒币商品'">
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
            <div class="toCenter">
              <div class="buy-search-input"  @click.prevent.stop="openSearchPage">
                  <icon style="margin-left: 10px;" type="search"></icon>
                  <span>输入商品名称进行搜索</span>
              </div>
              <router-link to="/mall/cart"><span class="shopping-cart"></span></router-link>
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
                    <em><small>M</small>{{item.coin_price}}</em>
                    <i v-if="item.goods_type==1||item.goods_type==3">元</i>
                    <b v-if="item.goods_type==2||item.goods_type==3">秒</b>
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
        !this.suggestlist.length && this.$store.dispatch('buyIndex/suggestlist',{page:1});
    },
    updated(){
      // 如果是直接返回，加载到上次浏览地点
      this.scroll = !this.scrollObj ? this.scroll : this.scrollObj;
      this.suggestlist.length && this.$refs.scroll.scrollTo( this.scroll.x, this.scroll.y , 0)
    },
    data(){
        return {
          pullUpLoadObj: {
            threshold: 20,
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了'
            }
          },
          scroll:{x:0,y:0}
        }
    },
    computed: {
      ...mapState('buyIndex', ['cycleImage','isLoading','suggestlist','pagination','scrollObj'])
    },
    watch:{
      pagination(val){
          const { current_page,  total_pages} = val;
          if (current_page < total_pages) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
      }
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
        },
        scrollEvent(arv){
            this.scroll = arv;
        }
    },
    beforeRouteLeave(to, from, next){
        this.$store.commit('buyIndex/update',{scrollObj:this.scroll});
        next();
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
    width: 100%;
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
  .buy-search-input{
    width: 80%;
    border-radius: 2.5rem;
    background: #fff;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
    color: #999;
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
    height: 28rem;
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
    height: 71%;
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
  .buy-icon>i{
    background: #822eef;
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
  .shopping-cart{
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    background: url('~@/publice/img/buyCart.png') no-repeat center center;
    margin-left: 1rem;
    background-size: 2.5rem 2.5rem;
  }
  .wrapper{
    -webkit-overflow-scrolling: touch;
  }
</style>
