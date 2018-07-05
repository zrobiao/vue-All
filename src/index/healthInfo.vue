<template>
  <div>
    <Header></Header>
    <section class="health-top-banner">
      <!-- <img src="../../static/img/index/HeathAbout_banner.jpg"> -->
      <div class="container about-toptt">
        <h1>健康资源</h1>
        <p>Health Resources</p>
      </div>
    </section>
    <section class="info-content">
      <!-- <div class="index-titlebox">
        <h4>我们的优势</h4>
        <p></p>
      </div> -->
      <div class="container">
        <ul class="row">
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,1)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#eccf88">&#xe602;</i>
              </div>
              <h4>体检服务</h4>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,2)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#85bcff">&#xe69f;</i>
              </div>
              <h4>电子档案</h4>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,3)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#85bcff">&#xe68e;</i>
              </div>
              <h4>国内专家</h4>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,4)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#80d855">&#xe603;</i>
              </div>
              <h4>基因测序</h4>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,5)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#80d855">&#xe621;</i>
              </div>
              <h4>国际医疗通道</h4>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12" v-on:click="go('/website/Detail',1,6)">
            <div class="info-bigbox">
              <div class="info-iconbox">
                <i class="iconfont" style="color:#f98a8a">&#xe61e;</i>
              </div>
              <h4>进口肿瘤医药指导</h4>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import router from "../router/index.js";
import Header from "./common/header.vue"
export default {
  name: "app",
  components: {
    Header
  },
  created() {
    this.$store.state.flag = 1;
    document.title = '健康资源'
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  data() {
    return {
      msg: "这里是健康资讯！"
    };
  },
  methods:{
    go: function(url, flag, data) {
      router.push({ path: url, query: { flag: flag, index:data} });
    },
  }
};
</script>

<style scoped>
.health-top-banner {
  width: 100%;
  height: 300px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../static/img/index/detailPage_banner.jpg) center no-repeat;
  background-size:auto 100%;
}
.about-toptt{
  padding:0 40px;
}
.about-toptt h1{
  font-size: 4rem;
  letter-spacing: 2px;
  font-weight: 500;
  color: #00c8ff;
  margin:50px 0 0;
}
.about-toptt p{
  font-size: 1.6rem;
  color: #00c8ff;
  padding-top:4px;
}
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
.info-content ul {
  margin: 50px 0;
}
.info-bigbox {
  width: 80%;
  margin: 0 auto 40px;
  text-align: center;
  padding: 15px;
  box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
  -webkit-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
  -moz-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
  -ms-box-shadow: 0 0 4px rgba(70, 109, 122, 0.4);
  cursor: pointer;
}
.info-bigbox:hover {
  transform: scale(1.1);
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -o-transform: scale(1.1);
  -moz-transform: scale(1.1);
}
.info-iconbox i {
  font-size: 5rem;
}
.info-bigbox h4 {
  font-size: 2.4rem;
  color: #34b8de;
  text-align: center;
  padding: 20px 0 0;
}
/* 移动端样式调节 */
@media screen and (max-width: 420px) {
.health-top-banner {
  width: 100%;
  height: 200px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../static/img/index/detailPage_banner_mb.jpg) center no-repeat;
  background-size:auto 100%;
}
.about-toptt{
  padding:0 40px;
  width: 100%;
}
.about-toptt h1{
  font-size: 3rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: #00c8ff;
  margin:50px 0 0;
}
.about-toptt p{
  font-size: 1.6rem;
  color: #00c8ff;
  padding-top:4px;
}
.info-bigbox {
  width: 100%;
  margin: 0 auto 40px;
  text-align: center;
  padding: 15px;
}
}
</style>
