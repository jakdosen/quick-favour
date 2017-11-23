<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px" body-padding-bottom="40px">
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="{showBack:true}" >
      <span solt="default">秒赞 - 文章</span>
      <router-link slot="right"  to="article/rule">
        <icon type="info-circle" style="color: white;font-size: 16px"></icon>
        <span style="vertical-align: middle">规则</span>
      </router-link>
    </x-header>

    <div>
        <h4>{{article.title}}</h4>
        <div v-html="article.detail"></div>
    </div>
    <flexbox :gutter="0" wrap="wrap" slot="bottom" class="article-footer">
      <flexbox-item :span="1/4" class="vux-1px-r" style="text-align: center" @click.native="showNotePopup = true">留言...</flexbox-item>
      <flexbox-item><div></div></flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <popup v-model="showNotePopup" position="bottom" max-height="50%">
        <div style="background-color:#fff;margin:0 auto;padding:0 15px;">

          <x-textarea :max="100" :placeholder="'写写你看了的感受~~'" class="article-note" v-model="note"></x-textarea>

          <div style="padding:20px 0px;">
            <x-button type="primary" @click.native="sendNote">发送</x-button>
          </div>
        </div>
      </popup>
    </div>
  </view-box>
</template>
<script>
  import { Group, Cell, Badge, ViewBox, XHeader,Flexbox,FlexboxItem,Icon,Popup,XButton,XTextarea,TransferDom} from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    created(){
        this.fetchArticleDetail()
    },
    data:()=>({
      showNotePopup:false,
      note:''
    }),
    computed:{
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState('articleDetail',['article','sharable']),
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      })
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
        fetchArticleDetail:'fetchArticleDetail'
      }),
      sendNote(){
        this.note;
        debugger
      }
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  @import "~@/style/article.less";
  .article-footer{
    position: absolute;
    height: 40px;
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
</style>
