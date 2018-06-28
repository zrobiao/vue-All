<template>
    <div class="ComplaintHandlingDetails">
       <v-header></v-header>
        投诉信息
    </div>
</template>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.ComplaintHandlingDetails{position: absolute;top:0;left: 0; bottom: 0; right: 0; box-sizing: border-box;padding-top: 4rem; height: 100%; background: #fff;}
	.ComplaintHandlingDetails .mint-search{height:50px;}
	.ComplaintHandlingDetails .list{ position: relative; display: flex; width: 100%; box-sizing: border-box; border-bottom:1px solid #eee;}
	.ComplaintHandlingDetails .list .left{ width: 30%; box-sizing: border-box; padding:0.5rem;}
	.ComplaintHandlingDetails .list .left img{height:60px;}
	.ComplaintHandlingDetails .list .mian{padding:0.5rem;}
	.ComplaintHandlingDetails .list .mian h3{font-size: 1.4rem; margin-bottom:1rem;}
	.ComplaintHandlingDetails .read{position: absolute;bottom:1.25rem; right: 1rem;}
</style>
<script>
    import vHeader from './../common/Header.vue';
    import router from './../../router';
    import util from './../../js/util/util.js';
    import{Cell,Toast,MessageBox } from 'mint-ui';
    export default {
    	data(){
    		return {
    		  value:''
    		}
    	},
    	  created() {
    		 this.$store.state.isFooterShow=false; //显示底部导航
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 document.title="投诉处理";
    		
         },
        components:{
            vHeader,
            Cell,
            MessageBox
        },
       methods:{
       	
     
       },
       mounted: function () { //加载完成后执行
    	

        }
    }
</script>
