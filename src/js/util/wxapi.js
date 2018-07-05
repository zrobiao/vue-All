// wxapi.js
import wx from 'weixin-js-sdk';
import axios from 'axios';
const wxApi = {
	/**
	 * [isweixin 判断是否微信浏览器]
	 */
	isweixin() {
		const ua = window.navigator.userAgent.toLowerCase()
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true
		} else {
			this.$router.push({
				path: '/wxkj/isnotWechat'
			})
			return false
		}
	},
	wxRegister(type, callback) {
		let getConfigUrl = "";
		if(type == "worker") {
			getConfigUrl = '/wechat/signature4worker';
		} else {
			getConfigUrl = '/wechat/signature4customer';
		}
		let jsApiListMenu = [
			'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
			'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
			'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
			'onMenuShareWeibo', // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
			'onMenuShareQZone' // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
		];
		let urlParam = {
			url: encodeURIComponent(window.location.href.split('#')[0])
		}
		axios.post(getConfigUrl, urlParam).then((res) => {
			let appId = res.data.appId
			let timestamp = res.data.timestamp
			let nonceStr = res.data.nonceStr
			let signature = res.data.signature
			wx.config({
				debug: false, // 开启调试模式
				appId: appId, // 必填，公众号的唯一标识
				timestamp: timestamp, // 必填，生成签名的时间戳
				nonceStr: nonceStr, // 必填，生成签名的随机串
				signature: signature, // 必填，签名
				jsApiList: jsApiListMenu // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			})

		}).catch(function(error) {
			console.log(error)
		});

		wx.ready(function() {
			//检测接口
			wx.checkJsApi({
				jsApiList: jsApiListMenu,
				success: function(res) {
					console.log(res)
				}
			});
			// 如果需要定制ready回调方法
			if(callback) {
				callback()
			}
		})

	},
	share(obj) { //分享各平台
		//分享到朋友圈
		wx.onMenuShareTimeline({
			title: obj.title, // 分享标题
			link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: obj.imgUrl, // 分享图标
			success: function() {
				// 用户点击了分享后执行的回调函数
				obj.success()
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
				//obj.error()
			}
		});
		//分享给朋友
		wx.onMenuShareAppMessage({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: obj.imgUrl, // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				// 用户点击了分享后执行的回调函数
				obj.success()
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
				//obj.error()
			}
		});
		//分享到QQ
		wx.onMenuShareQQ({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl, // 分享图标
			success: function() {
				// 用户点击了分享后执行的回调函数
				obj.success()
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
				//obj.error()
			}
		});
		//分享到腾讯微博
		wx.onMenuShareWeibo({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl, // 分享图标
			success: function() {
				// 用户点击了分享后执行的回调函数
				obj.success()
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
				//obj.error()
			}
		});
		//分享到QQ空间
		wx.onMenuShareQZone({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl, // 分享图标
			success: function() {
				// 用户点击了分享后执行的回调函数
				obj.success()
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
				//obj.error()
			}
		});
	}
}
export default wxApi