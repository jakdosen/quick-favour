<template>
  <div style="background: #f4f4f4;height: 100%">
     <common-header className="colorHeader"><span slot="default">支付订单</span></common-header>
     <view-box body-padding-top="46px">
         <!--支付金额-->
         <div class="confirmOrder-pay">
             <p>实付金额：<span><small>￥</small>{{ Number(trueCash).toFixed(2) }}</small></span></p>
             <div class="clearfix">
                <span>购买商品总计：{{order_list&&order_list.length}}件</span>
               <ul>
                 <li v-for="item in order_list">
                   <img :src="item.goods_thumb" alt="">
                 </li>
               </ul>
             </div>
         </div>
         <!--选择支付方式-->
         <div class="confirmOrder-chose">
            <p>选择支付方式</p>
            <div style="background: #fff">
             <checker v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
               <checker-item  class="vux-1px-b" value="1"><span style="color: #3eb135;font-size: 2rem" class="iconfont icon-wechat-cc"></span> <icon :type="chosePay==='1'? 'success':'circle'"></icon></checker-item>
               <checker-item  v-if="!this.isWeixin" value="2"><span style="color: #00a7ff;font-size: 2rem" class="iconfont icon-alipay"></span> <icon :type="chosePay==='2'? 'success':'circle'"></icon></checker-item>
             </checker>
           </div>
         </div>
         <!--确认支付-->
         <div class="confirm-btn">
           <a @click="payMoney" class="confirm-pay" href="javascript:;">确认支付</a>
         </div>
     </view-box>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { ViewBox, XSwitch, Group, Checker, CheckerItem, Icon } from 'vux'
  import {mapGetters, mapState, mapActions} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  import { prepay} from '^/services/order'
  import {  getWxSignature } from '^/services/auth'
  const wx = Vue.wechat;

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
      this.isWeixin = /micromessenger|wechat/.test(navigator.userAgent.toLowerCase());
      // 获取orderID
      this.order_ids = this.$route.query.order_ids || this.$router.push({path:'/'})
      // 判断当前是否有goods_list 和trueCash
      this.orderPay({ order_ids:this.order_ids});
      if(this.isWeixin){
        // 初始化微信
        const permissions = ['chooseWXPay'];
        const url = window.location.href;
        getWxSignature({
          url: encodeURIComponent(url),
          jsApiList: JSON.stringify(permissions)
        }).then(data => {
          this.wx_signPackage =  Object.assign(data.signPackage, {
            jsApiList: permissions
          });
          wx.config(this.wx_signPackage);
        });
      }
     },
    data(){
      return {
        chosePay:'1',
        isWeixin:false,
        order_ids:'',
        wx_signPackage:null
      }
    },
    computed: {
      ...mapState('confirmOrder',['order_list','trueCash']),
    },
    methods: {
      ...mapActions('confirmOrder',['orderPay']),
      payMoney(){
          if(!this.isWeixin) return;
          prepay({
            order_ids:this.order_ids,
            payment:{"1":'weixin',"2":'alipay'}[String(this.chosePay)]
          }).then( ({payment_id}) =>{
              const { timestamp,  nonceStr, signType, paySign} = this.wx_signPackage
              wx.ready(()=>{
                wx.chooseWXPay({
                  timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                  package: 'prepay_id='+payment_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: paySign, // 支付签名
                  success: ()=>{
                       this.$router.push({path:'/payOrderSuccess',query:{payment_id}})
                  }
                });
              });
          });
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "~@/lib/style/flex.less";
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
  .confirm-pay{
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
