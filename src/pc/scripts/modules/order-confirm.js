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
import { create, done, addressList, setDefault } from '^/services/order'
import {Model, Collection, View, Events} from 'backbone'

let bus = window.bus;
let moduleEv = _.extend({}, Events);

/**
 *  AddressPopupView
 */
let AddressPopupView = Dialog.extend({
  template:_.template($('#address-form-tpl').html()),
  events:{
    'click .sure':'confirmBtn',
    'click .cancel':'cancelBtn'
  },
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
    this.addRessInput = new AddressInput({
      target:this.$('.js-address-input')
    });
  },
  confirmBtn(){
    if(!this.addRessInput) return;
    const message = msg => $.toast({
      heading: '错误提示',
      text: msg,
      position: 'mid-center',
      stack: false,
      icon: 'error'
    })
    this.addRessInput.sendArgs(cityData =>{
      let arvs = {
        true_name:this.$('.d-address-body .name').val(),
        mobile:this.$('.d-address-body .phone').val(),
        province_id:cityData['provinceId'],
        city_id:cityData['cityId'],
        county_id:cityData['districtId'],
        address:this.$('.d-address-body .address').val(),
        is_default:'1'}
        if(!arvs.true_name){
          message('收货人姓名不可为空！')
          return;
        }else if(!arvs.mobile){
          message('收货人电话不可为空！')
          return;
        }else if(!arvs.province_id||!arvs.city_id){
          message('省份城市选择不可为空！')
          return;
        }else if(!arvs.address){
          message('详情地址不可为空！')
          return;
        }
        create(arvs).then(data =>{
            window.location.reload();
        });
    });
  },
  cancelBtn(){
     this.close();
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
  events:{
    'click .address-list .address-nav': 'openMore',
    'click .address-set-default':'setDefault'
  },
  template: _.template($('#address-item').html()),
  initialize() {
    this.dataList = []; //记录当前address集合
    _.delay(this.fetchDate.bind(this),1000);
    this.render();
  },
  openMore(e){
     let elem = this.$(e.currentTarget);
     elem.toggleClass('open');
     this.$('.address-content').slideToggle();
  },
  fetchDate(){
    addressList().then(data => {
        if(!data.data.length){
           this.$('.address-list').hide();
           return;
        }
        this.renderList(data);
    });
  },
  render() {
     this.$('.address-item').empty().append(this.template(this.model.toJSON()));
  },
  renderList({data}){
    this.dataList = data;
    this.$('.address-content').empty().append(_.template($('#tpl-address-list').html())(data));
  },
  setDefault(e){
    setDefault({address_id:this.$(e.currentTarget).data('id')}).then(({ id })=>{
        window.location.reload();
    })
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
      this.isAccount = 1;//是否使用账户余额 0表示不使用 1表示使用  // 默认开启
      this.type=0;// 0表示现金模式 1表示现金&秒币
      this.addressId='';  // 表示地址ID
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
    // 下面处理数据
    this.addressId = data.user_address.id;
    this.goodsList.add(data.goods_list);
    this.addressModel.set(data.user_address);
    this.accountModel.set(data.user_account);
    this.accountList.set({...data,type:this.type,isAccount:this.isAccount});

    // 处理类型
    let type = _.chain(data.goods_list).pluck('goods_type').uniq().value();
    type.map((item)=>{
       if(type.length>1) return true;
       switch (item*1){
         case 1:
           this.$('.order-type a:eq(1)').hide().siblings().trigger('click');
           break;
         case 2:
           this.$('.order-type a:eq(0)').hide().siblings().trigger('click');
           break;
       }
       return;
    });

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
    let
      payLoad = {pay_type:Number(this.type)+1,account_pay:Number(this.isAccount)+1,address_id:this.addressId,goods_list:this.goodsList.toJSON()};
    //   userAccount  = this.accountList.get('user_account'),
    //   cashCoin = this.accountList.get('cashcoin_pay'),
    //   sign = true;
    // if(this.isAccount ==1){
    //   // 1表示现金&秒币支付
    //   sign =  this.type == 1 ? userAccount.can_use_m_coin-cashCoin.coin_total>=0 : userAccount.can_use_run_money-cashCoin.cash_total>=0;
    // }
    // sign &&
    done(payLoad).then(({order_ids, payment_id})=>{
        if(!Number(this.$('.order-summary span[data-pay]').data('pay'))) {
            location.href='paySuccess.html?payment_id='+payment_id;
        }else{
            location.href='payOrder.html?order_ids='+order_ids;
        }
    });
  },
  addAddress(){
    new AddressPopupView();
  }
});
new App({
  el: document.body
});
