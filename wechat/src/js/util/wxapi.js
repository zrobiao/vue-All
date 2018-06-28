// wxapi.js
import wx from 'weixin-js-sdk';
import axios from 'axios';
const wxApi = {
    /**
    * [isweixin 判断是否微信浏览器]
    */
    isweixin() {
        const ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            this.$router.push({ path: '/wxkj/isnotWechat' })
            return false
        }
    },
    wxRegister() {
        let data = { params: { url: encodeURIComponent(window.location.href.split('#')[0]) } }
        axios.post('/wechat/signature4worker',data).then((res) => {
            let appId = res.data.appId
            let timestamp = res.data.timestamp
            let nonceStr = res.data.nonceStr
            let signature = res.data.signature
            wx.config({
                debug: false, // 开启调试模式
                appId: appId, // 必填，公众号的唯一标识
			    timestamp: timestamp, // 必填，生成签名的时间戳
			    nonceStr: nonceStr, // 必填，生成签名的随机串
			    signature: signature,// 必填，签名
                jsApiList: [
                    'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(function(){
                // 如果需要定制ready回调方法
                // if (callback) {
                //     callback()
                // }
                //分享到朋友圈
               wx.checkJsApi({
	            jsApiList: [
	                'getLocation',
	                'onMenuShareTimeline',
	                'onMenuShareAppMessage'
	            ],
	            success: function (res) {
	                console.log(res)
	            }
	        });
              wx.onMenuShareTimeline({
                title: '分享测试', // 分享标题
                link: 'https://www.kkpeihu.com', // 分享链接
                imgUrl:'http://www.jzdlink.com/wordpress/wp-content/themes/wordpress_thems/images/lib/logo.png', // 分享图标
                success: function() {
                    alert('分享成功')
                },
                cancel: function() {
                    alert('分享失败')
                }   
              });
              //分享给朋友
            //   wx.onMenuShareAppMessage({
            //     title: '分享测试', // 分享标题
            //     link: 'http://www.baidu.com', // 分享链接
            //     imgUrl:'http://www.jzdlink.com/wordpress/wp-content/themes/wordpress_thems/images/lib/logo.png', // 分享图标
            //     success: function() {
            //         alert('分享成功')
            //     },
            //     cancel: function() {
            //          alert('分享失败')
            //     } 
            //   });
            })
        }).catch(function (error) {
            console.log(error)
        });
        
    }
}
export default wxApi