/**
 * Created by shiyang.yao on 2017/12/21.
 */
// 搜索模块
const Search = VIEW.extend({
  events:{
    'keyup .qb-search-content input':function (e) {
      this.model.set('keywords',$(e.currentTarget).val());
    },
    'click .qb-search-content span': 'searchMore',
  },
  initialize(options){
    // 参数
    this.options = options;
    // 注册model
    this.createModel();
    // 从本地存储里取出搜索历史
    this.searchHistory();
  },
  createModel(){
    this.model = new MODEL();
  },
  searchHistory(){
    let
      elem = this.$('.qb-search-history'),
      searchHistory = window.localStorage.getItem('searchHistory');
    elem.empty();
    elem.append(_.template(searchTemplate)(searchHistory&&searchHistory.split(',')));
  },
  searchMore(){
    location.href="?keywords="+this.model.get('keywords');
  }
});
