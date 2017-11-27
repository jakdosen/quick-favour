/**
* Created by shiyang.yao on 2017/11/23.
*/
<template>
  <div style="width: 100%;height: 100%;background: #fff">
    <!--头部导航-->
    <common-header className="colorHeader"><span slot="default">全部商品</span></common-header>
      <div class="all-body">
        <!--左边导航-->
        <div class="hot-body-left">
          <ul>
            <li class="vux-1px-b" v-for = "(item, index) in navSource" :class="index === selectIndex ? 'active' : ''" @click="changeNav(index)" :key="index">{{item}}</li>
          </ul>
        </div>
        <!--右边内容区 -->
        <div class="all-body-right">
          <viewBox style="background: #c9caca;overflow: hidden" ref="allGoodsOfViewBox">
          <div class="all-type-goods"  v-for = "(item, index) in dataSource" v-show="index === selectIndex">
            <span v-if="!Array.isArray(item)"> 敬请期待{{item}}商品</span>
            <div v-else style="width: 100%">
              <!--头部广告-->
              <swiper :show-desc-mask="false" :auto="true" :show-dots="dataImg.length>1" :list="dataImg" dots-position="center" :loop="true"
                   height="9rem"></swiper>
              <span class="all-placeholder">热门分类</span>
              <div style="background: #fff">
                <grid :cols="item.length%3">
                  <grid-item v-for="child in item" :link="child.src" :label="child.title">
                    <img slot="icon" :src="child.src">
                  </grid-item>
                </grid>
              </div>
            </div>
          </div>
          </viewBox>
        </div>
      </div>
  </div>
</template>
<script>
  import {XHeader , Swiper, SwiperItem ,ViewBox,Grid, GridItem } from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'

  export default {
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      ViewBox,
      CommonHeader,
      Grid,
      GridItem
    },
    data(){
      return {
          selectIndex:0,
          navSource:['生活','美味','母婴','美丽','新奇','健康','艺术'],
          dataSource:[[{title:'游戏本',src:'//img11.360buyimg.com/n7/jfs/t5935/195/2108753717/176060/c849dcb6/593a49a3Nf9c2a052.jpg'},{title:'游戏本',src:'//img11.360buyimg.com/n7/jfs/t5935/195/2108753717/176060/c849dcb6/593a49a3Nf9c2a052.jpg'},{title:'游戏本',src:'//img11.360buyimg.com/n7/jfs/t5935/195/2108753717/176060/c849dcb6/593a49a3Nf9c2a052.jpg'},{title:'游戏本',src:'//img11.360buyimg.com/n7/jfs/t5935/195/2108753717/176060/c849dcb6/593a49a3Nf9c2a052.jpg'},{title:'游戏本',src:'//img11.360buyimg.com/n7/jfs/t5935/195/2108753717/176060/c849dcb6/593a49a3Nf9c2a052.jpg'}],'美味','母婴','美丽','新奇','健康','艺术']
      }
    },
    computed: {
      ...mapState('hotGoods', {
        dataImg: 'dataSource'
      })
    },
    methods: {
        changeNav:function (index) {
          this.selectIndex = index;
//          并且判断dataSource有没有Arrary
//          Array.isArray(dataSource[index]) && this.$store.dispatch()
        }
    }
  }
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "../../../lib/style/flex.less";
  @import '../../../common.less';
  @import '~vux/src/styles/1px.less';
  .all-body{
  .flexbox;
    height: 100%;
    overflow: hidden;
    background: @color5;
  }
  .hot-body-left{
    width: 120px;
  }
  .hot-body-left li{
     width: 100%;
     text-align: center;
     line-height: 4;
     font-size: 1.4rem;
     background: #fff;
  }
  .hot-body-left li.active{
     color: @color2;
  }
  .all-type-goods{
    width: 100%;
     padding: 15px;
  }
  .all-placeholder{
    line-height: 3;
    font-size: 1.4rem;
  }
  .all-body-right{
    width: 100%;
  }

</style>
