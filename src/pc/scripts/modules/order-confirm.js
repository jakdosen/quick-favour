/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/order-confirm.less'
import $ from 'jquery'
import _ from 'underscore'
import {  checkorder, directcheckorder} from '^/services/mall'
import {getCartList, changeCartChecked, updateCartNum, delCart} from '^/services/mall'
import {Model, Collection, View, Events} from 'backbone'

let bus = window.bus;
let moduleEv = _.extend({}, Events);
/**
 * CartModel
 */
let CartModel = Model.extend({
  sync: true,
  idAttribute: 'cart_id',
  initialize() {
    this.bind('change:is_checked', _.debounce(this.sendChangeChecked, 300), this);
    this.bind('change:goods_number', _.debounce(this.sendChangeGoodsNum, 300), this);
  },
  sendChangeChecked() {
    changeCartChecked({
      cart_id: this.id,
      is_checked: this.get('is_checked')
    }).then((data) => {

    })
    moduleEv.trigger('check:total')
  },
  sendChangeGoodsNum() {
    updateCartNum({
      cart_id: this.id,
      new_number: this.get('goods_number')
    }).then((data) => {

    })
    moduleEv.trigger('check:total')
  },
  del() {
    delCart({
      cart_id: this.id,
    }).then(() => {
      this.destroy()
      moduleEv.trigger('check:total')
    })
  }
});
/**
 * CartCollection
 */
let CartCollection = Collection.extend({
  model: CartModel,
  getTotal() {
    let findList = this.filter(cart => {
      return cart.get('is_checked') == 1
    })
    let total = _.reduce(findList, (a, b) => {
      return {
        cash_total: a.cash_total + (parseInt(b.get('cash_price')) || 0) * b.get('goods_number'),
        coin_total: a.coin_total + (parseInt(b.get('coin_price')) | 0) * b.get('goods_number')
      }
    }, {cash_total: 0, coin_total: 0});
    total.goods_checked = findList.length;
    total.is_all_checked = !!this.length && this.length == findList.length;
    return total
  }
});
/**
 * CartView
 */
let CartView = View.extend({
  tagName: 'tr',
  template: _.template($('#cart-item-tpl').html()),
  events: {
    'change .js-cart-checkbox': 'changeChecked',
    'click .decrease-btn': 'decreaseNum',
    'click .increase-btn': 'increaseNum',
    'click .cart-del-btn': 'delCart'
  },
  initialize() {
    this.render();
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render() {
    this.$el.html(
      this.template(this.model.toJSON())
    )
  },
  changeChecked(e) {
    this.model.set('is_checked', e.currentTarget.checked | 0)
  },
  decreaseNum() {
    let num = this.model.get('goods_number')
    if (num < 2) return
    this.model.set('goods_number', --num)
    this.$('.goods-num').text(num);
  },
  increaseNum() {
    let num = this.model.get('goods_number')
    this.model.set('goods_number', ++num)
    this.$('.goods-num').text(num);
  },
  delCart() {
    this.model.del();
  }
});

/**
 * App
 */
let App = View.extend({
  events: {
    'change .js-select-all': 'changeSelectAllCart',
    'click .check-btn': 'checkCart'
  },
  initialize() {
    if (!!bus.checkIsLogin()) {
      bus.showLoginPopup();
      return this
    } else {
      this.cartList = new CartCollection;
      this.totalModel = new Model();
      this.cartList.bind('add', this.renderCartList, this)
      this.listenTo(moduleEv, 'check:total', this.changeTotal);
      this.totalModel.bind('change', this.renderTotal, this)
      // this.fetchCartListData();
    }
  },
  fetchCartListData() {
    getCartList().then((data) => {
      this.parseData(data);
    })
    this.parseData(mockData);
  },
  parseData(data) {
    //"cash_goods","coin_goods","cashcoin_goods"
    let cartList = [];
    _.each(_.pairs(data.carts || []), pair => {
      let type = pair[0];
      pair[1].goods_list && pair[1].goods_list.forEach(cart => {
        cartList.push(_.extend({type}, cart))
      })
    })
    this.cartList.add(cartList);
    this.totalModel.set(data.total || {});
    this.changeTotal();

  },
  renderCartList() {
    this.$('.js-cart-list-cot').empty();
    this.cartList.each(cart => {
      new CartView({
        model: cart
      }).$el.appendTo(this.$('.js-cart-list-cot'))
    })
  },
  //选择所有
  changeSelectAllCart(e) {
    this.$('.js-cart-checkbox').prop('checked', e.currentTarget.checked).trigger('change')
  },
  //提交订单
  checkCart() {

  },
  changeTotal() {
    this.totalModel.set(this.cartList.getTotal())
  },
  renderTotal() {
    let totalModel = this.totalModel, checkLen = totalModel.get('goods_checked');
    this.$('.js-check-num').text(checkLen);
    this.$('.js-select-all').prop('checked', totalModel.get('is_all_checked'));
    this.$('.check-btn').prop('disabled', checkLen == 0)[checkLen == 0 ? 'addClass' : 'removeClass']('disabled');
    this.$('.js-total-price').html(`<span>¥${totalModel.get('cash_total')}</span>
                                      / <span style="margin-right: 15px">M${totalModel.get('coin_total')}</span>
                                    `)
  }
});
new App({
  el: document.body
});
