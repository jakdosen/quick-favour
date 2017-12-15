/**
 * Created by shiyang.yao on 2017/11/23.
 */
<template>
  <div style="width: 100%;height: 100%;background: #fff">
     <!--头部导航-->
     <common-header><span class="hot-headerTitle" slot="default"></span></common-header>
     <div class="hot-body">
        <!--头部广告-->
       <swiper :show-desc-mask="false" :show-dots="cycleImage>1" :auto="true" dots-position="center" :loop="true"
               height="18rem">
         <swiper-item v-for="(item, index) in cycleImage" :key="index"><router-link :to="'/goods'+item.id"><img style="width: 100%;height: auto" :src="item.ad_code"></router-link></swiper-item>
       </swiper>

        <span class="hot-placeholder"></span>
        <!--底部商品-->
        <div class="hot-goods" style="height: calc(100% - 66px - 10rem)">
          <goods-list :sourceList="sourceList" :onPullingUpArgs="onPullingUpArgs"></goods-list>
        </div>
     </div>
  </div>
</template>
<script>
  import {XHeader , Swiper, SwiperItem } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import GoodsList  from '@/components/GoodsList'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      GoodsList,
      CommonHeader
    },
    data(){
      return {
      }
    },
    created(){
      // 重置列表数据
      this.$store.commit('hotGoods/update',{sourceList:[]});
      // 获取推荐列表
      this.$store.dispatch('hotGoods/suggestlist',{page:1,action_type:'hot'});
    },
    computed: {
      ...mapState('hotGoods', ['cycleImage','sourceList','pagination','isLoading'])
    },
    methods: {
        // 下拉刷新
        onPullingUpArgs(callBack){
          // 防止请求多次
          if(!this.isLoading)  return;
          const {current_page, total_pages} = this.pagination;
          this.$store.dispatch('hotGoods/suggestlist', {page: current_page + 1,action_type:'hot'});
          this.$store.commit('hotGoods/update', {isLoading: false});
          callBack(current_page,total_pages);
        }
    }
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '~@/common.less';
  .hot-body{
    background: #fff;
    height: 100%;
  }
  .hot-placeholder{
    display: block;
    height: 1rem;
    background: #e4e4e4;
  }
  .hot-goods{
    padding: 1rem 0;
  }
  .hot-headerTitle{
     background: url('~@/publice/img/hotGoods-01.png') no-repeat center center;
     background-size: 92.5px 26px;
     display: block;
     width: 100%;
     height: 46px;
  }
</style>
