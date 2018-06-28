<template>
    <div class="payBankCard">
       <v-header></v-header>
       <i class="iconfont add-babk-card" v-on:click='go("/customer/AddBankCard")'>&#xe62b;</i>
       <mt-cell-swipe :right="[{
		      content: '解绑',
		      style:{background: 'red',color:'#fff'},
		      handler: () => this.$messagebox('delete')
		    }]">
     <div class="list">
     <div class="left"><img src="/static/img/css/common/col_0_icon_4.gif"></div>
     <div class="minan">
	     	<p>中国建设银行</p>
	        <p class="type">储蓄卡</p>
	        <p>****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	        <span class="fs20">3840</span></p>
     </div>
    </div>
  </mt-cell-swipe>
      <mt-cell-swipe  :right="[{
		      content: '解绑',
		      style:{background: 'red',color:'#fff'},
		      handler: () => this.$messagebox('delete')
		    }]">
     <div class="list">
     <div class="left"><img src="/static/img/css/common/col_0_icon_4.gif"></div>
     <div class="minan">
	     	<p>中国建设银行</p>
	        <p class="type">储蓄卡</p>
	        <p>****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	        <span class="fs20">3940</span></p>
     </div>
    </div>
  </mt-cell-swipe>
    </div>
</template>
<script>
	import router from './../../router';
import util from './../../js/util/util.js';
    import vHeader from './../common/Header.vue';
    import{Cell,CellSwipe } from 'mint-ui';
    export default {
    	data(){
    		return {
    		
    		}
    	},
    	created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            CellSwipe,
            Cell
        },
          methods: {
		      go:function(url){
		      	util.pushRouter(router,url,{})
		      }
		    },
        mounted: function () { //加载完成后执行
      //
      }
    }
</script>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.payBankCard{margin-top: 4.5rem;}
	.payBankCard .mint-cell{ margin-top: 0.5rem;}
	.payBankCard  .mint-cell-wrapper{background: #258dc8; }
	.payBankCard .mint-cell-value{ display: block;}
	.payBankCard .list{ display:flex; padding: 1rem 0; width: 100%; color: #fff;}
	.payBankCard .list .left{ width:20%; box-sizing: border-box; padding:0 1rem 0 0.5rem;}
	.payBankCard .list .left img{ border-radius: 50%; background: #fff;}
	.payBankCard .list .minan{width: 80%; display: block;}
	.payBankCard .list .minan .type{margin:1rem 0;font-size:1.2rem}
	.payBankCard .bankbottom{ display: block; width: 100%;}
	.payBankCard  .fs20{font-size: 2rem;}
	.payBankCard  .mint-cell-swipe-button{font-size: 2rem; line-height:8rem;}
	.add-babk-card{position: fixed; top:1rem; right: 1rem; z-index: 999; font-size:2rem; color: #fff;}
</style>