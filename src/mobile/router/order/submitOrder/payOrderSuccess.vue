<template>
  <div>
     <common-header className="redHeader"><span slot="default">支付成功</span></common-header>
     <view-box body-padding-top="46px">
         <!--头部支付成功提示-->
         <div class="payOrder-message">
             <span>支付成功</span>
             <p>您的包裹整装待发</p>
         </div>
         <!--收货人信息-->
         <div class="payOrder-user">
            <p><span>收货人：</span>任东东  18862231223</p>
            <p><span>收货地址：</span>江苏省苏州市吴中东长路88号区工业园区2.5产业园A2-202</p>
            <p><span>实付款：</span><span><small>￥</small>412.</span><small>00</small></p>
         </div>
         <!--跳转链接到订单详情和返回首页-->
         <div class="payOrder-toLink">
             <router-link to="">订单详情</router-link>
             <router-link to="">返回首页</router-link>
         </div>
         <!--安全提醒-->
         <div class="payOrder-safeAction">
             <span>安全提醒：</span>
             <p>付款成功后，秒赞商城不会以付款异常、卡单、系统升级为由联系您。<span>请勿泄露银行卡号、手机验证码、否则会造成钱款损失。<router-link>谨防电话诈骗！更多安全知识>></router-link></span> </p>
         </div>

     </view-box>
  </div>
</template>
<script>
  import { ViewBox } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      ViewBox
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
.payOrder-message{
  background: #fd3442;
  padding-left: 2rem;
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
    line-height:2;
    &:first-child{
        width: 100%;
        overflow: hidden;
     }
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
</style>
