<template>
	<div class="history">
		<v-header></v-header>
		<div class="list" v-for="(item,index) in items" v-if="!isShow">
			<div class="title">订单编码：{{item.tradeNum}}</div>
			<div class="line" v-if="item.startDate!=null && item.endDate!=null">
				<h3>服务时间</h3>
				<p>{{item.startDate.substring(0,10)}}至 {{item.endDate.substring(0,10)}}</p>
			</div>
			<div class="line" v-if="item.hospital!=null">
				<h3>服务医院</h3>
				<p>{{item.hospital.name}}</p>
			</div>
			<div class="line">
				<h3>综合评价</h3>
				<p>
					<label style="color:red;font:blod;">态度:</label>{{item.orderRating!=null?item.orderRating.ratingAttitude:"未评价"}}星
					<span></span>
					<label style="color:red;font:blod;">技能:</label>{{item.orderRating!=null?item.orderRating.ratingSkill:"未评价"}}星
					<span></span>
					<label style="color:red;font:blod;">评论:</label>{{item.orderRating!=null?item.orderRating.comment:"暂无"}}
					<span></span>
				</p>
			</div>
		</div>

		<div class="no-data" v-if="isShow">
			<i class="iconfont">&#xe649;</i>
			{{noData}}
		</div>

	</div>
</template>
<script>
import vHeader from "./../common/Header.vue";
import router from "./../../router";
import util from "./../../js/util/util.js";
import { Cell } from "mint-ui";
export default {
  data() {
    return {
      isShow: false,
      items: [],
      noData: "没有历史服务数据"
    };
  },
  created() {
    this.$store.state.isFooterShow = false; //显示底部导航
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    document.title = "我的历史订单";
  },
  components: {
    vHeader,
    Cell
  },
  methods: {},
  mounted: function() {
    let $this = this;
    let workId = this.$route.query.workId;
    util.Ajax("/api/work/history?_method=GET", { workId: workId }, function(
      data
    ) {
      if (data.data.length > 0) {
        $this.items = data.data;
      } else {
        $this.isShow = true;
      }
    });
  }
};
</script>
<style type="text/css" scoped="scoped">
.history {
  margin-top: 4.5rem;
  position: relative;
}
.history .list {
  width: 99%;
  margin: 0.5rem auto;
  box-sizing: border-box;
  border: 1px solid #eee;
  box-shadow: 0 0 10px 5px #eee;
  background-color: #fff;
}
.history .list h3 {
  font-size: 1.3rem;
  width: 25%;
  color: #00cc66;
  margin: 0.5rem;
  box-sizing: border-box;
  height: 2rem;
  line-height: 2rem;
}
.history .list p {
  padding: 0.5rem;
  font-size: 1.2rem;
  overflow: hidden;
  width: 75%;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 2rem;
  line-height: 2rem;
}
.history .title {
  background: #94ca52;
  color: #fff;
  text-align: left;
  font-size: 1.4rem;
  padding: 0.5rem;
  box-sizing: border-box;
}
.history .mt-button {
  margin: 0 auto 1rem;
  display: block;
}
.history .line {
  display: flex;
}
</style>