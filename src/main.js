// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as uiv from 'uiv'
import Vuex from 'vuex';
import './css/bootstrap/css/bootstrap.min.css'
import './fonts/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(uiv)
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		headings: '标题',
		flag: 0,
		// alternateUrl: 'https://www.kkpeihu.com' + '/images/uploadsSystem/SysAdvert/', //轮播图路径
		// consultUrl: 'https://www.kkpeihu.com' + '/images/uploadsSystem/SysOpera/', //咨询标题图
		consultUrl: 'https://' + document.location.host + '/images/uploadsSystem/SysOpera/', //咨询标题图
		alternateUrl: 'https://' + document.location.host + '/images/uploadsSystem/SysAdvert/', //轮播图路径
	},
	mutations: {
		token(state) {
			// 变更状态
		}
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})
