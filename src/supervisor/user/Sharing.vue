<template>
    <div class="Sharing">
       <v-header></v-header>
       <div class="box">
       	<p class="qrcode"><img src="/static/img/updata/slide/fengxiang.png"></p>
       	<p>扫码关注</p>
       </div>
       <button class="btn">分享给朋友</button>
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import{Cell} from 'mint-ui';
    export default {
    	data(){
    		return {
    			 items:[{
	             "title":"电话",
	             "info":"1840163111",
	           },{
	             "title":"姓名",
	             "info":"阿作",
	           },{
	             "title":"性别",
	             "info":"男",
	           },{
	             "title":"出生日期",
	             "info":"1991-01-12",
	           }]
    		}
    	},
    	created() {
    		 this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Cell
        },mounted: function () { //加载完成后执行
       
      }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.Sharing{background: #fff; position: absolute; top:0; left:0;bottom: 0; right: 0; width: 100%; padding-top: 4rem;}
	.Sharing .btn{position:fixed;left:50%;bottom:5rem; background: #fff; height: 3rem; 
    line-height: 3rem;border:1px solid #eee;background: #00CC66; color: #fff;
     border-radius: 5px;width:10rem;
      margin-left: -5rem; display: block;}
   .Sharing .box{ width: 100%; margin: 0 auto; text-align: center; font-size: 1.4rem;}
   .Sharing .box .qrcode{ margin:5rem auto 1rem;}
</style>