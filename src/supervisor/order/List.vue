<template>
	<div class="orderList">
		<v-header></v-header>
		<div class="list" v-for="(item,index) in orderList" v-on:click='go("/supervisor/details",item.order_id)'>
			<div class="title">订单编码:{{item.tradeNum}}</div>
			<div class="list-li">
				<h3>服务医院:
					<label>{{item.hospital.name}}</label>
				</h3>
				<h3>服务时间:
					<label>{{item.startDate.substring(0,10)}}至{{item.endDate.substring(0,10)}}||共{{item.estimatedTime.substring(0,3)}}</label>
				</h3>
				<h3>客户信息:
					<label v-if="item.customer">{{item.customer.username.substring(0,4)}}-{{item.customer.gender}}-暂无电话</label>
					<label v-if="!item.customer">暂无客户信息</label>
				</h3>
				<h3>付款状态:
					<label>{{item.status=="unpaid"?"未付款":item.status=="cancelled"?"未付款":"已付款"}}</label>
				</h3>
				<h3>护工信息:
					<label>{{item.work.name.substring(0,4)}}-{{item.work.gender_desc}}-{{item.work.phoneNum}}</label>
				</h3>
			</div>
		</div>

	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import router from './../../router'
import util from './../../js/util/util.js'
import { Cell } from 'mint-ui'
export default {
  data() {
    return {
      orderList: []
    }
  },
  created() {
    this.$store.state.isFooterShow = false //显示底部导航
    this.$store.state.headings = this.$router.history.current.name //修改标题
    document.title = '我的订单'
  },
  components: {
    vHeader,
    Cell
  },
  methods: {
    go: function(url,orderid) {
      console.log("查询的订单编号为:"+orderid)
      util.pushRouter(router, url, {
        orderid:orderid
      })
    }
  },
  mounted: function() {
    let orderType = this.$route.query.ordertype
    let hospitalId = this.$route.query.hospitalId
    let $this = this
    util.Ajax(
      '/api/supervisions/orderStateList?_method=POST',
      {
        page: 1,
        pageSize: 10,
        hosipitalId: hospitalId,
        orderState: orderType
      },
      function(data) {
        console.log(data.data.data)
        $this.orderList = data.data.data
        console.log('订单数量:' + $this.orderList.length)
        // for (let index = 0; index < $this.orderList.length; index++) {
        //   {
        //     if ($this.orderList[index].customer.gender == 'male') {
        //       $this.orderList[index].customer.gender = '男'
        //     } else if ($this.orderList[index].customer.gender == 'female') {
        //       $this.orderList[index].customer.gender = '女'
        //     } else {
        //       $this.orderList[index].customer.gender = '男'
        //     }
        //   }
        // }
      }
    )
  }
}
</script>
<style type="text/css" scoped="scoped">
.orderList {
  margin-top: 4.5rem;
  /* position: relative; */
}
.orderList .list {
  position: relative;
  border-radius: 5px;
  width: 95%;
  box-sizing: border-box;
  padding: 1rem;
  background: #fff;
  margin: 1rem auto 0;
  box-shadow: 0 5px 10px #eee;
  overflow: hidden;
}
.orderList .list .li {
  display: flex;
  justify-content: space-between;
}
.orderList .list h3 {
  font-size: 1.3rem;
  width: 100%;
  color: rgb(49, 197, 96);
  margin: 0.5rem;
  box-sizing: border-box;
  height: 2rem;
  line-height: 2rem;
}

.orderList .list label {
  color: black;
}
.orderList .list p {
  padding: 0.5rem;
  font-size: 1.2rem;
  /* overflow: hidden; */
  width: 100%;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  height: 2rem;
  line-height: 2rem;
}
.orderList .title {
  background: #00cc66;
  color: #fff;
  text-align: left;
  font-size: 1.4rem;
  padding: 0.5rem;
  box-sizing: border-box;
}
.orderList .mt-button {
  margin: 0 auto 1rem;
  display: block;
}
.orderList .line {
  display: flex;
}
</style>