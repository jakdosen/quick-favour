<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px" body-padding-bottom="0">
    <x-header slot="header" class="main-vux-header article-vux-header">
      <span solt="default">秒赞规则</span>
    </x-header>
    <div class="article-detail-page" style="height: 100%">
        <div v-html="rule">

        </div>
    </div>
  </view-box>
</template>
<script>
  import Vue from 'vue'
  import api from '^/utils/api'
  const { article } = api
  import { Group, Cell, ViewBox, XHeader,Flexbox,FlexboxItem,Icon,Popup,XButton,XTextarea,TransferDom} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    created(){
      this.fetchRule();
    },
    data:()=>({
      rule:""
    }),
    components: {
      Group,
      Cell,
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
    },
    methods:{
      fetchRule(){
        Vue.http.get(article.rule).then((resp)=>{
        	this.rule = resp.data
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
