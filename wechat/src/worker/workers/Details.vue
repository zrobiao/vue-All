<template>
  <div class="workersDetails">
    <v-header></v-header>
    <!--<div class="list" v-for="item in items">-->
    <div class="list">
      <div class="title">订单编码：{{tradeNum}}</div>
      <img class="srcstyle" src="../../assets/change.png" v-if="isSubtituted"/>
      <h3>服务地址</h3>
      <p>{{hospitalName}}</p>
      <h3>服务时间</h3>
      <p>服务时间：{{startDate.substring(0,10)}} 至 {{endDate.substring(0,10)}}<br/> 共计:
        <span v-if="estimatedTime.length>0" style="color:red;font-size:14px;font:blod;">
          {{ estimatedTime.split(' ')[0] }}
        </span>
        <span v-if="estimatedTime.length>0" style="color:red;font-size:14px;font:blod;">
          {{ estimatedTime.split(' ')[1].split(":")[0]+"时" +estimatedTime.split(' ')[1].split(":")[1]+"分" }}
        </span>
      </p>
      <h3>服务类型</h3>
      <p>
        {{dependentLevel}}
      </p>
      <!-- <h3>服务星级</h3>
      <p><i class="iconfont" v-for="(i,index) in 5" :class="{'on':star-1>=index}">&#xe62f;</i></p> -->
      <h3 v-if="isSubtituted==false">付款状态</h3>
      <p v-if="isSubtituted==false">{{status}}</p>
      <h3>订单总价</h3>
      <p class="red">￥{{price}}元</p>
      <h3 v-if="isSubtituted">订单剩余服务价</h3>
      <p class="red" v-if="isSubtituted">￥{{amount}}元</p>
      <h3>客户信息</h3>
      <p>姓名：{{userName}}</p>
      <p>电话：{{phoneNum}}</p>
      <p>性别：{{gender}}</p>
      <!-- <div class="state">待开始</div> -->
      <div class="button-box" v-if="isSubtituted==false">
        <mt-button type="danger" class="mt-button get" v-on:click="palyClick()">接单</mt-button>
        <mt-button type="default" class="mt-button" v-on:click="cancellationOfOrder()">拒单</mt-button>
      </div>
    </div>

  </div>
</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell, Toast } from 'mint-ui'
import router from './../../router'
import util from './../../js/util/util.js'
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
      tradeNum: '',
      hospitalName: '',
      startDate: '',
      endDate: '',
      estimatedTime: '',
      star: '',
      status: '',
      userName: '',
      phoneNum: '',
      gender: '',
      orderId: '',
      isSubtituted: '',
      price: '',
      amount: '',
      dependentLevel: '', //护理类型
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = true //显示底部导航
  },
  components: {
    vHeader,
    Cell
  },
  methods: {
    go: function(url) {
      util.pushRouter(router, url, {})
    },
    palyClick: function() {
      //接单
      console.log('接单')
      let $this = this
      console.log(
        '接受的订单为' + this.orderId + '护工ID为:' + this.$store.state.workId
      )
      util.Ajax(
        '/api/orderwork/' + this.orderId + '/accept/' + '?_method=PUT',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          console.log(data.data)
          if (data.data.status == 'accept') {
            Toast('该订单已接受')
            //location.reload()
            $this.go('/worker')
          }
        }
      )
    },
    cancellationOfOrder: function() {
      //拒单
      let $this = this
      util.Ajax(
        '/api/orderwork/' + this.orderId + '/reject/' + '?_method=PUT',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          console.log(data.data)
          if (data.data.status == 'reject') {
            Toast('该订单已拒绝')
            //location.reload()
            $this.go('/worker')
          }
        }
      )
    }
  },
  mounted: function() {
    let $this = this
    let workId = this.$store.state.workId
    let item = this.$route.query.item
    console.log(item)
    util.Ajax(
      '/api/orderwork/?_method=GET',
      {
        workId: workId
      },
      function(data) {
        console.log(data.data)
        $this.items = data.data[item]
        $this.itemsOrder = data.data[item].order
        $this.itemsCustomer = data.data[item].order.customer
        $this.tradeNum = $this.itemsOrder.tradeNum
        $this.hospitalName = $this.itemsOrder.hospital.name
        $this.startDate = $this.itemsOrder.startDate
        $this.endDate = $this.itemsOrder.endDate
        $this.estimatedTime = $this.itemsOrder.estimatedTime
        $this.star = $this.itemsOrder.work.star
        $this.status = $this.itemsOrder.status
        $this.isSubtituted = $this.itemsOrder.isSubtituted
        $this.price = $this.itemsOrder.price
        $this.amount = $this.itemsOrder.amount
         $this.dependentLevel =
            CustInfoServiceTypeStatusDict[$this.itemsOrder.dependentLevel]
        console.log($this.isSubtituted)
        if ($this.itemsOrder.status == 'unpaid') {
          $this.status = '未付款'
        } else {
          $this.status = '已付款'
        }
        $this.userName = $this.itemsCustomer.name
        $this.phoneNum = $this.itemsCustomer.phoneNum
        $this.gender = $this.itemsCustomer.gender
        if ($this.itemsCustomer.gender == 'male') {
          $this.gender = '男'
        } else {
          $this.gender = '女'
        }
        $this.orderId = $this.items.orderWork_id
      }
    )
  }
}
</script>
<style type="text/css" scoped="scoped">
.workersDetails {
  margin-top: 4rem;
  position: relative;
}

.workersDetails .list {
  width: 100%;
  position: relative;
  padding-bottom: 6rem;
}

.workersDetails .list h3 {
  font-size: 1.4rem;
  color: #94ca52;
  padding: 0 1.2rem;
  margin-top: 12px;
}

.workersDetails .list p {
  font-size: 1.2rem;
  padding: 0.15rem 1.2rem;
}

.workersDetails .list .on {
  color: #94ca52;
}

.workersDetails .list .iconfont {
  padding-right: 1rem;
}

.workersDetails .title {
  background: #94ca52;
  color: #fff;
  font-size: 1.4rem;
  padding: 0.5rem 1.2rem;
}

.workersDetails .list .srcstyle {
  position: absolute;
  top: 3rem;
  right: 0;
}

.state {
  width: 100%;
  color: #fd6f37;
  font-size: 1.2rem;
  padding: 1rem 1.2rem;
}

.workersDetails .button-box {
  display: flex;
  justify-content: flex-end;
}
.mt-button {
  width: 90px;
  height: 32px;
  margin: 1rem 1.2rem 0 0;
}

.get {
  background-color: #94ca52;
}
</style>