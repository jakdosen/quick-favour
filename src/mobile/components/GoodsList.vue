<template>
  <div class="search-goods-list">
    <div class="left-img">
      <x-img width="100%" height="100%" src="//pic5.40017.cn/02/001/aa/56/rBLkCFnLVYeAV70PAADoBiSo3zU091_300x275_00.jpg" alt=""></x-img>
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
</template>

<script>
  import { XImg } from 'vux'
  export default {
    components: {
      XImg
    },
    data(){
      return {

      }
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common.less';
  @import "../lib/style/flex.less";
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
</style>
