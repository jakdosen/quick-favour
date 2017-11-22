<template>
  <div>
    <x-header slot="header" class="main-vux-header article-vux-header" :left-options="{showBack:true,backText: ''}" >
      <span solt="default">秒赞</span>
      <span  slot="right" >
          <span style="vertical-align: middle"><x-icon type="ios-information-outline" size="20" style="fill:#fff;position:relative;"></x-icon></span>
          <span style="vertical-align: middle">规则</span>
        </span>
    </x-header>
    <!--swiper-->
    <swiper :list="swiperList" loop auto style="margin:0 auto;" height="100px" dots-class="custom-bottom" dots-position="center"></swiper>
    <!--panel-->
    <div v-for="article in articleList" class="weui-panel weui-panel_access article-weui-panel">
      <div class="weui-panel__hd">{{article.date}}</div>
      <div class="weui-panel__bd">
        <a v-for="item in article.list" href="#!/component/cell" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd">
            <img :src="item.img" alt="" class="weui-media-box__thumb">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">{{item.desc}}</p>
            <p class="weui-media-box__tip"> {{item.likeNum}}人秒赞</p>
          </div>

        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import { XHeader,Swiper} from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    created(){
        this.fetchSwiperData();
        this.fetchArticleData();
    },
    computed:{
      ...mapState('articleIndex',{
        swiperList:'swiperList',
        articleList:'articleList'
      })
    },
    components: {
      XHeader,
      Swiper
    },
    methods:{
      ...mapActions('articleIndex',{
        fetchSwiperData:'fetchSwiperData',
        fetchArticleData:'fetchArticleData'
      })
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  .main-vux-header{
    &.vux-header{
       width:100%;
       position:absolute;
       left:0;
       top:0;
       z-index:100;
     }
  }
  .article-vux-header{
    &.vux-header{
       background-color: @color2;
     }
  }
  .article-weui-panel{
    &.weui-panel{
      &:before{
         border-top:none
       }
      &:after{
         border-bottom:none
       }
       margin: 15px;
       background-color: transparent;
      .weui-panel__hd{
        text-align: center;
        background-color: transparent;
        &:after{
          border-bottom: none;
         }
      }
      .weui-panel__bd{
        box-shadow: inset 0 0 1px rgba(0,0,0,.2);
        background-color: #fff;
        .weui-media-box{
          flex-direction: row-reverse;
          &:before{
            right: 15px;
           }
           .weui-media-box__hd{
             margin-right: 0;
           }
           .weui-media-box__bd{
             margin-right: 0.8rem;
             .weui-media-box__tip{
               margin-top: 0.2rem;
               color: #999;
             }
           }
        }
      }
     }
  }

</style>
