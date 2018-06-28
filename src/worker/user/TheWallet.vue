<template>
	<div class="Thewallet">
		<v-header></v-header>
		<div class="thewallet-tilet">
			<div class="total">
				<p>余额</p>
				<p>¥&nbsp;{{amountPending}}</p>
			</div>
			<div class="total total2">
				<p>待结算</p>
				<p>¥&nbsp;{{remainAmount}}</p>
			</div>
		</div>
		<div style="clear:both"></div>
		<!--mt-cell  to='/customer/payRecharge' title="充值">
			<span><i class="iconfont">&#xe65b;</i></span>
			<span slot="icon"><i class="iconfont">&#xe623;</i></span>
		</mt-cell-->
		<mt-cell to='/customer/payCashWithdrawal' title="提 现">
			<span slot="icon">
				<i class="iconfont">&#xe638;</i>
			</span>
		</mt-cell>
		<mt-cell to='/customer/payBills' title="帐 单">
			<span slot="icon">
				<i class="iconfont">&#xe626;</i>
			</span>
		</mt-cell>
		<mt-cell to='/customer/payBankCard' title="银行卡">
			<span slot="icon">
				<i class="iconfont">&#xe635;</i>
			</span>
		</mt-cell>
	</div>
</template>
<script>
	import vHeader from './../common/Header.vue'
	import { Indicator, Cell } from 'mint-ui'
	import util from './../../js/util/util.js'
	export default {
		data() {
			return {
				amountPending: '0.0',
				remainAmount: '0.0'
			}
		},
		created() {
			this.$store.state.headings = this.$router.history.current.name //修改标题
			this.$store.state.isFooterShow = false //显示底部导航
		},
		components: {
			vHeader,
			Cell
		},
		mounted: function() {
			//加载完成后执行
			let $this = this
			console.log('请求的护工：' + $this.$store.state.workId + '的信息')
			util.Ajax(
				'api/work/settlement/' + $this.$store.state.workId + '?_method=GET', {},
				function(data) {
					if(data){
						if(!util.isEmpty(data.data.remainAmount))
							$this.amountPending = data.data.remainAmount
						if(!util.isEmpty(data.data.AmountPending))
							$this.remainAmount = data.data.AmountPending
					}
				})
		}
	}
</script>
<style>
.head-portrait {
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 3rem 1rem;
  background: #fff;
  font-size: 16px;
}

.portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  float: right;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.Thewallet {
  margin-top: 4rem;
  overflow: hidden;
}
.Thewallet .mint-cell-wrapper {
  border-bottom: 4px solid #f5f5f5;
}

.Thewallet .mint-cell:before {
  content: ' ';
  position: absolute;
  top: 20px;
  right: 15px;
  display: block;
  width: 10px;
  height: 10px;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  transform: rotate(45deg);
}

.Thewallet .mint-cell-title {
  position: relative;
}

.Thewallet .mint-cell-title .mint-cell-text {
  margin-left: 4rem;
}

.Thewallet .mint-cell .iconfont {
  margin-right: 1.2rem;
  font-size: 1.4em;
  position: absolute;
  top: -0.4rem;
  left: 0;
  background: #ccc;
  padding: 0.2rem;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  display: block;
  overflow: hidden;
  width: 2rem;
}

.Thewallet .me-tab .mint-cell:first-child {
  background-image: -webkit-linear-gradient(
    bottom,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-image: linear-gradient(
    0deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top;
}

.Thewallet .thewallet-tilet {
  padding: 0;
  text-align: center;
  width: 100%;
  margin: 0;
  background: #fff;
}

.Thewallet .thewallet-tilet .total {
  width: 49.8%;
  height: 8rem;
  margin: auto;
  padding: 5rem 0 0 0;
  line-height: 2rem;
  font-size: 2rem;
  background-color: #a1a1a1;
  color: rgb(255, 255, 255);
  /*border: 1px solid rgb(90, 166, 230);*/
  float: left;
  text-align: center;
  vertical-align: middle;
}
.Thewallet .thewallet-tilet .total2 {
  float: right;
}
.Thewallet .thewallet-tilet .total p{
	margin-bottom: 10px;
	}
</style>
