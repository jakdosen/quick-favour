<template>
  <div style="height: 100%">
    <!--公共头部-->
    <CommonHeader>
      <div slot="default" style="height: 100%">
        <tab   :line-width="1" :active-color="'#f63'">
          <tab-item selected><a class="nav-a" href="#buy-info">商品</a></tab-item>
          <tab-item><a class="nav-a" href="#buy-content-more">详情</a></tab-item>
          <tab-item><a class="nav-a" href="#buy-rater">评价</a></tab-item>
        </tab>
      </div>
    </CommonHeader>
    <view-box  ref="viewBox" style="background: #f0f0f0">
         <!--购买信息-->
         <div id="buy-info" class="buy-info">
           <swiper :show-desc-mask="false" :auto="true" :show-dots="[].concat(list.gallerys).length>1"  dots-position="center" :loop="true"
                   height="23rem">
             <swiper-item v-for="(item, index) in list.gallerys" :key="index"><router-link to="/goods"><img style="width: 100%;height: auto" :src="item.img_url"></router-link></swiper-item>
           </swiper>
           <div class="buy-word-info">
               <strong>{{list.goods_name}}</strong>
               <p>{{list.goods_brief}}</p>
               <span><small>￥</small>{{list.cash_price}}</span>
               <div>
                   <span><small>￥</small>{{list.coin_price}}</span>
                   <i v-if="list.cash_price">元</i>
                   <b v-if="list.coin_price">秒</b>
               </div>
           </div>
         </div>
         <!--选择颜色分类-->
        <group class="buy-type">
          <cell :title="'选择颜色分类'" :is-link="true"  @click.native="openChoseType"></cell>
          <div class="buy-choseType">
            <!--点击选择规格参数-->
            <popup v-model="popupShow" position="bottom" max-height="90%">
                <div class="clearfix" style="background: #fff;padding: 0 1rem">
                    <div class="buy-choose-goods">
                        <div class="imgBox"><img :src="list.goods_thumb" alt=""></div>
                        <div class="info">
                            <span><i><small>￥</small>{{ changeBuyCashPrice || list.cash_price}}</i>& <b><small>M</small>{{ changeBuyCoinPrice || list.coin_price}}</b></span>
                            <p>商品编号：{{list.goods_sn}}</p>
                            <span><i v-if="list.cash_price">元</i><b v-if="list.coin_price">秒</b></span>
                        </div>
                    </div>
                    <div class="chose-list" :data-title="item.name" v-for="item in list.specification">
                      <checker
                        default-item-class="check-border-1px"
                        selected-item-class="check-border-active"
                      >
                        <checker-item style="margin-right: 5px;" v-for="item_child in item.value" :value="item_child.id" @on-item-click="changeSelect(item_child.cash_price,item_child.coin_price)"> {{item_child.label}} </checker-item>
                      </checker>
                    </div>
                    <group class="buy-chose-list-num">
                      <x-number :value="1" title="购买数量"  :min="1"></x-number>
                    </group>
                </div>
                <div class="buy-chose-btn">
                  <span>加入购物车</span>
                  <span>立即购买</span>
                </div>
            </popup>
          </div>
        </group>
         <!--宝贝评价 -->
         <div id="buy-rater" class="buy-rater">
              <div class="header "><span>宝贝评价（{{Math.max(list.comment_num,1)}}）</span><span>好评度<i>{{(list.goods_rank/100).toFixed(2)}}%</i></span></div>
              <div class="content">
                <ul>
                  <li class="" v-for="item in list.comments">
                     <div class="buy-rater-buyMessage">
                         <span><img :src="item.user.avatar" alt="">{{item.user.nickname}}</span>
                         <p>{{item.created_at+' '+item.goods_attr}}</p>
                     </div>
                     <p>{{ item.content }}</p>
                  </li>
                </ul>
              </div>
              <div class="footer"><router-link to="/goods/rater"><span>查看全部评价</span></router-link></div>
         </div>
         <!--商品介绍/商品详情-->
         <div id="buy-content-more" class="buy-content-more clearfix">
          <tab :line-width=2 active-color='#fc378c' v-model="index">
            <tab-item class="vux-center">商品介绍</tab-item>
            <tab-item class="vux-center">商品详情</tab-item>
          </tab>
          <div class="buy-swrap clearfix" >
            <transition name="fade">
              <div class="buy-introduce clearfix" v-show="index === 0">
                <Divider style="margin:1rem 2rem" >商品信息</Divider>
                <div class="clearfix buy-swrap-info" v-html = "list.goods_desc" style="width: 100%;">
                  <!--{{ list.goods_desc }}-->
                </div>
              </div>
            </transition>
            <transition name="fade">
            <div class="buy-tab" v-show="index === 1" style="margin-top: 1rem">
              <x-table :content-bordered="false" :full-bordered="true">
                <colgroup><col width="40%"></colgroup>
                <tbody>
                <tr v-for = "item in list.properties">
                  <td>{{item.name}}</td>
                  <td>{{item.value}}</td>
                </tr>
                </tbody>
              </x-table>
            </div>
            </transition>
          </div>
        </div>
        <divider style="padding-top: 2rem">我是有底线的</divider>
    </view-box>
  </div>
</template>

<script>
//  弹框用XDIALOG 来处理
  import {Tab, TabItem, ViewBox, Swiper, SwiperItem, Group, Cell, Card, Divider, XTable, XDialog, Popup, Checker, CheckerItem, XNumber} from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  import {mapGetters, mapState} from 'vuex'
  export default {
    components: {
      CommonHeader,
      Tab,
      TabItem,
      ViewBox,
      Swiper,
      SwiperItem,
      Group,
      Cell,
      Card,
      Divider,
      XTable,
      Popup,
      Checker,
      CheckerItem,
      XNumber
    },
    data(){
      return {
         index:0,
         popupShow:false,
         buyNumValue:'2',
         changeBuyCashPrice:'',
         changeBuyCoinPrice:'',
         dataImg:[{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg' },{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg' }]
      }
    },
    created(){
        // 先清除数据
        this.$store.commit('goodsDetail/update',{list:[]});
        // 获取数据
        this.$store.dispatch('goodsDetail/search',{goods_id:'460'});
    },
    computed: {
      ...mapState('goodsDetail', ['list']),

    },
    methods: {
      getHeight:function (s) {
        console.log(s)
      },
      openChoseType:function () {
         this.popupShow = true;
      },
      changeSelect(cash,coin){
          // 改变价格
          let
            cashPrice =  this.list.cash_price,
            coinPrice =  this.list.coin_price;
          this.changeBuyCashPrice = Number(cashPrice) + Number(cash);
          this.changeBuyCoinPrice = Number(coinPrice) + Number(coin)
      }
    }
  }
</script>

<style lang="less"  rel="stylesheet/less">
  @import "../../lib/style/flex.less";
  @import '../../common.less';
  @import '~vux/src/styles/1px.less';
.buy-word-info{
  padding: 0 1.5rem;
  padding-bottom: 1rem;
  width: 100%;
  background: #fff;
}
.buy-word-info strong{
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 2;
  color: #333;
}
.buy-word-info p{
  position:relative;
  line-height:1.8rem;
  overflow:hidden;
  font-size: 1.4rem;
  height: 3.6rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.buy-word-info > span{
   font-size: 1.2rem;
   color: #f63;
   line-height: 2;
}
.buy-word-info > span small{
  font-size: 1rem;
}
.buy-word-info> div {
  text-align: right;
}
.buy-word-info> div  span{
  float: left;
  color: #f63;
  font-size: 1.4rem;
}
.buy-word-info> div small{
  font-size: 1.2rem;
}
  .buy-word-info> div i,.buy-word-info> div b{
    display: inline-block;
    padding: 0 5px;
    color: #fff;
    margin-right: 5px;
  }
.buy-word-info> div i{
  background: @color1;
}
  .buy-word-info> div b{
    background: @color2;
  }
  .buy-rater{
     background: #fff;
    margin-top: 1.17647059em;
  }
  .buy-rater .header{
  .flexbox;
  padding: 1rem;
  .justify-content(space-between);
   font-size: 1.4rem;
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
    color: #ff5300;
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
  .buy-content-more{
    margin-top: 1.17647059em;
  }
  .buy-content-more img{
    float: left;
  }
  .buy-swrap{
     background: #fff;
     padding-bottom: 2rem;
  }
  .chose-list {
      &:before{
          content: attr(data-title);
          display: block;
          font-size: 1.2rem;
          color: #666;
          margin: 1rem 0;
       }
      .check-border-1px{
        border: 1px solid #e4e4e4;
        padding: .4rem 1.2rem;
        border-radius: 3px;
        font-size: 1.2rem;
        color: @color4;
        margin-bottom: 1rem;
      }
      .check-border-active{
        color: @color2;
        border: 1px solid #f63;
      }
  }

  .buy-choseType{
    .buy-chose-btn{
      width: 100%;
      height: 45px;
      color:#fff;
      line-height: 45px;
      .flexbox;
          span{
            display: inline-block;
            width: 50%;
            text-align: center;
            &:first-child{
               background: #ff8c00;
             }
            &:last-child{
               background: #ff5300;
             }
          }
    }
    .buy-choose-goods{
    .flexbox;
      .imgBox{
         width: 32%;
         padding: 1.5rem 15px;
         img{
           width: 100%;
           height: 100%;
         }
      }
      .info{
         padding-top: 2rem;
         font-size:1.2rem;
        color: #666;
         p{
           line-height: 2.5;
         }
         span{
            small{
              font-size: 1rem;
            }
            &:first-child{
                 color: @color2;
            }
            &:last-child{
               i,b{
                 display: inline-block;
                 margin-right: 5px;
                 border-radius: 2px;
                 padding: 2px 5px;
                 background: @color1;
                 color: #fff;
               }
             }
         }
      }
    }
  }
  .nav-a{
    color: #333;
    display: block;
    width: 100%;
    height: 100%;
  }
  .vux-tab-selected a{
    color: #f36;
  }
  .buy-swrap-info img{
      width: 100%;
      height: auto;
  }
</style>
