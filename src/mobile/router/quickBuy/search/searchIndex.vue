<template>
  <div style="width: 100%;height: 100%;background: #fff">
    <!--头部搜索-->
    <x-header class="searchHead" title="slot:overwrite-title"
              :left-options="{showBack:true,backText: ''}"
    >
      <div class="overwrite-title-demo" slot="overwrite-title">
        <x-input  class="searchBtn inputFont" placeholder="输入商品名称进行搜索" >
          <icon slot="label" style="display:block;margin-right: 5px" type="search"></icon>
        </x-input>
      </div>
      <div slot="right">
        <span style="color: #fff">搜索</span>
      </div>
    </x-header>
    <view-box body-padding-top="46px">
    <!--历史搜索-->
    <div class="search-histry-modules hide c-page-padding">
      <card>
         <div slot="header">
            <div class="clearfix">
              <span>搜索历史</span>
              <span>删除</span>
            </div>
         </div>
         <div slot="content" style="margin-top: 1rem">
           <ul>
             <li class="vux-1px">Dior</li>
             <li class="vux-1px">鸡爪</li>
             <li class="vux-1px">时尚秋冬女上衣</li>
             <li class="vux-1px">袜子</li>
             <li class="vux-1px">羽绒服</li>
           </ul>
         </div>
      </card>
    </div>
    <!--内容搜索-->
    <div class="search-content-modules">
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <!--价格的时候 用slot，icon-->
        <tab-item class="vux-center"  v-for="(item, index) in list2" :key="index">{{item}}</tab-item>
      </tab>
      <swiper height="100%" v-model="index" :show-dots="false">
        <swiper-item  v-for="(item, index) in list2" :key="index">
          <div class="search-goods-list">
             <div class="left-img">
               <img width="100%" height="100%" src="//pic5.40017.cn/02/001/aa/56/rBLkCFnLVYeAV70PAADoBiSo3zU091_300x275_00.jpg" alt="">
             </div>
             <div class="right-content">
                <p>Apple苹果6S（A1586）移动联通电信4G手机 金色 32G</p>
                <span><small>￥</small>38888.00</span>
                <div>
                   <em><small>M</small>120000</em>
                   <i>元</i>
                   <b>秒</b>
                </div>
             </div>
          </div>
          <div class="search-goods-list">
            <div class="left-img">
              <img width="100%" height="100%" src="//pic5.40017.cn/02/001/aa/56/rBLkCFnLVYeAV70PAADoBiSo3zU091_300x275_00.jpg" alt="">
            </div>
            <div class="right-content">
              <p>Apple苹果6S（A1586）移动联通电信4G手机 金色 32G</p>
              <span><small>￥</small>38888.00</span>
              <div>
                <em><small>M</small>120000</em>
                <i>元</i>
                <b>秒</b>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <!--空状态搜索-->
    <div class="search-null-modules hide">
         抱歉，没有找到您搜到的商品
    </div>
    </view-box>
  </div>
</template>

<script>
  import {XHeader,XInput,Icon,Card,ViewBox,Tab, TabItem,Swiper, SwiperItem } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    components: {
      XHeader,
      XInput,
      Icon,
      Card,
      ViewBox,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data(){
        return {
          list2 : ['综合', '现金商品', '现金&秒币', '秒币商品', '价格'],
          index: 0
        }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../../common.less';
  @import "../../../lib/style/flex.less";
  @import '~vux/src/styles/1px.less';

  .searchHead {
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
    background: -webkit-linear-gradient(left top, @color2, @color1);
    color: #333
  }
  .searchBtn{
    background: #fff;
    height: 30px;
    -webkit-transform: translate3d(0,5px,0);
    transform: translate3d(0,5px,0);
    width: 100%;
    border-radius: 5px;
  }

  .overwrite-title-demo{
    display: inline;
  }
  .search-histry-modules{
    color: @color5;
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .search-histry-modules span:first-child{
    float: left;
  }
  .search-histry-modules span:last-child{
    float: right;
  }
  .search-histry-modules li{
    display: block;
    float: left;
    padding: 0 .7rem;
    color: @color4;
    margin-bottom: 10px;
    margin-right: 1.4rem;
  }
  .search-histry-modules .weui-panel:before{
    border: none;
  }
  .search-histry-modules .weui-panel:after{
    display: none;
  }
  .hide{
    display: none;
  }
  .search-goods-list{
    height: 13rem;
    width: 100%;
     .flexbox;
    margin-bottom: 1rem;
  }
  .search-goods-list .left-img{
      height: 100%;
      width: 12rem;
      min-width: 12rem;
      padding: 5px 10px;
  }
  .right-content{
    padding-right: 10px;
  }
  .right-content p{
    font-size: 1.4rem;
    color: @color4;
    line-height: 2;
    height: 8rem;
    max-height: 10rem;
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
  .search-content-modules,.search-content-modules .vux-slider{
    height: 100% ;
  }
</style>

