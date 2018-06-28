<template>
    <div class="Service">
       <v-header></v-header>
       <h3>用户服务协议</h3>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
       	 Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
       	  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
       	 nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
        	 Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. 
        	 Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
        	  magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum,
        	   nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        </p>
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
	.Service{margin-top: 4rem; padding: 1rem; width: 100%;box-sizing: border-box;}
	.Service h3{font-size: 1.4rem; width: 100%; text-align: center; padding-bottom: 1rem;}
	.Service p{text-indent: 1rem; text-align: justify; line-height: 17px;}
</style>