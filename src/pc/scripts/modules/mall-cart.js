/**
 * Created by Gavin Li on 12/4/2017.
 */
import '@/styles/mall-cart.less'
import $ from 'jquery'
import _ from 'underscore'
import {getCartList, changeCartChecked, updateCartNum, delCart} from '^/services/mall'
import {Model, Collection, View, Events} from 'backbone'

let bus = window.bus;
let moduleEv = _.extend({}, Events);

let mockData = {
  "carts": {
    "cash_goods": [],
    "coin_goods": {
      "checked_count": 1,
      "goods_list": [
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
          "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/460_G_1459126720606.jpg"
        }
      ]
    },
    "cashcoin_goods": {
      "checked_count": 1,
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
          "goods_attr_id": "4044,4049",
          "goods_attr_str": null,
          "is_checked": 1,
          "is_on_sale": 1,
          "goods_img": "http://t13.zetadata.com.cn:8082/upload/images/201610/goods_img/430_G_1459971655294.jpg"
        }
      ]
    }
  },
  "total": {
    "goods_checked": 3,
    "goods_count": 3,
    "cash_total": "40.00",
    "coin_total": 120035
  }
};
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
      this.fetchCartListData();
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
