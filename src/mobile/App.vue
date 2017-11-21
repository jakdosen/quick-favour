<template>
  <div id="app">
    <loading :show="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Loading} from 'vux'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    components: {
      Loading
    },
    computed: {
      ...mapState('common', {
        isLoading: state => state.isLoading
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  html,body,#app{
    min-height: 100%;
  }
  body {
    background-color: #fbf9fe;
  }
</style>
