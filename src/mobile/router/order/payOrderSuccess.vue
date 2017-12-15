<template>
  <div style="background: #fff;height: 100%">
     <common-header className="redHeader"><span slot="default">支付成功</span></common-header>
     <view-box body-padding-top="46px" body-padding-bottom="0" style="background: #fff">
         <!--头部支付成功提示-->
         <div class="payOrder-message">
             <span>支付成功</span>
             <p>您的包裹整装待发!</p>
         </div>
         <!--收货人信息-->
         <div class="payOrder-user">
            <p><span>收货人：</span>{{paySuccessObject.address.true_name + '  '+paySuccessObject.address.mobile}}</p>
            <p><span>收货地址：</span>{{paySuccessObject.address.province + paySuccessObject.address.city+ paySuccessObject.address.county+ paySuccessObject.address.address}}</p>
            <p><span>实付款：</span><span><small>￥</small>{{paySuccessObject.order_amount}}</span></p>
         </div>
         <!--跳转链接到订单详情和返回首页-->
         <div class="payOrder-toLink">
             <router-link class="link-btn" to="/order">订单详情</router-link>
             <router-link class="link-btn" to="/">返回首页</router-link>
         </div>
         <!--安全提醒-->
         <div class="payOrder-safeAction">
             <span>安全提醒：</span>
             <p>付款成功后，秒赞商城不会以付款异常、卡单、系统升级为由联系您。<span>请勿泄露银行卡号、手机验证码、否则会造成钱款损失。<router-link class="moreMsg" to="/">谨防电话诈骗！更多安全知识>></router-link></span> </p>
         </div>
         <!--你可能还想购买 -->
         <div class="payOrder-buyAgain" style="display: none">
             <span>你可能还想买</span>
             <div>
               <ul>
                 <li>
                    <img src="http://img10.360buyimg.com/n7/jfs/t7645/290/1928701097/198779/bb4f4828/59a4c0d8N6864a187.jpg" alt="">
                 </li>
                 <li>
                   <img src="http://img13.360buyimg.com/n7/jfs/t7942/139/3840163775/188824/39be5a8d/59ffd41dN90ac91a2.jpg" alt="">
                 </li>
               </ul>
             </div>
         </div>
     </view-box>
  </div>
</template>
<script>
  import { ViewBox } from 'vux'
  import {mapGetters, mapState, mapActions} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      ViewBox
    },
    created:function () {
      // 获取orderID
      const payment_id = this.$route.query.payment_id || this.$router.push({path:'/'})
      // 获取成功数据
      this.success({payment_id})
    },
    data(){
      return {

      }
    },
    computed: {
      ...mapState('confirmOrder',['paySuccessObject'])
    },
    methods: {
      ...mapActions('confirmOrder',['success'])
    }
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~@/lib/style/flex.less";
  @import '~@/common.less';
.payOrder-message{
  background: url(~@/publice/img/paySuccess-box.png) right center #fd3442 no-repeat;
  background-size: 15.5rem 8.6rem;
  padding: 4rem 2rem;
  color:#fff;
  span{
    font-size: 1.6rem;
  }
  p{
    font-size: 1.2rem;
  }
}
.payOrder-user{
  padding: 0 2rem;
  font-size: 1.4rem;
  p{
    margin:.8rem 0;
    &:first-child{
        width: 100%;
        overflow: hidden;
     }
    &:last-child{
        span{
            small{
              font-size: 1.2rem;
            }
            &:last-child{
               color: #f63;
             }
        }
     }
  }
}
.payOrder-toLink{
   padding:1rem 2rem;
.flexbox;
.justify-content(space-around);
   .link-btn{
      width: 40%;
      line-height: 3rem;
      font-size: 1.4rem;
      border:1px solid #e4e4e4;
      border-radius: 3px;
      color: #333;
      text-align: center;
   }
}
.payOrder-safeAction{
    padding: 1.5rem 2rem 0;
    font-size: 1.4rem;
    p{
        span{
          color: #f63;
        }
         .moreMsg{
           color: #f63;
         }
    }
}

.payOrder-buyAgain{
  >span{
     display: block;
     width: 50%;
     margin: 2rem auto 1rem;
     background: url(~@/publice/img/paySuccess-line.png)  no-repeat;
     background-size: contain;
     line-height: 2rem;
     box-sizing: border-box;
     padding-left: 17%;
     color: #f63;
     font-size: 1.2rem;
   }
  div{
    li{
      box-sizing: border-box;
      width: 50%;
      padding: 10px;
      float: left;
      overflow: hidden;
      img{
         width: 100%;
         height: auto;
      }
    }
  }
}
</style>
