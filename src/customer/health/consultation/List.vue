<template>
  <div class="healthConsultationList">
    <v-header></v-header>
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索你想要的"></mt-search>
    <loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for="(item,index) in consultItems" v-if="!isHave">
        <div class="list" v-on:click='go("/customer/healthconsultationDetails",item.systemID)'>
          <div class="left">
            <img :src="item.coverImg">
          </div>
          <div class="mian">
            <h3>{{item.title}}</h3>
            <p>{{item.releaseTime.split(' ')[0]}}</p>
          </div>
          <div class="read">阅读：{{item.pageviews}}</div>
        </div>
      </div>
    </loadmore>
    <div class="no-data" v-if="isHave">
      <i class="iconfont">&#xe649;</i>
      {{noData}}
    </div>
  </div>
</template>
<script>
import router from "./../../../router";
import util from "./../../../js/util/util.js";
import vHeader from "./../../common/Header.vue";
import { Cell, CellSwipe, Search, Loadmore, Toast } from "mint-ui";
export default {
  data() {
    return {
      value: "",
      consultItems: [],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      Page: 1,
      Limit: 10,
      noData: "",
      isHave: false
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
    this.getMsgList(); //获取咨询信息列表
  },
  components: {
    vHeader,
    Search,
    CellSwipe,
    Cell,
    Loadmore
  },
  methods: {
    go: function(url, consultId) {
      util.pushRouter(router, url, { consultId: consultId });
      util.Ajax(
        "/api/sysConsult/sendUserConsultRead?_method=POST",
        { id: consultId },
        function(data) {}
      );
    },
    getMsgList: function() {
      let $this = this;
      let _params = {
        page: $this.Page,
        limit: $this.Limit
      };
      util.Ajax("/api/sysConsult/customerList?_method=POST", _params, function(
        data
      ) {
        var consultData = data.data;
        console.log(consultData)
        var consult = consultData.data;
        if (!consult || consult.length == 0) {
          $this.allLoaded = true; // 若数据已全部获取完毕
          $this.$refs.loadmore.onBottomLoaded();
          $this.isHave = true;
          $this.noData = "暂时还没有资讯信息！";
        } else {
          for (var i in consult) {
            // let newUrl = $this.WorkerIconChange(consult[i].coverImg);
            // consult[i].coverImg = newUrl;
            consult[i].coverImg = $this.$store.state.consultUrl+consult[i].coverImg;
            $this.consultItems.push(consult[i]);
          }
          $this.allLoaded = $this.consultItems.length >= consultData.countNum; // 若数据已全部获取完毕
          if ($this.allLoaded) {
            Toast("数据已经加载完毕！");
          }
         
        }
      });
    },
    loadTop(id) {
      //下拉刷新
      //下拉加载
      this.consultItems = [];
      this.Page = 1;
      this.getMsgList();
      console.log(this);
      this.$refs.loadmore.onTopLoaded(id); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom(id) {
      //上拉加载更多数据
      this.Page += 1;
      this.getMsgList(); // 加载更多数据
      this.$refs.loadmore.onBottomLoaded();
    },
    translateChange(translate) {
      //console.log(translate);
    },
    handleTopChange(status) {
      // console.log(status)
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
.healthConsultationList {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding-top: 4rem;
  height: 100%;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}
.healthConsultationList .mint-search {
  height: 50px;
}
.healthConsultationList .list {
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.healthConsultationList .list .left {
  width: 100px;
  height: 80px;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.healthConsultationList .list .left img {
  height: 100%;
  width: auto;
}
.healthConsultationList .list .mian {
  padding: 0.5rem;
  width: 70%;
}
.healthConsultationList .list .mian h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.healthConsultationList .list .mian p {
  font-size: 12px;
  padding-top: 24px;
}
.healthConsultationList .read {
  position: absolute;
  bottom: 0.5rem;
  font-size: 12px;
  right: 1rem;
  width:70px;
  text-align: left;
}
</style>