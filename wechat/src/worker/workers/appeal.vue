<template>
	<div class="appeal">
		<v-header></v-header>
	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell } from 'mint-ui'
import util from './../../js/util/util.js'
export default {
  data() {
    return {
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
  }
}
</script>
<style>
</style>