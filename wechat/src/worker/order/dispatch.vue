<template>
  <div class="dispatch">
    <v-header></v-header>
    <p class="dtitle">填写订单信息</p>
    <div class="dlist">
      <i class="iconfont">&#xe633;</i>
      <h3>陪护医院</h3>
      <p v-on:click='hospitalCilk("/worker/hospital")'>
        <span class="hospitalName">{{hospitalName}}</span>
        <i class="iconfont city-icon">&#xe629;</i>
      </p>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe607;</i>
      <h3>开始时间</h3>
      <p v-on:click="open('picker1')">
        <span>{{startDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe60f;</i>
      <h3>结束时间</h3>
      <p v-on:click="open('picker2')">
        <span>{{endDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe648;</i>
      <h3>服务类型</h3>
      <p>
        <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-select':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
      </p>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe648;</i>
      <h3>订单金额</h3>
      <mt-field placeholder="请输入订单金额" type="number" v-model="price"></mt-field>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe648;</i>
      <h3>客户姓名</h3>
      <mt-field placeholder="请输入客户姓名" v-model="username"></mt-field>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe648;</i>
      <h3>客户电话</h3>
      <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    </div>
    <div class="dlist">
      <i class="iconfont">&#xe648;</i>
      <h3>选择护工</h3>
    </div>
    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker1" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange">
    </mt-datetime-picker>
    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker2" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange">
    </mt-datetime-picker>
  </div>
</template>
<script>
import vHeader from './../common/Header.vue'
import router from './../../router'
import util from './../../js/util/util.js'
import { Cell } from 'mint-ui'
export default {
  data() {
    return {
      hospitalName: '',
      startDate: '',
      endDate: '',
      value: '',
      flag: 0,
      phone:'',
      username:'',
      price:'',
      ServiceStar: [
        {
          title: '非卧床',
          number: '1'
        },
        {
          title: '卧床',
          number: '2'
        },
        {
          title: '特殊',
          number: '3'
        }
      ]
    }
  },
  created() {
    this.$store.state.isFooterShow = false //显示底部导航
    this.$store.state.headings = this.$router.history.current.name //修改标题
  },
  components: {
    vHeader,
    Cell
  },
  methods: {
    hospitalCilk: function(url) {
      util.pushRouter(router, url, { page: 'workers' })
    },
    open(picker) {
      //日期
      this.$refs[picker].open()
    },
    setMoney: function() {
      let $this = this
      MessageBox.prompt('请输入金额').then(({ value, action }) => {
        //Toast(value);
        this.price = value
      })
    },
    StartTiemChange(value) {
      var DateInfo = new Date(value)
      var myMonth = DateInfo.getMonth() + 1
      var myDay = DateInfo.getDate()
      myDay = (myDay + '').length <= 1 ? 0 + '' + myDay : myDay
      myMonth = (myMonth + '').length <= 1 ? 0 + '' + myMonth : myMonth
      let Tiem = DateInfo.getFullYear() + '-' + myMonth + '-' + myDay
      this.startDate = Tiem
      console.log(myDay)
      //this.priceInfo()
    },
    FinishTiemChange(value) {
      console.log(value)
      var DateInfo = new Date(value)
      var myMonth = DateInfo.getMonth() + 1
      var myDay = DateInfo.getDate()
      myDay = (myDay + '').length <= 1 ? 0 + '' + myDay : myDay
      myMonth = (myMonth + '').length <= 1 ? 0 + '' + myMonth : myMonth
      let Tiem = DateInfo.getFullYear() + '-' + myMonth + '-' + myDay
      this.endDate = Tiem
      console.log(myDay)
      //      if(this.endDate>this.startDate){
      //      	Toast("开始时间必须小于结束时间")
      //      }
      //this.priceInfo()
    },
    serveClik: function(num, index) {
      //选择高级
      this.flag = index
      this.series = num
      //   this.priceInfo()
      if (index == 2) {
        document.documentElement.scrollTop = this.BodyHeight
      }
    }
  },
  mounted: function() {
    if (this.$route.query.hospitalName == undefined) {
      var $this = this
      util.Ajax(
        '/api/hospital/distance?_method=GET',
        { lng: $this.longitude, lat: $this.latitude },
        function(data) {
          $this.hospitalName = data.data.name
          $this.hospitalId = data.data.hospital_id
        }
      )
    } else {
      this.hospitalId = this.$route.query.hospitalId
      this.hospitalName = this.$route.query.hospitalName
    }
  }
}
</script>
<style scoped="scoped">
.dtitle {
  color: #2f4f4f;
  font-size: 1.5rem;
  margin: 0px auto;
  margin-top: 70px;
  display: block;
  width: 10rem;
}

.dispatch .dlist {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #fff;
}

.dispatch .dlist h3 {
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 1rem;
  line-height: 26px;
  flex: 0 1 30%;
}
.dispatch .dlist .iconfont {
  font-size: 2rem;
  line-height: 26px;
}

.dispatch .but {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  padding: 0.5rem;
  /* width: 3.5rem; */
}
.dispatch .but:not(:last-child) {
  margin-right: 0.5rem;
}
.dispatch .but-select {
  background: #94ca52;
  color: #fff;
}
</style>