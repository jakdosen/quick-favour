<template>
    <!--searchHead有两种样式，一种白底黑字，一种红底白字-->
    <x-header v-bind:class="className"
              :left-options="{showBack:true,backText: ''}"
    >
      <slot name="title"></slot>
    </x-header>
</template>
<script>
  import {XHeader } from 'vux'
  export default {
    components: {
      XHeader
    },
    data(){
      return {
      }
    },
    props:{
      className:{
        type: String,
        default() {
          return 'whiteHeader';
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '../common.less';
  .whiteHeader {
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
    background: #fff;
    color: #333
  }
  .colorHeader{
    background: -webkit-linear-gradient(left top, @color2, @color1);
  }
</style>
