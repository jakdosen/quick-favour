<template>
  <div class="c-page-padding">
    <x-header slot="header"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;background: #fff;color: #333"
              :left-options="{showBack:true,backText: ''}"
    >
      {{navTitle[String(isForgetPassWord)]}}
    </x-header>
    <div style="padding-top:46px">
      <div class="marginBtom" style="margin-left: -15px">
        <x-input class="inputFont" v-model="userPhone"  name="mobile" :show-clear="true" placeholder="手机号码" type="tel"
                 is-type="china-mobile"></x-input>
        <x-input class="inputFont weui-vcode" v-model = 'stateCode'  :show-clear="false" name="verifyCode" placeholder="验证码">
          <x-button slot="right" class="stateCode" @click.native="sendStateCode" type="primary" mini>{{ stateCodeSuggest }}</x-button>
        </x-input>
        <x-input v-if="isForgetPassWord!='bindPhone'" class="inputFont" name="password" v-model="userNewPassWord"  @input="updateStateCode" placeholder="设置密码" :type="openEye ? 'text':'password'" :show-clear="false">
          <span slot="right" class="iconfont" :class="openEye ? 'icon-openEye':'icon-closeEye'" style="margin-left: 5px" @click="openEye=!openEye"></span>
        </x-input>
      </div>
      <div class="submitBtn">
        <x-button class="login-btn" type="primary" @click.native="submitInto"> {{ btnTitle[String(isForgetPassWord)]}}</x-button>
        <p class="bindLink" v-if="isForgetPassWord ==='bindNoPhone'" @click="changeBind('bindPhone')" >已注册手机绑定</p>
        <p class="bindLink" v-if="isForgetPassWord ==='bindPhone'"  @click="changeBind('bindNoPhone')">未注册手机绑定</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {XInput, Group, Cell, XButton, XHeader} from 'vux'
  import {mapGetters, mapState,mapMutations} from 'vuex'
  export default {
    created: function(){
      this.updateForgetPassWord(this.$route.query.type||'add');
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XHeader
    },
    data(){
      return {
        openEye:false,
        userPhone:'',
        stateCode:'',
        userNewPassWord:'',
      }
    },
    computed: {
      ...mapState('register', [
        'stateCodeSuggest',
        'isForgetPassWord',
        'navTitle',
        'btnTitle'
      ])
    },
    methods: {
      ...mapMutations('register',['updateCommon']),
      sendStateCode(){
         if(this.stateCodeSuggest !== '发送验证码'||!this.userPhone) return;
         this.$store.dispatch('register/sendCode',{mobile:this.userPhone});
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
        if(!this.userPhone.length||!/^1[34578]\d{9}$/.test(this.userPhone)){
          this.$vux.toast.text('请输入正确的手机号码')
        }else if(!this.stateCode.length){
          this.$vux.toast.text('请输入验证码')
        }else if(!this.userNewPassWord.length&&this.isForgetPassWord!=='bindPhone'){
          this.$vux.toast.text('请输入用户密码')
        }
        let payload = {account:this.userPhone,password:this.userNewPassWord,code:this.stateCode};

        switch (this.isForgetPassWord){
          case 'add':
              this.$store.dispatch('register/register',payload);
              break;
          case 'forget':
            this.$store.dispatch('register/resetPassword',payload);
            break;
          case 'bindNoPhone':
              payload = {mobile:this.userPhone,code:this.stateCode,password:this.userNewPassWord,registered:0};
              this.$store.dispatch('register/thirdRegister',payload);
            break;
          case 'bindPhone':
            payload = {mobile:this.userPhone,code:this.stateCode,registered:1}
            this.$store.dispatch('register/thirdRegister',payload);
            break;
        }
      },
      changeBind(val){
         this.updateCommon({isForgetPassWord:val});
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
  .bindLink{
    font-size: 1.4rem;
    color: #ccc;
    line-height: 5rem;
    text-align: right;
    width: 100%;
    display: block;
  }
</style>

