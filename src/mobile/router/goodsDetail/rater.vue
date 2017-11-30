<template>
  <div>
    <common-header className="colorHeader">
         <div slot="default" class="header-img"><img src="//pic5.40017.cn/01/001/69/e2/rBLkBloJRPqAONZ4AAIHd0GN-AI775_242x150_00.jpg" alt=""></div>
    </common-header>
    <view-box ref="viewBox" body-padding-top="46px">
      <div class="buy-rater">
        <div class="header"><span>宝贝评价（498）</span><span>好评度<i>90%</i></span></div>
        <div class="rater-type">
          <checker
            default-item-class="check-border-1px"
            selected-item-class="check-border-active"
          >
            <checker-item :value="'all'" > 全部 </checker-item>
            <checker-item :value="'good'"> 好评 </checker-item>
            <checker-item :value="'middle'"> 中评 </checker-item>
            <checker-item :value="'bad'"> 差评 </checker-item>
          </checker>
        </div>
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
      </div>
    </view-box>
  </div>
</template>

<script>
  import { Checker,CheckerItem,ViewBox } from 'vux'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components:{
      Checker,
      CommonHeader,
      CheckerItem,
      ViewBox
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
    width: 47px;
    height: 30px;
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
    padding: 0 1.2rem;
    border-radius: 2px;
    font-size: 1.4rem;
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
