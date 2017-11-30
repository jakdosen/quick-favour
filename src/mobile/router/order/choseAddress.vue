<template>
  <div style="background: #fff;height: 100%">
    <common-header><span slot="default">选择地址</span></common-header>
    <view-box body-padding-top="46px">
        <checker v-model="chosePay"  type="radio" radio-required default-item-class="pay-default" selected-item-class="pay-selected">
          <checker-item value="1">
               <icon class="changeIcon" :type="chosePay==='1'? 'success':'circle'"></icon>
               <div>
                   <span>任冬冬 18862231223</span>
                   <span>苏州市工业园区2.5产业园A2-202</span>
               </div>
          </checker-item>
          <checker-item value="2">
               <icon class="changeIcon" :type="chosePay==='2'? 'success':'circle'"></icon>
               <div>
                 <span>任冬冬 18862231223</span>
                 <span>苏州市工业园区2.5产业园A2-202</span>
               </div>
          </checker-item>
        </checker>
    </view-box>
    <div class="newAddress">
        新增地址
    </div>
  </div>
</template>
<script>
  import { Checker, CheckerItem, Icon, ViewBox} from 'vux'
  import {mapGetters, mapState} from 'vuex'
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

    },
    data(){
      return {
        chosePay:'1',  // 选择地址
      }
    },
    computed: {

    },
    methods: {

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
