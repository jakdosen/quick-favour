<template>
  <view-box ref="viewBox" body-padding-bottom="45px">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <!--通用的购物快捷导航-->
    <div class="goods-buy">
      <div class="goods-buy-item1">
         <span @click="openHome">
           <em></em><br>
           首页
         </span>
         <span>
           <em></em><br>
           购物车</span>
         <span @click="openCustomDialog">
           <em></em><br>
           客服</span>
      </div>
      <div class="goods-buy-item2">
         <span>加入购物车</span>
         <span>立即购买</span>
      </div>
    </div>
    <!--拨打客服电话-->
    <div v-transfer-dom>
      <x-dialog v-model="showCustomDialog" class="dialog-demo"  hide-on-blur>
        <div class="custom-box">
             <div class="custom-img-box"></div>
             <div class="custom-content-box">
               <p>我们全心全意为您提供满意周到的咨询服务，也希望您支持和监督我们的服务！</p>
               <a href="tel:4007-555-555">拨打客服热线</a>
               <a href="">QQ客服</a>
             </div>
        </div>
      </x-dialog>
    </div>
  </view-box>
</template>
<script>
  import {Grid, GridItem, ViewBox, XDialog,TransferDomDirective as TransferDom} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    data(){
        return{
            showCustomDialog:false
        }
    },
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
      Grid,
      GridItem,
      ViewBox,
      XDialog
    },
    methods:{
      openCustomDialog() {
            this.showCustomDialog=true;
      },
      openHome(){
          this.$router.push('/')
      }
    }
  }
</script>
<style lang="less">
  @import '../../common.less';
  @import "../../lib/style/flex.less";
  @import '~vux/src/styles/close';
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
  .custom-box{
      .custom-img-box{
        height: 120px;
        width: 100%;
        background: @color1;
      }
      .custom-content-box{
          padding:1rem 2.0rem;
          font-size: 1.4rem;
          line-height: 2;
          color: #666;
      }
      a{
        display: block;
        width: 100%;
        height:3rem;
        color: #fff;
        border-radius: 3px;
        margin-top: 1.5rem;
        background: #5dbf10;
        line-height: 3rem;
        &:last-child{
           margin-top: 1rem;
            color: #5dbf10;
            background: #fff;
         }
      }
  }
</style>
