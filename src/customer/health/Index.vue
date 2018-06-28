<template>
  <div class="Health">
    <mt-swipe :auto="4000" :style="{height:swipeHeight + 'px'}">
      <mt-swipe-item v-for="items in advertImg" :key="items.systemID">
        <!-- <img src="../../../static/img/updata/slide/user1.png"> -->
        <img :src="items.advPicURL" v-on:click="LinkJump(items.advURL,items.systemID)">
      </mt-swipe-item>
      <!-- <mt-swipe-item><img src="../../../static/img/updata/slide/common1.png"></mt-swipe-item> -->
    </mt-swipe>
    <div class="Healthtitle" v-on:click='go("/customer/hospital")'>
      <i class="iconfont navigation">&#xe6a9;</i>
      医院向导：{{cityInfo}}
      <i class="iconfont moer">&#xe62d;</i>
    </div>
    <div class="list-con">
      <div class="list-box" v-on:click='go("/customer/healthConsultation",1)'>
        <p>
          <i class="iconfont" style="background:#00CC66;">&#xe62a;</i>
        </p>
        <p>体验服务</p>
      </div>
      <div class="list-box" v-on:click='go("/customer/healthConsultation",2)'>
        <p>
          <i class="iconfont" style="background:#FDAA3B;">&#xe615;</i>
        </p>
        <p>电子档案</p>
      </div>
      <div class="list-box" v-on:click='go("/customer/healthConsultation",3)'>
        <p>
          <i class="iconfont" style="background:#F32043;">&#xe619;</i>
        </p>
        <p>国内专家</p>
      </div>
      <div class="list-box" v-on:click='go("/customer/healthConsultation",4)'>
        <p>
          <i class="iconfont" style="background:#FF7D2D;">&#xe61c;</i>
        </p>
        <p>基因测序</p>
      </div>
      <div class="list-box" v-on:click='go("/customer/healthConsultation",5)'>
        <p>
          <i class="iconfont" style="background:#FF4F2D;">&#xe639;</i>
        </p>
        <p>国际医疗通道</p>
      </div>
      <div class="list-box" v-on:click='go("/customer/healthConsultation",6)'>
        <p>
          <i class="iconfont" style="background:#009BF7;">&#xe637;</i>
        </p>
        <p>进口肿瘤医药指导</p>
      </div>

      <!-- <div class="list-box" v-on:click='go("/customer/healthConsultation")'>
				<p>
					<i class="iconfont" style="background:#AE5BFE;">&#xe63d;</i>
				</p>
				<p>住院安排</p>
			</div>

			<div class="list-box" v-on:click='go("/customer/healthConsultation")'>
				<p>
					<i class="iconfont" style="background:#009BF7;">&#xe624;</i>
				</p>
				<p>手术安排</p>
			</div> -->
    </div>
    <div class="info">
      <div class="ti" v-on:click='go("/customer/healthconsultationList")'>
        <i class="iconfont icon">&#xe61c;</i>资讯
        <i class="iconfont right">&#xe600;</i>
      </div>
      <!--<ul>
				<li v-on:click='go("/customer/healthconsultationDetails")'>
					<a>如何防范于未然</a>
				</li>
				<li v-on:click='go("/customer/healthconsultationDetails")'>
					<a>如何防范于未然</a>
				</li>
				<li v-on:click='go("/customer/healthconsultationDetails")'>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
				<li>
					<a>如何防范于未然</a>
				</li>
			</ul> -->
    </div>
  </div>
</template>
<style type="text/css" scoped="scoped">
.Health {
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 4.5rem;
}
.Health .mint-swipe img {
  width: 100%;
  height: auto;
}
.Health .Healthtitle {
  width: 96%;
  height: 40px;
  position: relative;
  line-height: 40px;
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  margin: 1rem auto;
  background-color: #94ca52;
  padding-left: 3rem;
  border-radius: 5px;
  color: #fff;
  font-size: 1.2rem;
}
.Health .Healthtitle .navigation {
  font-size: 2rem;
  position: absolute;
  top: 0;
  left: 0.5rem;
}
.Health .Healthtitle .moer {
  position: absolute;
  top: 0;
  right: 5px;
}
.Health .list-con {
  width: 96%;
  margin: 0 auto;
  display: block;
  overflow: hidden;
}
.Health .list-con .list-box {
  width: 33%;
  text-align: center;
  float: left;
  padding: 0;
}
.Health .list-con .list-box p {
  overflow: hidden;
  padding: 1rem 0;
}
.Health .list-con .list-box .iconfont {
  font-size: 1.6rem;
  background: #00c1de;
  padding: 1rem;
  color: #fff;
  border-radius: 5px;
}
.Health .info {
  width: 96%;
  margin: 1rem auto;
  background-color: #eee;
  border-radius: 10px;
  display: block;
}
.Health .info .ti {
  font-size: 1.2rem;
  border-bottom: 1px solid #fff;
  padding: 1rem 0;
  position: relative;
  padding-left: 4rem;
}
.Health .info .icon {
  font-size: 1.6rem;
  background: #009bf7;
  padding: 0.3rem;
  color: #fff;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  border-radius: 2px;
}
.Health .info .right {
  font-size: 1.6rem;
  color: #009bf7;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.Health .info ul {
  width: 90%;
  margin: 0 auto 1rem;
  height: 13rem;
  overflow-y: scroll;
  padding: 0.5rem 0;
}
.Health .info ul li {
  line-height: 27px;
  font-size: 1rem;
}
.Health .info ul li a {
  color: #ccc;
}
.Health .info ul li:before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 1rem;
}
</style>
<script>
import router from "./../../router";
import util from "./../../js/util/util.js";
import { Swipe, SwipeItem, Picker } from "mint-ui";

export default {
  data() {
    return {
      cityInfo: "贵州省第一人民医院",
      advertImg: [],
      swipeHeight:''
    };
  },
  components: {
    Swipe,
    SwipeItem,
    Picker
  },
  created() {
    this.$store.state.isFooterShow = true; //显示底部导航
    this.$store.state.flag = 1;
    document.title = "健康资源";
    this.getUserAdvertList();
  },
  methods: {
    go: function(url, index) {
      util.pushRouter(router, url, {
        index: index
      });
    },
    TostPicker: function() {},
    getUserAdvertList: function() {
      let _this = this;
      util.Ajax("/api/sysAdvert/userAdvertList?_method=GET", {}, function(
        data
      ) {
        let advertData = data.data;
        let advertItem = advertData.data;
        console.log(advertItem);
        for (var i in advertItem) {
          // let ImgUrl = _this.WorkerIconChange(advertItem[i].advPicURL);
          // advertItem[i].advPicURL = ImgUrl;
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
  },
  mounted: function() {
    if (this.$route.query.cityInfo == undefined) {
      this.cityInfo = "贵州省第二人民医院"; //定位的医院
      util.getSessionLocation(function(location) {
        console.log(location);
        let city = location.city;
        let longitude = location.Longitude;
        let latitude = location.Latitude;
        let cityCodeId = location.cityCodeId;
        console.log(
          city + "==" + longitude + "====" + latitude + "===" + cityCodeId
        );
      });
    } else {
      this.cityInfo = this.$route.query.cityInfo;
    }
    var swipeWidth = document.documentElement.clientWidth;
    this.swipeHeight = swipeWidth * 0.618;
  }
};
</script>
