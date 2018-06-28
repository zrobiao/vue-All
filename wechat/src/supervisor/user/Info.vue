<template>
    <div class="info">
       <v-header></v-header>
       <div class="head-portrait">
       	  <p>头像</p>
       	  <img src="../../../static/img/css/common/fav_icon.gif" class="portrait" />
       </div>
       <template v-for="item in items">
       	  <mt-cell  :title="item.title" :value="item.info"></mt-cell>
       </template>
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
	.info{margin-top: 4rem;}
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
</style>