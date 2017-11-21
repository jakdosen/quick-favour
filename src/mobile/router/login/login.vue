<template>
  <div class="c-page-padding" style="height: 100%;background: #fff">
    <flexbox orient="horizontal" justify="center"  style="height: 100%">
      <flexbox-item>
        <!--头部logo-->
        <div class="login-logo">
          <span>妙趣</span>
        </div>
        <!--输入账号密码-->
        <div style="margin-left: -15px">
          <x-input placeholder="手机号码" class="inputFont" :value="userPhone" @input="updateUserPhone" type="tel"  is-type="china-mobile"></x-input>
          <x-input placeholder="密码" class="inputFont" :value="userPassWord" @input="updateUserPassWord" type="password"></x-input>
        </div>
        <!--注册账号/忘记密码-->
        <div class="flex-container space-between" style="margin: .5rem 0 1.5rem">
          <router-link class="font-style" to="/register">注册账号</router-link>
          <router-link class="font-style" to="/register?type=forget">忘记密码</router-link>
        </div>
        <!--提交登录-->
        <div>
          <x-button class="login-btn" @click.native="loginInto" type="primary"> 登录</x-button>
        </div>
        <!--第三方登录-->
        <div class="login-other">
          <fieldset>
            <legend align="center">使用第三方登录</legend>
          </fieldset>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {XInput, Group, Cell, XButton, Flexbox, FlexboxItem} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      Flexbox,
      FlexboxItem
    },
    // 这种形式使用model需要当心
    computed: {
      ...mapState('login', {
        userPhone: 'userPhone',
        userPassWord: 'userPassWord'
      })
    },
    methods: {
      loginInto () {
        this.userPhone.length && this.userPassWord.length && /^1[34578]\d{9}$/.test(this.userPhone) &&
        this.$store.dispatch('login/loginInto')
      },
      updateUserPhone(value){
        this.$store.commit('login/updateUserPhone',value)
      },
      updateUserPassWord(value){
        this.$store.commit('login/updateUserPassWord',value)
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common.less';
  @import "../../lib/style/flex.less";

  .flex-container {
  .flexbox;
  }

  .space-between {
  .justify-content(space-between);
  }

  .login-logo {
    margin-bottom: 3rem;
    text-align: center;
  }

  .login-logo span {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    background: @color1;
    color: #fff;
  }

  .login-other {
    margin-top: 3rem;
    text-align: center;
  }

  .login-other fieldset {
    border: 0;
    border-top: 1px solid #e4e4e4;
    width: 80%;
    display: inline-block;
  }

  .login-other legend {
    color: @color5;
    background-color: #fff;
    font-size: 1.2rem;
    padding: 0 10px;
  }

  .font-style {
    color: #666;
    font-size: 1.2rem;
  }
</style>

