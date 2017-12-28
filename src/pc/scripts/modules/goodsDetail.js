/**
 * Created by shiyang.yao on 2017/12/12.
 */
import '@/styles/goodsDetail.less'
import  sliderBar  from '@/scripts/common/sliderbar'
import $ from 'jquery'
import _ from 'underscore'
import util from '^/utils'
import {detail, create, rater} from '^/services/mall'
import {Model, Collection, View, Events} from 'backbone'


const SliderBar =new sliderBar();

const GoodsValue = View.extend({
  events: {
    'click .spection span': 'changeSelected',
    'click .num-box b': 'changeNumBox',
    'click .submit-buy': 'buy',
    'click .submit-addCart': 'addCart'
  },
  initialize(options){
    this.options = options;
    this.cash_price = this.options.list.cash_price;
    this.coin_price = this.options.list.coin_price;
    this.cash_price_arry = [];
    this.coin_price_arry = [];
    this.spec_arry = [];
    // 创建model
    this.createModel();
    // 渲染广告图
    this.loadSlider();
    // 渲染右边展示信息
    this.loadSpecification();
  },
  createModel(){
    let GoodsModel = Model.extend({
      defaults: {
        goods_id: this.options.goods_id,
        number: '',
        spec: ''
      }
    });
    this.model = new GoodsModel();
  },
  loadSlider(){
    let tmpl = _.template($('#tmpl-magnifier').html());
    this.$('.goods-info-img').empty().append(tmpl(this.options.cycleImage));
    this.$('#magnifier').magnifier();
  },
  loadSpecification(){
    let tmpl = _.template($('#tmpl-options').html());
    this.$('.goods-info-options').empty().append(tmpl(this.options.list));
  },
  changeSelected(e){
    let elem = $(e.currentTarget), arr = [], index = 0;
    // 设置样式；
    elem.addClass('active').siblings().removeClass('active');
    // 获取id&增添相应操作
    arr = elem.data('id').split(';');
    index = arr[0];
    this.spec_arry[index] = arr[1];
    this.cash_price_arry[index] = arr[2];
    this.coin_price_arry[index] = arr[3];
    //重新计算价格&设置
    let cashPrice = this.cash_price, coinPrice = this.coin_price;
    this.cash_price_arry.map(item => cashPrice = Number(cashPrice) + Number(item || 0));
    this.coin_price_arry.map(item => coinPrice = Number(coinPrice) + Number(item || 0));
    this.$('span.cashPrice').html(`<small>￥</small>${cashPrice < 0 ? 0 : cashPrice }<small>元</small>`);
    this.$('span.coinPrice').html(`<small>M</small>${coinPrice < 0 ? 0 : coinPrice }`);
  },
  changeNumBox(e){
    // 计算num
    let elem = this.$(e.currentTarget)
      , input = this.$('input', elem.parents('.num-box'))
      , value = $(input).val();
    value = elem.hasClass('add') ? Number(value) + 1 : Math.max(Number(value) - 1, 1)
    input.val(value);
    this.model.set({number: value});
  },
  addCart(){
    this.model.set({spec: this.spec_arry.join(',')});
    create(this.model.toJSON()).then(res => {
      $.toast({
        heading: '错误提示',
        text: '加入购物车',
        position: 'top-right',
        stack: false,
        icon: 'success'
      })
      SliderBar.addToMall(this.model.get('number'));
    });
  },
  buy(){
    // 跳转到立即购买
    // location.href =
  }
});



// 商品评价
const Comment = View.extend({
  initialize(options){
    this.options = options;
    this.rank = 0;
    this.curPageNum = 1;
    this.fetchDate(true, 1);
  },
  fetchDate(isLoad, page){
    rater({
      goods_id: this.options.goods_id,
      rank: this.rank,
      page: page || 1
    }).then(data => {
      if (isLoad) {
        // 渲染dom
        this.render(data);
        // 加载分页
        this.initPagination(data.meta);
      }
      // 渲染item
      this.renderItem(data.data);
    });
  },
  render(res){
    let tmpl = _.template($('#tpl-comment').html());
    this.$el.html(tmpl(res));
  },
  renderItem(res){
    let tmpl = _.template($('#tpl-comment-item').html());
    this.$('.comment-detail-content').empty().html(tmpl(res));
  },
  initPagination({pagination}){
    let page$el = this.$('.js-pagination');
    if (page$el[0].selectPage) {
      //todo
    } else {
      page$el.pagination(pagination.total, {
        link_to: 'javascript:;',
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: this.changePageNum.bind(this),
        items_per_page: pagination.per_page, //每页显示10项
        prev_text: "前一页",
        next_text: "后一页"
      });
    }
  },
  changePageNum(pageNum){
    if (this.curPageNum === pageNum + 1) return
    this.curPageNum = pageNum + 1
    this.fetchDate(false, pageNum + 1);
  }
});

const App = View.extend({
  events: {
    'click  .goods-nav li': 'changeNav'
  },
  initialize(options){
    this.fetchDate().then(res => {
      this.result = res;
      this.setView(res);
    });
  },
  fetchDate(){
    // 传递产品ID
    this.urlParams = util.urlArgs();
    this.goods_id = this.urlParams.goods_id;
    return detail({goods_id: this.goods_id});
  },
  changeNav(e){
    let elem = $(e.currentTarget), type = '';
    type = elem.data('id');
    this.$('[data-id="' + type + '"]').addClass('active').siblings().removeClass('active');
    this.$('.goods-nav-active').css({left: 118 * Number(elem.data('index'))});
    this.dealModule(type);
  },
  dealModule(type){
    switch (type) {
      case  'detail' :
        this.$('.goods-content-images').empty().html(this.result.goods_desc);
        break;
      case 'config' :
        _.map(this.result.properties, item =>
          this.$('.goods-content [data-id="config"]').empty().append(`<div class="goods-config-item"><span>${item.name}</span><b>${item.value}</b></div>`)
        )
        break;
      case 'comment' :
        if (!this.comment) {
          this.comment = new Comment({
            goods_id: this.goods_id,
            el: $('.comment')
          });
        }
        break;
    }
  },
  setView(res){
    // 设置面包学 导航
    this.$('.breadcrumb a:last-child').text(res.goods_name);
    // 新建头部
    this.header = new GoodsValue({
      el: $('.goods-info'),
      cycleImage: res.gallerys,
      list: res,
      goods_id: this.goods_id
    })
    // 初始化商品详情
    this.dealModule('detail')
  }
});

new App({
  el: $('body')
});

