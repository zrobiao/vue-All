<template>
  <div>
    <Header></Header>
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
    <section class="health-top-banner" v-if="this.$route.query.flag=='1'">
      <div class="container about-toptt">
        <h1>健康资源</h1>
        <p>Health Resources</p>
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
            <a :href="'https://'+webAddr">{{webAddr}}</a>
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
    <div class="container detail-content" v-if="this.$route.query.flag=='1'">
      <ul class="row" v-if="this.$route.query.index=='1'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">体检服务</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>用户成为快康公司会员后，公司将为会员联系对接体检中心，提供体检服务 并享受会员体检价格，同等体检项目降幅在 10%-50%之间，具体降幅根据当时情 况和市场动态情况而定。</div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
      <ul class="row" v-if="this.$route.query.index=='2'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">电子档案</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>用户成为快康公司会员后，快康公司将为会员建立电子健康档案。</div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
      <ul class="row" v-if="this.$route.query.index=='3'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">国内专家</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病，可申请国 内专家二次会诊服务。会员可拨打快康公司客服电话，快康公司通知会员收集会 诊所需的资料，并根据会员的病情，推荐会诊专家供会员选择，最多提供 3 位。</div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
      <ul class="row" v-if="this.$route.query.index=='4'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">基因测序</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>内容:无</div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
      <ul class="row" v-if="this.$route.query.index=='5'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">国际医疗通道</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>(1). 如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病中的一 种或多种，会员可以拨打快康公司的客服电话，寻求国际医疗服务，快康公司的 客服人员将核对会员的信息，如在服务期内并且符合会员资格要求，快康公司将 收集会员的病历资料。</br>
      </br>(2). 如会员资格未通过审核，公司将告知会员暂时不享用此项服务。</br>
      </br>(3). 在收到完整资料后，通过和会员沟通确认后，安排会员海外就医。</br>
      </br>(4). 海外就医应不可享用国内医疗报销服务，全程服务均为自费。快康公司将 会提醒会员认识并理解该情况，并愿意承担及有能力承担由快康公司提供的海外 就医服务。</div>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12 text-right">
          <h6 style="margin:50px 0;color:#34b8de;font-size:1.6rem;" v-on:click="go">返回上一页</h6>
        </li>
      </ul>
      <ul class="row" v-if="this.$route.query.index=='6'">
        <li class="col-lg-12 col-md-12 col-xs-12 text-center">
          <h3 style="margin:20px 0;font-size:24px;font-weight:700;">进口肿瘤医药指导</h3>
        </li>
        <li class="col-lg-12 col-md-12 col-xs-12">
          <div>(1). 如会员在服务有效期内经初步诊断罹患会员合同规定的重大疾病中的恶 性肿瘤疾病，会员可拨打快康公司客服电话寻求肿瘤药品使用指导，快康公司的 客服人员将核对会员的信息，如通过审核，将由快康公司的签约医生或合作平台 提供专业的肿瘤药品使用指导。 </br>
      </br>(2). 会员如果通过公司审核初步罹患恶性肿瘤，公司将为会员提供进口抗肿瘤 药品，提供肿瘤药品价格均比医院提供价格略低，降幅在 10%—50%之间，具体 降幅根据当时治疗情况和市场动态情况而定。</div>
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
import Header from "./header.vue"
export default {
  data() {
    return {
      consultDetail: [],
      jobData: {},
      webAddr:window.location.host
    };
  },
  components:{Header},
  created() {
    this.$store.state.flag = this.$route.query.flag;
    document.title = "详细信息";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (this.$route.query.flag == "3") {
      this.getJobDetail();
    } else if(this.$route.query.flag == "2"){
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
/* 这里显示健康资讯 */
.health-top-banner {
  width: 100%;
  height: 300px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../../static/img/index/detailPage_banner.jpg) center no-repeat;
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
/* 这里显示健康资讯 */
.health-top-banner {
  width: 100%;
  height: 200px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../../static/img/index/detailPage_banner_mb.jpg) center no-repeat;
  background-size:auto 100%;
}
}
</style>


