<template>
    <div class="workersDetails">
       <v-header></v-header>
      <div class="workerslist">
		  <div class="left">
		  	<img src="/static/img/css/common/fav_icon.gif" />
		  </div>
		  <div class="mian">
		     <h3>李春花</h3>
			 <p>54岁</p>
			 <p>护理经验:3年</p>
		  </div>
		  <div class="rigth">
		  	<i class="iconfont red">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  </div>
		</div>
		     <div class="workerslist">
		  <div class="left">
		  	<img src="/static/img/css/common/fav_icon.gif" />
		  </div>
		  <div class="mian">
		     <h3>李春花</h3>
			 <p>54岁</p>
			 <p>护理经验:3年</p>
		  </div>
		  <div class="right">
		  	<i class="iconfont red">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  	<i class="iconfont">&#xe62f;</i>
		  </div>
		</div>
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import{Cell} from 'mint-ui';
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
            Cell
        }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.workersDetails{position: absolute; top:0;left:0;bottom: 0; right: 0; width: 100%; height: 100%; padding-top: 4rem;}
	.workersDetails .workerslist{display: flex;background: #fff; box-sizing: border-box;  width: 98%; margin:1rem auto 0; border-radius: 5px;}
	.workersDetails .workerslist .left{ width:30%; box-sizing: border-box; padding: 1rem 1rem 1rem 0.5rem;}
	.workersDetails .workerslist .left img{border-radius: 5px;}
	.workersDetails .workerslist .mian{padding: 1rem 0; width:32%; overflow: hidden;}
	.workersDetails .workerslist .mian h3{font-size: 1.4rem; margin-bottom: 1rem;}
	.workersDetails .workerslist .right{padding: 1rem;}
</style>