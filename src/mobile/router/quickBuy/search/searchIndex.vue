<template>
  <div style="width: 100%;height: 100%;background: #fff">
    <!--头部搜索  空searchWord，显示输入框和搜索按钮，带搜索词，则显示搜索词头-->
    <CommonHeader className="colorHeader" v-if="!searchWord">
      <div class="overwrite-title-demo" slot="default">
        <x-input  class="searchBtn inputFont" placeholder="输入商品名称进行搜索" >
          <icon slot="label" style="display:block;margin-right: 5px" type="search"></icon>
        </x-input>
      </div>
      <div slot="right">
        <span style="color: #fff">搜索</span>
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
    <!--历史搜索-->
    <div v-if="!searchWord"  class="search-histry-modules  c-page-padding">
      <card>
         <div slot="header">
            <div class="clearfix">
              <span>搜索历史</span>
              <span>删除</span>
            </div>
         </div>
         <div slot="content" style="margin-top: 1rem">
           <ul>
             <li class="vux-1px">Dior</li>
             <li class="vux-1px">鸡爪</li>
             <li class="vux-1px">时尚秋冬女上衣</li>
             <li class="vux-1px">袜子</li>
             <li class="vux-1px">羽绒服</li>
           </ul>
         </div>
      </card>
    </div>
    <!--内容搜索-->
    <div v-if="searchWord" class="search-content-modules">
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
    <!--空状态搜索-->
    <div class="search-null-modules hide">
         抱歉，没有找到您搜到的商品
    </div>
    </view-box>
  </div>
</template>

<script>
  import {XHeader,XInput,Icon,Card,ViewBox,Tab, TabItem,Swiper, SwiperItem } from 'vux'
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
      CommonHeader
    },
    created:function () {
       this.$store.commit('searchIndex/update',{searchWord:this.$route.query['searchWord']||''})
    },
    data(){
        return {
          index: 0
        }
    },
    computed: {
      ...mapState('searchIndex',{
         searchWord:'searchWord',
         list2:'list2'
      })
    },
    methods: {
      toSearchPage:function () {
        this.$store.commit('searchIndex/update',{searchWord:''})
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../../common.less';
  @import "../../../lib/style/flex.less";
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
    color: @color5;
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
    padding: 0 .7rem;
    color: @color4;
    margin-bottom: 10px;
    margin-right: 1.4rem;
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
</style>

