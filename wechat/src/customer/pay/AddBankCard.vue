<template>
	<div class="AddpayBankCard">
		<v-header></v-header>
		<mt-field label="持卡人" v-model=username placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
		<mt-field label="卡号" v-model=cardNum placeholder="请输入卡号" type="tel"></mt-field>
		<mt-field label="开户行" v-model=bank placeholder="请输入开户行"></mt-field>
		<mt-field label="开户行地址" v-model=address placeholder="请输入开户行地址"></mt-field>
		<mt-field label="手机号" v-model=phone placeholder="请输入手机号" type="tel"></mt-field>
		<!--<div class="btn-box">
			<input type="text" maxlength="8" class="input-text" />
			<mt-button type="primary" class="btn">获取验证码</mt-button>
		</div>-->

		<mt-button type="primary" class="btn" v-on:click="quiteClick">确定</mt-button>

	</div>
</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell, Field, Toast } from 'mint-ui'
import util from './../../js/util/util.js'
export default {
  name: 'page-field',
  data() {
    return {
      username: '',
      cardNum: '',
      phone: '',
      bank: '',
      address: ''
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    Cell,
    Field
  },
  mounted: function() {
    //加载完成后执行
  },
  methods: {
    quiteClick: function() {
      let $this = this
      console.log('确定添加')
      console.log('添加银行卡的用户姓名为：' + this.username)
      console.log('添加银行卡的卡号为：' + this.cardNum)
      console.log('电话号码为：' + this.phone)
      console.log('开户行为' + this.bank)
      console.log('开户地址为' + this.address)

      util.Ajax(
        'api/work/' + $this.$store.state.workId + '/payment-method?_method=PUT',
        {
          name: $this.username,
          cardNum: $this.cardNum,
          bank: $this.bank,
          address: $this.address
        },
        function(data) {
          console.log(data.data)
          if (!util.isEmpty(data)) {
            console.log(data.data)
            $this.username = ''
            $this.cardNum = ''
            $this.phone = ''
            $this.bank = ''
            $this.address = ''
            Toast('添加成功')
          }
        }
      )
    }
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

.AddpayBankCard {
  margin-top: 4.5rem;
}

.AddpayBankCard .btn {
  width: 100%;
  margin-top: 2rem;
  background: #00cc66;
}

.AddpayBankCard .input-text {
  height: 4rem;
  padding: 0 0.5rem;
  line-height: 4rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-right: 0;
  border-left: 0;
}

.AddpayBankCard .btn-box {
  position: relative;
  height: 4rem;
  overflow: hidden;
}

.AddpayBankCard .btn-box .btn {
  width: 40%;
  position: absolute;
  top: -1.7rem;
  right: 1rem;
}
</style>