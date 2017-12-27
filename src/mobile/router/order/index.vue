<template>
   <div style="background: #f4f4f4;height: 100%">
     <!--头部-->
     <common-header className="colorHeader"><span slot="default">确认订单</span></common-header>
     <view-box body-padding-top="46px" body-padding-bottom="46px">
       <!--收货地址-->
       <div class="order-address" @click="openChoseAddress">
         <div class="left iconfont icon-address"></div>
         <div v-if="user_address&&JSON.stringify(user_address)!=='{}'" class="center">
           <p><span>收货人：</span>{{ user_address.true_name + ' '+user_address.mobile}}</p>
           <p><span>收货地址：</span>{{ user_address.province+user_address.city+user_address.county+user_address.address}}</p>
         </div>
          <div v-else class="center" style="width:30rem;line-height: 7rem">
               <p>暂无默认地址，点击去选择</p>
          </div>
         <div class="right iconfont icon-arrow-right"></div>
       </div>
       <!--商品列表-->
       <div class="order-goodsList">
         <ul>
           <li v-for="item in goods_list"><img :src="item.goods_img" alt=""></li>
         </ul>
         <span>共{{goods_list &&  countNum || 0}}件</span>
       </div>
       <!--物流信息-->
       <div class="order-logistics">
          <span>物流信息</span>
          <span>顺丰快递（包邮）</span>
       </div>
       <!--我的账户-->
       <div class="order-package">
         <span>我的账户</span>
         <p>共{{user_account['run_money']}}元，可用{{user_account['can_use_run_money']}}元<br>共{{user_account['m_coin']}}秒币，可用{{user_account['can_use_m_coin']}}秒币</p>
         <div>
           <x-switch :title="''" v-model="isShowAccount" v-if = "Number(user_account['can_use_run_money'])"></x-switch>
         </div>
       </div>
       <!--支付类型-->
       <div class="order-pay-type">
           <span>支付类型</span>
            <div>
              <checker @on-change="payChange" v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
                <checker-item value="1">现金</checker-item>
                <checker-item v-if="Number(cashcoin_pay['coin_total'])&&(Number(user_account['m_coin'])-Number(cashcoin_pay['coin_total']))>0" value="2">现金&秒币</checker-item>
              </checker>
            </div>
       </div>
       <!--订单总额-->
       <div class="order-pay-count">
           <div><span>订单总额</span><span>￥{{coinCash}}</span></div>
           <div v-show="chosePay==='2'"><span>订单秒币</span><span>M{{coin}}</span></div>
           <div v-show="isShowAccount"><span>账户支付</span><span>-￥{{accountCash}}</span></div>
       </div>
     </view-box>
     <!--提交订单-->
     <div class="order-push">
       <p>实付金额：<span><small>￥</small>{{accountPay}}</span></p>
       <span @click="submitOrder_form">提交订单</span>
     </div>
   </div>
</template>

<script>
  import { ViewBox, XSwitch, Group, Checker, CheckerItem} from 'vux'
  import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'
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
      //获取购物车参数
      let cartId = this.$route.query.cartId||'';
      let payload = {cart_id:cartId};
      if(!cartId){
        payload={...payload,...this.$route.query}
      }
      this.checkOrder(payload);
    },
    data(){
      return {
        chosePay:'1',  // 是否使用现金支付
        isShowAccount:false,
        coin:0
      }
    },
    computed: {
      ...mapState('confirmOrder',['user_address','user_account','cash_pay','cashcoin_pay','goods_list']),
      price:{
          get(){
             return this.cash_pay.cash_total
          }
      },
      accountCash:{
        get(){
          return this.chosePay==="1"? Math.min(this.user_account['can_use_run_money'],this.cash_pay.cash_total): Math.min(this.user_account['can_use_run_money'],this.cashcoin_pay.cash_total)
        },set(){}
      },
      coinCash:{
        get(){
          return this.chosePay==="1"? this.cash_pay.cash_total: this.cashcoin_pay.cash_total
        },set(){}
      },
      accountPay:{
        get(){
          if(!this.isShowAccount){
            return Number(this.cash_pay.cash_total).toFixed(2);
          }else{
              let arvs = this.user_account['can_use_run_money']-this.coinCash;
              return arvs < 0 ?  Number(Math.abs(arvs)).toFixed(2):0.00
          }
        },
        set(){}
      },
      countNum:{
          get(){
              let count =0;
              this.goods_list.length&&this.goods_list.map(item => count=count+Number(item.goods_number));
              return count;
          }
      }
    },
    methods: {
      ...mapActions('confirmOrder',['checkOrder','submitOrder']),
      ...mapMutations('confirmOrder',['update']),
      submitOrder_form(){
          this.update({trueCash:this.accountPay});
          this.submitOrder({
            pay_type:this.chosePay,
            account_pay:(this.isShowAccount && 1) || 0,
            address_id:this.user_address.id,
            goods_list:this.goods_list,
            trueCash:this.accountPay
          });
      },
      payChange(val){
         if(val===1){
            this.coinCash = this.price;
         }else{
           this.coinCash = this.cashcoin_pay.cash_total;
           this.coin = this.cashcoin_pay.coin_total;
         }
      },
      openChoseAddress(){
        this.$router.push('/choseAddress')
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "~@/lib/style/flex.less";
  @import '~@/common.less';
  .order-address{
    margin: 15px 0;
    background: #fff;
    padding: 1rem;
    font-size: 1.4rem;
    background: url('~@/publice/img/submitOrder-01.png') no-repeat bottom left #fff;
    background-size: 100% 2px;
    .flexbox;
    .center{
      p{
      }
    }
    .left{
       font-size: 1.6rem;
       line-height: 4;
       margin-right: 5px;
    }
    .right{
      font-size: 1.6rem;
      line-height: 4;
      color: #D0D1D1;
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
      width: 8rem;
      font-size: 1.2rem;
      text-align: right;
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
         width: 11rem;
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
