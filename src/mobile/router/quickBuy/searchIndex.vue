<template>
  <div style="width: 100%;height: 100%;background: #fff">
    <!--头部搜索  空searchWord，显示输入框和搜索按钮，带搜索词，则显示搜索词头-->
    <CommonHeader className="colorHeader" v-if="!searchFrom">
      <div class="overwrite-title-demo" slot="default">
        <x-input v-model="searchWord"  class="searchBtn inputFont" placeholder="输入商品名称进行搜索" >
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
      <div style="height: 100%">
        <!--历史搜索-->
        <div v-if="isShowHistory&&!isLoading"  class="search-histry-modules   c-page-padding">
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
                <li v-for="(item,index) in searchHistory" :key="index"  @click="doSearchHistory(item)" class="vux-1px">{{ item }}</li>
              </ul>
            </div>
          </card>
        </div>
        <!--内容搜索-->
        <div v-if="!isLoading&&!isShowHistory" class="search-content-modules">
          <tab :line-width=2 active-color='#fc378c' v-model="index" style="z-index: 10">
            <!--价格的时候 用slot，icon-->
            <tab-item class="vux-center"  v-for="(item, num) in list2" :key="num" >{{item}}</tab-item>
          </tab>
          <!--有列表的时候-->
          <div v-show="sourceList.length" style="height: calc(100% - 44px)">
            <goods-list :sourceList="sourceList" :onPullingUpArgs="onPullingUpArgs" :pagination="pagination" :index = "index"></goods-list>
          </div>
          <!--空状态搜索-->
          <div v-show="!sourceList.length" class="search-null-modules">
              <span></span>
              抱歉，没有找到您搜到的商品~
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import { XHeader,XInput,Icon,Card,ViewBox,Tab, TabItem,Swiper, SwiperItem, Spinner} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import GoodsList  from '@/components/GoodsList'
  import CommonHeader  from '@/components/CommonHeader'
  import VueBetterScroll  from 'vue2-better-scroll'
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
      Spinner,
      VueBetterScroll
    },
    data(){
      return {
        errorMessage:'请输入输入关键词',
        searchFrom:false,  //用来展示不同的头
        searchHistory:[],  //搜索历史
        searchWord:'',   //搜索关键词
        category_id:'', // 分类ID
        index:0,   // 当前选中第几个条件
        isShowHistory:true,  //空输入的时候直接显示历史页面
        searchPayLoad:null,   //记录当前搜索条件
      }
    },
    created:function () {
      this.$store.commit('searchIndex/update',{sourceList:[],pagination:{current_page:0}});
       // 判断是否是直接搜索关键词
       this.searchWord = this.$route.query['searchWord']||'';
       this.category_id = this.$route.query['category_id']||'';
       this.searchFrom = this.searchWord && true;
       this.searchWord&&this.$store.dispatch('searchIndex/search', {keywords: this.searchWord,category_id:this.category_id});
       // 取出本地存储的搜索历史
       const localStorage = window.localStorage.getItem('searchHistory')
       this.searchHistory = localStorage && localStorage.split(',') || '';
    },
    computed: {
      ...mapState('searchIndex',['list2','pagination','isLoading','sourceList','isLoadingPage']),
    },
    watch:{
      index:function (val) {
          let otherArg = null;
           this.$store.commit('searchIndex/update',{sourceList:[]});
          //1:现金商品，2：秒币商品，3：现金&秒币商品
          otherArg= val>0 && val<4 && {goods_type:val} ||otherArg;
          otherArg= val>3 && {sort_by: 'price_asc'} ||otherArg;
          this.search(otherArg);
      },
      searchWord:function (val) {
        this.isShowHistory = !val ? true : false;
      }
    },
    methods: {
      doSearchHistory(val){
        this.searchWord = val;
        this.search();
      },
      toSearchPage:function () {
       this.$router.push({ path: '/search'});
       window.location.reload();
      },
      search(otherArg){
        if(!this.searchWord){
          this.$vux.toast.text(this.errorMessage, 'center')
          return;
        }
        // 清掉source
        this.$store.commit('searchIndex/update',{sourceList:[]});
         // 第一步塞缓存
         this.saveHistory();
         // 第二部切换loading
         this.$store.commit('searchIndex/update',{isLoading:true});
         // 发起异步
         let payload =!otherArg ? { keywords: this.searchWord,category_id:this.category_id}:{ keywords: this.searchWord,category_id:this.category_id,...otherArg};
         // 搜索条件
         this.searchPayLoad = payload;
         this.$store.dispatch('searchIndex/search', payload);
      },
      // 删除历史记录
      deleteHistory(){
        this.searchHistory=[];
        window.localStorage.setItem('searchHistory','');
      },
      // 存入本地缓存，新的搜索历史
      saveHistory(){
         const oldDate = this.searchHistory||[];
         oldDate.unshift(this.searchWord);
         oldDate.length>10 && oldDate.pop();
         this.searchHistory=oldDate;
         window.localStorage.setItem('searchHistory',oldDate)
      },
      // 下拉刷新
      onPullingUpArgs(){
        // 防止请求多次
        if(!this.isLoadingPage)  return;
        const {current_page, total_pages} = this.pagination;
        this.$store.dispatch('searchIndex/pageSearch', {page: current_page + 1,...this.searchPayLoad});
        this.$store.commit('searchIndex/update', {isLoadingPage: false});
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

