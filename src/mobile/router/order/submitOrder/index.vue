<template>
   <div style="background: #f4f4f4;height: 100%">
     <!--头部-->
     <common-header className="colorHeader"><span slot="default">确认订单</span></common-header>
     <view-box body-padding-top="46px" body-padding-bottom="46px">
       <!--收货地址-->
       <div class="order-address" @click="openChoseAddress">
         <div class="left"></div>
         <div class="center">
           <p><span>收货人：</span>任东东 18862231223</p>
           <p><span>收货地址：</span>江苏省苏州市吴中东长路88号区工业园区2.5产业园A2-202</p>
         </div>
         <div class="right"></div>
       </div>
       <!--商品列表-->
       <div class="order-goodsList">
         <ul>
           <li><img src="http://img12.360buyimg.com/mobilecms/s110x110_jfs/t2986/330/2296781313/64049/d520957/57a2f64dN8f3883de.jpg" alt=""></li>
           <li><img src="http://img10.360buyimg.com/babel/s100x100_jfs/t13498/5/1157838140/11141/a5eea81/5a1be04bN6a38659f.jpg!q90.webp" alt=""></li>
         </ul>
         <span>共2件</span>
       </div>
       <!--物流信息-->
       <div class="order-logistics">
          <span>物流信息</span>
          <span>顺丰快递（包邮）</span>
       </div>
       <!--我的账户-->
       <div class="order-package">
         <span>我的账户</span>
         <p>共1000元，可用1000元<br>共100秒币，可用100秒币</p>
         <div>
           <x-switch :title="''" v-model="isShowAccount"></x-switch>
         </div>
       </div>
       <!--支付类型-->
       <div class="order-pay-type">
           <span>支付类型</span>
            <div>
              <checker v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
                <checker-item value="1">现金</checker-item>
                <checker-item value="2">现金&秒币</checker-item>
              </checker>
            </div>
       </div>
       <!--订单总额-->
       <div class="order-pay-count">
           <div><span>订单总额</span><span>￥4006</span></div>
           <div v-show="chosePay==='2'"><span>订单秒币</span><span>M300066</span></div>
           <div v-show="isShowAccount"><span>账户支付</span><span>-￥1000</span></div>
       </div>
     </view-box>
     <!--提交订单-->
     <div class="order-push">
       <p>实付金额：<span><small>￥</small>3006.<small>00</small></span></p>
       <span @click="submitOrder">提交订单</span>
     </div>
   </div>
</template>

<script>
  import { ViewBox, XSwitch, Group, Checker, CheckerItem} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      ViewBox,
      XSwitch,
      Group,
      Checker,
      CheckerItem
    },
    created:function () {

    },
    data(){
      return {
        chosePay:'1',  // 是否使用现金支付
        isShowAccount:true
      }
    },
    computed: {

    },
    methods: {
      submitOrder(){
          this.$router.push('/confirmOrder')
      },
      openChoseAddress(){
        this.$router.push('/choseAddress')
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../../lib/style/flex.less";
  @import '../../../common.less';
  .order-address{
    border-bottom: 1px solid #e4e4e4;
    margin: 15px 0;
    background: #fff;
    padding: 5px 0;
    font-size: 1.4rem;
    .flexbox;
    .center{
      p{
      }
    }
    .left{
       width: 40px;
    }
    .right{
       width: 40px;
    }
  }
  .order-goodsList{
    padding: 0 1rem;
    background: #fff;
    .flexbox;
    ul{
      width: 100%;
      overflow: hidden;
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
    span{
      width: 5rem;
      font-size: 1.2rem;
      transform: translate3d(0,50%,0);
      margin-top: -1.2rem;
    }
  }

  .order-logistics,.order-package,.order-pay-type{
    padding: 1rem 1rem;
    color: #666;
    background: #fff;
  .flexbox;
  .justify-content(space-between);
    margin-top: 15px;
    span{
      &:first-child{
         font-size: 1.4rem;
         font-weight: bold;
         width: 10rem;
       }
    }
  }

  .order-logistics{
    margin-top: 15px;
    line-height: 3.5rem;
    span{
      &:last-child{
          font-size: 1.2rem;
       }
    }
  }

  .order-package{
      >span{
       line-height: 44px;
       }
      p{
        padding-top: 6px;
        padding-left: 2rem;
        width: 100%;
        font-size: 1.2rem;
      }
  }
  .order-pay-type{

      >span{
         line-height: 3rem;
       }
       >div{
          width: 100%;
        }
      .pay-default{
        color: #666;
        margin-left: 1rem;
        position: relative;
        font-size:1.2rem;
         &:before{
         display: inline-block;
         width: 2rem;
         height: 2rem;
         content: "";
         border-radius: 100%;
         border: 1px solid #e4e4e4;
         transform: translate3d(-.5rem,.5rem,0);
       }
      }
      .pay-selected{
         &:before{
         background: #f44040;
         border-color:#f44040;
       }
         &:after{
         content: "";
         display: block;
         position: absolute;
         width: 1rem;
         height: 1rem;
         background: #fff;
         border-radius: 100%;
         z-index:5;
         left: 0;
         top: 1rem;
       }
      }
  }
  .order-pay-count{
     background: #fff;
     padding: 1rem;
     margin-top:15px;
     >div{
      .flexbox;
      .justify-content(space-between);
      span{
        font-size: 1.4rem;
        &:first-child{
             color: #666;
             font-weight: bold;
         }
        &:last-child{
           color: #f63;
           font-weight: bold;
         }
      }
     }
  }

  .order-push{
      position: absolute;
      bottom: 0;
      height: 45px;
      line-height: 45px;
      font-size: 1.4rem;
      width: 100%;
      background: #fff;
      .flexbox;
      p{
        text-align: right;
        width: 70%;
        color: #666;
        span{
          margin-right: 1rem;
          color: #f63;
          small{
            font-size: 1.2rem;
          }
        }
      }
      >span{
         text-align: center;
         width: 30%;
         color: #fff;
         background: #ff5600;
       }
  }
</style>
