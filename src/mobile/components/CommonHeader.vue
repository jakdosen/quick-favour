<template>
    <!--searchHead有两种样式，一种白底黑字，一种红底白字-->
    <x-header v-bind:class="[className,'main-vux-header','vux-header']"
              :left-options="leftOptions"
    >
      <div slot="default">
        <slot name="default"></slot>
      </div>
      <div slot="right">
         <slot name="right"></slot>
      </div>
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
      },
      leftOptions:{
        type:Object,
        default:()=>{
          return {showBack:true,backText: ''}
        }
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import '../common.less';
  .whiteHeader {
    width:100%;
    position:absolute;
    left:0;
    top:0;
    z-index:100;
    color: #333;
    background-color: #fff !important;
  }
  .redHeader,.colorHeader{
      &.vux-header{
      .vux-header-left,
      .vux-header-right{
        color: #fff;
        }
      }
  }
  .colorHeader{
    background: -webkit-linear-gradient(left top, @color2, @color1);
  }
  .redHeader{
    background: #fd3442;
  }
</style>
