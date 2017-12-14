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
          <x-input placeholder="手机号码" class="inputFont"  :value="userPhone" @input="updateUserPhone" type="tel"  is-type="china-mobile"></x-input>
          <x-input placeholder="密码" class="inputFont" :value="userPassWord" @input="updateUserPassWord" :type="openEye ? 'text':'password'">
              <span slot="right" class="iconfont" :class="openEye ? 'icon-openEye':'icon-closeEye'" style="margin-left: 5px" @click="openEye=!openEye"></span>
          </x-input>
        </div>
        <!--注册账号/忘记密码-->
        <div class="flex-container space-between" style="margin: .5rem 0 1.5rem">
          <router-link class="font-style" to="/register?type=add">注册账号</router-link>
          <router-link class="font-style" to="/register?type=forget">忘记密码</router-link>
        </div>
        <!--提交登录-->
        <div>
          <x-button class="login-btn" @click.native="loginInto" type="primary"> 登录</x-button>
        </div>
        <!--第三方登录-->
        <div class="login-other " style="display: none">
          <fieldset>
            <legend align="center">使用第三方登录</legend>
          </fieldset>
          <div class="login-other-account">
             <span class="iconfont icon-wechat-cc"></span>
             <span class="iconfont icon-alipay"></span>
          </div>
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
    data(){
       return {
           openEye:false
       }
    },
    // 这种形式使用model需要当心
    computed: {
      ...mapState('login', [
        'userPhone',
        'userPassWord'
      ])
    },
    methods: {
      loginInto () {
        if(!this.userPhone.length|| !/^1[34578]\d{9}$/.test(this.userPhone)){
          this.$vux.totast.text('请输入正确的手机号码')
        }else if(!this.userPassWord.length){
          this.$vux.totast.text('请输入用户密码')
        }else{
          this.$store.dispatch('login/loginInto',{account:this.userPhone,password:this.userPassWord})
        }
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
  .login-other-account{
    margin-top:2rem;
    span{
      border-radius: 100%;
      padding: .5rem;
      font-size: 3rem;
      border:1px solid #e4e4e4;
      &:first-child{
          color: #3eb135;
           margin-right: 2rem;
       }
      &:last-child{
         color: #00a7ff
       }
    }
  }
  .font-style {
    color: #666;
    font-size: 1.2rem;
  }
</style>

