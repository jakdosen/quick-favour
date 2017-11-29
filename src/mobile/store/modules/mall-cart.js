/**
 * Created by Gavin.Li on 2017/11/22.
 */
import _ from 'underscore'
export default {
  namespaced: true,
  state: {
    //是否编辑状态
    isEditMode:false,
    //商品列表
    goodsList:[

    ],
    //选中商品
    selectedIds:[]
  },
  actions: {
    //获取购物车列表
    fetchCartList ({ commit ,state},params) {
      commit('fetchCartList',{
        goodsList:[
          {
            type:'real',
            name:'现金商品',
            list:[
              {
                id:'0001',
                desc:'索玛格皮带 男士腰带真皮头层牛皮裤带商务休闲裤腰带z字母板扣S100057 115cm 金色扣黑带',
                img:'//image1.suning.cn/uimg/b2c/newcatentries/0010137040-000000000826122474_1_200x200.jpg?v=&from=mobile',
                price:1000,
                coinBi:0,
                num:2,
                selected:false
              },
              {
                id:'0002',
                desc:'珊瑚绒小毛毯空调毯盖毯双层冬季单人加厚儿童小毯子午睡毯办公室',
                img:'https://gw.alicdn.com/bao/uploaded/i1/3326712345/TB2xIZQhrsTMeJjSszhXXcGCFXa_!!3326712345.jpg_200x200q50s150.jpg_.webp',
                price:3000,
								coinBi:0,
                num:3,
                selected:false
              }
            ]
          },
          {
            type:'real&virtual',
            name:'现金&秒币',
            list:[
              {
                id:'0003',
                desc:'现金&秒币 珊瑚绒小毛毯空调毯盖毯双层冬季单人加厚儿童小毯子午睡毯办公室',
                img:'',
                price:1000,
								coinBi:100,
                num:2,
                selected:true
              }
            ]
          },
          {
            type:'virtual',
            name:'秒币商品',
            list:[
              {
                id:'0004',
                desc:'秒币商品 珊瑚绒小毛毯空调毯盖毯双层冬季单人加厚儿童小毯子午睡毯办公室',
                img:'',
                price:0,
								coinBi:10000,
                num:1,
                selected:false
              }
            ]
          }
        ],
      });
    },
    //结算
    checkOut() {

    },
    //编辑购物车
    startEditMode({commit}){
      commit('changeEditMode',true)
    },
    //结束编辑
    stopEditMode({commit}){
      commit('changeEditMode',false)
    },
    //选择单个商品
    changeSelectSingleGoods({commit},params){
      commit('changeSelectSingleGoods',params)
    },
    //选择多个商品
    changeSelectBatchGoods({commit},params){
      commit('changeSelectBatchGoods',params)
    },
    //选择所有商品
    changeSelectAllGoods({commit},selected){
      commit('changeSelectAllGoods',selected)
    },
    //移除选中商品
    removeSelectedGoods({commit}){
      commit('removeSelectedGoods')
      commit('changeEditMode',false)
    },
    //减少商品数量
    decreaseQuantity({commit},specId){
      commit('changeQuantity',{
        specId,
        type:'decrease'
      })
    },
    //增加商品数量
    increaseQuantity({commit},specId){
      commit('changeQuantity',{
        specId,
        type:'increase'
      })
    }
  },
  mutations: {
    fetchCartList(state, payload){
      Object.assign(state,payload)
    },
    changeEditMode(state, payload){
      state.isEditMode = payload;
    },
    //选择单个商品
    changeSelectSingleGoods(state, payload){
      let goods = _.chain(state.goodsList).pluck('list').flatten().filter(item=>item.id == payload.id).value();
      if(goods.length){
        goods[0].selected = payload.selected;
      }
    },
    //选择多个商品
    changeSelectBatchGoods(state, payload){
      let goodsBatch = state.goodsList.filter(item=>item.type == payload.type);
      if(!goodsBatch.length) return
      goodsBatch[0].list.forEach(item=>item.selected = payload.selected)
    },
    //选择所有商品
    changeSelectAllGoods(state, payload){
      state.goodsList.forEach(item=>{
        item.list.forEach(obj=>{
          obj.selected = payload
        })
      })
    },
    //改变商品数量
    changeQuantity(state, payload){
      let {specId,type} = payload;
      let goods = _.chain(state.goodsList).pluck('list').flatten().filter(item=>item.id == specId).value();
      if(goods.length){
        let num = goods[0].num;
        type == 'increase' && num ++
        type == 'decrease' && num --
        num > 0 && ( goods[0].num = num)
      }
    },
    removeSelectedGoods(state){
      state.goodsList.forEach(subList=>{
        subList.list = subList.list.filter(item=>!item.selected)
      })
    }
  }
}
