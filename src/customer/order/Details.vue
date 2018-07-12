<template>
  <div class="o-details">

    <v-header></v-header>
    <div class="list" v-for="item in items">
      <div class="title">订单编码：{{item.tradeNum}}</div>
      <h3>服务内容</h3>
      <p>陪护</p>
      <h3>服务地址</h3>
      <p>{{item.hospital.name}}</p>
      <h3>服务时间</h3>
      <p>{{item.startDate.substring(0,10)}} 至 {{item.endDate.substring(0,10)}}<br/> 共计:
        <span v-if="item.estimatedTime.length>0" style="color:red;font-size:14px;font-weight:600;">
          {{item.estimatedTime.split(' ')[0]}}
        </span>
        <span v-if="item.estimatedTime.length>0" style="color:red;font-size:14px;font-weight:600;">
          {{item.estimatedTime.split(' ')[1].split(":")[0]+"时"+item.estimatedTime.split(' ')[1].split(":")[1]+"分"}}
        </span>
      </p>
      <h3>服务类型</h3>
      <p>
        {{dependentLevel}}
      </p>
      <!-- <h3>服务星级</h3>
			<p>
				<i class="iconfont" v-for="(i,index) in 5" :class="{'on':item.work.star-1>=index}">&#xe62f;</i>
			</p> -->
      <h3>护工信息</h3>
      <div>
        <div class="personal-info">
          <div class="personal-head"><img :src="item.work.avatar" class="head-info"></div>
          <div>
            <h3>{{item.work.name}}</h3>
            <p>年龄:{{item.work.age}}岁 </p>
            <p>性别:{{item.work.gender_desc}}</p>
          </div>
        </div>
      </div>
      <div class="detalis-price">
        <span>订单价格:</span>
        <span class="red">￥{{item.price}}</span>元
      </div>
    </div>
    <div v-if="repeatExchange" style="color: red;padding-left: 2rem;font-size: 1.2rem;">注:护工已经拒单,您可以选择更换护工或取消订单</div>
    <div class="tiem" v-if="isShow&&isLine">订单剩余支付时间:&nbsp;
      <span>{{minutes}}分钟&nbsp;{{seconds}}秒</span>
    </div>
    <div class="appraise" v-if="showAppraise">
      <p>态度</p>
      <i class="iconfont" v-for="(item,index) in 5" :class="{'on':starSkill>index}">&#xe62f;</i>
      <p>技能</p>
      <i class="iconfont" v-for="(item,index) in 5" :class="{'on':starAttitude>index}">&#xe62f;</i>
    </div>
    <!-- <div class="coupon">
      <h5>是否使用优惠卷</h5>
      <mt-radio :options="coupons" align="left"></mt-radio>
    </div> -->
    <mt-button type="danger" class="mt-button" v-if="isShow&&!overTime" v-on:click="palyClick" style="margin-top: 20px;">立即支付</mt-button>

    <mt-button type="danger" class="mt-button mt10" v-if="isSatrt&& !repeatExchange">待开始</mt-button>
    <mt-button type="default" class="mt-button" v-if="isCancel&&!overTime" v-on:click="cancellationOfOrder">取消订单</mt-button>

    <!-- <mt-button type="primary" class="mt-button mt10 bg-red" v-on:click="open('picker1')" v-if="isExchange">延长服务</mt-button> -->
    <mt-button type="primary" class="mt-button" v-if="isExchange" v-on:click='ChooseACare("/customer/workersList",0)'>申请换护工</mt-button>
    <mt-button type="primary" class="mt-button" v-if="repeatExchange" v-on:click='ChooseACare("/customer/workersList",1)'>更换护工</mt-button>
    <mt-button type="primary" class="mt-button" v-if="isExchanging">更换护工中</mt-button>
    <mt-button type="default" class="mt-button" v-if="isTermination" v-on:click="OrderToTerminate">订单终止</mt-button>
    <mt-button type="default" class="mt-button" v-if="isAppraise" v-on:click="OrderAppraise">订单评价</mt-button>
    <mt-button type="default" class="mt-button" v-if="overTime&&isOrderAgain" v-on:click="goBackOrder('/customer/workers')">重新下单</mt-button>
    <div class="cancellation-button" v-if="isTocomplete">服务-已完成</div>
    <div class="cancellation-button" v-if="isCancellation">取消-已完成</div>
    <div class="cancellation-button" v-if="isPayation">支付-已完成</div>
    <div class="cancellation-button" v-if="isServiceFlag">服务-已签约</div>
    <div class="cancellation-button" v-if="isRefundFlag">退款中</div>
    <mt-datetime-picker type="datetime" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>
    <modal v-if="showView">
      <h3 slot="header" class="popup-title">订单评价</h3>
      <div slot="body" class="popup-body">
        <h3>态度</h3>
        <p>
          <i class="iconfont" v-for="(item,index) in 5" v-on:click='starClikManner(index)' :class="{'on':isStarManner>=index}">&#xe62f;</i>
        </p>
        <h3>技能</h3>
        <p>
          <i class="iconfont" v-for="(item,index) in 5" v-on:click='starClikSkill(index)' :class="{'on':isStarSkill>=index}">&#xe62f;</i>
        </p>
        <!-- <mt-field  placeholder="请输入您的建议" class="popup-advice"></mt-field> -->
        <textarea placeholder="请输入您对护工的评价" v-model=comment></textarea>
        <button class="button infoButton" v-on:click="quiteClick">保存</button>
      </div>
      <div slot="footer">
      </div>
    </modal>
  </div>
</template>
<style type="text/css" scoped="scoped">
.o-details {
  margin-top: 4.5rem;
  margin-bottom: 4.5rem;
  position: relative;
}

.o-details .list {
  width: 99%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #eee;
  box-shadow: 0 0 10px 5px #eee;
  background-color: #fff;
}

.o-details .list h3 {
  font-size: 1.4rem;
  color: #00cc66;
  margin: 0.5rem;
}

.o-details .list p {
  padding: 0 20px;
  font-size: 1.2rem;
}

.o-details .list .on {
  color: #00cc66;
}

.o-details .list .iconfont {
  padding-right: 1rem;
}

.o-details .title {
  background: #94ca52;
  color: #fff;
  text-align: center;
  font-size: 1.4rem;
  padding: 0.5rem 0;
}

.o-details .mt-button {
  margin: 1rem auto 1rem;
  display: block;
  width: 8rem;
  background: #00cc66;
  font-size: 1.2rem;
  color: #fff;
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
  text-align: left;
  padding: 1rem 12px;
  line-height: 1.8rem;
}
.o-details .tiem span {
  font-size: 1.6rem;
  color: #e02828;
}

.o-details .btn-cancellation {
  border: 1px solid #e02828;
  margin-top: 2rem;
  width: 10rem;
  background: #fff;
  color: #e02828;
}

.o-details .cancellation-button {
  border: 1px solid #ff6633;
  background: #fff;
  font-size: 1.2rem;
  display: block;
  padding: 1rem 0.5rem;
  color: #ff6633;
  text-align: center;
  margin: 1rem auto;
  border-radius: 5px;
  width: 7rem;
}

.o-details .mt10 {
  margin-top: 2rem;
}

.o-details .bg-red {
  background: #ff0000;
}

.popup-title {
  text-align: center;
  padding: 10px 0;
  font-size: 1.5rem;
}

.popup-body h3 {
  font-size: 1.3rem;
  text-indent: 2rem;
  padding: 10px 0;
}

.popup-body p {
  transform: scale(1.3);
  margin-left: 120px;
  margin-top: -31px;
}

.iconfont {
  color: #ccc;
}

.o-details .on {
  color: #94ca52;
}
.coupon h5 {
  padding: 12px 6px 0;
  font-size: 1.2rem;
  color: #ff6633;
}
.o-details .mint-radiolist {
  color: #ff0a0a;
  font-size: 1.2rem;
}

.popup-body textarea {
  width: 82%;
  height: 80px;
  margin: 24px 0;
  margin-left: 2.1rem;
  font-size: 1.2rem;
}

.infoButton {
  padding: 0;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100px;
  height: 32px;
  font-size: 1.4rem;
  color: #94ca52;
}
</style>
<script>
import vHeader from "./../common/Header.vue";
import router from "./../../router";
import util from "./../../js/util/util.js";
import {
  CustomerOrderState,
  CustomerOrderStateDict,
  CustInfoRetionShipStatus,
  CustInfoRetionShipStatusDict,
  CustInfoServiceTypeStatus,
  CustInfoServiceTypeStatusDict
} from "./../../js/util/constants.js";
import wechatPay from "./../../assets/js/wechat_pay";
import { Cell, Toast, MessageBox, Radio } from "mint-ui";
import modal from "./../common/modal";
import axios from "axios";
//验证微信用户登录
import config from "./../../config";
import LoginVerify from "./../../assets/js/login_verify";
export default {
  data() {
    return {
      StartTiem: "",
      value: "",
      Type: "",
      isLine:true,  //判断是否线上下单还是扫码下单
      isSatrt: false,
      isOrderAgain:true,  //是否重新下单
      isCancel: false,
      isShow: false,
      isExchange: false,
      repeatExchange: false, //护工拒单重新更换标识
      isExchanging: false,
      isTermination: false,
      isCancellation: false,
      isPayation: false,
      isTocomplete: false,
      isAppraise: false,
      showAppraise: false,
      dependentLevel: "", //护理类型
      items: [],
      showView: false,
      isServiceFlag: false, //已签约
      isRefundFlag: false, //退款中
      isStarManner: 0, //控件的评分数据
      isStarSkill: 0,
      starSkill: 1, //订单评分后的数据
      starAttitude: 1,
      restar1: 1, //传送到服务器的评分数据
      restar2: 1,
      comment: "", //传送到服务器的护工评价
      minutes: "", //订单支付剩余分钟
      seconds: "", //订单支付剩余秒
      differMs: "", //相差的时间毫秒
      interval: null,
      orderInterval: null,
      playclick: false,
      OverInterval: false,
      overTime: false,
      coupons: [
        {
          label: "满300减50卷",
          value: "值A"
        },
        {
          label: "首用减100卷",
          value: "值B"
        },
        {
          label: "满400减80卷",
          value: "值C"
        }
      ]
    };
  },
  created() {
    this.$store.state.isFooterShow = false; //显示底部导航
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.getOrder();
    document.title = "我的订单";
  },
  components: {
    vHeader,
    Cell,
    MessageBox,
    modal: modal,
    Radio
  },
  methods: {
    open(picker) {
      console.log(picker);
      this.$refs[picker].open();
    },
    StartTiemChange(value) {
      console.log(value);
      var DateInfo = new Date(value);
      let Tiem =
        DateInfo.getFullYear() +
        "-" +
        (DateInfo.getMonth() + 1) +
        "-" +
        DateInfo.getDate() +
        " " +
        DateInfo.getHours() +
        ":" +
        DateInfo.getMinutes() +
        ":" +
        DateInfo.getSeconds();
      this.StartTiem = Tiem;
    },
    palyClick: function() {
      //触发订单刷新
      let $this = this;
      $this.playclick = true;
      console.log($this.playclick);
      //支付成功
      let orderId = this.$route.query.orderId;
      util.Ajax(
        "/api/order/payOrder/" + orderId + "?_method=GET",
        { userId: this.$store.state.userId },
        function(data) {
          // 调用微信支付接口
          console.log(data);
          wechatPay.pay(
            data.data,
            function() {
              util.pushRouter(router, "/customer/paysuccess", {
                orderId: tradeNo
              });
            },
            function(msg) {
              let msgInfo =
                msg !== undefined && msg !== ""
                  ? msg
                  : "支付失败，请重新支付。";
              MessageBox.confirm("", {
                title: "支付提示",
                message: msgInfo,
                showCancelButton: false
              }).then(action => {
                $this.playclick = false;
                console.log("支付失败：" + $this.playclick);
              });
            }
          );
        }
      );
    },
    cancellationOfOrder: function() {
      //取消订单
      var _$this = this;
      var _orderExecute = function() {
        let orderId = _$this.items[0].order_id;
        var _sendOrderURL =
          "/api/order/cancelOrder/" + orderId + "?_method=GET";
        var _OrderParam = {
          userId: _$this.$store.state.userId
        };
        axios
          .get(_sendOrderURL, { params: _OrderParam })
          .then(response => {
            if (response.status == 404) {
              MessageBox("好陪护提示", response.data.message);
            } else {
              console.log("取消成功！");
              if (response.data.status == CustomerOrderState.Cancelled) {
                _$this.isCancellation = true;
                _$this.repeatExchange = false;
                _$this.isShow = false;
                _$this.isSatrt = false;
                _$this.isCancel = false;
              }
              if (response.data.status == CustomerOrderState.Refunding) {
                _$this.isRefundFlag = true;
                _$this.repeatExchange = false;
                _$this.isShow = false;
                _$this.isSatrt = false;
                _$this.isCancel = false;
              }
            }
          })
          .catch(response => {
            MessageBox("好陪护提示", "订单验证失败");
          });
      };
      MessageBox.confirm("", {
        message: "您确定取消当前护工订单吗?",
        title: "好陪护提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(x => {
          console.log(x);
          if (x === "confirm") {
            //执行终结订单
            _orderExecute();
          }
        })
        .catch(error => {
          //取消结束
        });
    },
    OrderToTerminate: function() {
      var _$this = this;
      var _orderExecute = function() {
        //订单终止方法
        var orderID = _$this.items[0].order_id;
        var _sendOrderURL = "/api/order/endOrder/" + orderID;
        var _OrderParam = {
          userId: _$this.$store.state.userId
        };
        axios
          .get(_sendOrderURL, { params: _OrderParam })
          .then(response => {
            if (response.status == 404) {
              MessageBox("好陪护提示", response.data.message);
            } else {
              _$this.isCancellation = true;
              _$this.isExchange = false;
              _$this.isExchanging = false;
              _$this.isTermination = false;
            }
          })
          .catch(response => {
            MessageBox("好陪护提示", "订单验证失败");
          });
      };
      MessageBox.confirm("", {
        message: "您确定终止当前护工订单吗?",
        title: "好陪护提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(x => {
          console.log(x);
          if (x === "confirm") {
            //执行终结订单
            _orderExecute();
          }
        })
        .catch(error => {
          //取消结束
        });
    },
    OrderAppraise: function() {
      console.log("订单评价按钮");
      this.showView = true;
    },
    go: function(url) {
      util.pushRouter(router, url);
    },
    goBackOrder: function(url) {
      var _$this = this;
      var _orderExecute = function() {
        let orderId = _$this.items[0].order_id;
        var _sendOrderURL =
          "/api/order/cancelOrder/" + orderId + "?_method=GET";
        var _OrderParam = {
          userId: _$this.$store.state.userId
        };
        axios
          .get(_sendOrderURL, { params: _OrderParam })
          .then(response => {
            if (response.status == 404) {
              MessageBox("好陪护提示", response.data.message);
            } else {
              _$this.go(url);
            }
          })
          .catch(response => {
            _$this.go(url);
          });
      };
      MessageBox.confirm("", {
        message: "您将进入首页进行重新下单",
        title: "好陪护提示",
        confirmButtonText: "确定",
        showCancelButton: false
      })
        .then(x => {
          console.log(x);
          if (x === "confirm") {
            //执行终结订单
            _orderExecute();
          }
        })
        .catch(error => {
          //取消结束
        });
    },
    ChooseACare: function(url, flag) {
      //选择护工  patientGender
      let level = this.items[0].work.level; //等级
      //   let src = this.male + ',' + this.female //性别
      let gender = this.items[0].patientGender;
      let startDate = this.items[0].startDate; //开始时间
      let endDate = this.items[0].endDate; //结束时间
      let star = this.items[0].work.star;
      let hospitalId = this.items[0].hospital.hospital_id;
      let workId = this.items[0].work.work_id;
      console.log(
        level + gender + startDate + endDate + star + hospitalId + workId
      );
      var _param = {
        gender: gender,
        level: level,
        hospitalId: hospitalId,
        startDate: startDate,
        endDate: endDate,
        star: star,
        way: "second",
        orderId: this.$route.query.orderId,
        workId: workId
      };
      if (flag === 1) {
        //护工拒单，重新更换护工调用不同选择方式
        _param.tosingle = true;
      }
      util.pushRouter(router, url, _param);
    },
    getOrder: function() {
      //获取订单
      let $this = this;
      let orderId = $this.$route.query.orderId;
      var orderInfoURL = "/api/order?_method=GET";
      var _paramOrder = {
        orderId: orderId
      };
      axios
        .get(orderInfoURL, { params: _paramOrder })
        .then(response => {
          if (response.status == 200) {
            $this.items = response.data;
            console.log($this.items);
            var orderInfo = $this.items[0];
            var orderCreatedAt = orderInfo.createdAt; //获取当前订单的创建时间
            $this.TimeOverShow(orderCreatedAt,orderInfo.orderType);
            if (orderInfo.work && orderInfo.work.avatar) {
              if (orderInfo.work.avatar.indexOf("https://") === 0) {
                orderInfo.work.avatar = orderInfo.work.avatar;
              } else {
                orderInfo.work.avatar =
                  $this.$store.state.imgUrl + orderInfo.work.avatar;
              }
            }
            $this.dependentLevel =
              CustInfoServiceTypeStatusDict[orderInfo.dependentLevel];
            //界面组件控制
            if (orderInfo.orderWork) {
              var orderWork = orderInfo.orderWork;
              var orderType = orderInfo.orderType; //获取当前订单为线上还是线下
              var custInfoStatus = orderWork.status;
              this.PanelButtonVaild(
                orderType,
                orderInfo.status,
                custInfoStatus
              );
            } else {
              this.PanelButtonVaild(orderType, orderInfo.status);
            }
            //订单是否开始倒计时
            if (orderInfo.orderType === 'online') {
              $this.interval = setInterval(() => {
                if ($this.differMs > 0 && $this.playclick == true) {
                  // this.TimeOverShow(orderCreatedAt);
                  clearInterval($this.interval);
                  $this.interval = null;
                  $this.orderInterval = setTimeout(() => {
                    console.log($this.OverInterval);
                    if (!$this.OverInterval) {
                      $this.getOrder();
                    } else {
                      $this.orderInterval = null;
                    }
                  }, 5000);
                } else if ($this.differMs > 0 && $this.playclick == false) {
                  $this.TimeOverShow(orderCreatedAt);
                } else {
                  //十分钟时间到停止刷新！
                  clearInterval($this.interval);
                  $this.interval = null;
                }
              }, 1000);
            }
            //评价业务控制
            if (orderInfo.ratingStatus === 1) {
              //订单已评价
              $this.showAppraise = true;
              $this.isAppraise = false;
              $this.getOrderRatingInfo(orderInfo.order_id);
            } else {
              if ($this.isTocomplete) {
                $this.showAppraise = false;
                $this.isAppraise = true;
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
          MessageBox("好陪护提示", "订单获取失败");
        });
    },
    getOrderRatingInfo: function(orderId) {
      var $this = this;
      var _getRatingInfoURL = "/api/order/" + orderId + "/rating?_method=GET";
      var _params = { userId: $this.$store.state.userId };
      axios
        .get(_getRatingInfoURL, { params: _params })
        .then(response => {
          if (response.status == 200) {
            $this.starSkill = response.data.ratingSkill;
            $this.starAttitude = response.data.ratingAttitude;
          }
        })
        .catch(error => {
          MessageBox("好陪护提示", "订单获取失败");
        });
    },
    starClikManner: function(index) {
      this.isStarManner = index;
      this.restar1 = this.isStarManner + 1;
      console.log("态度评星" + this.restar1);
    },
    starClikSkill: function(index) {
      this.isStarSkill = index;
      this.restar2 = this.isStarSkill + 1;
      console.log("技能评星" + this.restar2);
    },
    quiteClick: function() {
      console.log("订单评价");
      let $this = this;
      let orderId = this.$route.query.orderId;
      let star1 = this.restar1;
      let star2 = this.restar2;
      let comment = this.comment;
      console.log("订单评价为：" + comment);
      util.Ajax(
        "/api/order/" + orderId + "/rating" + "?_method=PUT",
        {
          userId: this.$store.state.userId,
          comment: comment,
          ratingSkillL: star1,
          ratingAttitude: star2
        },
        function(data) {
          util.Ajax(
            "/api/order/" + orderId + "/rating?_method=GET",
            {
              userId: $this.$store.state.userId
            },
            function(data) {
              $this.starSkill = data.data.ratingSkill;
              $this.starAttitude = data.data.ratingAttitude;
            }
          );
        }
      );
      this.showAppraise = true;
      this.isAppraise = false;
      this.showView = false;
    },
    PanelButtonVaild: function(orderType, orderState, custInfoStatus) {
      //custInfoStatus orderWorks 表中护工与客户订单关系状态
      var Type = orderState;
      switch (Type) {
        case CustomerOrderState.Unpaid: //未付款
          if (orderType === "online") {
            this.isLine = true;
          } else {
            this.isLine = false;
          }
          this.isShow = true;
          this.isCancel = true;
          if (
            custInfoStatus &&
            custInfoStatus === CustInfoRetionShipStatus.Reject
          ) {
            //客户拒单
            this.repeatExchange = true;
          }
          break;
        case CustomerOrderState.Paid: //已付款
          this.isShow = false;
          this.isSatrt = true;
          this.isCancel = true;
          this.isPayation = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          if (
            custInfoStatus &&
            custInfoStatus === CustInfoRetionShipStatus.Reject
          ) {
            //客户拒单
            this.repeatExchange = true;
          }
          break;
        case CustomerOrderState.Signed: //已签约
          this.isShow = false;
          this.isSatrt = true;
          this.isPayation = true;
          this.isCancel = true;
          this.isServiceFlag = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          break;
        case CustomerOrderState.Progressing: //正常进行中
          this.isShow = false;
          this.isExchange = true;
          this.isExchanging = false;
          this.isCancel = false;
          this.isTermination = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          break;
        case CustomerOrderState.Completed: //正常已完成
          this.isShow = false;
          this.isTocomplete = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          break;
        case CustomerOrderState.Refunding: //退款进行中
          this.isShow = false;
          this.isRefundFlag = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          break;
        case CustomerOrderState.Refunded: //退款
          this.isShow = false;
          this.isOrderAgain = false;
          this.closeTnterval();
        case CustomerOrderState.Cancelled: //已取消
          this.isShow = false;
          this.isCancel = false;
          this.isCancellation = true;
          this.isOrderAgain = false;
          this.closeTnterval();
          break;
        case CustomerOrderState.SubstitutePending: //更换护工中
          this.isShow = false;
          this.isExchange = false;
          this.isExchanging = true;
          this.isCancel = false;
          this.isTermination = true;
          this.isOrderAgain = false;
          break;
        default:
          break;
      }
    },
    TimeOverShow: function(orderTime,orderType) {
      let $this = this;
      var orderTimeDate = new Date(Date.parse(orderTime.replace(/-/g, "/")));
      var nowDateTime = new Date();
      var nowTimeDateMs = nowDateTime.getTime(); //获取当前时间的毫秒
      var orderTimeLaterMs = orderTimeDate.getTime() + 1000 * 60 * 10; //获取订单创建时间的十分钟以后
      var overOrderTime = new Date(orderTimeLaterMs);
      var differMs = orderTimeLaterMs - nowTimeDateMs;
      var minutes = parseInt((differMs % (3600 * 1000)) / (60 * 1000)); //相差分
      var seconds = parseInt((differMs % (60 * 1000)) / 1000); //相差秒
      if (differMs < 0) {
        minutes = 0;
        seconds = 0;
        if (orderType=='online') {
          $this.overTime = true;
        }else{
          console.log('现在没有时间限制');
          $this.overTime = false;
          $this.isOrderAgain = false;
        }
      }
      $this.minutes = minutes;
      $this.seconds = seconds;
      $this.differMs = differMs;
    },
    closeTnterval: function() {
      clearInterval(this.interval);
      this.interval = null;
      this.OverInterval = true;
    }
  }
};
</script>
