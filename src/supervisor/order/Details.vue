<template>
	<div class="o-details">
		<v-header></v-header>
		<div class="list">
			<div class="title">订单编码：{{items.tradeNum}}</div>
			<h3>服务地址:</h3>
			<p v-if="items.hospital!=null">{{items.hospital.name}}</p>
			<h3>服务时间:</h3>
			<p v-if="items.startDate!=null">{{items.startDate.substring(0,10)}} 至 {{items.endDate.substring(0,10)}} 共计
				<span v-if="items.estimatedTime!=null && items.estimatedTime.length>0" style="color:red;">{{items.estimatedTime.split(' ')[0]}}</span>
				<span v-if="items.estimatedTime.length>0" style="color:red;">
					{{ items.estimatedTime.split(' ')[1].split(":")[0]+"时" +items.estimatedTime.split(' ')[1].split(":")[1]+"分"}}
				</span>
			</p>
			<h3>服务类型:</h3>
			<p>
				{{dependentLevel}}
			</p>
			<div class="status-box">
				<div>
					<h3>订单金额:</h3>
					<p style="color:red;">￥{{items.price}}</p>
				</div>
			</div>
			<div>
				<h3>付款状态:</h3>
				<p>
					<label style="color:red;">{{items.status=="unpaid"?"未付款":items.status=="cancelled"?"未付款":"已付款"}}</label>
				</p>
			</div>
			<h3>客户信息:</h3>
			<p v-if="items.customer!=null">姓名：{{items.customer.name}}</p>
			<p v-if="items.customer!=null">电话：{{items.customer.phoneNum}}</p>
			<p>性别：
				<label v-if='patientGender=="male"'>男</label>
				<label v-else>女</label>
			</p>
			<h3>护工信息:</h3>
			<p v-if="items.work!=null">姓名：{{items.work.name}}</p>
			<p v-if="items.work!=null">电话：{{items.work.phoneNum}}</p>
			<p>性别：
				<label v-if='patientGender=="male"'>男</label>
				<label v-else>女</label>
			</p>
		</div>
	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import router from './../../router'
import util from './../../js/util/util.js'
import { Cell, Toast, MessageBox } from 'mint-ui'
import {
  CustomerOrderState,
  CustomerOrderStateDict,
  CustInfoRetionShipStatus,
  CustInfoRetionShipStatusDict,
  CustInfoServiceTypeStatus,
  CustInfoServiceTypeStatusDict
} from './../../js/util/constants.js'
export default {
  data() {
    return {
      items: [],
      dependentLevel: '', //护理类型
      patientGender: ''
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
    go: function(url) {
      util.pushRouter(router, url)
    }
  },
  mounted: function() {
    //加载完成后执行
    let orderid = this.$route.query.orderid
    let $this = this
    console.log(orderid)
    util.Ajax(
      '/api/order?_method=GET',
      {
        orderId: orderid
      },
      function(data) {
        console.log(data.data[0])
        $this.items = data.data[0]
        $this.dependentLevel =
          CustInfoServiceTypeStatusDict[$this.items.dependentLevel]
      }
    )
  }
}
</script>
<style type="text/css" scoped="scoped">
.o-details {
  margin-top: 5rem;
  position: relative;
}

.o-details .list {
  width: 95%;
  margin: 0 auto;
  border: solid 1px #f7f7f7
  
}

.o-details .list h3 {
  font-size: 1.4rem;
  color: rgb(0, 197, 91);
  padding: 0 1.2rem;
  margin-top: 12px;
}

.o-details .list p {
  font-size: 1.2rem;
  padding: 0.15rem 1.2rem;
}

.o-details .list .on {
  color: rgb(0, 197, 91);
}

.o-details .list .iconfont {
  padding-right: 1rem;
}

.o-details .title {
  background: rgb(0, 197, 91);
  color: #fff;
  font-size: 1.4rem;
  padding: 0.5rem 1.2rem;
  /* margin-top: 20px; */
}

.o-details .personal-info {
  display: flex;
}

.o-details .personal-head {
  padding: 0 1rem 0 0.5rem;
}

.o-details .head-info {
  width: 80px;
  height: 80px;
  background: #eee;
  border-radius: 5px;
}

.o-details .detalis-price {
  font-size: 1.2rem;
  padding: 0.5rem;
}

.o-details .detalis-price .red {
  font-size: 1.4rem;
}

.o-details .tiem {
  font-size: 1.4rem;
  text-align: center;
  padding: 1rem 0;
}

.o-details .btn-cancellation {
  border: 1px solid #e02828;
  margin-top: 2rem;
  width: 10rem;
  background: #fff;
  color: #e02828;
}

.o-details .cancellation-button {
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

.o-details .mt10 {
  margin-top: 2rem;
}

.o-details .bg-red {
  background: #ff0000;
}

.o-details .status-box {
  display: flex;
}

.o-details .status-box > div {
  flex: 0 1 auto;
  width: 50%;
}

.o-details .btn-box {
  width: 50%;
  margin: 0 auto;
  padding: 1.5rem 0;
}
.o-details .mt-button {
  padding: 8px 15px;
  font-size: 1.2rem;
  color: #fff;
  margin: 0 auto;
  display: block;
}

.get {
  background-color:  rgb(0, 197, 91);
}
</style>