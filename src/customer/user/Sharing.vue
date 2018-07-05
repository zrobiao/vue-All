<template>
  <div class="Sharing">
    <v-header></v-header>
    <div class="box">
      <p class="qrcode">
        <!-- <img :src="QrCodeURL" /> -->
        <vue-qr :logoSrc="logoPath" :autoColor="true" :text="QrCodeData" :margin="margin" :size="size" :logoScale="logoScale"></vue-qr>
      </p>
      <!-- <div class="kk-logo">
        <img src="../../assets/kk-logo.png" />
      </div> -->
      <p class="qrcode-txt">扫码分享</p>
    </div>
    <!-- <button class="btn" v-on="clickShare()">分享给朋友</button> -->
  </div>
</template>
<script>
import vHeader from "./../common/Header.vue";
import { Cell } from "mint-ui";
import util from "./../../js/util/util.js";
import wxapi from './../../js/util/wxapi.js'//fx
import VueQr from 'vue-qr'
let QRCode = require("qrcode");
export default {
  data() {
    return {
      userId:'',
      QrCodeURL: "",
      QrCodeData: "",
      logoPath: require('../../assets/kk-logo.png'),
      margin:0,
      size:240,
      logoScale:0.15
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
  },
  components: {
    vHeader,
    Cell,
    VueQr
  },
  methods: {
    createUserQrCode: function(salt) {
      //salt 加载密钥
      //参考官网 https://www.npmjs.com/package/qrcode#qr-code-options
      var _$this = this;
      var _QrCodeOptions = {
        errorCorrectionLevel: "H",
        version: 9
      };
      QRCode.toDataURL(salt, _QrCodeOptions, function(error, url) {
        if (!error) _$this.QrCodeURL = url;
      });
    },
    GetUserSharedSalt: function() {
      //从服务器中获取请求二维码地址
      let $this = this;
      //接收用户id
      if (!window.user) {
        this.userId = this.$route.query.uid;
      } else{
        this.userId = window.user.user_id;
      }
      util.Ajax(
        "/api/user/" + this.userId + "/customer?_method=GET",
        {},
        function(data) {
          console.log(data);
          if(data){
          	let userData=data.data
          	if(userData.status == "success"){
            	 $this.QrCodeData = userData.result;
            	 $this.createUserQrCode($this.QrCodeData);//生成二维码
               wxapi.wxRegister('customer', $this.wxRegCallback) //微信分享【】2
            }else{
              $this.QrCodeData = '分享出错了，请联系客户给您解决！';
            	 $this.createUserQrCode($this.QrCodeData);//生成二维码
            }
          }
        }
      );
      //  console.log($this.QrCodeData);
      //  //生成二维码
      // var salt = '你好！测试二维码。';
      // $this.createUserQrCode(salt);
    },
    wxRegCallback() {
      let opstion = {
        title: '欢迎关注好陪护', // 分享标题
        link: window.location.href.split('#')[0]+"#/customer/sharing?uid="+this.userId, // 分享链接
        desc: '深圳市快康网络技术有限公司成立于2016年初，是全国最早从事护理行业互联网+的公司之一。',
        imgUrl:"https://"+window.location.host+"/static/img/kk-logo.13fb57f.png", // 分享图标
        success: function() {
          alert('分享成功')
        },
        error: function() {
          alert('分享失败')
        }
      }
      wxapi.share(opstion)
    },
    // clickShare:function(){
    //   let $this = this
    //   wxapi.wxRegister('customer', $this.wxRegCallback) //微信分享【】2
    // },
  },
  mounted: function() {
    //请求二维码地址
    // let $this = this
    // util.Ajax('/api/user/' + window.user.user_id + '/worker?_method=GET', {}, function(data) {
      //     console.log(data)
    //     //$this.userData = data.data
    // })
    this.GetUserSharedSalt();
    // wxapi.wxRegister('customer', $this.wxRegCallback) //微信分享【】2
    //加载完成后执行
  }
};
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
.Sharing .btn {
  position: fixed;
  left: 50%;
  bottom: 5rem;
  background: #fff;
  height: 3rem;
  line-height: 3rem;
  border: 1px solid #eee;
  background: #00cc66;
  color: #fff;
  border-radius: 5px;
  width: 10rem;
  margin-left: -5rem;
  display: block;
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
  width: 220px;
  height: 220px;
}
.Sharing .box .qrcode-txt {
  margin: 40px auto 1rem;
}
.Sharing .kk-logo{
  position: absolute;
  width:30px;
  height:30px;
  left:50%;
  top:40%;
  margin:-15px 0 0 -15px;
}
.Sharing .kk-logo img{
  height: 100%;
  width:100%;
}
  
</style>