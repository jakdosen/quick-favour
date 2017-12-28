/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/order-confirm.less'
import $ from 'jquery'
import _ from 'underscore'
import util from '^/utils'
import AddressInput from '../common/addressInput'
import '@/styles/loginDialog.less'
import Dialog from '@/scripts/common/dialog'
import {  checkorder, directcheckorder} from '^/services/mall'

import {Model, Collection, View, Events} from 'backbone'

let bus = window.bus;
let moduleEv = _.extend({}, Events);

let mockData = {
  "goods_list": [
    {
      "cart_id": 1,
      "goods_id": 430,
      "goods_name": "以色列葡萄柚4个约250g/个",
      "goods_sn": "MZ000430",
      "cash_price": "30.00",
      "coin_price": "40.00",
      "goods_type": 3,
      "goods_number": 1,
      "goods_attr_id": "",
      "goods_attr_str": "",
      "is_checked": 1,
      "is_on_sale": 1,
      "goods_img": "http://t13.zetadata.com.cn/upload/images/201610/goods_img/430_G_1459971655294.jpg"
    },
    {
      "cart_id": 14,
      "goods_id": 460,
      "goods_name": "菲律宾香蕉约1.5kg",
      "goods_sn": "MZ000460",
      "cash_price": "5.00",
      "coin_price": "59995",
      "goods_type": 2,
      "goods_number": 2,
      "goods_attr_id": "4044,4049",
      "goods_attr_str": "越南 8成熟",
      "is_checked": 1,
      "is_on_sale": 1,
      "goods_img": "http://t13.zetadata.com.cn/upload/images/201610/goods_img/460_G_1459126720606.jpg"
    }
  ],
  "user_address": {
    "id": 74,
    "province": "云南省",
    "city": "汕头市",
    "county": "南苑乡",
    "mobile": "13399545122",
    "true_name": "哈士奇9",
    "address": "哈哈哈哈哈哈就按上大街哈吉斯到行间阿斯蒂芬健康是福方式",
    "is_default": 1
  },
  "user_account": {
    "run_money": "0.00",
    "m_coin": 0,
    "can_use_run_money": "0.00",
    "can_use_m_coin": 0
  },
  "cash_pay": {
    "cash_total": 60.01
  },
  "cashcoin_pay": {
    "cash_total": "40.00",
    "coin_total": 120030
  }
};
/**
 *  AddressPopupView
 */
let AddressPopupView = Dialog.extend({
  template:_.template($('#address-form-tpl').html()),
  initialize(){
    this.constructor.__super__.initialize.apply(this, arguments);
    //合并父类的events
    if (this.constructor.prototype.events) {
      this.events = $.extend( true,{},this.constructor.__super__.events,this.events);
      this.delegateEvents();
    }
    // 渲染Dom
    this.render();
    this.initAddressInput();
  },
  content(){
    return  this.template();
  },
  initAddressInput(){
    new AddressInput({
      target:this.$('.js-address-input')
    });
  }
})

/**
 * GoodsView
 */
let GoodsView = View.extend({
  tagName: 'tr',
  template: _.template($('#goods-item-tpl').html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(
      this.template(this.model.toJSON())
    )
  }
});

/**
 * App
 */
let App = View.extend({
  events: {
    'click .js-add-address-btn':'addAddress',
    'click .check-btn': 'sendOrder'
  },
  initialize() {



    this.urlParams  = util.urlArgs();
    if (!bus.checkIsLogin()) {
      bus.showLoginPopup();
      return this
    } else {
      this.goodsList = new Collection();
      this.goodsList.bind('add', this.renderGoodsList, this);
      this.addressModel = new Model();
      this.accountModel = new Model();
      this.cashModel = new Model();
      this.cashcoinModel = new Model();
      this.fetchOrderData();
    }
  },
  fetchOrderData() {
    //购物车购买
    if(this.urlParams.cartIds !== undefined){
      checkorder({
        cart_id:this.urlParams.cartIds
      }).then((data) => {
        this.parseData(data);
      });
    }
    //直接购买
    if(this.urlParams.goods_id !== undefined){
      directcheckorder(this.urlParams).then((data) => {
        this.parseData(data);
      });
    }
    this.parseData(mockData);
  },
  parseData(data){
    this.goodsList.add(data.goods_list);
    this.addressModel.set(data.user_address);
    this.accountModel.set(data.user_account);
    this.cashModel.set(data.cash_pay);
    this.cashcoinModel.set(data.cashcoin_pay);
  },
  renderGoodsList() {
    this.$('.js-goods-list-cot').empty();
    this.goodsList.each(cart => {
      new GoodsView({
        model: cart
      }).$el.appendTo(this.$('.js-goods-list-cot'))
    })
  },
  sendOrder(){

  },
  addAddress(){
    new AddressPopupView();
  }
});
new App({
  el: document.body
});
