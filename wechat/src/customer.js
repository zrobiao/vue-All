"use strict";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iconfontcss from './fonts/iconfont.css';
import commoncss from './css/common.css'; // 共用样式
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import util from './js/util/util';
//import "babel-polyfill";
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex';
import config from './config'
import LoginVerify from './assets/js/login_verify'

import {
	Toast,
	Indicator
} from 'mint-ui';

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Vuex)

//var isTest = true;
//let vue;
//设置图片路径
//if(isTest){
//	imgUrlValue = 'https://test.kkpeihu.cn/images/uploadsWorkAvatar/';
//}else{
//	imgUrlValue = 'https://sjht.kkpeihu.cn/images/uploadsWorkAvatar/';
//}
//加载等待
//Indicator.open({
//	text: '加载中...',
//	spinnerType: 'fading-circle'
//});
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
//this.$store.state.token  子组件能通过 this.$store 访问到
const store = new Vuex.Store({
	state: {
		headings: '标题',
		isFooterShow: false,
		flag: 3,
		//27（92）
		userId: 27,
		workId: 92,
		//		customer_appid: isTest ? 'wx9e64c093244fb42b' : 'wx059ae8af2befce8d', //微信ID
		//		worker_appid: isTest ? 'wxc623feee9451eb31' : 'wx8d52e52502d04610',
		//imgUrl:'http://192.168.0.56:8139/'     //图片地址
		imgUrl: 'https://' + document.location.host + '/images/uploadsWorkAvatar/',
		// consultUrl: 'https://www.kkpeihu.com' + '/images/uploadsSystem/SysOpera/', //咨询标题图
		// alternateUrl: 'https://www.kkpeihu.com' + '/images/uploadsSystem/SysAdvert/', //轮播图路径
		consultUrl: 'https://' + document.location.host + '/images/uploadsSystem/SysOpera/', //咨询标题图
		alternateUrl: 'https://' + document.location.host + '/images/uploadsSystem/SysAdvert/', //轮播图路径
	},
	mutations: {
		token(state) {
			// 变更状态
		}
	}
})

   new Vue({
   	el: '#app',
   	store,
   	router,
   	template: '<App/>',
   	components: {
   		App
   	}
   })

//微信端发布开启------start---------
//function show() {
//	Indicator.close();
//new Vue({
//	//el: '#app', // 挂载点，挂载在id为app的组件上  
//	template: '<App/>',
//	router, //把声明的router对象作为参数传给vue对象  
//	store,
//	components: {
//		App
//	} // 组册组件，这里是一个es6的缩写方法，相当于components:{App:App}  
//});
//vue.$mount('#app'); // 手动把vue挂载到dom上  
//}
// //
// 微信检测登录
//if (!LoginVerify.init(config.customer_appid, 'customer', function () {
//		show()
//		console.log('进入回调函数')
//	})) {
//	show()
//	console.log("登录");
//}
//    LoginVerify.init(config.customer_appid, 'customer', function() {
// // 	if(!window.user || !window.user.phoneNum) {
// // 		router.replace({
// // 			name: '注册'
// // 		})
// // 	}
//    })
/**
 * 获取用户
 */
axios.get('/api/user/me', {
	headers: {
		'Content-Type': 'application/json'
	}
}).then(function (resp) {
	if (resp) {
		if (resp.status == 200) {
			window.user = resp.data;
			store.state.userId = resp.data.user_id;
		}
	// show();
	}
})


//微信端发布开启-------end---------

//获取用户信息
//util.Ajax('/api/user/me?_method=GET',{} ,function(data) {
//	if(data) {
//		console.log("获取用户信息")
//		console.log(data)
////		sessionStorage.setItem('accessToken', false);
////		sessionStorage.setItem('userName', "18285533808");
////		Toast("登陆成功");
////		util.pushRouter(router, '/customer/workers'); //首页
//		if(data.status == 200) {
//			window.user = data.data;
//			store.state.userId = data.data.user_id;
//			console.log("用户"+store.state.userId)
//		}
//	}
//})


/**
 * 全局拦截请求
 */
// router.beforeEach((to, from, next) => {
// 	window.scrollTo(0, 0);
// 	console.log(to.name)
// 	var matchedLength = to.matched.length;
// 	if (matchedLength <= 0) { //没有的页面被请求处理
// 		Toast("请求错误！");
// 		router.back(); //返回上一页
// 		//		 utils.pushRouter(router,'Error',{error:"404"}); //404错误页	
// 	}
// 	if (to.matched.some(record => record.meta.requireAuth)) {
// 		if (!window.user.phoneNum) {
// 			console.log('跳转注册页')
// 			next({
// 				path: '/customer/registration',
// 				query: {
// 					redirect: to.fullPath
// 				}
// 			})
// 		} else {
// 			next()
// 		}
// 	} else {
// 		next()
// 	}
// 	//当用户没注册的时候
// })