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
          <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
            <h3>{{tiem.hospital.name}}</h3>
            <p>下单时间：{{tiem.createdAt}}</p>
            <p>总价：
              <label style="color:red;">￥{{tiem.price}}元</label>
            </p>
            <mt-button type="danger" class="danger" v-if="tiem.startStatus==0">未开始</mt-button>
            <mt-button v-else type="danger" class="danger">{{OrderStatusText(tiem.status)}}</mt-button>
          </div>
        </template>

        <div class="no-data" v-if="isShow">
          <i class="iconfont">&#xe649;</i>
          {{noData}}
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <template v-for="tiem in Processing" v-if="!isHave">
          <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
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
              <p>实时计费：
                <span style="color:red;">{{tiem.charging}}元</span>
              </p>
            </div>
            <!-- <mt-button type="danger" class="danger" v-if="tiem.ratingStatus==0">未评价</mt-button> -->
            <mt-button type="danger" class="danger">{{OrderStatusText(tiem.status)}}</mt-button>
          </div>
        </template>
        <div class="no-data" v-if="isHave">
          <i class="iconfont">&#xe649;</i>
          {{noData}}
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <template v-for="tiem in AllCompleted" v-if="!isFinish">
          <div class="list" v-on:click='go("/customer/orderdetails",tiem.order_id,tiem.status)'>
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
            <mt-button type="danger" class="danger" v-if="tiem.status==='Completed'">未评价</mt-button>
            <mt-button v-else type="danger" class="danger">{{OrderStatusText(tiem.status)}}</mt-button>
          </div>
        </template>
        <div class="no-data" v-if="isFinish">
          <i class="iconfont">&#xe649;</i>
          {{noData}}
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
  padding-bottom: 60px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
<script>
import router from "./../../router";
import util from "./../../js/util/util.js";
import {
  CustomerOrderState,
  CustomerOrderStateDict
} from "./../../js/util/constants.js";
import { Navbar, TabItem, MessageBox } from "mint-ui";
//验证微信用户登录
import config from "./../../config";
import LoginVerify from "./../../assets/js/login_verify";
export default {
  data() {
    return {
      isShow: false,
      isHave: false,
      isFinish: false,
      noData: "",
      selected: "1",
      NotStarted: [],
      Processing: [],
      AllCompleted: []
    };
  },
  components: {
    Navbar,
    TabItem,
    MessageBox
  },
  methods: {
    go: function(url, orderId, status) {
      util.pushRouter(router, url, { orderId: orderId, status: status });
    },
    notStartOrderList: function() {
      //未开始订单
      let $this = this;
      util.Ajax(
        "/api/order/notStartOrderList?_method=GET",
        { userId: this.$store.state.userId },
        function(data) {
          console.log(data.data);
          if (data.data.length > 0) {
            $this.NotStarted = data.data;
          } else {
            $this.isShow = true;
            $this.noData = "您没有未开始订单";
          }
        }
      );
    },
    processingOrderList: function() {
      //进行中
      let $this = this;
      util.Ajax(
        "/api/order/processingOrderList?_method=GET",
        { userId: this.$store.state.userId },
        function(data) {
          console.log(data.data);
          if (data.data.length > 0) {
            $this.Processing = data.data;
          } else {
            $this.isHave = true;
            $this.noData = "您没有进行中订单";
          }
        }
      );
    },
    allCompletedOrderList: function() {
      //获取已完成
      let $this = this;
      util.Ajax(
        "/api/order/allCompletedOrderList?_method=GET",
        { userId: this.$store.state.userId },
        function(data) {
          if (data.data.length > 0) {
            $this.AllCompleted = data.data;
            console.log($this.AllCompleted);
          } else {
            $this.isFinish = true;
            $this.noData = "您没有已结束订单";
          }
        }
      );
    },
    OrderStatusText: function(status) {
      return CustomerOrderStateDict[status] || "未知";
    },
  },
  created() {
    let _this=this
    _this.$store.state.isFooterShow = true; //显示底部导航
    _this.$store.state.flag = 2;
    document.title = "我的订单";
    if (!window.user.phoneNum) {
        MessageBox.confirm("", {
          message: "请您登录后获得更多权益",
          title: "好陪护提示",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(x => {
            console.log(x);
            if (x === "confirm") {
              util.pushRouter(router, "/customer/registration", {});
            }
          })
          .catch(error => {
            _this.$router.go(-1);
          });
      }
  },
  mounted: function() {
    //加载完成后执行
    this.notStartOrderList(); //未开始订单
  }
};
</script>
