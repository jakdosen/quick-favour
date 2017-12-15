<template>
  <div style="height: 100%;overflow-y: hidden">
    <vue-better-scroll
      style="height:calc(100% - 50px);"
      class="wrapper"
      ref="scroll"
      :pullUpLoad="pullUpLoadObj"
      @pullingUp="onPullingUp">
    <div v-for="(item,index) in sourceList" :key="index">
      <router-link :to="'/goods/'+item.id">
      <div class="search-goods-list vux-1px-b">
          <div class="left-img">
            <img width="auto" height="100%" :src="item.goods_img" alt="">
          </div>
          <div class="right-content">
            <p>{{item.goods_name}}</p>
            <span v-if="type"><small>￥</small>{{item.cash_price}}</span>
            <div>
              <em><small>M</small>{{item.coin_price}}</em>
              <i v-if="type">元</i>
              <b>秒</b>
            </div>
          </div>
      </div>
      </router-link>
    </div>
    </vue-better-scroll>
  </div>
</template>

<script>
  import { XImg } from 'vux'
  import VueBetterScroll  from 'vue2-better-scroll'
  export default {
    components: {
      XImg,
      VueBetterScroll
    },
    props:{
      sourceList:{
        type: Array,
        default() {
          return [];
        }
      },
      onPullingUpArgs:{
          type:Function,
          default() {
            return ()=>{}
          }
      },
      type:{
          type:Boolean,
        default() {
          return true
        }
      }
    },
    data(){
      return {
        pullUpLoadObj: {      // 下拉加载提示文案
          threshold: 20,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      }
    },
    computed: {

    },
    watch:{

    },
    methods: {
      onPullingUp(){
         this.onPullingUpArgs((current_page,total_pages)=>{
         setTimeout(()=>{
          if (current_page < total_pages) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
        },300);
         });
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common.less';
  @import "../lib/style/flex.less";
  @import '~vux/src/styles/1px.less';
  .search-goods-list{
    padding: 1rem 0;
    height: 13rem;
    width: 100%;
    .flexbox;
    margin-bottom: 1rem;
  }
  .search-goods-list .left-img{
    height: 100%;
    width: 12rem;
    padding: 5px 10px;
    overflow: hidden;
  }

  .right-content{
    padding-right: 10px;
    width: 70%;
  }
  .right-content p{
    font-size: 1.4rem;
    color: @color4;
    line-height: 2;
    height: 6rem;
    overflow: hidden;
  }
  .right-content > span{
    color: @color2;
    font-size: 1.2rem;
    line-height: 2;
  }
  .right-content > div{
    color: @color1;
    font-size: 1.4rem;
    line-height: 2;
    text-align: right;
  }
  .right-content > div small{
    font-size: 1.2rem;
  }
  .right-content > div em{
    float: left;
  }
  .right-content > div i,.right-content > div b{
    font-size: 1.2rem;
    display: inline-block;
    margin-right: 5px;
    background: #f63;
    color: #fff;
    padding: 0 .7rem;
    margin-top: -5px;
  }
  .wrapper{
    -webkit-overflow-scrolling: touch;
  }
</style>
