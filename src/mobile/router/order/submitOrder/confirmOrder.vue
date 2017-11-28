<template>
  <div style="background: #f4f4f4;height: 100%">
     <common-header className="colorHeader"><span slot="default">支付订单</span></common-header>
     <view-box body-padding-top="46px">
         <!--支付金额-->
         <div class="confirmOrder-pay">
             <p>实付金额：<span><small>￥</small>4006.<small>00</small></span></p>
             <div class="clearfix">
                <span>购买商品总计：4件</span>
               <ul>
                 <li>
                   <img src="//img10.360buyimg.com/mobilecms/s110x110_jfs/t5620/282/148014629/70033/c30f3e24/591d8877N3bfaf0a7.jpg" alt="">
                 </li><li>
                   <img src="//img10.360buyimg.com/mobilecms/s110x110_jfs/t6511/137/2674105784/151865/decc1ab7/5965c3ceN748ecfa7.jpg" alt="">
                 </li>
               </ul>
             </div>
         </div>
         <!--选择支付方式-->
         <div class="confirmOrder-chose">
            <p>选择支付方式</p>
            <div style="background: #fff">
             <checker v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
               <checker-item class="vux-1px-b" value="1"><span>icon</span> <icon :type="chosePay==='1'? 'success':'circle'"></icon></checker-item>
               <checker-item value="2"><span>icon</span> <icon :type="chosePay==='2'? 'success':'circle'"></icon></checker-item>
             </checker>
           </div>
         </div>
         <!--确认支付-->
         <div class="confirm-btn">
           <a href="">确认支付</a>
         </div>
     </view-box>
  </div>
</template>
<script>
  import { ViewBox, XSwitch, Group, Checker, CheckerItem, Icon } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      ViewBox,
      XSwitch,
      Group,
      Checker,
      CheckerItem,
      Icon
    },
    created:function () {

    },
    data(){
      return {
        chosePay:'1'
      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../../lib/style/flex.less";
  @import '~vux/src/styles/1px.less';
.confirmOrder-pay{
   background: #fff;
   padding: 0 1rem;
   >p{
      font-size: 1.6rem;
      line-height: 3;
      color: #333;
      span{
         color: #f63;
        small{
          font-size: 1.2rem;
        }
      }
    }
    >div{
       span{
         font-size: 1.4rem;
         color: #666;
       }
       ul{
         width: 100%;
       }
       li{
         float: left;
         box-sizing: border-box;
         padding: 10px;
         max-width: 20%;
         max-height: 9rem;
         img{
           width: 100%;
           height: auto;
         }
       }
    }
}
.confirmOrder-chose{
   >p{
       text-indent: 1rem;
       font-size: 1.4rem;
       line-height: 3rem;
    }
    .pay-default{
       width: 100%;
       padding: 1.5rem 1rem;
    .flexbox;
    .justify-content(space-between);
    }
}
.confirm-btn{
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  a{
    display: block;
    line-height: 4rem;
    background: #ff8c00;
    color: #fff;
    border-radius: 3px;
    font-size: 1.4rem;
    margin-top: 15px;
  }
}
</style>
