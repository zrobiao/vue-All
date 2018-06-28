<template>
	<div class="details">

		<v-header></v-header>
		<div class="list" v-for="item in items">
			<div class="title">订单编码：{{item.OrderNumber}}</div>
			<template v-for="info in item.info">
				<h3>{{info.title}}</h3>
				<p>{{info.info}}</p>
				<div v-for="items in info.list">
					<div class="personal-info">
						<div class="personal-head"><img :src="items.headPortrait" class="head-info"></div>
						<div>
							<h3>{{items.name}}</h3>
							<p>{{items.ag}} {{items.gender}}</p>
						</div>
					</div>
					<div class="detalis-price">
						共{{items.sky}}天：
						<span class="red">￥{{items.price}}</span>元
					</div>

				</div>
			</template>
		</div>
		<div class="red tiem" v-if="isShow">剩余支付时间：04:00</div>
		<mt-button type="danger" class="mt-button" v-if="isShow" v-on:click="palyClick">立即支付</mt-button>
		<mt-button type="default" class="mt-button" v-if="isShow" v-on:click="cancellationOfOrder">取消订单</mt-button>

		<mt-button type="primary" class="mt-button" v-if="isExchange">申请换护工</mt-button>
		<mt-button type="default" class="mt-button" v-if="isTermination">订单终止</mt-button>
		<div class="cancellation-button" v-if="isCancellation">取消-已完成</div>
	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import wechatPay from '../../assets/js/wechat_pay.js'
import { Cell, Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      Type: '',
      isShow: false,
      isExchange: false,
      isTermination: false,
      isCancellation: false,
      items: [
        {
          OrderNumber: '201710161410794007996',
          info: [
            {
              title: '服务内容',
              info: '陪护'
            },
            {
              title: '服务地址',
              info: '贵阳市—贵阳中医学院第二附属医院'
            },
            {
              title: '服务时间',
              info: '2017/10/17—2017/10-19'
            },
            {
              title: '服务星级',
              info: 'III星'
            },
            {
              title: '护工信息',
              list: [
                {
                  headPortrait: '/static/img/css/common/col_0_icon_0.gif',
                  gender: '女',
                  name: '李春花',
                  ag: '60岁',
                  sky: '3',
                  price: '360'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    this.$store.state.isFooterShow = false //显示底部导航
    this.$store.state.headings = this.$router.history.current.name //修改标题
    document.title = '我的订单'
  },
  components: {
    vHeader,
    Cell,
    MessageBox
  },
  methods: {
    palyClick: function() {
      //支付成功

      let orderId = this.$route.query.orderId
      // util.Ajax('/api/order/payOrder/' + orderId + '?_method=GET', {"userId": this.$store.state.userId}, function(data) {
      // 	// 调用微信支付接口
      // 	console.log(data);
      //     wechatPay.pay(data.data, function () {
      //       util.pushRouter(router,'/customer/paysuccess',{"orderId":tradeNo})
      //     }, function (msg) {
      //       let msgInfo = msg !== undefined && msg !== '' ? msg : '支付失败，请重新支付。';
      //       MessageBox.confirm(msgInfo).then(action => {});
      //     })
      // })

      MessageBox.confirm('￥360确定支付成功?', '提示').then(
        action => {
          var $this = this
          let orderId = this.$route.query.orderId
          console.log(
            '支付订单' + orderId + '支付用户ID' + this.$store.state.userId
          )

          util.Ajax(
            'api/order/payOrder/' + orderId + '?_method=GET',
            {
              userId: this.$store.state.userId
            },
            function(data) {
              console.log(data.data)
              if (data.data.status == 'paid') {
                Toast('支付成功')
                $this.isPayation = true
                $this.isShow = false
                $this.isSatrt = false
                $this.isCancel = false
              }
            }
          )
        },
        action => {
          Toast('取消支付')
        }
      )
    },
    cancellationOfOrder: function() {
      //取消订单
      this.isCancellation = true
      this.isShow = false
    }
  },
  mounted: function() {
    //加载完成后执行
    //
    var Type = this.$route.query.type
    if (Type == 0) {
      //
      this.isShow = true
    }
  }
}
</script>
<style type="text/css" scoped="scoped">
.details {
  margin-top: 4.5rem;
  margin-bottom: 4.5rem;
  position: relative;
}
.details .list {
  width: 99%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #eee;
  box-shadow: 0 0 10px 5px #eee;
  background-color: #fff;
}
.details .list h3 {
  font-size: 1.4rem;
  color: #00cc66;
  margin: 0.5rem;
}
.details .list p {
  padding: 0 0.5rem;
  font-size: 1.2rem;
}
.details .title {
  background: #00cc66;
  color: #fff;
  text-align: center;
  font-size: 1.4rem;
  padding: 0.5rem 0;
}
.details .mt-button {
  margin: 0 auto 1rem;
  display: block;
  width: 8rem;
  font-size: 1.2rem;
}
.details .personal-info {
  display: flex;
}
.details .personal-head {
  padding: 0 1rem 0 0.5rem;
}
.details .head-info {
  width: 80px;
  height: 80px;
  background: #eee;
  border-radius: 5px;
}
.details .detalis-price {
  font-size: 1.2rem;
  padding: 0.5rem;
}
.details .detalis-price .red {
  font-size: 1.4rem;
}
.details .tiem {
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0;
}
.details .btn-cancellation {
  border: 1px solid #e02828;
  margin-top: 2rem;
  width: 10rem;
  background: #fff;
  color: #e02828;
}
.details .cancellation-button {
  border: 1px solid #f32043;
  background: #fff;
  font-size: 1.2rem;
  display: block;
  padding: 1rem 0.5rem;
  color: #f32043;
  text-align: center;
  margin: 2rem auto;
  border-radius: 5px;
  width: 10rem;
}
</style>