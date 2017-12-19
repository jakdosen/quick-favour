<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px" body-padding-bottom="0">
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="leftOptions" >
      <span solt="default">留言</span>
    </x-header>
    <div class="article-detail-page" style="height: 100%">
      <vue-better-scroll
        style="height:100%"
        class="wrapper"
        ref="scroll"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="onPullingUp">
        <div>
          <h1 class="title">{{article.title}}</h1>
          <div class="info">
            {{article.date}} <i>{{article.likeNum}}人秒赞</i>
          </div>
          <div>
            <p>
              {{pagination.total}}人 评论
            </p>

              <div v-for="item in notes"
                         class="weui-media-box weui-media-box_appmsg"
                         :key="item.id"
                         style="padding: 10px"
            >
              <div class="weui-media-box__hd" style="height: 40px;height: 40px;background-color: #7bc549">
                <img :src="item.user.avatar" alt="" class="weui-media-box__thumb">
              </div>
              <div class="weui-media-box__bd">
                <!--<h4 class="weui-media-box__title">{{item.title}}</h4>-->
                <p class="weui-media-box__desc">{{item.desc}}</p>
                <!--<p class="weui-media-box__tip"> {{item.likeNum}}人秒赞</p>-->
              </div>
            </div>

          </div>
        </div>
      </vue-better-scroll>
    </div>
  </view-box>
</template>
<script>
  import { Group, Cell, Badge, ViewBox, XHeader,Flexbox,FlexboxItem,Icon,Popup,XButton,XTextarea,TransferDom} from 'vux'
  import { mapState, mapActions ,mapMutations} from 'vuex'
  import VueBetterScroll  from 'vue2-better-scroll'
  export default {
    directives: {
      TransferDom
    },
    created(){
      this.fetchDetail({articleId:this.articleId,page:1});
      this.clearNoteList();
    },
    data:()=>({
      // article_id:this.route.params.article_id,
      showNotePopup:false,
      pullUpLoadObj: {
        threshold: 20,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      }
    }),
    computed:{
      articleId:{
          get(){
            return this.route.params.articleId
          }
        },
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      }),
      ...mapState('common',{
        direction: state => state.direction
      }),
      ...mapState('articleDetailNote',['article','notes','pagination','isLoading']),

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
      XButton,
      VueBetterScroll
    },
    methods:{
      ...mapActions('articleDetailNote',{
        fetchDetail:'fetchDetail',
      }),
      ...mapMutations('articleDetailNote',['clearNoteList']),
      onPullingUp(){
        // 防止请求多次
        if(this.isLoading)  return;
        const {current_page, total_pages} = this.pagination;
        this.$store.dispatch('articleDetailNote/fetchDetail', {articleId:this.articleId,page: current_page + 1});
        setTimeout(()=>{
          if (current_page < total_pages) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
        },300);
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
