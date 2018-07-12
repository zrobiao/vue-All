<template>
  <div class="Workers">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imgMsgList"><img :src="item.advPicURL"></mt-swipe-item>
    </mt-swipe>
    <div class="bnt-box">
      <!-- <button class="button" v-on:click='go("/supervisor")'><img src="../../assets/dudao.png" alt="">督导管理</button> -->
      <button class="buttontype1" v-on:click='manage("/supervisor/index")'>督导管理</button>
      <button class="buttontype2" :class="{'type2-select':flag==true}" v-on:click='servetype()'>{{servetext}}</button>
      <button class="buttontype1" v-on:click='toCollect()'>创建订单</button>
    </div>
    <div class="title">
      <i class="iconfont">&#xe647;</i>{{OrderTitle}}</div>
    <div class="workers-list-box" v-if="isOrder">
      <ul>
        <li v-for="(item,index) in orderData">
          <!-- // v-on:click='go("/worker/workersDetails")'-->
          <div class="workers-list">
            <div v-on:click='go("/worker/workersDetails",index)'>
              <img class="srcstyle" src="../../assets/change.png" v-if='isSubtituted'>
              <h3>{{item.order.hospital.name}}</h3>
              <p>服务时间：{{item.order.startDate.substring(0,10)}} 至 {{item.order.endDate.substring(0,10)}}<br/>共计：
                <span v-if="item.order.estimatedTime.length>0" style="color:red;font-size:14px;font:blod;">
                  {{ item.order.estimatedTime.split(' ')[0] }}
                </span>
                <span v-if="item.order.estimatedTime.length>0" style="color:red;font-size:14px;font:blod;">
                  {{item.order.estimatedTime.split(' ')[1].split(":")[0]+"小时"+item.order.estimatedTime.split(' ')[1].split(":")[1]+"分"}}
                </span>
              </p>
              <p>服务等级：{{dependentLevel}} &nbsp;&nbsp;&nbsp;&nbsp;性别：{{item.order.patientGender}}
                <span class="fr" v-if="isSubtituted==false">付款状态：
                  <font class="orange">{{item.order.status}}</font>
                </span>
                <!-- <span class="fr" v-if="isSubtituted">订单剩余价：约
                  <font class="orange">500元</font>
                </span> -->
              </p>
            </div>
            <div class="bnt-con">
              <button class="bnt" v-if="!isReceive" v-on:click="FromAsingle(item.orderWork_id)"><img src="../../assets/no1.png" alt="">拒单</button>
              <button class="bnt bnt-guide" v-if="!isReceive" v-on:click="orderReceiving(item.orderWork_id)"><img src="../../assets/yes.png" alt="">接单</button>
              <button class="bnt  bnt-state" v-if="isReceive">{{Hint}}</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import router from './../../router'
import util from './../../js/util/util.js'
import { Swipe, SwipeItem, DatetimePicker, Toast, MessageBox } from 'mint-ui'
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
      isReceive: false,
      isStart: true,
      isFinish: false,
      Hint: '已接受',
      OrderTitle: '',
      isOrder: false,
      orderData: '',
      dependentLevel: '', //护理类型
      imgMsgList: [], //轮播图集合
      //isEnter: false, //判定是否有查看权限s
      flag: false,
      servetext: '开始服务',
      isSuperFlag: false,
      items: [
        {
          id: '1',
          hospital: '',
          startDate: '',
          endDate: '',
          starLevel: '0',
          patientGender: '',
          status: '',
          duration: '',
          orderWorkId: '',
          isSubtituted: ''
        }
      ]
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  created() {
    this.$store.state.isFooterShow = true //显示底部导航
    this.$store.state.flag = 0
    document.title = '工作'
    let workId = this.$store.state.workId
  },
  methods: {
    go: function(url, item) {
      util.pushRouter(router, url, {
        item: item
      })
    },
    set: function(url, item) {
      util.pushRouter(router, url, {
        item: item
      })
    },
    manage: function(url) {
      if (this.isSuperFlag) {
        util.pushRouter(router, url, {})
      } else {
        Toast('您当前还不是督导!')
      }
    },
    servetype: function() {
      if (this.flag == true) {
        this.flag = false
        this.servetext = '开始服务'
        this.setServer(false)
      } else if (this.flag == false) {
        this.flag = true
        this.servetext = '停止服务'
        this.setServer(true)
      }
    },
    setServer: function(_type) {
      let $this = this
      let workId = $this.$store.state.workId
      util.Ajax(
        'api/work/' + workId + '/service?_method=PATCH',
        {
          workStatus: _type
        },
        function(data) {
          Toast('接单设置成功')
          util.pushRouter(router, '/worker', {})
        }
      )
    },
    orderReceiving: function(orderWork_id) {
      console.log('接单')
      let $this = this
      let orderWorkId = orderWork_id

      console.log(
        '接受的订单为' + orderWorkId + '护工ID为:' + this.$store.state.workId
      )

      util.Ajax(
        '/api/orderwork/' + orderWorkId + '/accept?_method=PUT',
        {
          workId: this.$store.state.workId
        },
        function(data) {
          console.log(data.data)
          if (data.data.status == 'accept') {
            console.log('该订单已接受')
            location.reload()
          }
        }
      )
    },
    FromAsingle: function(orderWork_id) {
      //拒单
      let $this = this
      let orderWorkId = orderWork_id
      let workId = this.$store.state.workId
      util.Ajax(
        '/api/orderwork/' + orderWorkId + '/reject?_method=PUT',
        {
          workId: workId
        },
        function(data) {
          console.log(data.data)
          if (data.data.status == 'reject') {
            console.log('该订单已拒绝')
            location.reload()
          }
        }
      )
    },
    startClick: function() {
      this.isStart = false
      this.isFinish = true
    },
    msgBox: function(_msg, _url) {
      MessageBox.alert(_msg).then(action => {
        this.go(_url)
      })
    },
    toCollect: function() {
      this.isCreat()
    },
    isCreat: function() {
      let $this = this
      util.Ajax(
        'api/order/isCreateOrder?_method=GET',
        {
          workId: $this.$store.state.workId
        },
        function(data) {
          console.log('获取接单信息')
          let isCreatMsg = data.data
          console.log(isCreatMsg.data)
          if (!isCreatMsg.status) {
            console.log('1.我要查询号的订单号为' + isCreatMsg.data)
            let orderid = isCreatMsg.data
            MessageBox.confirm(isCreatMsg.message).then(action => {
              util.pushRouter(router, '/supervisor/details', {
                orderid: orderid
              })
            })
          } else {
            util.pushRouter(router, '/worker/collect', {})
          }
        }
      )
    }
  },
  mounted: function() {
    let $this = this
    let workId = this.$store.state.workId
    //获取轮播图片
    util.Ajax('/api/sysAdvert/userWorkerList?_method=GET', {}, function(data) {
      console.log(data.data.data)
      $this.imgMsgList = data.data.data
      for (let index = 0; index < $this.imgMsgList.length; index++) {
        $this.imgMsgList[index].advPicURL =
          $this.$store.state.alternateUrl + data.data.data[index].advPicURL
        console.log($this.imgMsgList[index].advPicURL)
      }
    })

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
                //获取接单状态
                util.Ajax(
                  'api/work/getWorkStatus/' +
                    $this.$store.state.userId +
                    '?_method=GET',
                  {},
                  function(data2) {
                    //console.log(data2.data)
                    let curType = data2.data.workStatus
                    if (curType == 'active') {
                      $this.flag = true
                      $this.servetext = '停止服务'
                    } else {
                      $this.flag = false
                      $this.servetext = '开始服务'
                    }
                  }
                )
                util.Ajax(
                  '/api/work/' + $this.$store.state.workId,
                  {},
                  function(data) {
                    //查看护工是否有督导权限
                    $this.isSuperFlag = data.data.superFlag
                  }
                )
                //护工认证后才开始判定接单
                if (!util.isEmpty(workId)) {
                  util.Ajax(
                    '/api/orderwork/?_method=GET',
                    {
                      workId: workId
                    },
                    function(data) {
                      if (util.isEmpty(data.data[0])) {
                        $this.OrderTitle = '您当前还没有订单'
                        //Toast('您当前还没有订单')
                        $this.isOrder = false
                        return
                      }
                      $this.OrderTitle = '您有新的订单'
                      $this.orderData = data.data
                      $this.isOrder = true
                      for (
                        let index = 0;
                        index < $this.orderData.length;
                        index++
                      ) {
                        let curData = $this.orderData[index].order
                        console.log(curData.orderType)
                        if (curData.orderType == 'unline') {
                          $this.OrderTitle = '您当前还没有订单'
                          $this.isOrder = false
                          return
                        }
                        $this.isSubtituted = curData.isSubtituted
                        $this.dependentLevel =
                          CustInfoServiceTypeStatusDict[curData.dependentLevel]
                        if (curData.patientGender == 'male') {
                          curData.patientGender = '男'
                        } else {
                          curData.patientGender = '女'
                        }
                        if (curData.status == 'paid') {
                          curData.status = '已付款'
                        } else {
                          curData.status = '未付款'
                        }
                      }
                    }
                  )
                }
              } else if ($this.validateData.workStatus == 'disapproved') {
                $this.msgBox('个人信息认证失败，请重新认证', '/worker/Me')
              } else if ($this.validateData.workStatus == 'checking') {
                $this.msgBox('个人信息认证中，请等待', '/worker/Me')
              } else if ($this.validateData.workStatus == 'unchecked') {
                $this.msgBox('请进行个人信息认证', '/worker/attestation')
              }
            }
          )
        } else if ($this.infoData.basicInfo_desc == '护工信息未完善') {
          $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
          return
        }
      }
    )
  }
}
</script>
<style type="text/css" scoped>
.Workers {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.Workers .mint-swipe {
  margin-bottom: 1rem;
  height: 205px;
  /* overflow: hidden; */
}

.workers-list-box {
  padding-bottom: 80px;
}

.Workers .workers-list {
  position: relative;
  width: 88%;
  margin: 12px auto;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.Workers .workers-list h3 {
  font-size: 1.3rem;
  color: #323232;
  margin-bottom: 1rem;
}

.Workers .workers-list p {
  margin-bottom: 0.8rem;
}

.Workers .workers-list .srcstyle {
  position: absolute;
  top: 0;
  right: 0;
}

.Workers .workers-list .bnt-con {
  text-align: center;
  padding: 0.5rem 0;
}

.Workers .title {
  position: relative;
  height: 2.5rem;
  line-height: 2.5rem;
  color: #fff;
  background: rgb(2, 197, 91);
  margin-bottom: 0;
  padding-left: 3.5rem;
}

.Workers .iconfont {
  font-size: 2rem;
  position: absolute;
  top: 0;
  left: 0.5rem;
}

.Workers .workers-list .bnt-con {
  text-align: right;
}

.Workers .workers-list .bnt {
  border: 1px solid #94ca52;
  border-radius: 4px;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  font-size: 1.6rem;
  color: #94ca52;
  display: inline-block;
  margin-left: 10px;
  line-height: 3rem;
}

.Workers .workers-list .bnt img {
  height: 1.8rem;
  margin-right: 8px;
  margin-top: -6px;
}

.Workers .workers-list .bnt-state {
  color: #45acee;
  border: none;
}

.Workers .workers-list .bnt-guide {
  background-color: #94ca52;
  color: white;
}

.Workers .work-start {
  width: 13rem;
  height: 13rem;
  line-height: 2.2rem;
  background-size: 100%;
  text-align: center;
  margin: 1rem auto;
  overflow: hidden;
  border-radius: 50%;
}

.Workers .work-start span {
  display: inline-block;
  font-size: 1.8rem;
  color: #fff;
  margin-top: 4.3rem;
}

.Workers .finish {
}

.bnt-box {
  width: 100%;
  height: 60px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.bnt-box .buttontype1 {
  width: 30%;
  height: 60px;
  float: left;
  background: rgb(2, 197, 91);
  color: white;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #eee;

  /* float:right  */
}

.bnt-box .buttontype2 {
  width: 60px;
  height: 60px;
  float: left;
  background: rgb(2, 197, 91);
  color: white;
  font-size: 1.2rem;
  margin: 0;
  padding: 0 10px;
  line-height: 1.4rem;
  border-radius: 100%;
  border: none;
  border-bottom: 1px solid #eee;
  /* float:right  */
}

.bnt-box .type2-select {
  background: red;
  color: #fff;
}

.bnt-box .button:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.bnt-box .button img {
  height: 1.5rem;
  margin: -4px 6px 0 0;
}

@media screen and (max-width: 384px) {
  .Workers > .swipe-box {
    height: 220px;
  }
  .Workers .workers-list {
    width: 86%;
    padding: 0.8rem 1rem;
  }
  .Workers .workers-list .bnt {
    width: 9rem;
    height: 2.5rem;
    font-size: 1.4rem;
    line-height: 2.5rem;
  }
  .Workers .workers-list .bnt img {
    height: 1.5rem;
    margin-top: -4px;
  }
  .Workers .work-start {
    width: 12rem;
    height: 12rem;
    line-height: 2rem;
    margin: 0.8rem auto;
  }
  .Workers .work-start span {
    font-size: 1.6rem;
    margin-top: 4.1rem;
  }
  .bnt-box .button {
    font-size: 1.35rem;
  }
  .bnt-box .button img {
    height: 1.4rem;
    margin-top: -3px;
  }
}

@media screen and (max-width: 375px) {
  .Workers > .swipe-box {
    height: 200px;
  }
}

@media screen and (max-width: 320px) {
  .Workers > .swipe-box {
    height: 180px;
  }
  .Workers .workers-list {
    width: 85%;
    padding: 0.5rem 1rem;
  }
  .Workers .workers-list .bnt {
    width: 8rem;
    height: 2.2rem;
    font-size: 1.3rem;
    line-height: 2.2rem;
  }
  .Workers .workers-list .bnt img {
    height: 1.4rem;
    margin-top: -5px;
  }
  .Workers .work-start {
    width: 11rem;
    height: 11rem;
    line-height: 1.8rem;
    margin: 0.2rem auto;
  }
  .Workers .work-start span {
    font-size: 1.4rem;
    margin-top: 3.8rem;
  }
  .bnt-box {
    height: 32px;
  }
  .bnt-box .button {
    font-size: 1.2rem;
  }
  .bnt-box .button img {
    height: 1.2rem;
  }
}
</style>