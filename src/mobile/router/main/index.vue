<template>
  <view-box ref="viewBox"  body-padding-bottom="50px">
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <tabbar class="main-tabbar" icon-class="vux-center"  slot="bottom" style="height: 50px;overflow: hidden">
      <tabbar-item :link="{path:'/'}" :selected="(/^\/article/.test(path) || path == '\/')" :title="path">
        <span class="iconfont icon-zan" slot="icon"></span>
        <span slot="label">秒赞</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/mall'}" :selected="/^\/mall/.test(path) && path!='/mall/cart'" >
        <span class="iconfont icon-bag" slot="icon"></span>
        <span slot="label">秒购</span>
      </tabbar-item>
      <tabbar-item  :link="{path:'/quick'}" :selected="/^\/quick/.test(path)">
        <span class="iconfont icon-light" slot="icon" style="position: relative;top: 2px"></span>
        <span slot="label">秒杀</span>
      </tabbar-item>
      <tabbar-item  :link="{path:'/raise'}" :selected="/^\/raise/.test(path)">
        <span class="iconfont icon-diamond" slot="icon" style="position: relative;top: 2px"></span>
        <span slot="label">秒筹</span>
      </tabbar-item>
      <!--开发环境临时链接-->
<!--      <tabbar-item :link="{path:'/mall/cart'}" :selected="/^\/mall\/cart/.test(path)" >
        <span class="iconfont icon-shopping-cart" slot="icon"></span>
        <span slot="label">购物车</span>
      </tabbar-item>-->
      <tabbar-item :link="'http://t13.zetadata.com.cn/m1/account_cen/'" :selected="/^\/user/.test(path)" show-dot>
        <span class="iconfont icon-user" slot="icon"></span>
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
