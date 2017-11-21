<template>
  <div class="c-page-padding">
    <x-header slot="header"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :left-options="{showBack:true}"
    >
      注册
    </x-header>
    <div style="padding-top:46px">
        <group class="weui-cells_form">
          <x-input  name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        </group>
        <group class="weui-cells_form">
          <x-input name="verifyCode" class="weui-vcode" placeholder="验证码">
            <x-button slot="right" type="primary" mini>发送验证码</x-button>
          </x-input>
        </group>
        <group class="weui-cells_form">
          <x-input name="password" placeholder="设置密码" type="password"></x-input>
        </group>
      </div>
  </div>
</template>

<script>
  import { XInput, Group, Cell, XButton, XHeader } from 'vux'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XHeader
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
  /*@import "../lib/sytle/flex.less";*/
</style>

