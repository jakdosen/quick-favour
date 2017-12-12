<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px" body-padding-bottom="45px">
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="leftOptions" >
      <span solt="default">秒赞 - 文章</span>
    </x-header>
    <div class="article-detail-page">
        <div>
          <h1 class="title">{{article.title}}</h1>
          <div class="info">
            {{article.date}} <i>{{article.likeNum}}人秒赞</i>
          </div>
          <!--文章内容-->
          <div v-html="article.detail" class="content"></div>
        </div>
    </div>
    <flexbox :gutter="0" wrap="wrap" slot="bottom" class="article-footer">
      <flexbox-item :span="1/4" class="vux-1px-r" style="text-align: center" @click.native="isShowNotePopup = true">
        <span class="iconfont icon-note" style="ont-size: 2.1rem; vertical-align: middle;"></span>
        留言...
      </flexbox-item>
      <flexbox-item>
        <div class="social-share" data-sites="wechat,weibo,qq,qzone,tencent">

        </div>
      </flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <popup v-model="isShowNotePopup" position="bottom" max-height="50%">
        <div style="background-color:#fff;margin:0 auto;padding:0 15px;">
          <x-textarea :max="100" :placeholder="isLogin?'写写你看了的感受~~':'登录后发表评论'" :readonly="!isLogin" class="article-note" v-model="noteText" @click.native="isLogin || $store.dispatch('common/toLogin')"></x-textarea>
          <div style="padding:20px 0px;">
            <x-button type="primary" @click.native="isLogin?sendNote():$store.dispatch('common/toLogin')" :disabled="isSending">发送</x-button>
          </div>
        </div>
      </popup>
    </div>
  </view-box>
</template>
<script>
  import { Group, Cell, Badge, ViewBox, XHeader,Flexbox,FlexboxItem,Icon,Popup,XButton,XTextarea,TransferDom} from 'vux'
  import { mapState, mapActions } from 'vuex'
  import '@/lib/share/js/social-share'
  import '@/lib/share/js/qrcode'
  export default {
    directives: {
      TransferDom
    },
    created(){
      this.fetchArticleDetail(this.route.params);
    },
    mounted() {
      //初始化分享
      socialShare('.social-share');

    },
    data:()=>({
      isShowNotePopup:false,
      isSending:false
    }),
    computed:{
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      }),
      ...mapState('common',{
        isLogin: state => state.isLogin,
        direction: state => state.direction
      }),
      ...mapState('articleDetail',['article','sharable','note']),
      noteText:{
        get () {
          return this.note
        },
        set (v) {
          this.changeNode(v)
        }
      },
      leftOptions () {
        return {
          showBack: !!window.history.length
        }
      },
    },
    components: {
      Group,
      Cell,
      ViewBox,
      XHeader,
      XTextarea,
      Flexbox,
      FlexboxItem,
      Icon,
      Popup,
      XButton
    },
    methods:{
      ...mapActions('articleDetail',{
        fetchArticleDetail:'fetchArticleDetail',
        changeNode:'changeNode',
        postNote:'postNote'
      }),
      sendNote(){
        if(this.note){
          this.isSending = true;
          this.postNote(this.route.params).then((msg)=>{
            this.noteText = '';
            this.isShowNotePopup = false;
            this.goToNoteDetail();
          }).finally(()=>{
              this.isSending = false;
          });
        }
      },
      goToNoteDetail(){
        this.$router.push({
          name:'article-detail-note',
          params:this.route.params
        })
      }
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  @import "~@/style/article.less";
  @import "~@/lib/share/css/share.less";
  .article-footer{
    position: absolute;
    height: 45px;
    z-index: 500;
    bottom: 0;
    width: 100%;
    background-color: #efefef;
    .vux-flexbox-item{
      padding: 0 10px;
    }
  }
  .article-note{
    &.vux-x-textarea{
        padding: 15px 0 10px;
     }
    textarea{
      padding: 10px;
      background-color: #efefef;
    }
  }
  .social-share{
    display: flex;
    justify-content: space-around;
  }
  .article-detail-page{
    padding: 10px;
    .title{
      font-size: 2rem;
      font-weight: 700;
      padding: 0 0 1rem;
    }
    .info{
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0 0 .5rem;
      color: #888;
    }
    .content{
      font-size:1.4rem;
      color:#404040;
      img{
        max-width: 100%;
      }
      p{
        margin: .6rem 0;
        text-align: justify;
        text-indent: 2em;
      }
    }
  }
</style>
