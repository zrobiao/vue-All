<template>
  <div class="o-list">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" v-on:click.native="notStartOrderList()">未开始</mt-tab-item>
      <mt-tab-item id="2" v-on:click.native="processingOrderList()">进行中</mt-tab-item>
      <mt-tab-item id="3" v-on:click.native="allCompletedOrderList()">已结束</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <template v-for="tiem in NotStarted" v-if="!isShow">
          <div class="list">
            <div v-on:click='go("/worker/orderdetails",tiem.order_id,tiem.status,tiem.canStart)'>
              <div class="list-li">
                <h3>{{tiem.hospital.name}}</h3>
                <p class="state">
                  <template v-if='tiem.status=="unpaid"'>未付款</template>
                  <template v-if='tiem.canStart=="false"'>待开始</template>
                </p>
              </div>
              <p>下单时间：{{tiem.createdAt}}</p>
              <p>订单价：
                <label style="color:red;">￥{{tiem.price}}元</label>
              </p>
            </div>
            <mt-button type="danger" class="danger" v-if="tiem.canStart==true" v-on:click="orderStart(tiem.order_id)">开始服务</mt-button>
            <mt-button v-else type="danger" class="danger">不允许开始</mt-button>
          </div>
        </template>
        <div class="no-data" v-if="isShow">
          <i class="iconfont">&#xe649;</i> {{noData}}
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <template v-for="tiem in Processing" v-if="!isHave">
          <div class="list">
            <div v-on:click='go("/worker/orderdetails",tiem.order_id,tiem.status,true,tiem.canEnd)'>
              <div class="list-li">
                <h3>{{tiem.hospital.name}}</h3>
                <p class="state">{{GetOrderServiceStart(tiem.status)}}</p>
              </div>
              <p>下单时间：{{tiem.createdAt}}</p>
              <p>总价：
                <label style="color:red;">￥{{tiem.price}}元</label>
              </p>
              <div class="information">
                <p v-if="tiem.duration.length<6">服务时长：
                  <span>{{tiem.duration.split(":")[0]+"小时" +tiem.duration.split(":")[1]+"分"}}</span>
                </p>
                <p v-else>服务时长：
                  <span>{{tiem.duration.split(' ')[0]}}</span>
                  <span>{{tiem.duration.split(' ')[1].split(":")[0]+"小时" +tiem.duration.split(' ')[1].split(":")[1]+"分"}}</span>
                </p>
                <p>实时计费：
                  <span style="color:red;">{{tiem.charging}}元</span>
                </p>
              </div>
            </div>
            <!--<mt-button type="danger" class="danger" v-if="tiem.ratingStatus==0">未评价</mt-button>-->
            <mt-button type="danger" class="danger" v-if='tiem.canEnd' v-on:click="orderEnd(tiem.order_id)">结束服务</mt-button>
            <mt-button type="default" class="state" v-if='tiem.status==="refunding"'>处理中</mt-button>
          </div>
        </template>
        <div class="no-data" v-if="isHave">
          <i class="iconfont">&#xe649;</i>{{noData}}
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <template v-for="tiem in AllCompleted" v-if="!isFinish">
          <div class="list" v-on:click='go("/worker/orderdetails",tiem.order_id,tiem.status)'>
            <h3>{{tiem.hospital.name}}</h3>
            <p>下单时间：{{tiem.createdAt}}</p>
            <p>总价：
              <label style="color:red;">￥{{tiem.price}}元</label>
            </p>
            <div class="information">
              <p v-if="tiem.duration.length<6">服务时长：
                <span>{{tiem.duration.split(":")[0]+"小时" +tiem.duration.split(":")[1]+"分"}}</span>
              </p>
              <p v-else>服务时长：
                <span>{{tiem.duration.split(' ')[0]}}</span>
                <span>{{tiem.duration.split(' ')[1].split(":")[0]+"小时" +tiem.duration.split(' ')[1].split(":")[1]+"分"}}</span>
              </p>
              <p>总计费：
                <span style="color:red;">{{tiem.amount}}元</span>
              </p>
            </div>
            <!-- <mt-button type="danger" class="danger" v-if="tiem.startStatus==0">未开始</mt-button> -->
            <mt-button type="danger" class="danger">{{OrderStatusText(tiem.status)}}</mt-button>
          </div>
        </template>
        <div class="no-data" v-if="isFinish">
          <i class="iconfont">&#xe649;</i> {{noData}}
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>

</template>
<style>
.o-list {
  padding-top: 4rem;
}
.o-list .mint-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-sizing: border-box;
  box-shadow: 0 2px 4px #eee;
}

.o-list .mint-tab-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 6rem;
}

.o-list .list {
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
.o-list .list-li {
  display: flex;
  justify-content: space-between;
}
.o-list .danger {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  height: 30px;
  width: 6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.o-list .payment {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  height: 30px;
  background: #94ca52;
  width: 5rem;
}

.o-list .cancel {
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  height: 30px;
  background: #c8c8cd;
  width: 5rem;
}

.o-list .list h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #94ca52;
}

.o-list .mint-tab-item-label {
  font-size: 1.2rem;
}

.o-list .list p {
  margin-bottom: 0.5rem;
}

.o-list .mint-navbar .mint-tab-item.is-selected {
  color: #94ca52;
  border-bottom: 3px solid #94ca52;
}

.information {
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.state {
  float: right;
  color: #fd6f37;
  font-size: 1.1rem;
  /* margin: -36px 12px 0 0; */
}
.mint-button {
}
</style>
<script>
import router from './../../router'
import util from './../../js/util/util.js'
import { Navbar, TabItem, Cell, Toast, MessageBox } from 'mint-ui'
import {
  CustomerOrderState,
  CustomerOrderStateDict
} from './../../js/util/constants.js'
export default {
  data() {
    return {
      isShow: false,
      isHave: false,
      isFinish: false,
      noData: '',
      selected: '1',
      NotStarted: [],
      Processing: [],
      AllCompleted: [],
      tipsText: '正常进行中'
    }
  },
  components: {
    Navbar,
    TabItem
  },
  methods: {
    go: function(url, orderId, statusm, canStart, canEnd) {
      util.pushRouter(router, url, {
        orderId: orderId,
        status: status,
        canStart: canStart,
        canEnd: canEnd
      })
    },
    startOrder: function() {
      console.log('开始订单')
    },
    notStartOrderList: function() {
      //未开始订单
      let $this = this
      util.Ajax(
        '/api/order/notStartOrderListWork?_method=GET',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          //console.log(data.data)
          if (data.data.length > 0) {
            $this.NotStarted = data.data
          } else {
            $this.isShow = true
            $this.noData = '您没有未开始订单'
          }
        }
      )
    },
    processingOrderList: function() {
      //进行中
      let $this = this
      util.Ajax(
        '/api/order/processingOrderListWork?_method=GET',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          if (data.data.length > 0) {
            $this.Processing = data.data
            console.log($this.Processing)
          } else {
            $this.isHave = true
            $this.noData = '您没有进行中订单'
          }
        }
      )
    },
    allCompletedOrderList: function() {
      //获取已完成
      let $this = this
      util.Ajax(
        '/api/order/allCompletedOrderListWork?_method=GET',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          if (data.data.length > 0) {
            $this.AllCompleted = data.data
            console.log($this.AllCompleted)
          } else {
            $this.isFinish = true
            $this.noData = '您没有已结束订单'
          }
        }
      )
    },
    orderStart: function(_orderID) {
      console.log('确定开始的订单编号为:' + _orderID)
      let $this = this
      MessageBox.confirm('确定开始服务?', '提示').then(
        action => {
          let orderId = _orderID
          util.Ajax(
            'api/order/startOrder/' + orderId + '?_method=GET',
            {
              userId: this.$store.state.userId
            },
            function(data) {
              console.log(data.data)
              if (data.data.status == 'progressing') {
                Toast('服务已开始')
                location.reload()
              } else {
                Toast('服务未开始')
              }
            }
          )
        },
        action => {}
      )
    },
    orderEnd: function(_orderID) {
      console.log('确定结束的订单编号为:' + _orderID)
      MessageBox.confirm('确定结束服务?', '提示').then(
        action => {
          let orderId = _orderID
          util.Ajax(
            'api/order/endOrder/' + orderId + '?_method=GET',
            {
              userId: this.$store.state.userId
            },
            function(data) {
              console.log(data.data)
              if (data.data.status == 'completed') {
                Toast('服务已结束')
                location.reload()
              } else {
              }
            }
          )
        },
        action => {
          //						Toast("已取消")
        }
      )
    },
    OrderStatusText: function(status) {
      return CustomerOrderStateDict[status] || '未知'
    },
    GetOrderServiceStart: function(status) {
      var _tips = '正常进行中'
      if (CustomerOrderState.Refunding === status) {
        _tips = '客户已取消'
      }
      return _tips
    },
    msgBox: function(_msg, _url) {
      MessageBox.alert(_msg).then(action => {
        this.go(_url)
      })
    }
  },
  created() {
    this.$store.state.isFooterShow = true //显示底部导航
    this.$store.state.flag = 1
    document.title = '任务'
  },
  mounted: function() {
    //加载完成后执行
    let $this = this
    util.Ajax(
      '/api/work/isBasicInfoWork/' + this.$store.state.userId,
      {},
      function(data) {
        $this.infoData = data.data
        console.log($this.infoData)
        if ($this.infoData.workStatus == 0) {
          console.log('该用户还未完善信息')
          $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
          return
        }
        if ($this.infoData.basicInfo_desc == '护工信息已完善') {
          util.Ajax(
            '/api/work/isAuthWork/' + $this.$store.state.userId,
            {},
            function(data) {
              console.log(data.data)
              $this.validateData = data.data
              if ($this.validateData.workStatus == 'approved') {
              } else if ($this.validateData.workStatus == 'disapproved') {
                $this.msgBox('个人信息认证失败，请重新认证', '/worker/attestation')
              } else if ($this.validateData.workStatus == 'checking') {
                $this.msgBox('个人信息认证中，请等待', '/worker/Me')
              } else if ($this.validateData.workStatus == 'unchecked') {
                $this.msgBox('请进行个人信息认证', '/worker/attestation')
              }
            }
          )
        } else if ($this.infoData.basicInfo_desc == '护工信息未完善') {
          $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
        }
      }
    )
    this.notStartOrderList() //未开始订单
    console.log(this.$route.meta.template)
    this.selected = this.$route.meta.template
    if (this.selected == 1) {
      this.notStartOrderList()
    } else if (this.selected == 2) {
      this.processingOrderList()
    } else if (this.selected == 3) {
      this.allCompletedOrderList()
    } else {
      this.notStartOrderList()
    }
  }
}
</script>