<template>
  <div class="Sharing">
    <v-header></v-header>
    <div class="clist">
      <p>
        <button v-for="(item,index) in sharingType" class="but" :class="{'but-select':sharingflag==index}" v-on:click='sharingClick(item.number,index)'>{{item.title}}</button>
      </p>
    </div>
    <div class="box">
      <p class="qrcode"><img :src="QrCodeURL"></p>
      <div class="kk-logo">
        <img src="../../assets/kk-logo.png" />
      </div>
      <p class="qrcode-txt">扫码分享</p>
    </div>
    <!--<button class="btn" v-on:click="sharingFriend()">点击分享</button>-->
  </div>

</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell } from 'mint-ui'
import util from './../../js/util/util.js'
import wxapi from './../../js/util/wxapi.js'
let QRCode = require('qrcode')
export default {
  data() {
    return {
      items: [
        {
          title: '电话',
          info: '1840163111'
        },
        {
          title: '姓名',
          info: '阿作'
        },
        {
          title: '性别',
          info: '男'
        },
        {
          title: '出生日期',
          info: '1991-01-12'
        }
      ],
      sharingType: [
        {
          title: '分享护工',
          number: '1'
        },
        {
          title: '分享用户',
          number: '2'
        }
      ],
      sharingflag: '0',
      sharingseries: '1',
      sharingId: '',
      userId: '',
      QrCodeURL: '',
      QrCodeData: '',
      popupVisible: true
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
    //this.GetUserSharedSalt()
  },
  components: {
    vHeader,
    Cell
  },
  mounted: function() {
    //加载完成后执行
    let $this = this
    //微信浏览器打开
    //  if(wxapi.isweixin()){
    //  	alert("请在微信浏览器打开！")
    //  	return;
    //  }
    //alert(getParam())
    //接收用户id
    if (!window.user) {
      this.userId = this.$route.query.uid
    } else {
      this.userId = window.user.user_id
    }
    this.sharingId = this.$route.query.sharingId
    //根据点击顺序1.分享护工 2.分享用户
    if (this.$route.query.sharingId == 1) {
      //分享护工
      util.Ajax(
        '/api/user/' + this.userId + '/worker?_method=GET',
        {},
        function(data) {
          //console.log(data)
          if (data) {
            let userData = data.data
            if (userData.status == 'success') {
              $this.QrCodeData = userData.result
              $this.createUserQrCode($this.QrCodeData) //生成二维码
              //wxapi.wxRegister('worker', $this.wxRegCallback) //微信分享【】
            }
          }
        }
      )
    } else if (this.$route.query.sharingId == 2) {
      //分享用户
      util.Ajax(
        '/api/user/' + this.userId + '/customer?_method=GET',
        {},
        function(data) {
          //console.log(data)
          if (data) {
            let userData = data.data
            if (userData.status == 'success') {
              $this.QrCodeData = userData.result
              $this.createUserQrCode($this.QrCodeData) //生成二维码
              //wxapi.wxRegister('worker', $this.wxRegCallback) //微信分享【】
            }
          }
        }
      )
    }
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
    wxRegCallback() {
      // let linkParam
      // if (this.sharingId == 1) {
      //   //护工
      //   linkParam =
      //     window.location.href.split('#')[0] +
      //     '#/worker/sharing?uid=' +
      //     this.userId +
      //     '&sharingId=' +
      //     this.sharingId
      // } else {
      //   linkParam =
      //     window.location.host +
      //     '/customer.html#/customer/sharing?uid=' +
      //     this.userId +
      //     '&sharingId=' +
      //     this.sharingId
      // }
      // let opstion = {
      //   title: '分享测试', // 分享标题
      //   link: linkParam, // 分享链接
      //   desc: '分享链接测试',
      //   imgUrl: this.QrCodeURL, // 分享图标
      //   success: function() {
      //     alert('分享成功')
      //   },
      //   error: function() {
      //     alert('分享失败')
      //   }
      // }
      // wxapi.share(opstion)
    },
    sharingClick(num, index) {
      this.sharingflag = index
      this.sharingseries = num
      this.sharingId = num
      let $this = this
      if (index == 2) {
        document.documentElement.scrollTop = this.BodyHeight
      }
      if (this.sharingseries == 1) {
        console.log('分享护工'+ $this.sharingId)
        util.Ajax(
          '/api/user/' + this.userId + '/worker?_method=GET',
          {},
          function(data) {
            //console.log(data)
            if (data) {
              let userData = data.data
              if (userData.status == 'success') {
                $this.QrCodeData = userData.result
                $this.createUserQrCode($this.QrCodeData) //生成二维码
                //wxapi.wxRegister('worker', $this.wxRegCallback) //微信分享【】
              }
            }
          }
        )
      } else if (this.sharingseries == 2) {
        console.log('分享用户'+ $this.sharingId )
        util.Ajax(
          '/api/user/' + this.userId + '/customer?_method=GET',
          {},
          function(data) {
            //console.log(data)
            if (data) {
              let userData = data.data
              if (userData.status == 'success') {
                $this.QrCodeData = userData.result
                $this.createUserQrCode($this.QrCodeData) //生成二维码
                //wxapi.wxRegister('worker', $this.wxRegCallback) //微信分享【】
              }
            }
          }
        )
      }
    }
    //  sharingFriend(){
    //    console.log("分享至朋友圈")//
    //    this.wxShareTimeline() //微信分享【】
    //  }
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

.Sharing {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  padding-top: 4rem;
}

.Sharing .clist {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #fff;
}

.Sharing .clist h3 {
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 1rem;
  line-height: 26px;
  flex: 0 1 30%;
}
.Sharing .clist .iconfont {
  font-size: 2rem;
  line-height: 26px;
}
.Sharing .clist p {
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
.Sharing .but {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  padding: 0.5rem;
  /* width: 3.5rem; */
}
.Sharing .but:not(:last-child) {
  margin-right: 0.5rem;
}
.Sharing .but-select {
  background: #94ca52;
  color: #fff;
}

.Sharing .btn {
  position: fixed;
  left: 50%;
  bottom: 5rem;
  background: #fff;
  height: 3rem;
  line-height: 3rem;
  border: 1px solid #eee;
  background: #94ca52;
  color: #fff;
  border-radius: 5px;
  width: 10rem;
  margin-left: -5rem;
  display: block;
  font-size: 1.2rem;
}

.Sharing .box {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 1.4rem;
  position: relative;
}

.Sharing .box .qrcode {
  margin: 5rem auto 1rem;
}

.Sharing .box .qrcode-txt {
  margin: 40px auto 1rem;
}

.Sharing .kk-logo {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 50%;
  top: 40%;
  margin: -15px 0 0 -15px;
}
.Sharing .kk-logo img {
  height: 100%;
  width: 100%;
}
</style>