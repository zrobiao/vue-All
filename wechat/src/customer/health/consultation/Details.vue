<template>
  <div class="healthConsultationDetails">
    <v-header></v-header>
    <h3>{{consultDetail.title}}</h3>
    <div class="h-title">
      <p>发布：{{TimeShow}}</p>
      <p>阅读：{{consultDetail.pageviews}}</p>
      <p class="collectbtn" @click="collectCurrent">
        <i class="iconfont fr blue">&#xe625;</i>
      </p>
    </div>
    <!-- <div>{{{consultDetail.content}}}</div> -->
    <div class="health-content" v-html="consultDetail.content"></div>
  </div>
</template>
<script>
import vHeader from "./../../common/Header.vue";
import { Cell, CellSwipe, Toast } from "mint-ui";
import util from "./../../../js/util/util.js";
export default {
  data() {
    return {
      consultDetail: {}
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
    this.getListDetail();
  },
  components: {
    vHeader,
    CellSwipe,
    Cell,
    Toast
  },
  methods: {
    getListDetail: function() {
      let $this = this;
      let itemId = this.$route.query.consultId;
      let _params = {
        id: itemId
      };
      util.Ajax(
        "/api/sysConsult/getUserConsultInfo?_method=POST",
        _params,
        function(data) {
          var consultData = data.data;
          $this.consultDetail = consultData.data;
        }
      );
    },
    collectCurrent: function() {
      let collectId = this.$route.query.consultId;
      util.Ajax(
        "/api/sysConsult/sendUserConsultCollect?_method=POST",
        { id: collectId },
        function(data) {
          Toast("收藏成功！");
        }
      );
    }
  },
  computed: {
    TimeShow: function() {
      return (this.consultDetail.releaseTime).split(" ")[0];
    }
  },
  mounted: function() {
    //加载完成后执行
  }
};
</script>
<style scoped="scoped">
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
.healthConsultationDetails {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 4rem;
  height: 100%;
  background: #fff;
}
.healthConsultationDetails h3 {
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem;
  font-weight: 700;
}
.healthConsultationDetails .h-title {
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.healthConsultationDetails .h-title p {
  padding: 8px 0;
  font-size: 1rem;
}
.healthConsultationDetails .h-title .collectbtn {
  padding: 8px 0 8px 12px;
  font-size: 1.2rem;
}
.healthConsultationDetails .health-content{
  padding-bottom:40px;
}
.healthConsultationDetails .health-content p {
  font-size: 1.2rem;
  line-height: 20px;
}
</style>