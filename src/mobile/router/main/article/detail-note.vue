<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px">
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="leftOptions" >
      <span solt="default">留言</span>
    </x-header>
    <div class="article-detail-page">
        <div>
          <h1 class="title">{{article.title}}</h1>
          <div class="info">
            {{article.date}} <i>{{article.likeNum}}人秒赞</i>
          </div>
          <div>
            <p>
              {{notes.total}}人 评论
            </p>
            <div v-for="item in notes.list"
                         class="weui-media-box weui-media-box_appmsg"
                         :key="item.id"
                         style="padding: 10px"
            >
              <div class="weui-media-box__hd" style="height: 40px;height: 40px;background-color: #7bc549">
                <img :src="item.img" alt="" class="weui-media-box__thumb">
              </div>
              <div class="weui-media-box__bd">
                <!--<h4 class="weui-media-box__title">{{item.title}}</h4>-->
                <p class="weui-media-box__desc">{{item.desc}}</p>
                <!--<p class="weui-media-box__tip"> {{item.likeNum}}人秒赞</p>-->
              </div>
            </div>
          </div>


        </div>
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
      this.fetchArticleNoteList(this.route.params);
    },
    data:()=>({
      showNotePopup:false,
      isSending:false
    }),
    computed:{
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      }),
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState('articleDetailNote',['article','notes']),
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
      ...mapActions('articleDetailNote',{
        fetchArticleDetail:'fetchArticleDetail',
        fetchArticleNoteList:'fetchArticleNoteList'
      }),
      sendNote(){
          if(this.note){
              this.isSending = true;
              this.postNote().then((msg)=>{
                this.noteText = '';
                this.showNotePopup = false;
              }).finally(()=>{ this.isSending = false;});

          }
      }
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  @import "~@/style/article.less";
  @import "~@/lib/share/css/share.less";

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
