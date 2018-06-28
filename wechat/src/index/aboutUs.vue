<template>
  <div>
    <section class="about-top-banner">
      <div class="container about-toptt">
        <h1>关于我们</h1>
        <p>About Us</p>
      </div>
    </section>
    <section class="about-infocontent">
      <div class="index-titlebox">
        <h4>公司介绍</h4>
        <p></p>
      </div>
      <div class="container about-infobox">
        <p>深圳市快康网络技术有限公司成立于2016年初，是全国最早从事护理行业互联网+的公司之一。<br>公司自主打造的“好陪护”平台旨在对客户提供更便捷、更舒适、更贴心、更专业的护理服务。同时，公司给加盟护工提供职业培训以及更好的工作机会。</p>
        <div class="about-imgbanner">
          <img src="../../static/img/index/aboutUs_middle.jpg" class="img-responsive" v-if="!mobileTrue">
          <img src="../../static/img/index/aboutUs_middle_mb.jpg" class="img-responsive" v-if="mobileTrue">
        </div>
      </div>
    </section>
    <section class="about-cultruebox">
      <div class="index-titlebox">
        <h4>公司文化、价值观</h4>
        <p></p>
      </div>
      <div class="container">
        <ul class="row about-cultrue">
          <li class="col-lg-3 col-md-3 col-xs-12 c-number">
            <div class="about-liimgbox">
              <i class="iconfont">&#xe6a7;</i>
            </div>
            <h5>价值观</h5>
            <p>好陪护，陪护好！公司致力于打造开放的“好陪护”服务平台，给用户提供最优质的护理服务；保障护工群体利益，提升护工群体价值及社会认同感。</p>
          </li>
          <li class="col-lg-3 col-md-3 col-xs-12 e-number">
            <h5>愿景</h5>
            <p>老龄化正在成为我国社会主特征之一，公司提供专业的培训，帮助从业人员取得从业资格，致力于树立行业规范，缓解社会家庭压力，为公共卫生事业做出有效的贡献。</p>
            <div class="about-liimgbox">
              <i class="iconfont">&#xe6a8;</i>
            </div>
          </li>
          <li class="col-lg-3 col-md-3 col-xs-12 c-number">
            <div class="about-liimgbox">
              <i class="iconfont">&#xe6a9;</i>
            </div>
            <h5>宗旨</h5>
            <p>护理员需要始终秉承“正直真诚、关爱尊重、凝聚合作、奉献社会”的服务宗旨。</p>
          </li>
          <li class="col-lg-3 col-md-3 col-xs-12 e-number">
            <h5>理念</h5>
            <p>坚持以病人为中心的“精诚、精心、精业”的“三精”护理服务理念。</p>
            <div class="about-liimgbox">
              <i class="iconfont">&#xe6aa;</i>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="about-jobcontent">
      <div class="index-titlebox">
        <h4>招聘信息</h4>
        <p></p>
      </div>
      <div class="container">
        <ul class="row" style="margin:30px 0;">
          <li class="col-lg-4 col-md-4 col-xs-12">
            <!-- <div class="job-box">
              <h5>加盟护工</h5>
              <div class="job-txtbox">
                <p>地点：贵州贵阳</p>
                <button type="button" v-on:click="go('/infoList/Detail',3,1)">加入我们</button>
              </div>
            </div> -->
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12">
            <div class="job-box">
              <h5>{{jobData.title}}</h5>
              <div class="job-txtbox">
                <!-- <p>地点：贵州贵阳</p> -->
                <button type="button" v-on:click="go('/website/Detail',3)">加入我们</button>
              </div>
            </div>
          </li>
          <li class="col-lg-4 col-md-4 col-xs-12">
            <!-- <div class="job-box">
              <h5>加盟护工</h5>
              <div class="job-txtbox">
                <p>地点：贵州贵阳</p>
                <button type="button" v-on:click="go('/website/Detail',3,3)">加入我们</button>
              </div>
            </div> -->
          </li>
          <!-- <li class="col-lg-12 col-md-12 col-xs-12">
            <p class="about-joblink">如果你有更多疑问请投递&nbsp;<a>1109993204@qq.com</a>&nbsp;了解更多</p>
          </li> -->
        </ul>
      </div>
    </section>
    <section class="about-linkus">
      <div class="index-titlebox">
        <h4>联系我们</h4>
        <p></p>
      </div>
      <div class="container">
        <ul class="row">
          <li class="col-lg-6 col-md-6 col-xs-12 text-center">
            <h4 class="about-linkh4">
              <i class="iconfont">&#xe635;</i>客服电话</h4>
            <p class="about-linkp">
              <span>96028</span>转
              <span>2</span>
            </p>
            <p class="about-linkp1">7*24小时在线</p>
          </li>
          <li class="col-lg-6 col-md-6 col-xs-12 text-center">
            <h4 class="about-linkh4">
              <i class="iconfont">&#xe629;</i>公司电话</h4>
            <p class="about-linkp">
              <span>0851-86762587</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import router from '../router/index.js'
import util from "./../js/util/util.js";
export default {
  name: "app",
  components: {},
  created(){
    this.$store.state.flag = 3;
    document.title = '关于我们'
    this.getJobDetail()
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    let bodyWidth = document.documentElement.clientWidth
    console.log(bodyWidth)
    if (bodyWidth <= 720) {
      this.mobileTrue = true
    }else{
      this.mobileTrue = false
    }
  },
  data() {
    return {
      msg: "这里是关于我们",
      jobData:{},
      mobileTrue:false
    };
  },
  methods:{
    go:function(url,flag,data){
      router.push({ path: url, query: {flag:flag,id:data}})
    },
    getJobDetail:function(){
      let $this = this;
      util.Ajax("/api/agreement/queryEcruitInfo?_method=GET", {}, function(
        data
      ) {
        $this.jobData = data.data.data
        console.log($this.jobData)
      })
    },
  }
};
</script>

<style scoped>
.about-top-banner {
  width: 100%;
  height: 300px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../static/img/index/aboutUs_banner.jpg) center no-repeat;
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
/* 标题样式 */
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
/* 公司介绍 */
.about-infobox {
  margin: 0 auto 30px;
}
.about-infobox p {
  font-size: 1.4rem;
  line-height: 2rem;
  text-align: center;
  padding: 10px 0;
}
/* 公司文化、价值观 */
.about-cultrue {
  margin: 30px 0;
}
.about-cultrue li {
  padding: 15px 30px;
  margin-bottom: 15px;
}
.about-cultrue li p {
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.8rem;
  text-align: center;
  height: 100px;
}
.about-cultrue li h5 {
  font-size: 2.2rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  padding:8px 0;
}
.about-liimgbox {
  text-align: center;
}
.about-liimgbox i {
  font-size: 8rem;
  font-weight: 500;
  color: #fff;
}
.c-number {
  background: #6fc6de;
}
.e-number {
  background: #34b8de;
}
/* 招聘信息 */
.about-jobcontent {
  background: #edf3f5;
}
.job-box {
  width: 80%;
  margin: 12px auto;
  background: #fff;
  padding: 12px;
}
.job-box:hover{
  box-shadow: 0 0 8px rgba(70, 109, 122, 0.4);
  -webkit-box-shadow: 0 0 8px rgba(70, 109, 122, 0.4);
  -moz-box-shadow: 0 0 8px rgba(70, 109, 122, 0.4);
  -ms-box-shadow: 0 0 8px rgba(70, 109, 122, 0.4);
  border-radius: 4px;
}
.job-box h5 {
  font-size: 2rem;
  padding: 12px 0 15px 10px;
  border-bottom: solid 1px #edf3f5;
  margin:0;
  text-align: center;
}
.job-txtbox {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-content: center;
  padding-top:20px;
}
.job-txtbox p{
 margin-bottom: 0;
 line-height: 34px;
 font-size: 1.4rem;
}
.job-txtbox button{
 border:none;
 background: #34b8de;
 border-radius: 4px;
 padding:0 12px;
 color:#fff;
 line-height: 34px;
 text-align: center;
}
.about-joblink{
  margin:50px 0;
  text-align: center;
  font-size: 1,4rem;
}
/* 联系我们 */
.about-linkus li{
  margin:50px 0;
}
.about-linkh4{
  font-size: 2.4rem;
  color:#525252;
  font-weight: 700;
}
.about-linkh4 i{
  padding-right:10px;
  font-size: 2.8rem;
  color:#525252;
  font-weight: 700;
}
.about-linkp{
  font-size: 1.6rem;
  color:#525252;
}
.about-linkp span{
  font-size: 2.2rem;
  color:#ff4e00;
  padding:0 6px;
}
/* 移动端样式调节 */
@media screen and (max-width: 420px) {
.about-top-banner {
  width: 100%;
  height: 200px;
  display:flex;
  display:-webkit-flex;
  background: url(./../../static/img/index/aboutUs_banner_mb.jpg) center no-repeat;
  background-size:auto 100%;
}
.about-toptt{
  padding:0 40px;
  width: 100%;
}
.about-toptt h1{
  font-size: 3rem;
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
.about-cultrue li {
  padding: 15px;
  margin-bottom: 15px;
}
.about-cultrue li p {
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.8rem;
  text-align: center;
  height: auto;
}
}
</style>
