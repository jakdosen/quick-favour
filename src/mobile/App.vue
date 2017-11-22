<template>
  <div style="height: 100%">
    <loading :show="isLoading"></loading>
    <!--头部-->
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import {ViewBox,Loading} from 'vux'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    components: {
      ViewBox,
      Loading
    },
    computed: {
      ...mapState('common', {
        isLoading: state => state.isLoading,
        direction: state => state.direction
      }),
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import 'common.less';
</style>
