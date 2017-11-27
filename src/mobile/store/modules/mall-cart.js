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
    goods:[

    ],
    //选中商品
    selectedIds:[]
  },
  actions: {
    //获取购物车列表
    fetchCartList ({ commit ,state},params) {
      commit('fetchCartList',{
        goods:[
          {
            type:'real',
            name:'现金',
            list:[
              {
                id:'0001',
                desc:'test1',
                img:'',
                price:1000,
                coinBi:0,
                num:2,
                selected:false
              },
              {
                id:'0002',
                desc:'test2',
                img:'',
                price:3000,
								coinBi:0,
                num:3,
                selected:false
              }
            ]
          },
          {
            type:'real&virtual',
            name:'现金&虚拟币',
            list:[
              {
                id:'0003',
                desc:'test3',
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
            name:'虚拟币',
            list:[
              {
                id:'0004',
                desc:'test4',
                img:'',
                price:0,
								coinBi:10000,
                num:2,
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
    //选择商品
    selectGood({commit},params){

    },
    //移除选中商品
    removeSelectedGood({commit}){

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
    changeSelectSingle(){

    },
    //选择多个商品
    changeSelectBatch(){

    }
  }
}
