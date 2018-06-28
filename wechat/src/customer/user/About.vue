<template>
	<div class="About">
		<v-header></v-header>
		<!-- <div class="about-con">
			<h2>基本信息</h2>
			<h3>公司名称：深圳市快康网络技术有限公司</h3>
			<h3>公司地址：贵阳市云岩区百灵阳光1单元3004</h3>
			<h3>服务热线：96028</h3>
			<h2>公司介绍</h2>
			<p>深圳市快康网络技术有限公司是一家基于互联网的护理服务公司。通过互联网改变传统护理行业运营模式，使用户能够享受到更贴心的护理服务。</p>
			<p>commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
			<img src="/static/img/updata/slide/about.png">
			<h2>加入我们</h2>
			<table class="table-box">
				<tr>
					<td>护工</td>
					<td>10人</td>
					<td>3000底薪+住宿 </td>
				</tr>
				<tr>
					<td>销售</td>
					<td>10人</td>
					<td>5000底薪+住宿 </td>
				</tr>
				<tr>
					<td>策划</td>
					<td>10人</td>
					<td>5000+ </td>
				</tr>
			</table>
		</div> -->
    <div class="about-con">
      <h2>{{aboutDetail.title}}</h2>
      <div v-html="aboutDetail.content"></div>
    </div>
	</div>
</template>
<script>
import vHeader from "./../common/Header.vue";
import { Cell } from "mint-ui";
import util from "../../js/util/util";
export default {
  data() {
    return {
      aboutDetail: {}
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
    this.getAboutContent();
  },
  components: {
    vHeader,
    Cell
  },
  methods: {
    getAboutContent: function() {
      let $this = this;
      util.Ajax("/api/agreement/queryAboutUS?_method=GET", {}, function(
        data
      ) {
        var consultData = data.data;
        $this.aboutDetail = consultData.data;
        console.log($this.aboutDetail);
      });
    }
  },
  mounted: function() {
    //加载完成后执行
    //
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
.About {
  margin-top: 4rem;
  background: #fff;
}
.About .about-con {
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
.About .about-con h2 {
  font-size: 1.4rem;
  margin: 0.5rem 0;
  font-weight: 700;
  text-align: center;
}
.About .about-con h3 {
  font-size: 1.2rem;
  line-height: 27px;
}
.About .about-con p {
  text-indent: 1rem;
  line-height: 17px;
}
.About .table-box {
  font-size: 1.4rem;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
}
</style>