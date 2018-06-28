<template>
  <div class="head">
  	  <div class="left" v-on:click="go"><i class="iconfont">&#xe61a;</i></div>
  	  <h1>{{$store.state.headings}}</h1>
  </div>
</template>
<script>
import router from './../../router';
export default {
		data() {
			return {
			}
		},
		methods: {
			go: function() { //处理返回信息
		    router.go(-1); //返回上一页
		  }
	 }
}
</script>
<style>
	.head{ width: 100%; height:4rem; line-height:4rem; z-index: 999; position:fixed; top:0; left: 0; margin: 0 auto;background:#94ca52; text-align: center; font-size: 14px;}
	.head h1{font-size:1.3rem; width: 100%; color: #fff;}
	.head .left{position: absolute; top:0;left:1rem; color: #fff;}
	.head .left i{font-size:1.4rem;}
</style>
