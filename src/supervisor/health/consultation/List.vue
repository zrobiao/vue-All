<template>
    <div class="healthConsultationList">
       <v-header></v-header>
       <mt-search v-model="value" cancel-text="取消" placeholder="搜索你想要的"></mt-search>
       <div class="list" v-on:click='go("/customer/healthconsultationDetails")'>
	    	<div class="left"><img src="/static/img/css/common/col_cover_2.jpg"></div>
	    	<div class="mian">
	    		<h3>标题</h3>
	    		<p>2017-10-17</p>
	    	</div>
	    	<div class="read">阅读：5872</div>
		</div>
		<div class="list" v-on:click='go("/customer/healthconsultationDetails")'>
	    	<div class="left"><img src="/static/img/css/common/col_cover_2.jpg"></div>
	    	<div class="mian">
	    		<h3>标题</h3>
	    		<p>2017-10-17</p>
	    	</div>
	    	<div class="read">阅读：5872</div>
		</div>
    </div>
</template>
<script>
	import router from './../../../router';
    import util from './../../../js/util/util.js';
    import vHeader from './../../common/Header.vue';
    import{Cell,CellSwipe,Search } from 'mint-ui';
    export default {
    	data(){
    		return {
    		  value:''
    		}
    	},
    	created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Search,
            CellSwipe,
            Cell
        },
       methods: {
	       go:function(url){
	       	 	console.log(url)
      	      util.pushRouter(router,url,{})
	       }
      },mounted: function () { //加载完成后执行
            
      }
    }
</script>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.healthConsultationList{position: absolute;top:0;left: 0; bottom: 0; right: 0; box-sizing: border-box;padding-top: 4rem; height: 100%; background: #fff;}
	.healthConsultationList .mint-search{height:50px;}
	.healthConsultationList .list{ position: relative; display: flex; width: 100%; box-sizing: border-box; border-bottom:1px solid #eee;}
	.healthConsultationList .list .left{ width: 30%; box-sizing: border-box; padding:0.5rem;}
	.healthConsultationList .list .left img{height:60px;}
	.healthConsultationList .list .mian{padding:0.5rem;}
	.healthConsultationList .list .mian h3{font-size: 1.4rem; margin-bottom:1rem;}
	.healthConsultationList .read{position: absolute;bottom:1.25rem; right: 1rem;}
</style>