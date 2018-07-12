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
import clipper from '../static/clipper'
import { Toast, Indicator } from 'mint-ui';

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Vuex);
Vue.use(clipper);

//var isTest = true;
// //微信端发布开启-------start----------------
let vue;
//设置图片路径
//if(isTest){
//	imgUrlValue = 'https://test.kkpeihu.cn/images/uploadsWorkAvatar/';
//}else{
//	imgUrlValue = 'https://sjht.kkpeihu.cn/images/uploadsWorkAvatar/';
//}
//加载等待
//Indicator.open({text: '加载中...',spinnerType: 'fading-circle'});

//微信端发布开启-------end--------------
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
//this.$store.state.token  子组件能通过 this.$store 访问到
//15
const store = new Vuex.Store({
	state: {
		headings: '标题',
		isFooterShow: false,
		flag: 3,
		//27（92）
		userId: 63,
		workId: 81,
//		customer_appid: isTest ? 'wx9e64c093244fb42b' : 'wx059ae8af2befce8d', //微信ID
//		worker_appid: isTest ? 'wxc623feee9451eb31' : 'wx8d52e52502d04610',
		//imgUrl:'http://192.168.0.56:8139/'     //图片地址
		imgUrl: 'https://' + document.location.host + '/images/uploadsWorkAvatar/',
		consultUrl:'https://' + document.location.host + '/images/uploadsSystem/SysOpera/',//咨询标题图
		alternateUrl:'https://' + document.location.host + '/images/uploadsSystem/SysAdvert/',//轮播图路径
	},
	mutations: {
		token(state) {
			// 变更状态
		}
	}
})

/* eslint-disable no-new 非微信端开发开启*/
new Vue({
el: '#app',
store,
router,
template: '<App/>',
components: { App }
})

//微信端发布开启------start---------
// function show() {
// 	//Indicator.close();
// 	vue = new Vue({
// 		el: '#app', // 挂载点，挂载在id为app的组件上  
// 		template: '<App/>',
// 		router, //把声明的router对象作为参数传给vue对象  
// 		store,
// 		components: {
// 			App
// 		} // 组册组件，这里是一个es6的缩写方法，相当于components:{App:App}  
// 	});
// 	vue.$mount('#app'); // 把vue挂载到dom上  
// }

// // //微信检测登录
// if(!LoginVerify.init(config.worker_appid, 'worker', function() {
// 	    show()
// 	    console.log("进回调函数")
// 		if(!window.user || !window.user.phoneNum) {
// 			//router.push("/worker/registration"); //
// 			router.replace({
// 		      name: '护工注册'
// 		    })
// 		}
// //		console.log("LoginVerify")
// //		console.log(window.user)
// //		console.log(!window.user)
// 	})) {
// 	show()
// 	console.log("登录");
// }

// /**
//    * 获取用户
//    */
// function getUser(callback) {
// 	axios.get('/api/user/me', {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	}).then(function(resp) {
// //		console.log(resp);
// //		console.log("getUser2");
// 		if(resp.status == 200){
// 			window.user = resp.data;
// 			store.state.userId = resp.data.user_id;
// 			callback()
// 		}
		

// 	})
// }

// /**
//  * 获取护工
//  */
// axios.get('/api/work', {
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// }).then(function(resp) {
// 	//Indicator.close();
// //	console.log(resp);
// //	console.log("getWorker2");
// //	console.log("resp.data.length:"+resp.data.length);
// 	if (resp) {
// //		console.log("window.worker");
// 	    if (resp.data.length != 0) {
// 	    	window.worker = resp.data[0];
// //			console.log(window.worker);
// //			console.log("store.state.workerId:"+resp.data[0].work_id);
// 			store.state.workId = resp.data[0].work_id;
// 	    }
// 	    getUser(function () {
// 	      show()
// 	    })
// 	}


// }).catch(function(error) {
// 	//Indicator.close();
// 	console.log(error);
// 	if(error.response){
// 		if(error.response.data.status == 404) {
// 			router.replace({
// 		        name: '护工注册'
// 		      })
// 			 getUser(function () {
// 		      show()
// 		    })
// 		}
// 	}
// });

//微信端发布开启-------end---------

/**
 * 全局拦截请求
 */
// router.beforeEach((to, from, next) => {
// 	//window.scrollTo(0, 0);
// 	console.log(to.name);
// 	var matchedLength = to.matched.length;
// 	if(matchedLength <= 0) { //没有的页面被请求处理
// 		Toast("请求错误！");
// 		router.back(); //返回上一页
// //		 utils.pushRouter(router,'Error',{error:"404"}); //404错误页	
// 	}
// 	当用户没注册的时候
// 	if(!window.user || !window.user.phoneNum) {
// 		console.log("3");
// 		next()
// 	} 
// })

//处理登录~~~拦截器 非微信端开启
// router.beforeEach((to, from, next) => {
// 	  var matchedLength=to.matched.length;
// 	  if(matchedLength<=0){
// 	  	// util.pushRouter(router,'Error',{error:"404"}); //404错误页	
// 	  }else{
// 	  if(to.name!="注册"){ //判断该路由是否需要登录权限
// 	     let accessToken=true //sessionStorage.getItem("accessToken");
// 	  	  if (accessToken) {  // 通过vuex state获取当前的token是否存在
//          next();
//     }else{
//      	util.pushRouter(router,'/customer/registration'); //登录页  	
//      }
// 		  }else{
// 		  	  next();
// 		  }
// 	  }
// });
// router.beforeEach((to, from, next) => {
// 	  var matchedLength=to.matched.length;
// 	  if(matchedLength<=0){
// 	  	// util.pushRouter(router,'Error',{error:"404"}); //404错误页	
// 	  }else{
// 	  if(to.name!="注册"){ //判断该路由是否需要登录权限
// 	     let accessToken=true //sessionStorage.getItem("accessToken");
// 	  	  if (accessToken) {  // 通过vuex state获取当前的token是否存在
//          next();
//     }else{
//      	util.pushRouter(router,'/customer/registration'); //登录页  	
//      }
// 		  }else{
// 		  	  next();
// 		  }
// 	  }
// });

//1.获取TokeenID
//2.同意进入首页
//3.不同意进入登录页
//判断显否登录
// util.Ajax('/api/user/me?_method=PATCH',{"phoneNum":18285533808},function(data){
//			         if(data){
//			         	  sessionStorage.setItem('accessToken', false);
//                sessionStorage.setItem('userName',"18285533808");
//			         	  Toast("登陆成功");
//			         	  util.pushRouter(router, '/customer/workers'); //首页
//			          }
// })