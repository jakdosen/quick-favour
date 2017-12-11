/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/mall-cart.less'
import $ from 'jquery'
import _ from 'underscore'
import {getCartList,changeCartChecked,updateCartNum,delCart} from '^/services/mall'
import {Model,Collection,View,Events} from 'backbone'
let bus = window.bus;
let moduleEv = _.extend({},Events);

let mockData = {
  "carts": {
    "cash_goods": [],
    "coin_goods": [
      {
        "cart_id": 14,
        "goods_id": 460,
        "goods_name": "菲律宾香蕉约1.5kg",
        "cash_price": "5.00",
        "coin_price": "24",
        "goods_type": 2,
        "goods_number": 2,
        "goods_attr_id": "4044,4049",
        "goods_attr_str": "越南 8成熟",
        "is_checked": 1,
        "is_on_sale": 1,
        "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/460_G_1459126720606.jpg"
      }
    ],
    "cashcoin_goods": [
      {
        "cart_id": 1,
        "goods_id": 430,
        "goods_name": "以色列葡萄柚4个约250g/个",
        "cash_price": "30.00",
        "coin_price": "40.00",
        "goods_type": 3,
        "goods_number": 1,
        "goods_attr_id": "4044,4049",
        "goods_attr_str": null,
        "is_checked": 1,
        "is_on_sale": 1,
        "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/430_G_1459971655294.jpg"
      }
    ]
  },
  "total": {
    "goods_checked": 2,
    "goods_count": 2,
    "cash_total": "40.00",
    "coin_total": 88
  }
};
/**
 * CartModel
 */
var CartModel = Model.extend({
  sync:true,
  idAttribute:'cart_id',
  initialize(){
    this.bind('change:is_checked',_.debounce(this.sendChangeChecked, 300),this);
    this.bind('change:goods_number',_.debounce(this.sendChangeGoodsNum, 300),this);
  },
  sendChangeChecked(){
    moduleEv.trigger('check:isAllSelected')
    changeCartChecked({
      cart_id:this.id,
      is_checked:this.get('is_checked')
    }).then((data)=>{

    })

  },
  sendChangeGoodsNum(){
    updateCartNum({
      cart_id:this.id,
      new_number:this.get('goods_number')
    }).then((data)=>{

    })
  },
  del(){
    delCart({
      cart_id:this.id,
    }).then(()=>{
      this.destroy()
      moduleEv.trigger('check:isAllSelected')
    })
  }
});
/**
 * CartView
 */
var CartView = View.extend({
  tagName:'tr',
  template:_.template($('#cart-item-tpl').html()),
  events:{
    'change .js-cart-checkbox':'changeChecked',
    'click .decrease-btn':'decreaseNum',
    'click .increase-btn':'increaseNum',
    'click .cart-del-btn':'delCart'
  },
  initialize(){
    this.render();
    this.listenTo(this.model,'destroy',this.remove);
  },
  render(){
    this.$el.html(
      this.template(this.model.toJSON())
    )
  },
  changeChecked(e){
    this.model.set('is_checked',e.currentTarget.checked|0)
  },
  decreaseNum(){
    let num = this.model.get('goods_number')
    if(num < 2) return
    this.model.set('goods_number',--num)
    this.$('.goods-num').text(num);
  },
  increaseNum(){
    let num = this.model.get('goods_number')
    this.model.set('goods_number',++num)
    this.$('.goods-num').text(num);
  },
  delCart(){
    this.model.del();
  }
});

/**
 * App
 */
let App = View.extend({
  events:{
    'change .js-select-all':'changeSelectAllCart',
    'click .check-btn':'checkCart'
  },
  initialize(){
    if(!!bus.checkIsLogin()){
      bus.showLoginPopup();
      return this
    }else{
      this.cartList = new (Collection.extend({model:CartModel}));
      this.totalModel = new Model();
      this.cartList.bind('add',this.renderCartList,this)
      this.listenTo(moduleEv,'check:isAllSelected',this.checkIsAllSelected);
      this.totalModel.bind('change:cash_total change:coin_total',this.renderTotalPrice,this)
      this.fetchCartListData();
    }
  },
  fetchCartListData(){
    getCartList().then((data)=>{
      this.parseData(data);
    })
    this.parseData(mockData);
  },
  parseData(data){
    //"cash_goods","coin_goods","cashcoin_goods"
    let cartList = [];
    _.each(_.pairs(data.carts||[]),pair=>{
      let type = pair[0];
      pair[1].forEach(cart=>{
        cartList.push(_.extend({type},cart))
      })
    })
    this.cartList.add(cartList);
    this.totalModel.set(data.total||{});
    this.checkIsAllSelected();
  },
  renderCartList(){
    this.$('.js-cart-list-cot').empty();
    this.cartList.each(cart=>{
      new CartView({
        model:cart
      }).$el.appendTo(this.$('.js-cart-list-cot'))
    })
  },
  //选择所有
  changeSelectAllCart(e){

  },
  //提交订单
  checkCart(){

  },
  checkIsAllSelected(){
    let arr = this.cartList.pluck('is_checked');
    let checkNum = _.reduce(arr,(a,b)=> a + b,0);
    this.$('.js-check-num').text(checkNum);
    this.$('.js-select-all').prop('checked',!!arr.length && checkNum == arr.length);
    this.$('.check-btn').prop('disabled',checkNum == 0)[checkNum == 0?'addClass':'removeClass']('disabled');
  },
  renderTotalPrice(){
    this.$('.js-total-price').html(
      `<span>¥${this.totalModel.get('cash_total')}</span>
        / <span style="margin-right: 15px">M${this.totalModel.get('coin_total')}</span>
      `
    )
  }
});
new App({
  el:document.body
});
