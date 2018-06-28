<template>
    <div class="coupons">
       <v-header></v-header>
     <div class="couponslist">
           <div class="left-box">
           	 <p>￥<span class="max-fs">69</span></p>
           	 <p>够3天服务可用</p>
           </div>
           <div class="right-box">
           	 <h3>找护工专用卷</h3>
           	<p>现金抵扣卷</p>
           	<p>有效期：2017/10/10—2018/10/10</p>
           	<button class="btn">立即使用</button>
           </div>
       </div>
       <div class="couponslist">
           <div class="left-box">
           	 <p>￥<span class="max-fs">69</span></p>
           	 <p>够3天服务可用</p>
           </div>
           <div class="right-box">
           	 <h3>找护工专用卷</h3>
           	<p>现金抵扣卷</p>
           	<p>有效期：2017/10/10—2018/10/10</p>
           	<button class="btn">立即使用</button>
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
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.coupons{margin-top: 4.5rem;}
	.coupons .couponslist{  background:#fff;width: 96%; margin:0 auto 1rem; border:1px solid #eee; box-shadow:0 5px 10px #eee; display: flex; border-radius: 5px; overflow: hidden;}
	.coupons .left-box{ width:35%; padding:1rem 0; color: #fff; text-align: center;font-size: 1.2rem;
		background: #c9de96; /* Old browsers */
		background: -moz-linear-gradient(-45deg, #c9de96 0%, #8ab66b 44%, #398235 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(-45deg, #c9de96 0%,#8ab66b 44%,#398235 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(135deg, #c9de96 0%,#8ab66b 44%,#398235 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c9de96', endColorstr='#398235',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */	}
   .coupons .couponslist .left-box  .max-fs{font-size:3rem;}
   .coupons .couponslist .right-box{position: relative; padding: 1rem 0; padding-left: 1rem;}
   .coupons .couponslist .right-box .btn{position: absolute;border-radius: 3px; top:2rem;right:0.5rem; background: #00CC66; color: #fff; border: 1px solid #00CC66; padding:0.5rem;}
   .coupons .couponslist .right-box h3{font-size: 1.4rem; margin-bottom:0.5rem;}
   .coupons .couponslist .right-box p{ margin-bottom:0.3rem;}
</style>