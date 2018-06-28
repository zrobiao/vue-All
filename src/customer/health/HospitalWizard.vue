<template>
    <div class="healthConsultationDetails">
    	<template>
       <v-header></v-header>
       <h3>{{items.name}}向导</h3>
       <div class="h-title">
       	<span class="fl">发布：{{items.hospitalcreattime}}</span>
       	<span>阅读：253</span>
       	<i class="iconfont fr blue">&#xe625;</i>
       </div>
       <h3>基本信息</h3>
       <table class="tab-style">
	       	<tr>
	       		<td>名称：</td>
	       		<td>{{items.name}}向导</td>
	       	</tr>
	       	    	<tr>
	       		<td>资质：</td>
	       		<td>{{items.level}}</td>
	       	</tr>
	       	    	<tr>
	       		<td>专业：</td>
	       		<td>骨科</td>
	       	</tr>
	       	    	<tr>
	       		<td>电话：</td>
	       		<td>{{items.tel}}</td>
	       	</tr>
	       	 	    	<tr>
	       		<td>地址：</td>
	       		<td>{{items.address}}</td>
	       	</tr>
         </table>
       <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
        <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
         <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
          <p>每到秋冬季节，雾霾就会有所加重，人体长时间暴露在PM2.5较多的地方，可增加很多疾病的发病风险。而这个时候，饮食防霾的说法就会流传开来，那么，防霾究竟能不能靠“吃”？</p>
       </template>
    </div>
    
</template>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.healthConsultationDetails{position: absolute;top:0;left: 0; bottom: 0; right: 0; box-sizing: border-box; padding: 1rem; padding-top: 4rem; height: 100%; overflow-y: scroll; background: #fff;}
    .healthConsultationDetails h3{ text-align: center;font-size: 1.4rem; padding: 1rem;font-weight: 700;}
    .healthConsultationDetails .h-title{border-bottom: 1px solid #eee; margin-bottom: 1rem; text-align: center; padding-bottom:0.3rem;}
    .healthConsultationDetails p{font-size: 1.2rem; line-height: 20px; text-indent: 2rem; text-align: justify;}
     .tab-style { margin-bottom: 1rem; width: 100%;box-sizing: border-box;}
    .tab-style td{padding: 0.3rem;box-sizing: border-box;}
</style>
<script>
	 import router from './../../router';
    import util from './../../js/util/util.js';
    import vHeader from './../common/Header.vue';
    import{Cell,CellSwipe} from 'mint-ui';
    export default {
    	data(){
    		return {
    		     items:''
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
	
      },mounted: function () { //加载完成后执行
      	   let $this=this;
      	   let hospitalId=this.$route.query.hospitalId;
      	  util.Ajax('/api/hospital/'+hospitalId+'?_method=GET',{},function(data){
      	  	       console.log(data)
		     		$this.items=data.data;
		      })
            
      }
    }
</script>
