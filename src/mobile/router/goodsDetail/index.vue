<template>
  <view-box ref="viewBox" body-padding-bottom="45px">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <!--通用的选择规格-->
    <div class="buy-choseType">
      <!--点击选择规格参数-->
      <popup v-model="popupShow" position="bottom" max-height="90%">
        <div class="clearfix" style="background: #fff;padding: 0 1rem">
          <div class="buy-choose-goods">
            <div class="imgBox"><img :src="list.goods_thumb" alt=""></div>
            <div class="info">
              <span>
              <i v-if="list.goods_type==1||list.goods_type==3"><small>￥</small>{{ changeBuyCashPrice || list.cash_price}}</i>
              <s v-if="list.goods_type==3">&</s>
              <b v-if="list.goods_type==2||list.goods_type==3"><small>M</small>{{ changeBuyCoinPrice || list.coin_price}}</b>
              </span>
              <p>商品编号：{{list.goods_sn}}</p>
              <span><i v-if="list.goods_type==1||list.goods_type==3">元</i><b v-if="list.goods_type==2||list.goods_type==3">秒</b></span>
            </div>
          </div>
          <div class="chose-list" :data-title="item.name" v-for="(item,index) in list.specification" :key="index">
            <checker
              default-item-class="check-border-1px"
              selected-item-class="check-border-active"
              @on-change="changeSpec"
            >
              <checker-item style="margin-right: 5px;" :key="item_child.id" v-for="item_child in item.value" :value="index+';'+item_child.id+';'+(item_child.cash_price||0)+';'+(item_child.coin_price||0)" > {{item_child.label}} </checker-item>
            </checker>
          </div>
          <group class="buy-chose-list-num">
            <x-number v-model="buyNum" title="购买数量"  :min="1"></x-number>
          </group>
        </div>
        <div class="buy-chose-btn">
          <span @click="addToMallCart(true)" v-if="popupShowButton != 2"  style="background: #ff8c00">加入购物车</span>
          <span @click="addToMallCart(false)" v-if="popupShowButton != 1"  style="background: #ff5300">立即购买</span>
        </div>
      </popup>
    </div>
    <!--通用的购物快捷导航-->
    <div class="goods-buy">
      <div class="goods-buy-item1">
         <span @click="openHome">
           <em class="iconfont icon-home"></em><br>
           首页
         </span>
         <span @click="openMallCart">
           <em class="iconfont icon-shopping-cart"></em><br>
           购物车</span>
         <span @click="openCustomDialog">
           <em class="iconfont icon-customer-service"></em><br>
           客服</span>
      </div>
      <div class="goods-buy-item2">
         <span @click="openPopup(1)">加入购物车</span>
         <span @click="openPopup(2)">立即购买</span>
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
               <!--<a href="">QQ客服</a>-->
             </div>
        </div>
      </x-dialog>
    </div>
  </view-box>
</template>
<script>
  import {Popup, Checker, XNumber,CheckerItem,Grid, Group,GridItem, ViewBox, XDialog,TransferDomDirective as TransferDom} from 'vux'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Grid,
      GridItem,
      ViewBox,
      XDialog,
      Popup,
      Checker,
      Group,
      CheckerItem,
      XNumber
    },
    data(){
        return{
            buyNum:1,
            showCustomDialog:false,
            buyNumValue:'1',
            coinList:[],
            cashList:[],
            changeBuyCashPrice:'',
            changeBuyCoinPrice:''
        }
    },
    created(){
      !this.list.length  && this.$router.push({path:'/goods/'+this.$route.params.id})
      this.update({selectSpec:[]})
    },
    computed:{
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      }),
      ...mapState('goodsDetail',['list','popupShowOpen','popupShowButton','selectSpec']),
      popupShow:{
        get () {
          return this.popupShowOpen
        },
        set (v) {
          this.update({popupShowOpen:v})
        }
      },
      specification:{
        get () {
          return this.selectSpec
        },
        set (v) {
          this.update({selectSpec:v})
        }
      }
    },
    methods:{
      ...mapMutations('goodsDetail',['update']),
      ...mapActions('goodsDetail',['create']),
      openCustomDialog() {
            this.showCustomDialog=true;
      },
      openHome(){
          this.$router.push('/')
      },
      openMallCart(){
        this.$router.push('/mall/cart')
      },
      changeSpec(val){
        // value 有4个值，第一个为组，第二个为规格ID，第三个为现金 第四个为秒币
        let value = val.split(';'),index = value[0];
        const calc = (obj) =>{
            let
              price = obj === 'cash' ? this.list.cash_price:this.list.coin_price,
              data = obj === 'cash' ? this.cashList:this.coinList;
            data.map((obj)=>{
              if(!obj)  return;
              price = Number(price) + Number(obj)
            })
          obj === 'cash' ? this.changeBuyCashPrice= Math.max(price,0) : this.changeBuyCoinPrice = Math.max(price,0);
        }
        this.specification[index]= value[1];
        this.cashList[index]= value[2];
        this.coinList[index]= value[3];
        calc('cash');
        calc('coin');
      },
      openPopup(val){
         this.update({popupShowOpen:true,popupShowButton:val})
      },
      addToMallCart(flag){
         if(this.list.specification.length&&!this.specification.length){
             this.$vux.toast.text('请选择一个规则');
             return;
         }
         let args ={goods_id:this.$route.params.id
           ,number:this.buyNum
           ,spec:this.specification.join(',')};
         if(flag){
           this.create(args);
           this.$vux.toast.text('加入购物车成功');
         }else{
           this.$router.push({path:'/submitOrder',query:{...args}});
         }
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
  .flex-grow(2);
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
    margin-top: 4px;
    font-size: 1.6rem;
    /*background: #e4e4e4;*/
  }

  .goods-buy-item2 {
  .flex-grow(3);
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
        background: url('~@/publice/img/goodDetail-01.png') no-repeat center center @color1;
        background-size: contain;
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
        /*&:last-child{*/
           /*margin-top: 1rem;*/
            /*color: #5dbf10;*/
            /*background: #fff;*/
         /*}*/
      }
  }

  .buy-choseType{
  .buy-chose-btn{
    width: 100%;
    height: 45px;
    color:#fff;
    line-height: 45px;
  .flexbox;
  span{
    display: inline-block;
    text-align: center;
    font-size:1.4rem;
    width: 100%;
  .order(1);
  /*&:first-child{*/
     /*background: #ff8c00;*/
   /*}*/
  /*&:last-child{*/
     /*background: #ff5300;*/
   /*}*/
  }
  }
  .buy-choose-goods{
  .flexbox;
  .imgBox{
    width: 32%;
    padding: 1.5rem 15px;
  img{
    width: 100%;
    height: 100%;
  }
  }
  .info{
    padding-top: 2rem;
    font-size:1.2rem;
    color: #666;
  p{
    line-height: 2.5;
  }
  span{
  small{
    font-size: 1rem;
  }
  &:first-child{
     color: @color2;
   }
  &:last-child{
  i,b{
    display: inline-block;
    margin-right: 5px;
    border-radius: 2px;
    padding: 2px 5px;
    background: @color1;
    color: #fff;
  }
  i{
    background: #822eef;
  }
  }
  }
  }
  }
  }
</style>
