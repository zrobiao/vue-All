<template>
  <div>
    <!-- <section class="top-banner">
      <img src="../../../static/img/index/detailPage_banner.jpg" v-if="this.$route.query.flag=='2'">
      <img src="../../../static/img/index/aboutUs_banner.jpg" v-if="this.$route.query.flag=='3'">
    </section> -->
    <section class="about-top-banner" v-if="this.$route.query.flag=='3'">
      <div class="container about-toptt">
        <h1>关于我们</h1>
        <p>About Us</p>
      </div>
    </section>
    <section class="infolist-top-banner" v-if="this.$route.query.flag=='2'">
      <div class="container about-toptt">
        <h1>快康资讯</h1>
        <p>Kuaik Information</p>
      </div>
    </section>
    <div class="container detail-content" v-if="this.$route.query.flag=='2'">
      <ul class="row">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">{{consultDetail.title}}</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <p class="col-lg-6 col-md-6 col-xs-6 text-left">发布时间：{{consultDetail.releaseTime.split(' ')[0]}}</p>
          <p class="col-lg-6 col-md-6 col-xs-6 text-right">文章来源：
            <a href="www.kkpeihu.com">www.kkpeihu.com</a>
          </p>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div v-html="consultDetail.content"></div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
    </div>
    <div class="container detail-content" v-if="this.$route.query.flag=='3'">
      <ul class="row">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">{{jobData.title}}</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div v-html="jobData.content"></div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import router from "../../router/index.js";
import util from "./../../js/util/util.js";
export default {
  data() {
    return {
      consultDetail: [],
      jobData: {}
    };
  },
  created() {
    this.$store.state.flag = this.$route.query.flag;
    document.title = "详细信息";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (this.$route.query.flag == "3") {
      this.getJobDetail();
    } else {
      this.getDetailList();
    }
  },
  methods: {
    go: function() {
      router.go(-1);
    },
    getDetailList: function(params) {
      let $this = this;
      let itemId = this.$route.query.id;
      let _params = {
        id: itemId
      };
      util.Ajax(
        "/api/sysConsult/getHomeConsultInfo?_method=POST",
        _params,
        function(data) {
          console.log(data);
          var consultData = data.data;
          $this.consultDetail = consultData.data;
        }
      );
    },
    getJobDetail: function() {
      let $this = this;
      util.Ajax("/api/agreement/queryEcruitInfo?_method=GET", {}, function(
        data
      ) {
        $this.jobData = data.data.data;
        console.log($this.jobData);
      });
    }
  }
};
</script>
<style scoped>
/*  这里显示快康资讯 */
.infolist-top-banner {
  width: 100%;
  height: 300px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../../static/img/index/detailPage_banner.jpg) center no-repeat;
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
/*  这里显示关于我们资讯 */
.about-top-banner {
  width: 100%;
  height: 300px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../../static/img/index/aboutUs_banner.jpg) center no-repeat;
  background-size:auto 100%;
}
.detail-content h6 {
  margin: 50px 0;
  color: #34b8de;
  font-size: 1.6rem;
  cursor: pointer;
}
@media screen and (max-width: 420px) {
  /* 这里显示关于我们banner */
  .about-top-banner {
    width: 100%;
    height: 200px;
    background: url(./../../../static/img/index/aboutUs_banner_mb.jpg) center no-repeat;
  }
  .about-toptt {
    padding: 0 40px;
    width: 100%;
  }
  .about-toptt h1 {
    font-size: 3rem;
    font-weight: 500;
    color: #00c8ff;
    margin: 50px 0 0;
  }
  .about-toptt p {
    font-size: 1.6rem;
    color: #00c8ff;
    padding-top: 4px;
  }
  /* 这里显示健康资源banner */
  .infolist-top-banner {
  width: 100%;
  height: 200px;
  background: url(./../../../static/img/index/detailPage_banner_mb.jpg) center no-repeat;
}
}
</style>


