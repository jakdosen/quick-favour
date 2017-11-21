<template>
  <div class="c-page-padding">
    <x-header slot="header"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;background: #fff;color: #333"
              :left-options="{showBack:true,backText: ''}"
    >
      {{!isForgetPassWord? '注册': '忘记密码'}}
    </x-header>
    <div style="padding-top:46px">
      <div class="marginBtom" style="margin-left: -15px">
        <x-input class="inputFont" :value="userPhone" @input="updateUserPhone" name="mobile" :show-clear="true" placeholder="手机号码" type="tel"
                 is-type="china-mobile"></x-input>
        <x-input class="inputFont weui-vcode" :value="userNewPassWord" @input="updateUserNewPassWord" :show-clear="false" name="verifyCode" placeholder="验证码">
          <x-button slot="right" class="stateCode" @click.native="sendStateCode" type="primary" mini>{{ stateCodeSuggest }}</x-button>
        </x-input>
        <x-input class="inputFont" name="password" :value="stateCode" @input="updateStateCode" placeholder="设置密码" type="password" :show-clear="false"></x-input>
      </div>
      <div class="submitBtn">
        <x-button class="login-btn" type="primary" @click.native="submitInto"> {{!isForgetPassWord? '提交': '找回'}}</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, Cell, XButton, XHeader} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  export default {
    created: function(){
      this.updateForgetPassWord(Boolean(this.$route.query.type||''));
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XHeader
    },
    computed: {
      ...mapState('register', {
        userPhone: 'userPhone',
        userNewPassWord: 'userNewPassWord',
        stateCode: 'stateCode',
        stateCodeSuggest: 'stateCodeSuggest',
        isForgetPassWord: 'isForgetPassWord'
      })
    },
    methods: {
      sendStateCode(){
         if(this.stateCodeSuggest !== '发送验证码') return;
         let time = 59;
         const timeOut = ()=>{
           setTimeout(()=>{
             let nowTime = time--
             if(!nowTime){
               this.updateSendStateCode('发送验证码');
               return;
             }
             timeOut();
             this.updateSendStateCode(nowTime+'s');
           },1000);
         }
        timeOut();
      },
      submitInto () {
        this.userPhone.length && this.userNewPassWord.length && /^1[34578]\d{9}$/.test(this.userPhone) &&
        this.$store.dispatch('register/submitInto')
      },
      updateUserPhone(value){
        this.$store.commit('register/updateCommon',{userPhone:value})
      },
      updateUserNewPassWord(value){
        this.$store.commit('register/updateCommon',{userNewPassWord:value})
      },
      updateStateCode(value){
        this.$store.commit('register/updateCommon',{stateCode:value})
      },
      updateSendStateCode(value){
        this.$store.commit('register/updateSendStateCode',value)
      },
      updateForgetPassWord(value){
        this.$store.commit('register/updateCommon',{isForgetPassWord:value})
      }
    }
  }
</script>

<style lang="less">
  @import '../../common.less';
  @import "../../lib/style/flex.less";

  .vux-header .vux-header-left .left-arrow:before {
    border-color: @color4 !important;
  }

  .vux-header .vux-header-title, .vux-header .vux-header-left a {
    color: @color4 !important;
  }

  .marginBtom {
    margin-bottom: 2.5rem;
  }
</style>

