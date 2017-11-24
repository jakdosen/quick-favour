/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
  namespaced: true,
  state: {
    //文章详情数据
    article:{
      title:'',
      date:'',
      likeNum:0,
      detail:''
    },
    //是否可分享
    sharable:true,
    //留言内容
    note:''
  },
  actions: {
    //获取文章详情
    fetchArticleDetail ({ commit ,state},params) {
      //todo
      commit('fetchArticleDetail',{
        title:'朝鲜释放的美国人被烧死路边 警方:系意外或自杀',
        date:'2017-5-30',
        likeNum:2000,
        detail:` <div class="photo">
                  <a href="//cms-bucket.nosdn.127.net/catchpic/b/b4/b4041a1d826a8c8fade605a5792c7fac.jpg">
                      <img alt="当地时间2010年8月27日，朝鲜平壤，美国公民戈梅斯提着行李准备登机。 东方IC 资料" data-src="//cms-bucket.nosdn.127.net/catchpic/b/b4/b4041a1d826a8c8fade605a5792c7fac.jpg" src="//cms-bucket.nosdn.127.net/catchpic/b/b4/b4041a1d826a8c8fade605a5792c7fac.jpg?imageView&amp;thumbnail=750x0&amp;quality=85&amp;type=webp&amp;interlace=1">
                      <span>当地时间2010年8月27日，朝鲜平壤，美国公民戈梅斯提着行李准备登机。 东方IC 资料</span>
                  </a>
              </div><p>2010年在朝鲜被捕，并在美国前总统卡特的斡旋下被释放的美国公民戈麦斯（Aijalon Mahli Gomes）近日被发现在加州被火烧死。</p><p>据美国有线电视新闻网（CNN）11月23日报道，事件发生在当地时间18日早晨，事发地点为加州圣迭戈Mission Bay公园。圣迭戈警方发布消息称，当时一名未当值的加州公路巡逻警察注意到离公路不远的地方有着火的男子，于是提供了帮助，但男子最终死亡。</p><p>警方发言人格里芬表示：“初步调查显示，这并不是谋杀，而是意外死亡或者是自杀。”他说，准确的结论需要等待法医的检查结果。</p><p>戈麦斯今年38岁，来自波斯顿，2010年他因非法入境朝鲜和从事“敌对活动”，被朝鲜法院判处8年劳动改造和60万美元的罚款。美国前总统卡特随后访问朝鲜斡旋，戈麦斯于当年8月获释。朝鲜中央通讯社当时发布消息称，这名美国人根据金正日的命令被特赦。</p><p>在进入朝鲜前，戈麦斯在韩国呆了9年，教英文。根据戈麦斯2015年自行出版（电子版）小说《暴力与人性》中的介绍，戈麦斯从小在马萨诸塞州公立学校接受教育，随后在缅因州获得了英语学士学位。他在马萨诸塞州郊区从事教育工作，然后前往韩国首尔附近的农村教书。</p><p>从朝鲜回国后的戈麦斯在公众视野中消身匿迹。据其，那段时间中，他一直在努力恢复“因在朝鲜被关押期间受到的伤害”，其中包括治疗性写作。《暴力与人性》的创作正是基于此。</p>
                    <div class="otitle_editor">
                        <p class="otitle">
                            (原标题：朝鲜释放的美国人戈麦斯被烧死路边，加州警方：系意外或自杀)
                        </p>
                         
                        <p class="editor">
                            (责任编辑：刘效武_NN4113)
                        </p>
                    </div>`
      });
    },
    changeNode({ commit ,state},noteText){
      commit('changeNode',noteText)
    },
    //发送留言
    postNote({state}){
      //todo
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(state.note)
        }, 1000)
      })
    }
  },
  mutations: {
    fetchArticleDetail(state, payload){
      Object.assign(state.article,payload)
    },
    changeNode(state, payload){
      state.note = payload
    }
  }
}
