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
 * Address
 */
const Address = View.extend({
  template: _.template($('#address-item').html()),
  initialize() {
    this.render();
  },
  render() {
     this.$('.address-item').empty().append(this.template(this.model.toJSON()));
  }
});
/**
 * Account
 */
const Account = View.extend({
  template: _.template($('#account').html()),
  initialize() {
    this.render();
  },
  render() {
     this.$('.order-sub-body').empty().html(this.template(this.model.toJSON()));
  }
});

/**
 * 账户明细
 */
const PackageDetail = View.extend({
  template: _.template($('#package').html()),
  initialize() {
    this.render();
  },
  render() {
    this.$el.html(this.template(this.model.toJSON()));
  }
});

/**
 * App
 */
let App = View.extend({
  events: {
    'click .js-add-address-btn':'addAddress',
    'click .check-btn': 'sendOrder',
    'click .order-type a':'changePayType',
    'click .switch-wrap .switch':'changeSwitch'
  },
  initialize() {
    this.urlParams  = util.urlArgs();
    if (!bus.checkIsLogin()) {
      bus.showLoginPopup();
      return this
    } else {
      this.isAccount = 0;//是否使用账户余额 0表示不使用 1表示使用
      this.type=0;// 0表示现金模式 1表示现金&秒币
      this.goodsList = new Collection();
      this.goodsList.bind('add', this.renderGoodsList, this);
      this.addressModel = new Model();
      this.addressModel.bind('change', this.renderAddress, this);
      this.accountModel = new Model();
      this.accountModel.bind('change', this.renderAccount, this);
      // 账单明细
      this.accountList = new Model();
      this.accountList.bind('change', this.renderPackage, this);
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
  },
  parseData(data){
    this.goodsList.add(data.goods_list);
    this.addressModel.set(data.user_address);
    this.accountModel.set(data.user_account);
    this.accountList.set({...data,type:this.type,isAccount:this.isAccount});
  },
  renderGoodsList() {
    this.$('.js-goods-list-cot').empty();
    this.goodsList.each(cart => {
      new GoodsView({
        model: cart
      }).$el.appendTo(this.$('.js-goods-list-cot'))
    })
  },
  renderAddress(){
     this.address = new Address({
       el:this.$('.order-address'),
       model:this.addressModel
     });
  },
  renderAccount(){
     new Account({
       el:this.$('.order-account'),
       model:this.accountModel
     });
  },
  renderPackage(){
    this.packageDetail = new PackageDetail({
      el:this.$('.order-packageDetail'),
      model:this.accountList
    });
  },
  changePayType(e){
    let elem = this.$(e.currentTarget);
    elem.addClass('checked').siblings().removeClass('checked');
    this.accountList.set({type:elem.data('type')*1,isAccount:this.isAccount})
  },
  changeSwitch(e){
    let elem = this.$(e.currentTarget);
    if(elem.hasClass('switch-off')){
      this.isAccount=1;
      elem.addClass('switch-on').removeClass('switch-off');
    }else{
      this.isAccount=0;
      elem.addClass('switch-off').removeClass('switch-on');
    }
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
