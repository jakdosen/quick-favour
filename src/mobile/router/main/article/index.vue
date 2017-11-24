<template>
  <div>
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="leftOptions" >
      <span solt="default">秒赞</span>
        <router-link slot="right"  to="article/rule" >
          <icon type="info-circle" style="color: white;font-size: 16px"></icon>
          <span style="vertical-align: middle">规则</span>
        </router-link>
    </x-header>
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view" style="padding-top: 46px"></router-view>
    </transition>
  </div>
</template>
<script>
  import { XHeader,Icon} from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    computed:{
      route: state => state.route,
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      }),
      ...mapState('common',{
        direction: state => state.direction
      }),
      leftOptions () {
        return {
          showBack: this.route.path !== '/'
        }
      },
    },
    components: {
      XHeader,
      Icon
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  @import "~@/style/article.less";

</style>
