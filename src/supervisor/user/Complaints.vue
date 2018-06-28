<template>
    <div class="Complaints">
       <v-header></v-header>
       <div class="btn-box">
       	 <button class="bnt">投诉</button>
         <button class="bnt bnt-on">建议</button>
       </div>
       <textarea class="mtfield" placeholder=""></textarea>
       <button class="bnt bntred">提交</button>
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
        },mounted: function () { //加载完成后执行
       
      }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.Complaints{background:#fff; padding-top: 4rem; position: absolute;box-sizing: border-box; top:0; left:0; bottom: 0; height: 100%; width: 100%; overflow: hidden;}
	.Complaints .btn-box{ text-align: center; padding:1rem 0;}
	.Complaints .btn-box .bnt{ width: 5rem; height: 3rem; line-height: 3rem; background: #fff;border:1px solid #eee; border-radius: 5px; margin-right: 1rem;}
	.Complaints .btn-box .bnt-on{background: #F32043; color: #fff;}
    .Complaints .mtfield{border: 1px solid #eee; margin:1rem auto; width: 95%; display: block; height: 10rem; text-align: inherit;}
    .Complaints .bntred{position:fixed;left:50%;bottom: 1rem; background: #fff; height: 3rem; 
    line-height: 3rem;border:1px solid #eee;background: #00CC66; color: #fff;
     border-radius: 5px;width:10rem;
      margin-left: -5rem; display: block;}
</style>