<template>
  <div style="width: 100%;height: 100%;background: #fff">
    <!--头部搜索  空searchWord，显示输入框和搜索按钮，带搜索词，则显示搜索词头-->
    <CommonHeader className="colorHeader" v-if="!searchWord">
      <div class="overwrite-title-demo" slot="default">
        <x-input v-model="searchInput"  class="searchBtn inputFont" placeholder="输入商品名称进行搜索" >
          <icon slot="label" style="display:block;margin-right: 5px" type="search"></icon>
        </x-input>
      </div>
      <div slot="right">
        <span style="color: #fff" @click="search">搜索</span>
      </div>
    </CommonHeader>
    <CommonHeader className="colorHeader" v-else>
      <span slot="default">{{searchWord}}</span>
      <div slot="right" @click="toSearchPage">
        <icon type="search" style="color: #fff" ></icon>
      </div>
    </CommonHeader>
    <!--头部占位符-->
    <div style="height: 46px;"></div>
    <!--loading占位符-->
    <div class="loading" v-if="isLoading">
      <spinner :type="'lines'"></spinner>
    </div>
    <transition name="fade">
      <!--历史搜索-->
      <div v-if="!searchWord&&!isLoading"  class="search-histry-modules   c-page-padding">
        <card>
          <div slot="header">
            <div class="clearfix">
              <span>搜索历史</span>
              <!--删除-->
              <span class="iconfont icon-delete" @click="deleteHistory"></span>
            </div>
          </div>
          <div slot="content" style="margin-top: 1rem">
            <ul>
              <li v-for="item in searchHistory"  class="vux-1px">{{ item }}</li>
            </ul>
          </div>
        </card>
      </div>
    </transition>
    <transition name="fade">
      <!--内容搜索-->
      <div v-if="searchWord&&!isLoading" class="search-content-modules">
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <!--价格的时候 用slot，icon-->
          <tab-item class="vux-center"  v-for="(item, index) in list2" :key="index">{{item}}</tab-item>
        </tab>
        <swiper height="100%" v-model="index" :show-dots="false">
          <swiper-item  v-for="(item, index) in list2" :key="index">
            <goods-list></goods-list>
          </swiper-item>
        </swiper>
      </div>
    </transition>
    <transition name="fade">
      <!--空状态搜索-->
      <div v-if="!isLoading" class="search-null-modules hide">
        <span></span>
        抱歉，没有找到您搜到的商品~
      </div>
    </transition>
  </div>
</template>

<script>
  import {XHeader,XInput,Icon,Card,ViewBox,Tab, TabItem,Swiper, SwiperItem, Spinner} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import GoodsList  from '@/components/GoodsList'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      XHeader,
      XInput,
      Icon,
      Card,
      ViewBox,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      GoodsList,
      CommonHeader,
      Spinner
    },
    data(){
      return {
        searchHistory:['Dior','鸡爪','时尚秋冬女上衣','袜子','羽绒服'],
        searchInput:''
      }
    },
    created:function () {
       // 判断是否是直接搜索关键词
       this.$store.commit('searchIndex/update',{searchWord:this.$route.query['searchWord']||''})
       // 取出本地存储的搜索历史
       const localStorage = window.localStorage.getItem('searchHistory')
       this.searchHistory = localStorage && localStorage.split(',') || '';
    },
    computed: {
      ...mapState('searchIndex',['searchWord','list2','isLoading'])
    },
    methods: {
      toSearchPage:function () {
        this.$store.commit('searchIndex/update',{searchWord:''})
      },
      search(){
         // 第一步塞缓存
         this.saveHistory();
         // 第二部切换loading
      },
      // 删除历史记录
      deleteHistory(){
        this.searchHistory=[];
        window.localStorage.setItem('searchHistory','');
      },
      // 存入本地缓存，新的搜索历史
      saveHistory(){
         const oldDate = this.searchHistory||[];
         oldDate.unshift(this.searchInput);
         oldDate.length>10 && oldDate.pop();
         this.searchHistory=oldDate;
         window.localStorage.setItem('searchHistory',oldDate)
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '~@/common.less';
  @import "~@/lib/style/flex.less";
  @import '~vux/src/styles/1px.less';
  .searchBtn{
    background: #fff;
    height: 30px;
    -webkit-transform: translate3d(0,5px,0);
    transform: translate3d(0,5px,0);
    width: 100%;
    border-radius: 5px;
  }

  .overwrite-title-demo{
    display: inline;
  }
  .search-histry-modules{
    color: #9fa0a0;
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .search-histry-modules span:first-child{
    float: left;
  }
  .search-histry-modules span:last-child{
    float: right;
  }
  .search-histry-modules li{
    display: block;
    float: left;
    padding: .2rem 1rem;
    color: @color4;
    margin-bottom: 10px;
    margin-right: 1.2rem;
  }
  .search-histry-modules .weui-panel:before{
    border: none;
  }
  .search-histry-modules .weui-panel:after{
    display: none;
  }
  .hide{
    display: none;
  }
  .search-content-modules,.search-content-modules .vux-slider{
    height: 100% ;
  }
  .search-null-modules{
     margin: 10rem auto;
     font-size: 1.4rem;
     color: #666;
     line-height: 5;
    text-align: center;
     width:80%;
     span{
        display: block;
        width: 100%;
        height: 10rem;
        background: url(~@/publice/img/searchIndex-01.png) center center no-repeat;
        background-size: contain;
     }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  .loading{
  width: 100%;
  height: 100%;
  .flexbox;
  .align-items(center);
  .flex-direction(row);
  .justify-content(center)
  }
</style>

