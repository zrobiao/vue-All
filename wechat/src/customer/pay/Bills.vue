<template>
  <div class="Bills">
    <v-header></v-header>
    <table class="table">
      <tr>
        <td>时间</td>
        <td>金额</td>
        <td>详细</td>
      </tr>
      <tr v-for="item in curData">
        <td>{{item.date}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.msg}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell } from 'mint-ui'
import util from './../../js/util/util.js'
export default {
  data() {
    return {
      curData:[]
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    Cell
  },
  mounted: function() {
    let $this=this
    let workId = this.$store.state.workId
    //加载完成后执行
    util.Ajax('api/work/bill/' + 79 + '?_method=GET', {}, function(data) {
      console.log(data.data)
      $this.curData=data.data
    })
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
.Bills {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  height: 100%;
  width: 100%;
  padding-top: 4rem;
}
.Bills .table {
  width: 98%;
  margin: 1rem auto;
}
.Bills .table {
  border: 1px solid #ccc;
  text-align: center;
}
.Bills .table td {
  border: 1px solid #ccc;
  padding: 0.5rem 0;
}
</style>