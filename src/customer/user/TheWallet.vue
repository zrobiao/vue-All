<template>
    <div class="Thewallet">
       <v-header></v-header>
       <div class="thewallet-tilet">
       	 <div class="total">￥300</div>
       </div>
       <mt-cell to='/customer/payRecharge' title="充值">
       <span slot="icon"><i class="iconfont">&#xe623;</i></span>
    </mt-cell>
    <mt-cell to='/customer/payCashWithdrawal' title="提现">
       <span slot="icon"><i class="iconfont">&#xe638;</i></span>
    </mt-cell>	
    <mt-cell to='/customer/payBills' title="帐单">
       <span slot="icon"><i class="iconfont">&#xe626;</i></span>
    </mt-cell>
      <mt-cell to='/customer/payBankCard' title="银行卡">
       <span slot="icon"><i class="iconfont">&#xe626;</i></span>
    </mt-cell>
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import{Indicator,Cell} from 'mint-ui';
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
	.Thewallet{margin-top: 4rem; overflow: hidden;}
	.Thewallet .thewallet-tilet{padding:2rem 0; text-align: center; width: 100%; margin: 0 auto 1rem; background: #fff;}
	.Thewallet .thewallet-tilet .total{ width:8rem; height: 8rem; margin: 0 auto; line-height:8rem; font-size:2rem; border-radius: 50%; color: #F32043; border: 1px solid #F32043;}
    .Thewallet .mint-cell:before{
		   content:" ";
		   position: absolute;
		   top:20px;
		   right:15px;
		   display: block;
		   width: 10px;
		   height: 10px;
		   border-top: 1px solid #d9d9d9;
		   border-right: 1px solid #d9d9d9;
		   transform:rotate(45deg);
	}
</style>