<template>
  <div class="info">
    <v-header></v-header>
    <mt-cell-swipe to="/customer/healthconsultationDetails" title="如何防范于未然" :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('删除')
    }
  ]"></mt-cell-swipe>
    <mt-cell-swipe to="/customer/healthconsultationDetails" title="如何防范于未然" :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => this.$messagebox('删除')
    }
  ]"></mt-cell-swipe>
    <mt-cell-swipe title="如何防范于未然" to="/customer/healthconsultationDetails" :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => {
      	this.$messagebox('删除')
      }
    }
  ]"></mt-cell-swipe>
  </div>
</template>
<script>
import vHeader from "./../common/Header.vue";
import { Cell, CellSwipe } from "mint-ui";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
  },
  components: {
    vHeader,
    CellSwipe,
    Cell
  },
  methods: {},
  mounted: function() {
    //加载完成后执行
  }
};
</script>
<style>
.info {
  margin-top: 4rem;
}
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
</style>