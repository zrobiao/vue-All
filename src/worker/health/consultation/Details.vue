<template>
  <div class="healthConsultationDetails">
    <v-header></v-header>
    <h3>{{msg.title}}</h3>
    <div class="h-title">
      <span class="fl" v-if="msg.releaseTime">发布日期：{{msg.releaseTime.substring(0,10)}}</span>
      <span>阅读数:{{msg.pageviews}}</span>
    </div>
    <dl v-html="msg.content">
      {{msg.content}}
    </dl>
  </div>
</template>
<script>
import vHeader from './../../common/Header.vue'
import { Cell, CellSwipe } from 'mint-ui'
import util from './../../../js/util/util.js'
export default {
  data() {
    return {
      msg: []
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    CellSwipe,
    Cell
  },
  methods: {},
  mounted: function() {
    //加载完成后执行
    let $this = this
    let id = this.$route.query.systemID
    util.Ajax(
      '/api/sysConsult/getWorkerConsultInfo?_method=POST',
      { id: id },
      function(data) {
        console.log(data.data.data)
        $this.msg = data.data.data
      }
    )
    util.Ajax(
      '/api/sysConsult/sendWorkerConsultRead?_method=POST',
      { id: id },
      function(data) {
        console.log('记录id'+id)
        console.log(data.data)
        //substring
      }
    )
  }
}
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
  text-align: center;
  padding-bottom: 0.3rem;
}
.healthConsultationDetails p {
  font-size: 1.2rem;
  line-height: 20px;
  text-indent: 2rem;
  text-align: justify;
}
</style>