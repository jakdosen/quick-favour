/**
 * Created by shiyang.yao on 2017/11/23.
 */
<template>
  <div style="width: 100%;height: 100%;background: #fff">
     <!--头部导航-->
     <common-header><span slot="title">热门商品</span></common-header>
     <div class="hot-body">
        <!--头部广告-->
        <swiper :show-desc-mask="false" :auto="true" :show-dots="dataSource.length>1" :list="dataSource" dots-position="center" :loop="true"
               height="18rem"></swiper>
        <span class="hot-placeholder"></span>
        <!--底部商品-->
        <div class="hot-goods">
          <goods-list></goods-list>
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
    computed: {
      ...mapState('hotGoods', {
        dataSource: 'dataSource'
      })
    },
    methods: {}
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import '../../../common.less';
  .hot-body{
    background: #fff;
    min-height: 100%;
  }
  .hot-placeholder{
    display: block;
    height: 1rem;
    background: #e4e4e4;
  }
  .hot-goods{
    padding: 1rem 0;
  }
</style>
