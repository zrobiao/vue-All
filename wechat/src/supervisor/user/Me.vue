<template>
	<div class="Me">
	<div class="me" v-on:click='go("customer/info")'>
		<div class="user-img"><img src="../../../static/img/css/common/fav_icon.gif"></div>
		<div class="title">
			<p class="name">萌萌小奇</p>
			<p>18401631111</p>
		</div>
	</div>
	<mt-cell to='customer/thewallet' title="钱包">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe623;</i></span>
    </mt-cell>
    <mt-cell to='customer/coupons' title="优惠券">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe638;</i></span>
    </mt-cell>	
    <mt-cell to='customer/about' title="关于我们">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe626;</i></span>
    </mt-cell>	
    <mt-cell to='customer/service' title="服务条款">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe616;</i></span>
    </mt-cell>	
    <mt-cell to='customer/complaints' title="投诉建议">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe623;</i></span>
    </mt-cell>	
    <mt-cell  title="服务热线">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe623;</i></span>
    </mt-cell>	
    <mt-cell to='customer/sharing' title="分享">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe618;</i></span>
    </mt-cell>	
    <mt-cell to='customer/collect' title="收藏">
       <span><i class="iconfont">&#xe65b;</i></span>
       <span slot="icon"><i class="iconfont">&#xe621;</i></span>
    </mt-cell>	
	</div>
</template>

<script>
import router from './../../router';
import util from './../../js/util/util.js';
import axios from 'axios'
import{Indicator,Cell} from 'mint-ui';
//Indicator.open({
//		text: '加载中...',
//		spinnerType: 'fading-circle'
//	})
export default {
    data () {
      return {
      	
      }
    },
    	created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=2;
    		 document.title="我的"
    	},
    components: {
      Cell
    },
    methods: {
      go:function(url){
      	console.log(url)
      	util.pushRouter(router,url,{})
      }
    },
    mounted:function(){
		axios.get('http://192.168.0.141:8080/api/test/1')
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });   
    }
  }



</script>
<style>
	.Me .me{ width: 100%; margin: 0 auto 1rem; padding: 1rem 0; background: #fff; display: flex; box-sizing: border-box;}
	.Me .user-img{ width: 30%;}
	.Me .name{font-size:1.4rem; margin-bottom:0.5rem; font-weight: 700;}
	.Me .title{ padding-left:1.5rem;font-size:1.4rem;}
	.Me .user-img img{ width:65px; height:65px; border-radius: 50%; margin: 0 auto; display: block;}
</style>