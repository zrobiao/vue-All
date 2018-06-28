<template>
	<div class="Health">
			<mt-swipe :auto="4000" style="height: 100px;">
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u23.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		</mt-swipe>
		<div class="Healthtitle"><i class="iconfont navigation">&#xe633;</i>医院向导：贵州省第一人民医院
		  <i class="iconfont" v-on:click='go("/customer/hospital")'>&#xe62d;</i>
		</div>
		
		<div class="list-con">
			<div class="list-box" v-on:click='go("/customer/healthConsultation")'> 
				<p><i class="iconfont red">&#xe615;</i></p>
				<p>远程医疗</p>
			</div>
				<div class="list-box"> 
				<p><i class="iconfont">&#xe619;</i></p>
				<p>进口肿瘤医药</p>
			</div>
				<div class="list-box"> 
				<p><i class="iconfont">&#xe633;</i></p>
				<p>专家会诊</p>
			</div>
				<div class="list-box"> 
				<p><i class="iconfont purple">&#xe633;</i></p>
				<p>优惠体检</p>
			</div>
			<div class="list-box"> 
				<p><i class="iconfont red">&#xe639;</i></p>
				<p>电子档案</p>
			</div>
			<div class="list-box"> 
				<p><i class="iconfont red">&#xe633;</i></p>
				<p>住院安排</p>
			</div>
			<div class="list-box"> 
				<p><i class="iconfont">&#xe61c;</i></p>
				<p>基因测序</p>
			</div>
			<div class="list-box"> 
				<p><i class="iconfont purple">&#xe631;</i></p>
				<p>手术安排</p>
			</div>
		</div>
		
		<div class="info">
			<div class="ti"><i class="iconfont icon">&#xe61c;</i>资讯
			 <i class="iconfont right" v-on:click='go("/customer/healthconsultationList")'>&#xe65b;</i>
			</div>
			<ul>
				<li v-on:click='go("/customer/healthconsultationDetails")'><a>如何防范于未然</a></li>
				<li v-on:click='go("/customer/healthconsultationDetails")'><a>如何防范于未然</a></li>
				<li v-on:click='go("/customer/healthconsultationDetails")'><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
				<li><a>如何防范于未然</a></li>
			</ul>
		</div>
		
	</div>
</template>

<script>
import router from './../../router';
import util from './../../js/util/util.js';
import{Swipe, SwipeItem,DatetimePicker  } from 'mint-ui';
export default {
    data () {
      return {
      	
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
      created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=1;
    		  document.title="健康资源"
    },
    methods: {
      go:function(url){
      	util.pushRouter(router,url,{})
      }
    }
  }
</script>
<style type="text/css" scoped="scoped">
	.Health{background-color: #fff; margin-bottom:4.5rem; padding-bottom:0.5rem;}
	.Health .Healthtitle{width: 96%; height: 40px; line-height:40px;box-sizing: border-box; margin:1rem auto; background-color: #00CC66; border-radius: 5px; color: #fff; font-size: 1.4rem;}
    .Health .Healthtitle .navigation{font-size: 2rem; padding:0 0.5rem 0 1rem;}
    .Health .list-con{width:96%; margin: 0 auto; display: block; overflow: hidden;}
    .Health .list-con .list-box{width: 25%; text-align: center; float: left; padding:0;}
    .Health .list-con .list-box p{overflow: hidden; padding: 1rem 0;}
    .Health .list-con .list-box .iconfont{font-size: 1.6rem; background: #00C1DE; padding: 1rem; color: #fff; border-radius:2px;}
    .Health .list-con .list-box .red{background:#df5000;}
    .Health .list-con .list-box .purple{background:#a71d5d;}
    .Health .info{width:96%; margin:0 auto;background-color: #eee; border-radius:10px; display: block; }
    .Health .info .ti{font-size: 1.2rem;border-bottom: 1px solid #fff; padding:1rem 0;position: relative; padding-left:4rem;}
    .Health .info .icon{font-size: 1.6rem; background: #00C1DE; padding:0.3rem; color: #fff;position: absolute; top:0.5rem;left:1rem;border-radius:2px;}
    .Health .info .right{font-size: 1.6rem; color: #00C1DE;position: absolute;top:1rem;right: 1rem;}
    .Health .info ul{ width: 90%; margin: 0 auto;height:13rem; overflow-y: scroll;}
    .Health  .info ul li{ line-height:27px;font-size: 1rem;}
    .Health  .info ul li a{ color:#ccc;}
    .info ul li:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 1rem;
}
</style>