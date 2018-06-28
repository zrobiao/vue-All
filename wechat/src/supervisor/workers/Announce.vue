<template>
    <div class="announce">
       <v-header></v-header>
       <div class="title-name">公告名称</div>
       <input placeholder="请输入公告名称" class="input"  />
       <div class="title-name">公告内容</div>
       <textarea placeholder="请输入公告内容"  class="input"  rows="8"></textarea>
       <button class="button button-green">提交</button>
    </div>
</template>
<style type="text/css" scoped="scoped">
	.announce{position: relative;width: 100%; height: 100%; box-sizing: border-box; position: absolute; background: #fff; padding-top: 4rem;}
	.announce .button{ width:50%; margin:2rem auto; display: block;}
	.announce .title-name{font-size: 1.2rem; padding: 1rem;}
	.announce .input{ width:90%; margin: 0 auto; border:1px solid #eee; padding: 1rem; display: block;}
</style>
<script>
    import vHeader from './../common/Header.vue';
    import router from './../../router';
    import util from './../../js/util/util.js';
    import{Cell,Toast,MessageBox } from 'mint-ui';
    export default {
    	data(){
    		return {
 
    		}
    	},
    	  created() {
    		 this.$store.state.isFooterShow=false; //显示底部导航
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 document.title="发布公告";
    		
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
