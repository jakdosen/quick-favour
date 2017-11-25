/**
 * Created by Gavin.Li on 2017/11/22.
 */
export default {
	namespaced: true,
	state: {
		//文章详情数据
		article: {
			title: '',
			date: '',
			likeNum: 0
		},
		//留言信息
		notes: {
			total: 0,
			list: []
		}
	},
	actions: {
		//获取文章详情
		fetchArticleDetail ({commit, state}, params) {
			//todo
			commit('fetchArticleDetail', {
				title: '朝鲜释放的美国人被烧死路边 警方:系意外或自杀',
				date: '2017-5-30',
				likeNum: 2000,

			});
		},
		fetchArticleNoteList ({commit, state}, params) {
			//todo
			commit('fetchArticleNoteList', {
				total: 1000,
				list: [
					{
						id:23,
						src: 'http://somedomain.somdomain/x.jpg',
						fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
						title: '标题一',
						desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
						url: '/component/cell'
					},
					{
						id:33,
						src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
						title: '标题二',
						desc: 'test，test',
						url: '/component/cell'
					}
				]

			});
		}
	},
	mutations: {
		fetchArticleDetail(state, payload){
			Object.assign(state.article, payload)
		},
		fetchArticleNoteList(state, payload){
			Object.assign(state.notes, payload)
		}
	}
}
