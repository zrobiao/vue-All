<template>
    <div class="Bills">
       <v-header></v-header>
       <table class="table">
        <tr>
          <td>时间</td>
          <td>金额</td>
          <td>详细</td>
        </tr>
          <tr>
          <td>2017-10-17</td>
          <td>-360.00</td>
          <td>3天陪护</td>
        </tr>
          <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
          <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
             <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
          <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
             <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
          <tr>
          <td>&nbsp;</td>
          <td></td>
          <td></td>
        </tr>
       </table>
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
      //
      }
    }
</script>
<style scoped="scoped">
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.Bills{position:absolute;top:0;left:0;right:0;bottom:0;background: #fff; height: 100%; width: 100%; padding-top: 4rem;}
	.Bills .table{ width:98%; margin:1rem auto;}
	.Bills .table{border:1px solid #ccc;text-align: center;}
	.Bills .table td{border:1px solid #ccc; padding:0.5rem 0;}
</style>