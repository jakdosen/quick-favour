<template>
  <div style="background: #fff;height: 100%">
    <common-header><span slot="default">选择地址</span></common-header>
    <view-box body-padding-top="46px">
        <checker v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
          <checker-item :value="item.id" v-for="item in addressList" :key="item.id">
               <icon class="changeIcon" :type="chosePay===item.id? 'success':'circle'"></icon>
               <div>
                   <span>{{item.true_name + '  '+item.mobile}}</span>
                   <span>{{item.province+item.city+item.county+item.address}}</span>
               </div>
          </checker-item>
        </checker>
    </view-box>
    <div class="newAddress">
       <a onclick="window.location.replace('/m1/address/')"  style="width: 100%;height: 100%;display: block;color: #fff">
         新增地址
       </a>
    </div>
  </div>
</template>
<script>
  import { Checker, CheckerItem, Icon, ViewBox} from 'vux'
  import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      Checker,
      CheckerItem,
      ViewBox,
      Icon
    },
    created:function () {
//         每次加载重新获取数据
        this.update({addressList:[]})
//         发送获取地址列表请求
        this.addressListFn();
    },
    computed: {
      ...mapState('confirmOrder',['nowSelectAddressId','addressList']),
      chosePay:{
          get(){
             return this.nowSelectAddressId
          },
          set(v){
             this.update({nowSelectAddressId:v})
          }
      }
    },
    methods: {
      ...mapActions('confirmOrder',['addressListFn']),
      ...mapMutations('confirmOrder',['update'])
    }
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~@/lib/style/flex.less";
  @import '~@/common.less';
.pay-default{
padding: 0 1rem;
margin-top: 1rem;
.flexbox;
.justify-content(space-between);
  >div{
     width: 100%;
     padding-left:1rem;
     span{
       font-size: 1.4rem;
       display: block;
     }
  }
  .changeIcon{
     transform: translate3d(0,50%,0);
     margin-top: -23px;
  }
}
.newAddress{
   position: absolute;
   bottom: 0;
   font-size: 1.6rem;
   width: 100%;
   color: #fff;
   text-align: center;
   line-height: 46px;
   background: @color1;
}
</style>
