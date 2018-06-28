<template>
  <div class="o-details">
    <v-header></v-header>
    <div class="list">
      <div class="title">订单编码：{{items.tradeNum}}</div>
      <h3>服务医院</h3>
      <p v-if="items.hospital" style="color:red;">{{items.hospital.name}}</p>
      <!-- <h3>服务地址</h3>
      <p v-if="items.hospital">{{items.hospital.address}}</p> -->
      <h3>服务时间</h3>
      <p v-if="items.startDate!=null">{{items.startDate.substring(0,10)}} 至 {{items.endDate.substring(0,10)}} 共计
        <span v-if="items.estimatedTime!=null && items.estimatedTime.length>0" style="color:red;">{{items.estimatedTime.split(' ')[0]}}</span>
        <span v-if="items.estimatedTime.length>0" style="color:red;">
          {{ items.estimatedTime.split(' ')[1].split(":")[0]+"时" +items.estimatedTime.split(' ')[1].split(":")[1]+"分"}}
        </span>
      </p>
      <h3>服务类型</h3>
      <p>
        {{dependentLevel}}
      </p>
      <!-- <h3>服务星级</h3>
      <p><i class="iconfont" v-for="(i,index) in 5" :class="{'on':star-1>=index}">&#xe62f;</i></p> -->
      <div class="status-box">
        <div>
          <h3>订单金额</h3>
          <p style="color:red;">￥{{items.price}}</p>
        </div>
        <div>
          <h3>付款状态</h3>
          <p>
            <label style="color:red;">{{items.status=="unpaid"?"未付款":items.status=="cancelled"?"未付款":"已付款"}}</label>
          </p>
        </div>
      </div>
      <div class="status-box">
        <div>
          <h3>订单状态</h3>
          <p>
            <label style="color:red;">{{OrderStatusText(items.status)}}</label>
          </p>
        </div>
        <div>
          <h3>工单受理状态</h3>
          <p v-if="items.orderWork">
            <label style="color:red;">您已{{orderStatusExplain(items.status)}}{{CustInfoOrderStatusText(items.orderWork.status)}}</label>
          </p>
        </div>
      </div>
      <h3>客户信息</h3>
      <p v-if="items.customer!=null">姓名：{{items.customer.name}}</p>
      <p v-if="items.customer!=null">电话：{{items.customer.phoneNum}}</p>
      <p>性别：
        <label v-if='patientGender=="male"'>男</label>
        <label v-else>女</label>
      </p>
      <div class="fr" v-if="orderOpreaFLag==true">
        <mt-button class="mt-button get" v-on:click="orderClick">{{btnText}}</mt-button>
      </div>
    </div>
  </div>
</template>
<style type="text/css" scoped="scoped">
.o-details {
  margin-top: 4rem;
  position: relative;
}

.o-details .list {
  width: 100%;
}

.o-details .list h3 {
  font-size: 1.4rem;
  color: #94ca52;
  padding: 0 1.2rem;
  margin-top: 12px;
}

.o-details .list p {
  font-size: 1.2rem;
  padding: 0.15rem 1.2rem;
}

.o-details .list .on {
  color: #94ca52;
}

.o-details .list .iconfont {
  padding-right: 1rem;
}

.o-details .title {
  background: #94ca52;
  color: #fff;
  font-size: 1.4rem;
  padding: 0.5rem 1.2rem;
  margin-top: 4px;
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
  background-color: #94ca52;
}
</style>
<script>
import vHeader from './../common/Header.vue'
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
import { Cell, Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      patientGender: '',
      dependentLevel: '', //护理类型
      btnText: '开始服务',
      items: {},
      star: '',
      orderOpreaFLag: false,
      isStart: false,
      isEnd: false
    }
  },
  created() {
    this.$store.state.isFooterShow = false //显示底部导航
    this.$store.state.headings = this.$router.history.current.name //修改标题
    document.title = '我的订单'

    //加载订单数据
    this.getOrder()
  },
  components: {
    vHeader,
    Cell,
    MessageBox
  },
  methods: {
    orderClick: function() {
      if (this.btnText == '开始服务') {
        if (this.isStart == false) {
          if (this.$route.query.status == true) {
            Toast('服务时间未到')
          } else {
            Toast('等待用户付款')
          }
          return
        }
        MessageBox.confirm('确定开始服务?', '提示').then(
          action => {
            let orderId = this.$route.query.orderId
            util.Ajax(
              'api/order/startOrder/' + orderId + '?_method=GET',
              {
                userId: this.$store.state.userId
              },
              function(data) {
                console.log(data.data)
                if (data.data.status == 'progressing') {
                  Toast('服务已开始')
                } else {
                  Toast('服务未开始')
                }
              }
            )
          },
          action => {}
        )
      }
      if (this.btnText == '结束服务') {
        if (this.isEnd == false) {
          Toast('服务时间未到,不能结束')
          return
        }
        MessageBox.confirm('确定结束服务?', '提示').then(
          action => {
            let orderId = this.$route.query.orderId
            console.log('开始的订单为：' + orderId)
            util.Ajax(
              'api/order/endOrder/' + orderId + '?_method=GET',
              {
                userId: this.$store.state.userId
              },
              function(data) {
                if (data.data.status == 'completed') {
                  //location.reload();
                  let url = '/worker/order'
                  util.pushRouter(router, url)
                  Toast('服务已结束')
                } else {
                  if (data.data.status === 'failure') {
                    MessageBox('好陪护提示!', data.data.msg)
                  }
                }
              }
            )
          },
          action => {
            //						Toast("已取消")
          }
        )
      }
    },
    cancellationOfOrder: function() {
      //取消订单
      var $this = this
      let orderId = this.$route.query.orderId
      util.Ajax(
        '/api/order/orderEnd?_method=PUT',
        {
          orderId: orderId,
          userId: this.$store.state.userId
        },
        function(data) {
          if (data.data.status == '0') {
            Toast('订单已取消')
            $this.orderOpreaFLag = false
          }
        }
      )
    },
    orderStatusExplain(value) {
      return value === CustomerOrderState.Cancelled ? '被动' : ''
    },
    go: function(url) {
      util.pushRouter(router, url)
    },
    getOrder: function() {
      //获取订单
      let $this = this
      let orderId = this.$route.query.orderId
      console.log('订单id' + orderId)
      util.Ajax(
        '/api/order?_method=GET',
        {
          orderId: orderId
        },
        function(data) {
          $this.items = data.data[0]
          console.log($this.items)
          $this.patientGender = $this.items.customer.gender
          $this.dependentLevel =
            CustInfoServiceTypeStatusDict[$this.items.dependentLevel]
          $this.star = $this.items.work.star
          $this.status = $this.items.status
          $this.items.orderWork.status
          console.log('状态' + $this.status + $this.items.orderWork.status)
        }
      )
    },
    OrderStatusText: function(status) {
      return CustomerOrderStateDict[status] || '未知'
    },
    CustInfoOrderStatusText: function(status) {
      return CustInfoRetionShipStatusDict[status] || '未知'
    },
    PanelOpreaControl: function() {
      this.isStart = this.$route.query.canStart
      this.isEnd = this.$route.query.canEnd
      console.log(this.isStart, this.isEnd)
      if (this.isStart === true) {
        this.orderOpreaFLag = true
        this.btnText = '开始服务'
      }
      if (
        this.isStart === true &&
        this.isEnd != undefined &&
        this.isEnd === true
      ) {
        this.orderOpreaFLag = true
        this.btnText = '结束服务'
      }
    }
  },
  mounted: function() {
    this.PanelOpreaControl()
  }
}
</script>