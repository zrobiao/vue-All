<template>
	<div id='msg' class="pay_success">
		<!--<template v-if='parseInt($route.params.status) === 1'>-->
		<div class="pay_success_icon"><i class="iconfont">&#xe634;</i></div>
		<div class="pay_success_text_area">
			<h2 class="pay_success_title">支付成功</h2>
			<p class="pay_success_desc">在订单页可查看订单情况</p>
		</div>
		<div class="pay_success_btn_area">
			<p class="pay_success_btn">
				<mt-button type="primary" size="large" v-on:click.native='goOrders'>查看订单</mt-button>
			</p>
		</div>
	</div>
</template>
<script>
	import router from './../../router';
	import util from './../../js/util/util.js';
	export default {
		data() {
			return {}
		},
		methods: {
			close() {
				window.opener = null
				window.open('', '_self')
				window.close()
			},
			goOrders() {
				//      this.$router.replace({
				//        name: 'order', params: { id: this.$route.params.id } }
				//      )
				alert("订单id:"+this.$route.params.id)
//				util.pushRouter(router, '/customer/order', {
//					"orderId": this.$route.query.orderId
//				})
			}
		},
		ready() {}
	}
</script>
<style>
  #msg {
    margin-top: 20vh
  }
  .pay_success{text-align:center;}
  .pay_success .pay_success_icon{width: 100%;color: #00CC66;}
  .pay_success .pay_success_icon .iconfont{font-size: 8rem;}
  .pay_success .pay_success_text_area{margin: 20% auto;}
  .pay_success .pay_success_text_area .pay_success_title{margin: 10px auto;font-weight: 700;font-size: 1.6rem;}
  .pay_success .pay_success_text_area .pay_success_desc{margin: 10px auto;}
  .pay_success .pay_success_btn_area{margin: 30% auto;}
  .pay_success .pay_success_btn{margin: 0 10%;}
  .pay_success .mint-button--primary{background: #00CC66;font-size: 1.3rem;}
</style>
