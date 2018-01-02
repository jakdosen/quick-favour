/**
 * Created by shiyang.yao on 2017/12/5.
 */
import $ from 'jquery'
import _ from 'underscore'
import {View,Model,Collection} from 'backbone'
import { login } from '^/services/user'
import {areaData}  from '^/utils/china-city'

const tpl = `
  <div class="address-wrap">
    <a class="address-input">
      <span class="address-choose-text"> </span>
      <b class="iconfont icon-arrow-down"></b>
    </a>
    <div class="address-box">
      <ul class="address-choose-area"></ul>
      <div class="area-wrap"> </div>
    </div>
  </div>`;
const chooseText = `<span><@-obj.provinceName||'选择省'@></span>
        <span><@-obj.cityName||'选择市'@></span>
        <span><@-obj.districtName||'选择区/县'@></span>`;

const chooseTab = ` <li class="province <@-obj.areaType == 'province'? 'active':''@>"><@-obj.provinceName||'选择省'@></li>
        <li class="city <@-obj.areaType == 'city' ? 'active':''@>"><@-obj.cityName||'选择市'@></li>
        <li class="district <@-obj.areaType == 'district'? 'active':''@>"><@-obj.districtName||'选择区/县'@></li>`;

const addressInput = View.extend({
  template:_.template(tpl),
  events:{
    'click':function (e) {
      e.stopPropagation();
    },
    'click .address-input':'toggleOpen',
    'click .province':'showProvince',
    'click .city':'showCity',
    'click .district':'showDistrict',
    'click .area-wrap a':'selectArea'
  },
  initialize(options){
    this.options = options;
    this.model = new Model({
      provinceId:"",
      provinceName:"",
      cityId:"",
      cityName:"",
      districtId:"",
      districtName:""
    });
    this.stateModel = new Model({
      areaType:''
    });
    this.isOpen = false;
    this.model.bind('change',_.debounce(this.renderChooseText,300,true),this)
    this.model.bind('change',_.debounce(this.renderChooseTab,300,true),this)
    this.stateModel.bind('change:areaType',this.changeAreaType,this)
    this.areaList = new Collection();
    this.areaList.bind('reset',this.renderAreas,this)
    this.render();
  },
  render(){
    this.$el.append(this.template(this.model.toJSON())).appendTo(this.options.target);
    this.renderChooseText();
    this.renderChooseTab();
  },
  renderChooseText(){
    this.$('.address-choose-text').html(_.template(chooseText)(this.model.toJSON()));
  },
  renderChooseTab(){
    this.$('.address-choose-area').html(
      _.template(chooseTab)(
        $.extend(this.model.toJSON(),this.stateModel.toJSON())
      )
    );
  },
  open(){
    this.isOpen = true;
    this.$('.address-wrap').addClass("open");
    this.stateModel.get('areaType') || this.stateModel.set('areaType','province');
  },
  close(){
    this.isOpen = false;
    this.$('.address-wrap').removeClass("open");
  },
  toggleOpen(){
    this.isOpen?this.close():this.open()
  },
  showProvince(){
    this.stateModel.set('areaType','province');
  },
  showCity(){
    if(this.model.get('provinceId')){
      this.stateModel.set('areaType','city');
    }
  },
  showDistrict(){
    if(this.model.get('cityId')){
      this.stateModel.set('areaType','district');
    }
  },
  changeAreaType(){
    let areaType = this.stateModel.get('areaType');
    this.$('.address-choose-area .active').removeClass('active');
    this.$(`.address-choose-area .${areaType}`).addClass('active');
    switch (areaType){
      case 'province':
        this.areaList.reset(_.map(areaData,d=>{
          return _.pick(d,'id','name')
        }));
        break
      case 'city':
        let citys = _.chain(_.chain(areaData)
          .find(d=>d.id ==this.model.get('provinceId'))
          .propertyOf().value()('child'))
          .map(d=>{return {id:d.id,name:d.name}}).value();
        this.areaList.reset(citys);
        break
      case 'district':
        let districts = _.chain(_.chain(areaData)
          .find(d=>d.id ==this.model.get('provinceId'))
          .propertyOf().value()('child'))
          .find(d=>d.id ==this.model.get('cityId'))
          .propertyOf().value()('child')
        this.areaList.reset(districts);
        break
    }

  },
  renderAreas(){
    let cot = this.$('.area-wrap').empty();
    this.areaList.each(a=>{
      a = a.toJSON();
      cot.append(`<a data-id="${a.id}">${a.name}</a>`)
    });
  },
  selectArea(e){
    let areaType = this.stateModel.get('areaType');
    let el = $(e.currentTarget)
    switch (areaType){
      case 'province':
          this.model.set({
            provinceId:el.data('id'),
            provinceName:el.text(),
            cityId:"",
            cityName:"",
            districtId:"",
            districtName:""
          });
          this.showCity();
        break
      case 'city':
        this.model.set({
          cityId:el.data('id'),
          cityName:el.text(),
          districtId:"",
          districtName:""
        });
        this.showDistrict();
        break
      case 'district':
        this.model.set({
          districtId:el.data('id'),
          districtName:el.text()
        });
        this.close();
        break
    }
  },
  getSelectData(){
    return this.model.toJSON()
  },
  sendArgs(fn){
      fn(this.model.toJSON());
  },
  setSelectData(obj){
    this.model.set(obj)
  }
});

export default addressInput;
