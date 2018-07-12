<template>
  <div class="collect">
    <v-header></v-header>
    <p class="ctitle">填写订单信息</p>
    <div class="clist">
      <i class="iconfont">&#xe633;</i>
      <h3>陪护医院</h3>
      <p v-on:click='hospitalCilk("/worker/hospital")'>
        <span class="hospitalName">{{hospitalName}}</span>
        <i class="iconfont city-icon">&#xe629;</i>
      </p>
    </div>
    <div class="clist">
      <i class="iconfont">&#xe607;</i>
      <h3>开始时间</h3>
      <p v-on:click="open('picker1')">
        <span>{{startDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <div class="clist">
      <i class="iconfont">&#xe60f;</i>
      <h3>结束时间</h3>
      <p v-on:click="open('picker2')">
        <span>{{endDate}}</span>
        <i class="iconfont picker">&#xe609;</i>
      </p>
    </div>
    <!-- <div class="clist">
			<i class="iconfont">&#xe61b;</i>
			<h3>护工性别</h3>
			<p>
				<button class="but" :class="{'but-select':isMale}" v-on:click='MaleClik()'>男</button>
				<button class="but" :class="{'but-select':isFemale}" v-on:click='FemaleClik()'>女</button>
			</p>
		</div> -->
    <div class="clist">
      <i class="iconfont">&#xe648;</i>
      <h3>服务类型</h3>
      <p>
        <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-select':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
      </p>
    </div>
    <div class="clist">
      <i class="iconfont">&#xe648;</i>
      <h3>付款方式</h3>
      <p>
        <button v-for="(item,index) in payType" class="but" :class="{'but-select':payflag==index}" v-on:click='payClick(item.number,index)'>{{item.title}}</button>
      </p>
    </div>
    <div class="clist">
      <i class="iconfont">&#xe648;</i>
      <h3>金额</h3>
      <p>
        <button class="but" v-on:click='setMoney()'>设置金额</button>
      </p>
      <h3>{{price}}元</h3>
    </div>
    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker1" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange">
    </mt-datetime-picker>
    <mt-datetime-picker type="date" v-bind:startDate="new Date()" ref="picker2" v-model="value" year-format="{value}年" month-format="{value}月" date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange"></mt-datetime-picker>
    <button class="button infoButton" v-on:click="saveClick">生成二维码</button>
    <mt-popup class="rmodel" v-model="popupVisible" position="right" popup-transition="popup-fade">
      <div class="box">
        <p class="qrcode">
          <!-- <img :src="QrCodeURL"> -->
          <vue-qr :logoSrc="logoPath" :autoColor="true" :text="QrCodeData" :margin="margin" :size="size" :logoScale="logoScale"></vue-qr>
        </p>
        <!-- <div class="kk-logo">
          <img src="../../assets/kk-logo.png" />
        </div> -->
        <p class="text">扫码提取订单</p>
      </div>
      <button class="button infoButton" v-on:click="closeClick">点击关闭</button>
    </mt-popup>
  </div>
</template>
<script>
import vHeader from './../common/Header.vue'
import util from './../../js/util/util.js'
import router from './../../router'
import VueQr from 'vue-qr'
let QRCode = require('qrcode')
import {
  Cell,
  CellSwipe,
  Swipe,
  SwipeItem,
  DatetimePicker,
  Toast,
  Field,
  MessageBox,
  Popup
} from 'mint-ui'
export default {
  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    cancelText: {
      type: String,
      default: '取消'
    },

    actions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      value: '',
      flag: 0,
      payflag: 0,
      hospitalName: '',
      hospitalId: '',
      price: 0,
      series: '1',
      payseries:'1',
      QrCodeData: '',
      logoPath: require('../../assets/kk-logo.png'),
      margin:0,
      size:240,
      logoScale:0.15,
      QrCodeURL: '',
      popupVisible: false,
      currentValue: false,
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
      ],
      payType: [
        {
          title: '线下支付',
          number: '1'
        },
        {
          title: '线上支付',
          number: '2'
        }
      ]
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
    //this.GetUserSharedSalt()
  },
  components: {
    vHeader,
    CellSwipe,
    Cell,
    VueQr
  },
  methods: {
    createUserQrCode: function(salt) {
      //salt 加载密钥
      //参考官网 https://www.npmjs.com/package/qrcode#qr-code-options
      var _$this = this
      var _QrCodeOptions = {
        errorCorrectionLevel: 'H',
        version: 9
      }
      QRCode.toDataURL(salt, _QrCodeOptions, function(error, url) {
        if (!error) _$this.QrCodeURL = url
      })
    },
    GetUserSharedSalt: function() {
      //从服务器中获取当前护工分享关键Salt
      //ToDo .....
      //生成二维码
      var salt = 'xcvbndfghjk,你好世界'
      this.createUserQrCode(salt)
    },
    setMoney: function() {
      let $this = this
      MessageBox.prompt('请输入金额').then(({ value, action }) => {
        //Toast(value);
        this.price = value
      })
    },
    hospitalCilk: function(url) {
      util.pushRouter(router, url, { page: 'workers' })
    },
    serveClik: function(num, index) {
      //选择高级
      this.flag = index
      this.series = num
      this.priceInfo()
      if (index == 2) {
        document.documentElement.scrollTop = this.BodyHeight
      }
    },
    payClick: function(num, index) {
      this.payflag = index
      this.payseries = num
      console.log("选择"+num)
      this.priceInfo()
      if (index == 2) {
        document.documentElement.scrollTop = this.BodyHeight
      }
    },
    closeClick: function() {
      this.popupVisible = false
    },
    open(picker) {
      //日期
      this.$refs[picker].open()
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
      this.priceInfo()
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
      this.priceInfo()
    },
    setMessage: function(_message) {
      MessageBox({
        title: '温馨提示',
        message: _message,
        showCancelButton: true
      })
    },
    priceInfo: function() {},
    saveClick: function() {
      let $this = this
      let userId = '1'
      let hospitalId = this.hospitalId
      console.log('医院id:' + hospitalId)
      let workId = this.$store.state.workId
      let startDate = this.startDate
      if (startDate == '') {
        this.setMessage('请选择开始时间')
        return
      }

      let endDate = this.endDate
      if (endDate == '') {
        return
      }

      let curl = this.flag + 1
      let dependentLevel = 'level' + curl

      let price = this.price
      if (price == '0') {
        this.setMessage('请输入价格')
        return
      }
      // console.log('用户id：' + userId)
      // console.log('医院id：' + hospitalId)
      // console.log('开始时间:' + startDate)
      // console.log('结束时间' + endDate)
      // console.log('陪护等级:' + dependentLevel)
      // console.log('陪护价格:' + price)
      // console.log('护工id：' + workId)
      console.log("支付类型"+this.payseries)  //1.线下支付2.线上支付
      this.popupVisible = true
      util.Ajax(
        '/api/order/createOrderByWorker?_method=PUT',
        {
          userId: userId,
          hospitalId: hospitalId,
          workId: workId,
          workerGender: 'male',
          dependentLevel: dependentLevel,
          startDate: startDate,
          endDate: endDate,
          price: price,
          payType:$this.payseries
        },
        function(data) {
          //显示是否有护工
          console.log(data)
          if (data) {
            let userData = data.data
            if (userData.status == 'success') {
              $this.popupVisible = true
              $this.QrCodeData = userData.result
              $this.createUserQrCode($this.QrCodeData) //生成二维码
            }
          }
        }
      )
    }
  },
  mounted: function() {
    //加载完成后执行
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
<style>
.collect {
  background: #fff;
  /* position: absolute;
  left: 0;
  bottom: 0; */
  width: 100%;
  min-height: 100%;
  padding-bottom: 100px;
}

.collect .clist {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #fff;
}
.collect .clist h3 {
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 1rem;
  line-height: 26px;
  flex: 0 1 30%;
}
.collect .clist .iconfont {
  font-size: 2rem;
  line-height: 26px;
}
.collect .clist p {
  flex: 0 1 60%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
}

.collect .clist-hintbox {
  font-size: 1.2rem;
  color: #f32043;
  border-radius: 5px;
  margin: 5px 2rem;
  padding: 8px;
  -webkit-box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.75);
  box-shadow: 0px 0px 3px 0px rgba(189, 189, 189, 0.75);
  position: relative;
}
.collect .clist-hintbox:before,
.collect .clist-hintbox:after {
  content: '';
  display: block;
  border-width: 10px;
  position: absolute;
  top: -20px;
  right: 20px;
  border-style: solid dashed dashed;
  border-color: transparent transparent rgb(240, 240, 240);
  font-size: 0;
  line-height: 0;
}
.collect .clist-hintbox:after {
  top: -18px;
  border-color: transparent transparent rgb(255, 255, 255);
}
.collect .clist-hintbox .clist-hinttxt {
  font-size: 1.2rem;
  color: #fd6f37;
}
.collect .clist p i {
  color: #ddd;
}
.collect .clist .hospitalName {
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.collect .work-collect {
  background: #fff;
  color: #f32043;
  text-indent: 9rem;
  padding: 0.5rem 0;
  font-size: 1.2rem;
}
.collect .but {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  padding: 0.5rem;
  /* width: 3.5rem; */
}
.collect .but:not(:last-child) {
  margin-right: 0.5rem;
}
.collect .but-select {
  background: #94ca52;
  color: #fff;
}
.collect .total {
  position: fixed;
  left: 0;
  bottom: 4.4rem;
  background: #fcfcfc;
  height: 4rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  border-top: 1px solid #eee;
}
.collect .price {
  width: 50%;
  text-align: center;
  box-sizing: border-box;
  line-height: 1.5rem;
  padding-top: 4px;
  font-size: 1.2rem;
}
.collect .price .orange {
  font-size: 1.4rem;
}
.collect .fees-and-services {
  height: 100%;
  line-height: 4rem;
  width: 25%;
  color: #5aa6e6;
  text-align: center;
  font-size: 1.2rem;
}
.collect .choose-care {
  height: 100%;
  line-height: 4rem;
  width: 25%;
  background: #94ca52;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
}
.collect .clist p .on {
  color: #94ca52;
}
.collect .iconfont {
  margin-right: 0.5rem;
}
.collect .clist .picker {
  color: #4e4e4e;
  padding-left: 15px;
}
.collect .clist .city-icon {
  font-size: 1.2rem;
  color: #94ca52;
  padding-left: 15px;
}
@media screen and (max-width: 320px) {
  .collect .clist {
    padding: 0.7rem 2rem;
  }
  .collect .clist h3 {
    font-size: 1.2rem;
    flex: 0 1 25%;
  }
  .collect .clist p {
    font-size: 1.2rem;
  }
}
@media screen and (min-width: 376px) {
  .collect .clist-hintbox:before,
  .collect .clist-hintbox:after {
    right: 15%;
  }
}

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

.infoButton {
  /*position: fixed;
		left: 50%;
		bottom: 8%;*/
  background: #94ca52;
  color: #fff;
  width: 10rem;
  border: 0;
  /*margin-left: -5rem;*/
  font-size: 1.3rem;
  margin: 40px auto;
  display: block;
}

.ctitle {
  color: #2f4f4f;
  font-size: 1.5rem;
  margin: 0px auto;
  margin-top: 70px;
  display: block;
  width: 10rem;
}

.collect .rmodel {
  width: 100%;
  background: #fff;
  height: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);
}
.collect .rmodel .con {
  width: 80%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}
.collect .rmodel .iconbtn {
  border-radius: 0;
  background: #eee;
  color: #fff;
  display: block;
  height: 3rem;
  line-height: 3rem;
  width: 25%;
  position: absolute;
  top: 0;
  right: 0;
}
.collect .rmodel .iconbtn .iconfont {
  font-size: 2rem;
}
.collect .rmodel .mttitle {
  position: relative;
  width: 100%;
  padding: 0;
  padding-left: 0.5rem;
  box-sizing: border-box;
  margin: 0;
  border-bottom: 1px solid #eee;
  height: 3rem;
  font-size: 1.4rem;
  line-height: 3rem;
}
.collect .rmodel h3 {
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
}
.collect .rmodel li {
  padding: 0.5rem;
}

.collect .box {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.4rem;
  position: relative;
}

.collect .box .qrcode {
  margin: 5rem auto 1rem;
}

.collect .box .text {
  color: #fff;
  margin: 40px auto 1rem;
}

.collect .kk-logo {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 40%;
  margin: -15px 0 0 -15px;
}
.collect .kk-logo img {
  height: 100%;
  width: 100%;
}
</style>