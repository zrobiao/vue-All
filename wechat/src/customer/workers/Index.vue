<template>
  <div class="Workers" :style="{height:BodyHeight+'px'}">
    <mt-swipe :auto="4000" :style="{height:swipeHeight+'px'}">
      <mt-swipe-item v-for="items in advertImg" :key="items.systemID" class="define-item">
        <!-- <img src="../../../static/img/updata/slide/user1.png"> -->
        <img :src="items.advPicURL" v-on:click="LinkJump(items.advURL,items.systemID)">
      </mt-swipe-item>
      <!-- <mt-swipe-item>
        <img src="../../../static/img/updata/slide/common1.png">
      </mt-swipe-item> -->
      <!-- <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item> -->
    </mt-swipe>
    <div class="list">
      <i class="iconfont">&#xe633;</i>
      <h3>陪护医院</h3>
      <p v-on:click='hospitalCilk("/customer/hospital")'>
        <span class="hospitalName">{{hospitalName}}</span>
        <i class="iconfont city-icon">&#xe629;</i>
      </p>
    </div>
    <div class="list">
      <i class="iconfont">&#xe607;</i>
      <h3>开始时间</h3>
      <p v-on:click="open('picker1')">
        <span>{{startDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <div class="list">
      <i class="iconfont">&#xe60f;</i>
      <h3>结束时间</h3>
      <p v-on:click="open('picker2')">
        <span>{{endDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <div class="list">
      <i class="iconfont">&#xe61b;</i>
      <h3>护工性别</h3>
      <p>
        <button class="but" :class="{'but-select':isMale}" v-on:click='MaleClik()'>男</button>
        <button class="but" :class="{'but-select':isFemale}" v-on:click='FemaleClik()'>女</button>
      </p>
    </div>
    <div class="list">
      <i class="iconfont">&#xe648;</i>
      <h3>服务类型</h3>
      <p>
        <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-select':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
      </p>
    </div>
    <div class="list-hintbox" v-if="flag==2">
      <span class="list-hinttxt">该价格为基础价格，超出实际费用，与护工直接结算。</span>
    </div>
    <!-- <div class="list">
			<i class="iconfont">&#xe630;</i>
			<h3>护工星级</h3>
			<p>
				<i class="iconfont" v-for="(item,index) in 5" v-on:click='starClik(index)' :class="{'on':isStar>=index}">&#xe62f;</i>
			</p>
		</div> -->
    <div class="total">
      <div class="price">合计：
        <span class="orange">￥{{price.total}}</span>元<br>(￥{{price.pricePerDay}}元/天)</div>
      <div class="fees-and-services" v-on:click='go("/customer/Servicedescription")'>收费与服务</div>
      <div class="choose-care" v-on:click='ChooseACare("/customer/workersList")'>选护工</div>
    </div>
    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker1" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange">
    </mt-datetime-picker>

    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker2" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange"></mt-datetime-picker>
  </div>
</template>
<style type="text/css" scoped>
.Workers {
  background: #fff;
  /* position: absolute;
  left: 0;
  bottom: 0; */
  width: 100%;
  min-height: 100%;
  padding-bottom: 110px;
}
.Workers .mint-swipe {
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
}
.mint-swipe-items-wrap {
  overflow: auto !important;
}
.define-item {
  position: absolute;
  height: 100px;
  top: 0;
  left: 0;
}
.Workers .mint-swipe img {
  width: 100%;
  height: auto;
}
.Workers .list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #fff;
}
.Workers .list h3 {
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 1rem;
  line-height: 26px;
  flex: 0 1 30%;
}
.Workers .list .iconfont {
  font-size: 2rem;
  line-height: 26px;
}
.Workers .list p {
  flex: 0 1 60%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}
.Workers .list-hintbox {
  font-size: 1.2rem;
  color: #f32043;
  border-radius: 5px;
  margin: 5px 2rem;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.75);
  box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.75);
  position: relative;
}
.Workers .list-hintbox:before,
.Workers .list-hintbox:after {
  content: "";
  display: block;
  border-width: 10px;
  position: absolute;
  top: -20px;
  right: 20px;
  border-style: solid dashed dashed;
  border-color: transparent transparent rgb(240, 240, 240);
  font-size: 0;
  line-height: 0;
}
.Workers .list-hintbox:after {
  top: -18px;
  border-color: transparent transparent rgb(255, 255, 255);
}
.Workers .list-hintbox .list-hinttxt {
  font-size: 1.2rem;
  color: #fd6f37;
}
.Workers .list p i {
  color: #ddd;
}
.Workers .list .hospitalName {
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.Workers .work-info {
  background: #fff;
  color: #f32043;
  text-indent: 9rem;
  padding: 0.5rem 0;
  font-size: 1.2rem;
}
.Workers .but {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  padding: 0.5rem;
  /* width: 3.5rem; */
}
.Workers .but:not(:last-child) {
  margin-right: 0.5rem;
}
.Workers .but-select {
  background: #94ca52;
  color: #fff;
}
.Workers .total {
  position: fixed;
  left: 0;
  bottom: 4.4rem;
  background: #fcfcfc;
  height: 4rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-top: 1px solid #eee;
}
.Workers .price {
  width: 50%;
  text-align: center;
  box-sizing: border-box;
  line-height: 1.5rem;
  padding-top: 4px;
  font-size: 1.2rem;
}
.Workers .price .orange {
  font-size: 1.4rem;
}
.Workers .fees-and-services {
  height: 100%;
  line-height: 4rem;
  width: 25%;
  color: #5aa6e6;
  text-align: center;
  font-size: 1.2rem;
}
.Workers .choose-care {
  height: 100%;
  line-height: 4rem;
  width: 25%;
  background: #94ca52;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
}
.Workers .list p .on {
  color: #94ca52;
}
.Workers .iconfont {
  margin-right: 0.5rem;
}
.Workers .list .picker {
  color: #4e4e4e;
  padding-left: 15px;
}
.Workers .list .city-icon {
  font-size: 1.2rem;
  color: #94ca52;
  padding-left: 15px;
}
@media screen and (max-width: 320px) {
  .Workers .list {
    padding: 0.7rem 2rem;
  }
  .Workers .list h3 {
    font-size: 1.2rem;
    flex: 0 1 25%;
  }
  .Workers .list p {
    font-size: 1.2rem;
  }
}
@media screen and (min-width: 376px) {
  .Workers .list-hintbox:before,
  .Workers .list-hintbox:after {
    right: 15%;
  }
}
</style>
<script>
import router from "./../../router";
import util from "./../../js/util/util.js";
import { Swipe, SwipeItem, DatetimePicker, Toast } from "mint-ui";
export default {
  data() {
    return {
      isWorke: true,
      hospitalId: "",
      hospitalName: "",
      Longitude: "",
      Latitude: "",
      Star: 1,
      isStar: 0,
      flag: 0,
      isMale: true,
      isFemale: true,
      ison: false,
      series: "1",
      male: "male",
      female: "female",
      price: "",
      ServiceStar: [
        {
          title: "非卧床",
          number: "1"
        },
        {
          title: "卧床",
          number: "2"
        },
        {
          title: "特殊",
          number: "3"
        }
      ],
      value: "",
      startDate: "",
      endDate: "",
      BodyHeight: "",
      swipeHeight: "",
      advertImg: []
    };
  },
  components: {
    Swipe,
    SwipeItem
  },
  created() {
    this.$store.state.isFooterShow = true; //显示底部导航
    this.$store.state.flag = 0;
    console.log(this.$store.state.userId)
    document.title = "找护工";
    var $this = this;
    util.getSessionLocation(function(location) {
      //获取经度
      $this.longitude = location.Longitude;
      $this.latitude = location.Latitude;
    });
    this.getUserAdvertList();
  },
  methods: {
    getUserAdvertList: function() {
      let _this = this;
      util.Ajax("/api/sysAdvert/userSelectList?_method=GET", {}, function(
        data
      ) {
        let advertData = data.data;
        let advertItem = advertData.data;
        console.log(advertItem);
        for (var i in advertItem) {
          // let ImgUrl = _this.WorkerIconChange(advertItem[i].advPicURL);
          advertItem[i].advPicURL = _this.$store.state.alternateUrl+advertItem[i].advPicURL;
          _this.advertImg.push(advertItem[i]);
        }
      });
    },
    LinkJump: function(advURL, advertId) {
      window.location.href = advURL
      util.Ajax(
        "/api/sysAdvert/addSelectView?_method=POST",
        { id: advertId },
        function(data) {
          console.log(data)
        }
      );
    },
    serveClik: function(num, index) {
      //选择高级
      this.flag = index;
      this.series = num;
      this.priceInfo();
      if (index == 2) {
        document.documentElement.scrollTop = this.BodyHeight;
        console.log(this.BodyHeight);
      }
    },
    starClik: function(index) {
      //点击选中星级
      this.isStar = index;
      let indexs = index + 1;
      this.Star = indexs;
      this.priceInfo();
      console.log("当前星级:" + this.Star);
    },
    MaleClik: function() {
      //男
      if (this.isMale) {
        this.isMale = false;
        this.male = "";
      } else {
        this.isMale = true;
        this.male = "male";
      }
      this.priceInfo();
    },
    FemaleClik: function() {
      //女
      if (this.isFemale) {
        this.isFemale = false;
        this.female = "";
      } else {
        this.isFemale = true;
        this.female = "female";
      }
      this.priceInfo();
    },
    hospitalCilk: function(url) {
      util.pushRouter(router, url, { page: "workers" });
    },
    go: function(url) {
      util.pushRouter(router, url, {});
    },
    ChooseACare: function(url) {
      //选择护工
      let level = this.series; //等级
      let src = this.male + "," + this.female; //性别
      let gender = src.replace(/^,+|,+$/g, "");
      let startDate = this.startDate; //开始时间
      let endDate = this.endDate; //结束时间
      let star = this.Star;
      if (
        this.hospitalId == undefined ||
        this.hospitalId === "" ||
        this.hospitalId == null
      ) {
        Toast("请选择陪护医院");
        return;
      }
      // console.log(level+src+gender+startDate+endDate+star+this.hospitalId)
      util.pushRouter(router, url, {
        gender: gender,
        level: level,
        hospitalId: this.hospitalId,
        startDate: startDate,
        endDate: endDate,
        //star: star,
        way: "first"
      });
    },
    priceInfo: function() {
      //通过条件查询价格
      let $this = this;
      let level = this.series; //等级
      let startDate = this.startDate; //开始时间
      let endDate = this.endDate; //结束时间
      let star = this.Star; //星级
      let src = this.male + "," + this.female; //性别
      let gender = src.replace(/^,+|,+$/g, "");
      util.Ajax(
        "/api/price?_method=POST",
        { startDate: startDate, endDate: endDate, level: level, star: star },
        function(data) {
          console.log(data);
          $this.price = data.data;
        }
      );

      util.Ajax(
        "/api/work/list?_method=POST",
        { gender: gender, level: level, star: star },
        function(data) {
          //显示是否有护工
          if (data.data.length <= 0) {
            $this.isWorke = false;
          }
        }
      );
    },
    open(picker) {
      this.$refs[picker].open();
    },
    StartTiemChange(value) {
      var DateInfo = new Date(value);
      var myMonth = DateInfo.getMonth() + 1;
      var myDay = DateInfo.getDate();
      myDay = (myDay + "").length <= 1 ? 0 + "" + myDay : myDay;
      myMonth = (myMonth + "").length <= 1 ? 0 + "" + myMonth : myMonth;
      let Tiem = DateInfo.getFullYear() + "-" + myMonth + "-" + myDay;
      this.startDate = Tiem;
      console.log(myDay);
      this.priceInfo();
    },
    FinishTiemChange(value) {
      console.log(value);
      var DateInfo = new Date(value);
      var myMonth = DateInfo.getMonth() + 1;
      var myDay = DateInfo.getDate();
      myDay = (myDay + "").length <= 1 ? 0 + "" + myDay : myDay;
      myMonth = (myMonth + "").length <= 1 ? 0 + "" + myMonth : myMonth;
      let Tiem = DateInfo.getFullYear() + "-" + myMonth + "-" + myDay;
      this.endDate = Tiem;
      console.log(myDay);
      //      if(this.endDate>this.startDate){
      //      	Toast("开始时间必须小于结束时间")
      //      }
      this.priceInfo();
    }
  },
  mounted: function() {
    if (this.$route.query.hospitalName == undefined) {
      var $this = this;
      util.Ajax(
        "/api/hospital/distance?_method=GET",
        { lng: $this.longitude, lat: $this.latitude },
        function(data) {
          $this.hospitalName = data.data.name;
          $this.hospitalId = data.data.hospital_id;
        }
      );
    } else {
      this.hospitalId = this.$route.query.hospitalId;
      this.hospitalName = this.$route.query.hospitalName;
    }
    var myDate = new Date(); //时间
    var myYear = myDate.getFullYear(); //获取当前年份(2位)
    var myMonth = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    var myDay = myDate.getDate(); //获取当前日(1-31)
    myDay = (myDay + "").length <= 1 ? 0 + "" + myDay : myDay;
    myMonth = myMonth + 1;
    myMonth = (myMonth + "").length <= 1 ? 0 + "" + myMonth : myMonth;
    this.startDate = myYear + "-" + myMonth + "-" + myDay;
    this.endDate = myYear + "-" + myMonth + "-" + myDay;
    this.priceInfo();
    this.value = this.startDate;
    this.BodyHeight = document.documentElement.clientHeight;
    var swipeWidth = document.documentElement.clientWidth;
    this.swipeHeight = swipeWidth * 0.618;
    if (this.BodyHeight > 600) {
      this.BodyHeight = 600;
    } else {
      this.BodyHeight = document.documentElement.clientHeight;
    }
  }
};
</script>
