<template>
  <div class="workersDetails">
    <v-header></v-header>
    <!-- <p v-if='items==""'>当前没有符合要求的护工</p> -->
    <div class="no-data" v-if='items.length==0'>
      <i class="iconfont">&#xe649;</i>当前没有符合要求的护工
    </div>
    <loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for="(item,index) in items" class="workerslist" v-on:click='popupClik(item.work_id)'>
        <div class="left">
          <img :src="item.avatar" />
        </div>
        <div class="mian">
          <h3>{{item.name}}</h3>
          <p>年龄:{{item.age}}岁</p>
          <p>护龄:{{item.exp}}年</p>
        </div>
        <div class="right">
          <i class="iconfont" v-for="(i,index) in 5" :class="{'on':item.star-1>=index}">&#xe62f;</i>
        </div>
      </div>
    </loadmore>
    <div class="datatotal-box" v-if='items.length!=0'>
      <p>
        <span>{{currentNumb}}</span>/{{dataNumb}}
      </p>
    </div>
    <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="mint-popup-1">
      <div class="personal-popup">
        <i class="iconfont stop" v-on:click="stopClik">&#xe612;</i>
        <img :src="personal.avatar" class="headPortrait" />
        <div class="icon-box">
          <i class="iconfont" v-for="(i,index) in 5" :class="{'on':personal.star-1>=index}">&#xe62f;</i>
        </div>
        <div class="bntbox">
          <span>{{personal.name}}</span>
          <span>{{personal.city}}</span>
          <span>{{personal.gender_desc}}</span>
          <span>{{personal.age}}岁</span>
          <span>{{personal.exp}}年护龄</span>
        </div>
        <div class="btns" v-on:click='go("/customer/history",personal.work_id)'>服务历史</div>
        <div class="personal-profile">个人介绍</div>
        <div class="personal-referral">{{personal.description}}</div>
        <button class="btn" v-on:click='orderCreate("/customer/orderdetails")'>{{fixed}}</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import router from "./../../router";
import util from "./../../js/util/util.js";
import vHeader from "./../common/Header.vue";
import { Cell, Popup, Loadmore, Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      popupVisible1: false,
      personal: "",
      Page: 1, //第几页
      Limit: 10,
      dataNumb: 0,
      currentNumb: 0,
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      wrapperHeight: 0,
      items: [],
      fixed: "",
      serviceType: "", //服务类型，非卧床、卧床、特殊
      getList() {
        var $this = this;
        let gender = this.$route.query.gender;
        let level = this.$route.query.level;
        let star = this.$route.query.star;
        let hospitalId = this.$route.query.hospitalId;
        let startDate = this.$route.query.startDate;
        let endDate = this.$route.query.endDate;
        let way = this.$route.query.way;
        //屏蔽护工ID
        let workId = this.$route.query.workId;

        if (way == "first") {
          console.log(11111);
          this.secondSeek(
            gender,
            level,
            /* parseInt(star), */ parseInt(hospitalId),
            startDate,
            endDate,
            workId
          );
        } else {
          console.log("非首次查找护工");
          startDate = startDate.substring(0, 10);
          endDate = endDate.substring(0, 10);
          this.secondSeek(
            gender,
            level,
            /* parseInt(star), */ parseInt(hospitalId),
            startDate,
            endDate,
            workId
          );
        }
      }
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
    this.items = [];
    this.serviceType = this.$route.query.level;
  },
  components: {
    vHeader,
    Popup,
    Cell,
    Loadmore,
    MessageBox
  },
  methods: {
    loadTop(id) {
      //下拉刷新
      //下拉加载
      this.items = [];
      this.Page = 1;
      this.getList();
      console.log(this);
      this.$refs.loadmore.onTopLoaded(id); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom(id) {
      //上拉加载更多数据
      this.Page += 1;
      this.getList(); // 加载更多数据
      this.$refs.loadmore.onBottomLoaded();
    },
    translateChange(translate) {
      //console.log(translate);
    },
    handleTopChange(status) {
      // console.log(status)
    },
    WorkerIconChange: function(iconURL) {
      if (iconURL) {
        if (iconURL.indexOf("https://") === 0) {
          iconURL = iconURL;
        } else {
          iconURL = this.$store.state.imgUrl + iconURL;
        }
      }
      return iconURL;
    },
    go: function(url, openId) {
      if (!window.user.phoneNum) {
        MessageBox.confirm("", {
          message: "登录后获得更多权益",
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
            console.log(error);
          });
      } else {
        console.log(openId);
        util.pushRouter(router, url, { openId: openId });
      }
    },
    orderCreate: function(url) {
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
            console.log(error);
          });
      } else {
        let $this = this;
        let userId = this.$store.state.userId;
        let hospitalId = this.$route.query.hospitalId;
        let workId = this.personal.work_id;
        let patientGender = this.personal.gender;
        let workerGender = this.personal.gender;
        let dependentLevel = "level" + this.personal.level;
        let nursingTime = "day";
        let startDate = this.$route.query.startDate;
        let endDate = this.$route.query.endDate;
        let serviceType = this.serviceType;
        // 下单
        console.log("查看当前护工id" + workId);
        if (this.$route.query.way == "first") {
          util.Ajax(
            "/api/order/orderCreate?_method=PUT",
            {
              userId: userId,
              hospitalId: hospitalId,
              workId: workId,
              patientGender: patientGender,
              workerGender: workerGender,
              dependentLevel: dependentLevel,
              nursingTime: nursingTime,
              startDate: startDate,
              endDate: endDate,
              serviceType: serviceType
            },
            function(data) {
              if (data.data.status == "0") {
                //下单成功
                util.pushRouter(router, url, {
                  status: data.data.data.status,
                  orderId: data.data.data.order_id
                });
              }
            }
          );
        } else {
          //更换订单
          //屏蔽护工ID--用于判断是否属于拒单更换护工
          var _tosingle = this.$route.query.tosingle;
          var _sendOrderURL =
            "/api/order/substituteOrder/" +
            this.$route.query.orderId +
            "?_method=GET";
          if (_tosingle) {
            //拒单更换护工
            _sendOrderURL =
              "/api/order/reSelectOrder/" +
              this.$route.query.orderId +
              "?_method=GET";
          }
          var _SendParams = {
            userId: userId,
            workId: workId
          };
          console.log("更换订单发送地址");
          console.log(_sendOrderURL);
          util.Ajax(_sendOrderURL, _SendParams, function(changeBackData) {
            if (!_tosingle) {
              if (changeBackData.data.status == "substitute-pending") {
                console.log("更换成功,等待护工确定");
                var backData = changeBackData.data;
                $this.goOrderDetails(backData.order_id, backData.status);
              }
            } else {
              console.log(changeBackData);
              if (changeBackData.status == 200) {
                var backData = changeBackData.data;
                var orderWorksData = backData.orderWorks;
                if (orderWorksData.length > 0) {
                  //过滤--获取最新工单数据
                  var newOrderWorks = orderWorksData.filter(value => {
                    return value.workId === workId;
                  });
                  if (
                    newOrderWorks[newOrderWorks.length - 1].status === "idle"
                  ) {
                    console.log("更换成功,等待护工确定");
                    $this.goOrderDetails(backData.order_id, backData.status);
                  } else {
                    console.log("更换失败");
                  }
                }
              }
            }
          });
        }
      }
    },
    goOrderDetails: function(orderId, status) {
      util.pushRouter(router, "/customer/orderdetails", {
        orderId: orderId,
        status: status
      });
    },
    popupClik: function(id) {
      this.popupVisible1 = true;
      let $this = this;
      util.Ajax("/api/work/" + id + "?_method=GET", {}, function(data) {
        if (data) {
          $this.personal = data.data;
          let newUrl = $this.WorkerIconChange(data.data.avatar);
          $this.personal.avatar = newUrl;
        }
      });
    },
    stopClik: function() {
      this.popupVisible1 = false;
    },
    secondSeek: function(
      gender,
      level,
      /* star, */ hospitalId,
      startDate,
      endDate,
      workId
    ) {
      let $this = this;
      var _params = {
        workGender: gender,
        dependentLevel: "level" + level,
        //star: star,
        hospitalId: hospitalId,
        startDate: startDate,
        endDate: endDate,
        page: $this.Page,
        limit: $this.Limit
      };
      if (workId) {
        //需要屏蔽护工ID
        _params.banWorkId = workId;
      }
      console.log(_params);
      util.Ajax("/api/work/availableWorks?_method=POST", _params, function(
        data
      ) {
        var listData = data.data;
        var data = listData.data;
        $this.dataNumb = listData.totalCount;
        $this.currentNumb = $this.Limit * $this.Page;
        if ($this.currentNumb >= listData.totalCount) {
          $this.allLoaded = true; // 若数据已全部获取完毕
          $this.$refs.loadmore.onBottomLoaded();
          $this.currentNumb = listData.totalCount;
          Toast({
            message: "已加载全部护工！",
            duration: 2000
          });
        } else {
          $this.allLoaded = false; // 若数据已全部获取完毕
          $this.$refs.loadmore.onBottomLoaded();
        }
        for (var i in data) {
          let newUrl = $this.WorkerIconChange(data[i].avatar);
          data[i].avatar = newUrl;
          $this.items.push(data[i]);
        }
      });
    }
  },
  mounted: function() {
    this.getList();
    this.fixed = this.$route.query.way == "first" ? "确定下单" : "确定更换";
  }
};
</script>
<style>
.head-portrait {
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 3rem 1rem;
  background: #fff;
  font-size: 16px;
}
.portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.workersDetails {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 4rem;
  width: 100%;
  height: 100%;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}
.workersDetails .workerslist {
  display: flex;
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  margin: 5px auto 0;
  padding: 1rem;
  border-radius: 5px;
  border-bottom: 1px solid #f7f7f7;
}
.workersDetails .workerslist .left {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.workersDetails .workerslist .left img {
  border-radius: 5px;
}
.workersDetails .workerslist .mian {
  padding: 0 0 0 1rem;
  width: 35%;
  overflow: hidden;
}
.workersDetails .workerslist .mian h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}
.workersDetails .workerslist .right {
  position: relative;
}
.workersDetails .workerslist .right .iconfont {
  margin-right: 0.2rem;
}
.workersDetails .workerslist .right .on {
  color: #00cc66;
}
.workersDetails .mint-popup {
  width: 90%;
  box-sizing: border-box;
  border-radius: 5px;
}
/**个人信息**/
.personal-popup {
  position: relative;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}
.personal-popup .headPortrait {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: block;
  border-radius: 50%;
  background: #eee;
}
.personal-popup .stop {
  position: absolute;
  top: 0.5rem;
  right: 0.5em;
  color: #f32043;
  font-size: 1.8rem;
}
.personal-popup .bntbox span {
  display: inline-block;
  border: 1px solid #eee;
  padding: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
}
.personal-popup .icon-box {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
}
.personal-popup .icon-box .iconfont {
  margin-right: 0.5rem;
  font-size: 1.6rem;
}
.personal-popup .icon-box .on {
  color: #00cc66;
}
.personal-popup .btn {
  padding: 1rem;
  border: 0;
  width: 8rem;
  color: #fff;
  text-align: center;
  background: #00cc66;
  margin: 1rem auto;
  display: block;
  border-radius: 5px;
  font-size: 1.2rem;
}
.personal-popup .btns {
  padding: 0.5rem 1rem;
  border: 0;
  width: 5rem;
  color: #404040;
  text-align: center;
  background: #eee;
  margin: 1.5rem auto;
  display: block;
  border-radius: 5px;
  font-size: 1.2rem;
}
.personal-popup .personal-profile {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  display: block;
  font-size: 18px;
}
.personal-popup .personal-referral {
  text-indent: 2rem;
  line-height: 1.7rem;
}
.datatotal-box {
  position: fixed;
  bottom: 20px;
  right: 15px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  background: #94ca52;
}
.datatotal-box p {
  font-size: 1.2rem;
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.datatotal-box p span {
  font-size: 1.6rem;
  padding: 0 3px;
}
</style>