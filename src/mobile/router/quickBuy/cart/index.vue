<template>
  <view-box ref="viewBox"  body-padding-bottom="55px">
    <CommonHeader slot="header" :className="'colorHeader'">
      <span solt="default">
        购物车<span>(3)</span>
      </span>
      <div slot="right">
        <span v-if="editState">完成</span>
        <span v-else>编辑</span>
      </div>
    </CommonHeader>


  </view-box>
</template>
<script>
  import { Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      CommonHeader
    },
    data:()=>({
      editState:false
    })
  }
</script>
<style lang="less">

</style>
