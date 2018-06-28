<template>
	<div class="Me">
		<div style="text-align: center;height: 50px;line-height: 50px;font-size: 1.4rem;">
			微信支付测试页面
		</div>
		<div class="me-tab">
			<div class="m-login">
				<div>
					<div class="login-field">订 单：<!--<i class="iconfont">&#xe611;</i>-->
						<input placeholder="请输入订单号" type="text" v-model="tradeNo" />
					</div>
					<div class="login-field">金 额：<!--<i class="iconfont">&#xe627;</i>-->
						<input label=" " placeholder="请输入订单金额" type="text" v-model="money" />
					</div>
					<button class="mint-button btn-login" v-on:click="wxpay">微信支付</button>
					<button class="mint-button btn-refund" v-on:click="wxrefund">微信退款</button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import router from './../../router';
	import util from './../../js/util/util.js';
	import wechatPay from '../../assets/js/wechat_pay.js';
	import { Indicator, Cell,Toast ,MessageBox} from 'mint-ui';
	export default {
		data() {
			return {
				userData: {},
				tradeNo:'',
				money:''
				/*{
				    "id": 1,
				    "openId": "oDAEOv4aV21upSgx7JLZPbhdEYbU",
				    "username": "oDAEOv4aV21upSgx7JLZPbhdEYbU@nursingWork",
				    "name": "晖",
				    "birthday": "1997-12-07",
				    "phoneNum": "13985160123",
				    "gender": "male",
				    "avatar": "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&hs=0&pn=3&spn=0&di=169813820110&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=547138142%2C3998729701&os=1840643701%2C1875487181&simid=3533872911%2C354593644&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fwww.hnlywz.com%2Fa%2Fupload%2Fbd118381382.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bigsyoz_z%26e3Bv54AzdH3F8da9bld_z%26e3Bip4s&gsm=0",
				    "createdById": null
				},*/
			}
		},
		created() {
			this.$store.state.isFooterShow = true; //显示底部导航
			this.$store.state.flag = 3;
			document.title = "我的"
		},
		components: {
			Cell,
			Toast,
			Indicator,
			MessageBox
		},
		methods: {
			go: function(url, openId) {
				console.log(openId)
				util.pushRouter(router, url, {
					"openId": openId
				})
			},
			wxpay: function() {
				let $this = this;
				let tradeNo = this.tradeNo;
	    	    let money = this.money;
    		   if (util.isEmpty(tradeNo)) {
                    Toast('请输入订单号！')
                    return false;
                }
                if (util.isEmpty(money)) {
                    Toast('请输入金额！')
                    return false;
                }
//              alert(tradeNo+"，"+money)
//              return;
				//加载等待
				Indicator.open({text: '请求支付中...',spinnerType: 'fading-circle'});
				util.Ajax('/test/test/'+tradeNo+'/wxpay?_method=POST', {}, function(data) {
					//alert(data)
					Indicator.close();
					// 调用微信支付接口
			        wechatPay.pay(data.data, function () {
//			          $this.$router.replace({
//			            name: 'paysuccess', params: { id: tradeNo }
//			          })
			          util.pushRouter(router,'/customer/paysuccess',{"orderId":tradeNo})
			        }, function (msg) {
			          let msgInfo = msg !== undefined && msg !== '' ? msg : '支付失败，请重新支付。';
			          MessageBox.confirm(msgInfo).then(action => {});
			        })
				})
			},
			wxrefund: function() {
				let $this = this;
				let tradeNo = this.tradeNo;
	    	    let money = this.money;
    		   	if (util.isEmpty(tradeNo)) {
                    Toast('请输入订单号！')
                    return false;
                }
                if (util.isEmpty(money)) {
                    Toast('请输入金额！')
                    return false;
                }
				Indicator.open({text: '退款请求支付中...',spinnerType: 'fading-circle'});
				util.Ajax('/test/test/'+tradeNo+'/wxrefund?_method=POST', {}, function(data) {
					Indicator.close();
					MessageBox.confirm(data.data).then(action => {});
				})
			}
		},
		mounted: function() {
		}
	}
</script>
<style>
	.Me .me {
		width: 100%;
		margin: 0 auto 1rem;
		padding: 1rem 0;
		background: #fff;
		display: flex;
		box-sizing: border-box;
		text-align: left;
		border-bottom: 8px solid #eee;
	}
	
	.Me .m-login{background:#fff; padding-bottom:2rem;}
	.Me .mint-field .mint-cell-title{ width: 42px;}
	.Me .mint-field-other{left:1.5rem;top:1.2rem;position: absolute; width: 42px;}
	.Me .mint-cell-wrapper{border-bottom: 1px solid #eee;background-image:none}
	.Me .login-field{ width: 100%; position: relative; height:6rem;line-height:6rem; overflow: hidden; border-bottom: 1px solid #eee;}
	.Me .login-field input{ width:50%; border: 0; height:4rem; line-height:4rem;line-height: normal; padding-left:4rem;font-size:1.2rem;}
	.Me .login-field .iconfont{position: absolute;top:0rem;left: 1rem;font-size: 2rem; color:#dcdcdc;}
    .Me .sponsor-box{text-align: center;}
    .Me .btn-login{ width:98%;margin: 3rem auto 1rem; padding: 1rem 0; display: block; background:#00CC66;border: 0; color: #fff; font-size:1.6rem;}
	.Me .btn-refund{ width:98%;margin: 3rem auto 1rem; padding: 1rem 0; display: block; background:#FF4949;border: 0; color: #fff; font-size:1.6rem;}

	
</style>