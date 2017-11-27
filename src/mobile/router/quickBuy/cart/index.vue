<template>
  <view-box ref="viewBox">
    <CommonHeader slot="header" :className="'colorHeader'">
      <span solt="default">
        购物车<span v-if="!!selectedIds.length">({{selectedIds.length}})</span>
      </span>
      <div slot="right">
        <span v-if="isEditMode" @click.capture.prevent="stopEditMode">完成</span>
        <span v-else @click.capture.prevent="startEditMode">编辑</span>
      </div>
    </CommonHeader>
    <div class="" style="padding-bottom: 42px;">

    </div>
    <flexbox :gutter="0" wrap="wrap" slot="bottom" class="weui-tabbar cart-tabbar" style="height: 42px">
      <flexbox-item class="check-all-warp">
        <div>
          <check-icon :value.sync="checkAll">全选</check-icon>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div v-if="isEditMode">
          <span>已选（{{selectedIds.length}}）</span>
        </div>
        <div v-else>

        </div>
      </flexbox-item>
      <flexbox-item  :span="1/4">
        <x-button type="warn" class="cart-submit-btn border-radius-0" v-if="isEditMode" :disabled="!selectedIds.length">
          删除
        </x-button>
        <x-button type="warn" class="cart-submit-btn border-radius-0" v-else :disabled="!selectedIds.length">
          结算<span v-if="!!selectedIds.length">({{selectedIds.length}})</span>
        </x-button>
      </flexbox-item>
    </flexbox>
  </view-box>
</template>
<script>
  import { CheckIcon, ViewBox, XHeader,XButton, Tabbar, TabbarItem, Loading,Flexbox,FlexboxItem } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        checkAll: false
      }
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
      ...mapState('mallCart',[
        'isEditMode',
        'goods',
        'selectedIds'
      ])
    },
    methods:{
      ...mapActions('mallCart',[
        'fetchCartList',
        'checkOut',
        'startEditMode',
        'stopEditMode',
        'selectGood',
        'removeSelectedGood'
      ])
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  /*提交按钮*/
  .cart-submit-btn{
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
    .vux-flexbox-item.check-all-warp{
      flex-grow: 0;
      flex-basis: 6rem;
    }

  }

</style>
