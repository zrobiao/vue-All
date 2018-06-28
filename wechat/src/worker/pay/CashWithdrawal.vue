<template>
    <div class="recharge">
       <v-header></v-header>
       <div class="bankcard">
       	   <div class="left">
       	   	 <div class="name">银行卡</div> 
       	     <div><select>
       	     	<option>贵阳银行储蓄卡（8083）</option>
       	     	<option>贵阳银行储蓄卡（8083）</option>
       	     	<option>贵阳银行储蓄卡（8083）</option>
       	     </select></div>
       	   </div>
       	   <div class="topup-amount">提现金额</div>
       	   <input type="text"  class="input-box"/>
       	   <span class="red bankcard-red">￥</span>
       </div>
       <button class="bnt">确定提现</button>
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
	.recharge{margin-top:5rem;}
	.bankcard{position: relative; width: 98%; display: block; margin:0 auto; background: #fff; padding: 1rem 1rem 3rem 1rem; box-sizing: border-box;}
	.bnt{width: 98%; display: block; font-size: 1.4rem; margin:1rem auto; border: 0; height:4rem; line-height:4rem; text-align: center; background: #94ca52; color: #fff;}
    .input-box{ width: 100%; height:3rem;font-size: 1.4rem; line-height:3rem; padding-left:4rem; box-sizing: border-box; border: 0; border-bottom: 1px solid #ccc;}
    .bankcard .topup-amount{font-size: 1.4rem; padding: 1rem 0;}
    .bankcard-red{position: absolute;top:6rem;left:1.3rem; font-size:3rem;}
    .bankcard .left{display: flex;}
    .bankcard .left .name{font-size: 1.4rem;}
</style>