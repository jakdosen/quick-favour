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
           <swiper :show-desc-mask="false" :auto="true" :show-dots="dataImg.length>1" :list="dataImg" dots-position="center" :loop="true"
                   height="23rem"></swiper>
           <div class="buy-word-info">
               <strong>Apple MacBook Air 13.3英寸</strong>
               <p>Apple MacBook Air 13.3英寸笔记本电脑 银色（2017新歌Core I5处理器/8GB内存/128G内存</p>
               <span><small>￥</small>38888.00</span>
               <div>
                   <span><small>￥</small>38888.00</span>
                   <i>元</i>
                   <b>秒</b>
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
                        <div class="imgBox"><img src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt=""></div>
                        <div class="info">
                            <span><i><small>￥</small>38888.0</i>& <b><small>M</small>120000</b></span>
                            <p>商品编号：11828347434</p>
                            <span><i>元</i><b>秒</b></span>
                        </div>
                    </div>
                    <div class="chose-list" data-title="颜色分类">
                      <checker
                        default-item-class="check-border-1px"
                        selected-item-class="check-border-active"
                      >
                        <checker-item :value="'all'" > 银色 </checker-item>
                        <checker-item :value="'good'"> 棕色 </checker-item>
                      </checker>
                    </div>
                    <div class="chose-list" data-title="版本">
                      <checker
                        default-item-class="check-border-1px"
                        selected-item-class="check-border-active"
                      >
                        <checker-item :value="'all'" > 2017年i5处理器升级版 </checker-item>
                        <checker-item :value="'good'"> 1.6GHz i5处理器 </checker-item>
                      </checker>
                    </div>
                    <div class="chose-list" data-title="选择配置">
                      <checker
                        default-item-class="check-border-1px"
                        selected-item-class="check-border-active"
                      >
                        <checker-item :value="'all'" > 8G内存/128GB SSD </checker-item>
                        <checker-item :value="'good'"> 8G内存/256GB SSD </checker-item>
                        <checker-item :value="'bd'"> 11.6英寸/4GB内存/128GB SSD </checker-item>
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
              <div class="header "><span>宝贝评价（498）</span><span>好评度<i>90%</i></span></div>
              <div class="content">
                <ul>
                  <li class="">
                     <div class="buy-rater-buyMessage">
                         <span><img src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt="">姜**小</span>
                         <p>2017-11-09 颜色：银色 128G 固态键盘</p>
                     </div>
                     <p>顺丰给力啊，第三天到的。东西很不错，正品，应该是没有拆过的，东西包装也不错</p>
                  </li>
                  <li class="">
                    <div class="buy-rater-buyMessage">
                      <span><img src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt="">姜**小</span>
                      <p>2017-11-09 颜色：银色 128G 固态键盘</p>
                    </div>
                    <p>顺丰给力啊，第三天到的。东西很不错，正品，应该是没有拆过的，东西包装也不错</p>
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
                <img width="100%"  height="auto" src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt="">
                <img width="100%"  height="auto" src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt="">
                <img width="100%"  height="auto" src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt="">
              </div>
            </transition>
            <transition name="fade">
            <div class="buy-tab" v-show="index === 1" style="margin-top: 1rem">
              <x-table :content-bordered="false" :full-bordered="true">
                <colgroup><col width="40%"></colgroup>
                <tbody>
                <tr>
                  <td>Apple</td>
                  <td>$1.25</td>
                </tr>
                <tr>
                  <td>Banana</td>
                  <td>$1.20</td>
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
         dataImg:[{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg' },{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg' }]
      }
    },
    computed: {

    },
    methods: {
      getHeight:function (s) {
        console.log(s)
      },
      openChoseType:function () {
         this.popupShow = true;
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
         width: 40%;
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
</style>
