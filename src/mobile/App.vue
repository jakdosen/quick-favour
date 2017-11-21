<template>
  <view-box ref="viewBox">
    <loading :show="isLoading"></loading>
    <!--头部-->
    <transition
      @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
      :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
  </view-box>
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
  html,body,#app{
    height: 100%;
  }
  body {
    background-color: #fbf9fe;
  }
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
