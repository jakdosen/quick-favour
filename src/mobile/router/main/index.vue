<template>
  <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <tabbar class="main-tabbar" icon-class="vux-center">
      <tabbar-item :link="{path:'/'}" :selected="(/^\/article/.test(path) || path == '\/')" :title="path">
        <span class="tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
        <span slot="label">秒赞</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/mall'}" :selected="/^\/mall/.test(path)" >
        <span class="demo-icon-22" slot="icon">&#xe633;</span>
        <span slot="label">秒购</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/user'}" :selected="/^\/user/.test(path)" show-dot>
        <span class="demo-icon-22" slot="icon">&#xe630;</span>
        <span slot="label">会员</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>
<script>
  import { Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, TransferDom } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    computed:{
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      })
    },
    components: {
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem
    }
  }
</script>
<style lang="less">
  @import '../../common.less';
  @import "../../lib/style/flex.less";
</style>
