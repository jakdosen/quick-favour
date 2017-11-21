<template>
  <div class="c-page-padding">
     <div>
       <div style="margin-left: -15px">
         <x-input placeholder="请输入手机号码" type="tel"  is-type="china-mobile"></x-input>
         <x-input placeholder="请输入密码" type="password"></x-input>
       </div>
     </div>
  </div>
</template>

<script>
  import { XInput, Group, Cell, XButton } from 'vux'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    computed: {
//      ...mapGetters('loadingStore',{
//        products: 'cartProducts'
//      })
    },
    methods: {
//      checkout (products) {
//        this.$store.dispatch('login', products)
//      }
    }
  }
</script>

<style lang="less">
   @import "../lib/sytle/flex.less";
</style>

