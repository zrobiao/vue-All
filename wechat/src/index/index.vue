<template>
  <div>
    <section>
      <carousel :indicators="indicators" :controls="controls" :interval="interval" ref="carousel">
        <slide v-for="(slide, index) in slides" :key="index">
          <div style="width: 100%;" class="slider-box">
            <!-- <img :src="slide.advPicURL"> -->
            <img :src="slide.src">
          </div>
        </slide>
        <template slot="indicators" slot-scope="props">
          <ol class="carousel-indicators custom-carousel-indicators">
            <li v-for="(slide, index) in slides" :class="{active:index === props.activeIndex}" @click="props.select(index)">
              <!-- Anything you like here -->
            </li>
          </ol>
        </template>
      </carousel>
    </section>
    <section class="container">
      <div class="index-titlebox">
        <h4>我们的优势</h4>
        <p></p>
      </div>
      <ul class="content row">
        <li class="col-lg-3 col-md-3 col-xs-12">
          <div class="index-libox">
            <div class="icon-box">
              <i class="iconfont hph-ali-icon1"></i>
            </div>
            <p>专业服务<br/>培训上岗&nbsp;&nbsp;经验丰富</p>
          </div>
        </li>
        <li class="col-lg-3 col-md-3 col-xs-12">
          <div class="index-libox">
            <div class="icon-box">
              <i class="iconfont hph-ali-resource"></i>
            </div>
            <p>六大资源<br/>全面服务&nbsp;&nbsp;为您护航</p>
          </div>
        </li>
        <li class="col-lg-3 col-md-3 col-xs-12">
          <div class="index-libox">
            <div class="icon-box">
              <i class="iconfont hph-ali-zyfw"></i>
            </div>
            <p>五星陪护<br/>海量护工&nbsp;&nbsp;五星服务</p>
          </div>
        </li>
        <li class="col-lg-3 col-md-3 col-xs-12">
          <div class="index-libox">
            <div class="icon-box">
              <i class="iconfont hph-ali-anquan"></i>
            </div>
            <p>健康安心<br/>平台担保&nbsp;&nbsp;持证上岗</p>
          </div>
        </li>
      </ul>
    </section>
    <section class="index-middle" ref="indexMiddle">
      <div class="container">好陪护&nbsp;&nbsp;&nbsp;陪护好&nbsp;&nbsp;&nbsp;找护工就上好陪护……</div>
    </section>
    <section class="container">
      <ul class="content row">
        <li class="col-lg-6 col-md-6 col-xs-12">
          <div class="nurs-wokerbox nurs-zybg" ref="bignurs" :style="{height:bigHeight+'px'}">
            <div class="nurs-ziy">
              <h6>直营护工</h6>
              <p>更专业、更舒心</p>
            </div>
          </div>
        </li>
        <li class="col-lg-6 col-md-6 col-xs-12">
          <div class="nurs-wokerbox nurs-hlbg" ref="smallnurs" :style="{height:smallHeight+'px'}" style="margin-bottom:15px;">
            <div class="nurs-hail">
              <h6>共享护工</h6>
              <p>共享服务、方便你我</p>
            </div>
          </div>
          <div class="nurs-wokerbox nurs-jmbg" ref="smallnurs" :style="{height:smallHeight+'px'}">
            <div class="nurs-jiam">
              <h6>第三方护工</h6>
              <p>专品质服务、健康陪护</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="ent-content" style="margin-bottom:50px;">
      <div class="index-titlebox">
        <h4>便捷入口</h4>
        <p></p>
      </div>
      <div class="container">
        <ul class="content row">
          <li class="col-lg-4 col-md-4 col-xs-12">
            <div class="ent-libox">
              <div class="icon-box app-icon">
                <i class="iconfont hph-ali-app6"></i>
              </div>
              <h3>APP直达</h3>
              <p>专业服务<br/>培训上岗&nbsp;&nbsp;经验丰富</p>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12">
            <div class="ent-libox">
              <div class="icon-box wx-icon">
                <i class="iconfont hph-ali-weixin-copy"></i>
              </div>
              <h3>微信直达</h3>
              <p>八大资源<br/>五星服务&nbsp;&nbsp;为您护航</p>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12">
            <div class="ent-libox">
              <div class="icon-box phone-icon">
                <i class="iconfont hph-ali-dianhuadiaoyan"></i>
              </div>
              <h3>电话直达</h3>
              <p>多元化服务<br/>五星服务&nbsp;&nbsp;海量护工</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import router from "./../router";
import util from "./../js/util/util.js";
export default {
  name: "app",
  components: {
    // Footer,
    // Header
  },
  data() {
    return {
      msg: "这里是首页！",
      interval: 0,
      indicators: true,
      controls: false,
      bigHeight: 0,
      smallHeight: 0,
      middleHeight: 0,
      slides: [
        {
          title: "滑动1",
          src: "../../static/img/index/index_banner.jpg"
        }
      ],
      advertImg: [],
      verifyBrowser:true,
    };
  },
  methods: {
    browserRedirect: function() {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      ) {
        console.log("移动端设备");
        this.verifyBrowser=false
      } else {
        this.verifyBrowser=true
        console.log("pc端设备");
      }
    },
    getUserAdvertList: function() {
      let _this = this;
      console.log(_this.$store.state.alternateUrl)
      if (_this.verifyBrowser) {
        console.log("pc端设备");
        util.Ajax("/api/sysAdvert/userHouseListPC?_method=GET", {}, function(
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
      }else{
        console.log("移动端设备");
        util.Ajax("/api/sysAdvert/userHouseListH5?_method=GET", {}, function(
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
      }
    }
  },
  created() {
    this.$store.state.flag = 0;
    document.title = "好陪护";
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.browserRedirect();
    this.getUserAdvertList();
  },
  mounted() {
    let nursWidth = this.$refs.bignurs.offsetWidth;
    let smNursWidth = this.$refs.smallnurs.offsetWidth;
    // let indexMiddleWidth = this.$refs.indexMiddle.offsetWidth;
    // this.middleHeight = indexMiddleWidth / 10;
    this.bigHeight = nursWidth / 1.25;
    this.smallHeight = smNursWidth / 2.6;
  }
};
</script>

<style scoped>
/* slides样式 */
.slider-box {
  height: 500px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
.slider-box img {
  height: 100%;
  width: auto;
}
.custom-carousel-indicators li {
  margin: 0 8px;
  border-radius: 50%;
  border: none;
  background: #fff;
  width: 15px;
  height: 15px;
}
.custom-carousel-indicators .active {
  border-radius: 50%;
  margin: 0 8px;
  width: 15px;
  height: 15px;
  background: #34b8de;
}
/* 我们的优势样式 */
.index-titlebox {
  width: 100%;
  text-align: center;
  padding: 12px 0 8px;
}
.index-titlebox h4 {
  font-size: 1.8rem;
  color: #525252;
  line-height: 2rem;
  margin: 8px 0;
}
.index-titlebox p {
  width: 50px;
  height: 2px;
  background: #34b8de;
  margin: 0 auto;
}
.content {
  padding: 12px 0;
  margin: 20px 0 30px;
}
.content li {
  margin-bottom: 20px;
}
.index-libox {
  background: #f3f7fa;
  border-radius: 4px;
}
.index-libox:hover {
  background: #34b8de;
  box-shadow: 0 0 5px rgba(52, 184, 222, 0.8);
  -webkit-box-shadow: 0 0 5px rgba(52, 184, 222, 0.8);
  -moz-box-shadow: 0 0 5px rgba(52, 184, 222, 0.8);
  -ms-box-shadow: 0 0 5px rgba(52, 184, 222, 0.8);
  -o-box-shadow: 0 0 5px rgba(52, 184, 222, 0.8);
  transform: scale(1.1);
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -o-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
.index-libox:hover .icon-box,
.index-libox:hover p {
  color: #fff;
}
.icon-box {
  color: #34b8de;
  text-align: center;
  padding: 12px 0;
}
.icon-box i {
  font-size: 6rem;
}
.index-libox p {
  text-align: center;
  color: #525252;
  line-height: 2.8rem;
  font-size: 2rem;
  padding: 8px 0 15px;
}
/* 中间banner */
.index-middle {
  height: 200px;
  background: url(./../../static/img/index/index_middle.jpg) center no-repeat;
}
.index-middle div {
  font-size: 2rem;
  color: #fff;
  line-height: 200px;
}
/* 护工介绍 */
.nurs-wokerbox {
  position: relative;
}
.nurs-wokerbox h6 {
  background: #34b8de;
  padding: 10px 8px;
  border-radius: 5px;
  /* margin-bottom: 15px; */
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
}
.nurs-wokerbox p {
  font-size: 1.4rem;
  color: #fff;
  margin: 0;
}
.nurs-ziy,
.nurs-hail,
.nurs-jiam {
  position: absolute;
  left: 30px;
  bottom: 20px;
}
.nurs-zybg {
  background: url(./../../static/img/index/index_worker01.jpg) center no-repeat;
}
.nurs-hlbg {
  background: url(./../../static/img/index/index_worker02.jpg) center no-repeat;
}
.nurs-jmbg {
  background: url(./../../static/img/index/index_worker03.jpg) center no-repeat;
}
/* 便捷入口 */
.ent-content {
  background: #edf3f5;
}
.ent-libox h3 {
  text-align: center;
  font-weight: 700;
  color: #525252;
  margin: 0;
}
.app-icon {
  color: #34b8de;
}
.wx-icon {
  color: #00994d;
}
.phone-icon {
  color: #c35251;
}
.ent-libox p {
  text-align: center;
  color: #525252;
  line-height: 2.2rem;
  font-size: 1.6rem;
  padding: 8px 0 15px;
  margin-top: 30px;
}
/* 移动端样式调节 */
@media screen and (max-width: 420px) {
  .slider-box {
    height: 300px;
  }
  /* 中间banner */
  .index-middle {
    height: 100px;
  }
  .index-middle div {
    font-size: 1.6rem;
    color: #fff;
    line-height: 100px;
  }
}
</style>
