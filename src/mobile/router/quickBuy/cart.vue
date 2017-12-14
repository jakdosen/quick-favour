<template>
  <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px" class="no-select">
    <CommonHeader slot="header" :className="'colorHeader'">
      <span solt="default">
        购物车<span v-if="!!totalSpecNum">({{totalSpecNum}})</span>
      </span>
      <div slot="right" v-if="!!totalSpecNum">
        <span v-if="isEditMode" @click.capture.prevent="stopEditMode">完成</span>
        <span v-else @click.capture.prevent="startEditMode">编辑</span>
      </div>
    </CommonHeader>
    <div class="cart-list-wrap">
      <!--购物车为空-->
      <div slot="right" v-if="!totalSpecNum">
        <h2 style="text-align: center">购物车为空</h2>
      </div>
      <div class="cart-list" v-for="goods in goodsList" :key="goods.type" v-if="goods.list.length > 0">
        <div class="cart-title">
          <check-icon class="cart-check"
                      :value="!goods.list.filter(item=>!item.is_checked).length"
                      v-on:update:value="(selected)=>changeSelectBatchGoods({type:goods.type,selected})"
          >{{goods.name}}</check-icon>
        </div>
        <ul class="cart-list-cot">
          <li class="cart-item" v-for="item in goods.list" :key="item.cart_id">
            <div class="cart-wrap">
              <div class="cart-item-img">
                <check-icon class="cart-check"
                            :value="!!item.is_checked"
                            v-on:update:value="(selected)=>changeSelectSingleGoods({cart_id:item.cart_id,selected})"></check-icon>
                <div class="cart-item-img-wrap"><img :src="item.goods_img"></div>
              </div>
              <div class="cart-item-detail">
                <p class="cart-item-desc"> {{item.goods_name}} {{item.goods_attr_str}} </p>
                <div class="cart-item-price">
                  <div class="price-detail">
                    <p v-if="item.cash_price * 1 > 0"><em>¥</em>{{item.cash_price}}</p>
                    <p v-if="item.coin_price * 1 > 0"><em>M</em>{{item.coin_price}}</p>
                  </div>
                  <div class="quantity-handel">
                    <button :class="[item.goods_number == 1 ? 'gary' : '', 'round-btn','iconfont', 'icon-minus']"
                            @click="changeQuantity({cart_id:item.cart_id,num:item.goods_number - 1,type:'decrease'})"></button>
                    <span class="quantity-detail">{{item.goods_number}}</span>
                    <button class="round-btn iconfont icon-add"
                            @click="changeQuantity({cart_id:item.cart_id,num:item.goods_number + 1,type:'increase'})"></button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <flexbox :gutter="0" wrap="wrap" slot="bottom" class="weui-tabbar cart-tabbar" style="height: 50px">
      <flexbox-item class="check-all-wrap">
        <div>
          <check-icon :value.sync="isSelectedAll" class="cart-check" >全选</check-icon>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div v-if="isEditMode" class="purchase-cot">
          <span style="font-size: 12px;padding-left: 5px">已选（{{selectedNum}}）</span>
        </div>
        <div v-else class="purchase-cot">
          <!--<span style="padding-right: 10px">合计：</span>-->
          <div style="padding-left: 5px">
            <p v-if="totalPrice > 0">
              现金：
              <span class="price-detail"><em>¥</em>{{totalPrice.toFixed(2)}}</span>
            </p>
            <p v-if="totalCoinBi > 0">
              秒币：
              <span class="price-detail"><em>M</em>{{totalCoinBi}}</span>
            </p>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item  :span="1/4" class="cart-submit-btn-wrap">
        <x-button type="warn" class="cart-submit-btn border-radius-0" v-if="isEditMode" :disabled="selectedNum == 0" @click.native="removeSelectedGoods">
          删除
        </x-button>
        <x-button type="warn" class="cart-submit-btn border-radius-0" v-else :disabled="selectedNum == 0" @click.native="checkOut">
          结算<span v-if="selectedNum != 0">({{selectedNum}})</span>
        </x-button>
      </flexbox-item>
    </flexbox>
  </view-box>
</template>
<script>
  import { CheckIcon, ViewBox, XHeader,XButton, Tabbar, TabbarItem, Loading,Flexbox,FlexboxItem } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  import { mapState, mapActions } from 'vuex'
  import _ from 'underscore';
  export default {
    created(){
      //获取购物车数据
      this.fetchCartList();
    },
    components: {
      CheckIcon,
      ViewBox,
      XHeader,
      XButton,
      Tabbar,
      TabbarItem,
      Flexbox,
      FlexboxItem,
      CommonHeader
    },
    computed:{
      ...mapState('mallCart',{
        isEditMode: 'isEditMode',
        goodsList: 'goodsList',
      }),
      //总产品数量
      totalSpecNum(){
        return this.goodsList.reduce((a,b)=>a + b.list.length,0)
      },
      //选中个数
      selectedNum(){
        return  _.chain(this.goodsList).pluck('list').flatten().filter(d=>d.is_checked == 1).value().length
      },
      //是否都选择
      isSelectedAll:{
        get(){
          let allGoods = _.chain(this.goodsList).pluck('list').flatten();
          let allGoodsNum = allGoods.value().length;
          return allGoodsNum === allGoods.flatten().filter(d=>d.is_checked == 1).value().length
        },
        set(selected){
          this.changeSelectAllGoods(selected)
        }
      },
      totalPrice(){
        return  _.chain(this.goodsList).pluck('list').flatten().filter(d=>d.is_checked == 1).reduce((a,b)=>a + b.cash_price * b.goods_number,0).value()
      },
      totalCoinBi(){
        return  _.chain(this.goodsList).pluck('list').flatten().filter(d=>d.is_checked == 1).reduce((a,b)=>a + b.coin_price * b.goods_number,0).value()
      }
    },
    methods:{
      ...mapActions('mallCart',[
        'fetchCartList',
        'startEditMode',
        'stopEditMode',
        'changeSelectSingleGoods',
        'changeSelectBatchGoods',
        'changeSelectAllGoods',
        'removeSelectedGoods',
        'changeQuantity'
      ]),
      checkOut(){
        let cartIds = _.chain(this.goodsList).pluck('list').flatten().filter(d=>d.is_checked == 1).pluck('cart_id')
        this.$router.push({'path': '/submitOrder',query:{
          cartId:cartIds.value().join(',')
          }})
      }
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  /*提交按钮*/
  .cart-submit-btn-wrap{
    align-self: stretch;
  }
  .cart-submit-btn{
    height: 100%;
    &.weui-btn_warn{
      background-color: @color2;
      &.weui-btn_disabled{
         background-color: #ccc;
         color: white;
       }
    }
    &.weui-btn:after{
        border-radius: 0;
        border:none
     }
  }
  .cart-tabbar{
    .vux-flexbox-item.check-all-wrap{
      padding-left: 10px;
      flex-grow: 0;
      flex-basis: 6rem;
    }
  }
  //选择按钮
  .cart-check{
    &.vux-check-icon > .weui-icon-success:before,
    &.vux-check-icon > .weui-icon-success-circle:before{
      color: @color2;
    }
    .weui-icon-circle,
    .weui-icon-success,
    .weui-icon-success-circle{
      font-size: 18px;
    }
  }
  /* 购物车列表
  ---------------------------------------------------------------- */
  .cart-list-wrap{
    height: 100%;
    background-color: #eee;
    overflow-y: auto;
    font-size: 12px;
  }
  .price-detail{
    font-size: 16px;
    line-height: 1.8rem;
    color: @color1;
    em{
      font-size: 12px;
      display: inline-block;
      width: 1em;
    }
  }
  .cart-list{
    background-color: #fff;
    &:not(:last-child){
      margin-bottom: 15px;
    }
    .cart-title{
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    /*列表容器*/
    .cart-list-cot{
      list-style: none;
      .cart-item{
        padding: 10px;
        &:not(:last-child){
          border-bottom: 1px solid #eee;
        }
        .cart-wrap{
          display: flex;
        }
        /*.cart-item-img*/
        &-img{
          text-align: center;
          display: flex;
          align-items: center;
          /*height: 9.5rem;*/
          &-wrap{
            margin-left: 5px;
            width: 95px;
            height: 95px;
            border:1px solid #eee;
          }
          img{
            max-width: 95px;
            max-height: 95px;
          }
        }
        /*.cart-item-detail*/
        &-detail{
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 10px;
        }
        /*.cart-item-desc*/
        &-desc{
          padding-right: 2em;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        /*.cart-item-price*/
        &-price{
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
      }
    }

    .round-btn{
      width: 24px;
      height: 24px;
      text-align: center;
      border-radius: 50%;
      padding: 5px;
      font-size: 12px;
      border:1px solid #ddd;
      color: #666;
      background-color: #fff;
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      -webkit-transform: scale(0.9);
      -moz-transform: scale(0.9);
      -ms-transform: scale(0.9);
      -o-transform: scale(0.9);
      transform: scale(0.9);
      &.gary{
        border-color:#eee;
        color: #ddd;
      }
    }
    .quantity-handel{
      .quantity-detail{
        font-size: 14px;
        font-weight: 600;
        margin: 0 5px;
        color: #444;
      }
    }
  }
</style>
<style lang="less" scoped>
  .purchase-cot{
    display: flex;
    font-size: 12px;
    align-items: center;
    .price-detail{
      font-size: 15px;
    }
  }
</style>
