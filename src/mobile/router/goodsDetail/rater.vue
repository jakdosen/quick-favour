<template>
  <div style="height: 100%">
    <common-header className="colorHeader">
         <div slot="default" class="header-img"><img :src="rateGoodsImg" alt=""></div>
    </common-header>
    <view-box ref="viewBox" body-padding-top="46px">
      <vue-better-scroll
        style="height:100%;"
        class="wrapper"
        ref="scroll"
        :pullUpLoad="pullUpLoadObj"
        @pullingUp="onPullingUp">
      <div class="buy-rater">
        <div class="header"><span>宝贝评价</span><span>好评度<i>{{(raterCommentsCount.goods_rank*1)/100}}%</i></span></div>
        <div class="rater-type">
          <checker
            default-item-class="check-border-1px"
            selected-item-class="check-border-active"
            @on-change="raterChange"
          >
            <checker-item :value="'0'" >全部({{ raterCommentsCount.comment_all }})</checker-item>
            <checker-item :value="'1'">好评({{ raterCommentsCount['comment_good']}})</checker-item>
            <checker-item :value="'2'">中评({{ raterCommentsCount['comment_general']}})</checker-item>
            <checker-item :value="'3'">差评({{ raterCommentsCount['comment_low']}})</checker-item>
          </checker>
        </div>
        <div class="content">
          <ul>
            <li class="" v-for="item in raterData">
              <div class="buy-rater-buyMessage">
                <span><img :src="item.user&&item.user.avatar" alt="">{{item.user&&item.user.nickname}}</span>
                <p>{{ item.created_at + '  '+ item.goods_attr}}</p>
              </div>
              <p>{{item.content}}</p>
            </li>
          </ul>
        </div>
      </div>
      </vue-better-scroll>
    </view-box>
  </div>
</template>

<script>
  import { Checker,CheckerItem,ViewBox } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  import VueBetterScroll  from 'vue2-better-scroll'
  import {mapGetters, mapState} from 'vuex'
  export default {
    components:{
      Checker,
      CommonHeader,
      CheckerItem,
      ViewBox,
      VueBetterScroll
    },
    data(){
      return {
        goods_id:'',
        pullUpLoadObj: {      // 下拉加载提示文案
          threshold: 20,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      }
    },
    created(){
      // 重置列表数据
      this.$store.commit('goodsDetail/update',{raterData:[]});
      this.goods_id = this.$route.params.id;
      // 获取推荐列表
      this.$store.dispatch('goodsDetail/raterList',{page:1,goods_id:this.goods_id});
    },
    watch:{
      raterPagination(val){
         const {current_page, total_pages} = val;
          if (current_page < total_pages) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
      }
    },
    computed: {
      ...mapState('goodsDetail', ['raterData','rateGoodsImg','raterPagination','raterCommentsCount','raterIsLoading'])
    },
    methods: {
      // 下拉刷新
      onPullingUp(){
        // 防止请求多次
        if(!this.raterIsLoading)  return;
        const {current_page, total_pages} = this.pagination;
        this.$store.dispatch('goodsDetail/raterList', {page: current_page + 1,goods_id:this.goods_id});
        this.$store.commit('goodsDetail/update', {raterIsLoading: false});
      },
      raterChange(value){
        this.$store.commit('goodsDetail/update',{raterData:[]});
        this.$store.dispatch('goodsDetail/raterList', {page: 1,goods_id:this.goods_id, rank:value});
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../lib/style/flex.less";
  @import '../../common.less';
  @import '~vux/src/styles/1px.less';
  .header-img{
    width: 100%;
  .flexbox;
  .justify-content(center);
  }
  .header-img img{
    width: 31px;
    height: 31px;
    margin-top: 6px;
  }
  .buy-rater{
    background: #fff;
    margin-top: 1.17647059em;
  }
  .buy-rater .header{
  .flexbox;
  .justify-content(space-between);
  font-size: 1.4rem;
    padding: 0 1rem;
  }

  .buy-rater .header i{
    color: #f63;
  }
  .buy-rater .footer{
  .flexbox;
  .justify-content(center);
    font-size: 1.4rem;
    color: @color2;
    padding: 1.5rem 0;
  }
  .buy-rater .footer span{
    display: inline-block;
    border: 1px solid @color1;
    padding: 0 10px;
    border-radius: 1rem;
    font-size: 1.4rem;
  }
  .buy-rater .content li{
    padding: 1.5rem 1rem;
  }
  .buy-rater .content li>p{
    font-size: 1.4rem;
  }
  .buy-rater-buyMessage span{
  .flexbox;
  .justify-content(flex-start);
  }
  .buy-rater-buyMessage img{
    border-radius: 100%;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .buy-rater-buyMessage>p{
    font-size: 1.2rem;
    color: @color5;
    line-height:3;
  }
  .buy-rater-buyMessage span{
    font-size: 1.2rem;
  }
  .rater-type{
    /*margin: 1.5rem 0;*/
    padding: 1.5rem 1rem .5rem;
  }
  .check-border-1px{
    border: 1px solid #f63;
    padding: 0 .6rem;
    border-radius: 2px;
    font-size: 1.2rem;
    color: @color1;
  }
  .check-border-active{
    background: rgba(255,102,51,.2);
    color: @color4;
  }
  .vux-checker-box{
  .flexbox;
  .justify-content(space-between);
  }
</style>
