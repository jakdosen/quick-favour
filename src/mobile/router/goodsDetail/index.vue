<template>
  <view-box ref="viewBox" body-padding-bottom="45px">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <div class="goods-buy">
      <div class="goods-buy-item1">
         <span>
           <em></em><br>
           首页
         </span>
         <span>
           <em></em><br>
           购物车</span>
         <span>
           <em></em><br>
           客服</span>
      </div>
      <div class="goods-buy-item2">
         <span>加入购物车</span>
         <span>立即购买</span>
      </div>
    </div>
  </view-box>
</template>
<script>
  import {Grid, GridItem, ViewBox} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    computed:{
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      })
    },
    components: {
      Grid, GridItem,
      ViewBox
    }
  }
</script>
<style lang="less">
  @import '../../common.less';
  @import "../../lib/style/flex.less";

  .goods-buy {
  .flexbox;
    position: absolute;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 45px;
    background: #fff;
  }

  .goods-buy-item1 {
  .flex-grow(1);
  }

  .goods-buy-item1 span{
    display: inline-block;
    float: left;
    width: 33.33333333%;
    text-align: center;
    font-size: 1rem;
  }
  .goods-buy-item1 em{
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-top: 7px;
    background: #e4e4e4;
  }

  .goods-buy-item2 {
  .flex-grow(2);
  }
  .goods-buy-item2 span{
    width: 50%;
    display: block;
    float: left;
    line-height: 45px;
    text-align: center;
    font-size: 1.4rem;
    color: #fff;
  }
  .goods-buy-item2 span:first-child{
    background: @color2;
  }
  .goods-buy-item2 span:last-child{
    background: @color1;
  }
</style>
