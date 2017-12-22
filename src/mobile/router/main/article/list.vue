<template>
  <div>
    <!--swiper-->
    <swiper :list="swiperList" loop auto style="margin:0 auto;" height="150px" dots-class="custom-bottom" dots-position="center"></swiper>
    <!--panel-->
    <div v-for="article in articleList" class="weui-panel weui-panel_access article-weui-panel" :key="article.group">
      <div class="weui-panel__hd">{{article.group}}</div>
      <div class="weui-panel__bd">
        <router-link v-for="item in article.list"  class="weui-media-box weui-media-box_appmsg" :to="'/article/detail/'+ item.id" :key="item.id">
          <div class="weui-media-box__hd">
            <img :src="item.cover" alt="" class="weui-media-box__thumb">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{item.title}}</h4>
            <p class="weui-media-box__desc">&nbsp;<!--{{item.desc}}--></p>
            <p class="weui-media-box__tip"> {{item.like_num}}人秒赞</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
  import { Swiper} from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    created(){
      this.fetchSwiperData();
      this.fetchArticleData();
    },
    computed:{
      ...mapState('articleList',{
        swiperList:'swiperList',
        articleList:'articleList'
      })
    },
    components: {
      Swiper
    },
    methods:{
      ...mapActions('articleList',{
        fetchSwiperData:'fetchSwiperData',
        fetchArticleData:'fetchArticleData'
      })
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui.less";
  @import "~@/common.less";
  @import "~@/style/article.less";

</style>
