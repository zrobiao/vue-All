<template>
  <div class="Sharing">
    <v-header></v-header>
    <div class="box">
      <p class="qrcode">
        <img :src="QrCodeURL" />
      </p>
      <div class="kk-logo">
        <img src="../../assets/kk-logo.png" />
      </div>
      <p class="qrcode-txt">扫码分享</p>
    </div>
    <button class="btn">分享给朋友</button>
  </div>
</template>
<script>
import vHeader from "./../common/Header.vue";
import { Cell } from "mint-ui";
import util from "./../../js/util/util.js";
let QRCode = require("qrcode");
export default {
  data() {
    return {
      QrCodeURL: "",
      QrCodeData: ""
    };
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name; //修改标题
    this.$store.state.isFooterShow = false; //显示底部导航
  },
  components: {
    vHeader,
    Cell
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
      util.Ajax(
        "/api/user/" + window.user.user_id + "/customer?_method=GET",
        {},
        function(data) {
          console.log(data);
          if(data){
          	let userData=data.data
          	if(userData.status == "success"){
            	 $this.QrCodeData = userData.result;
            	 $this.createUserQrCode($this.QrCodeData);//生成二维码
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
    }
  },
  mounted: function() {
    //请求二维码地址
    // let $this = this
    // util.Ajax('/api/user/' + window.user.user_id + '/worker?_method=GET', {}, function(data) {
    //     console.log(data)
    //     //$this.userData = data.data
    // })
    this.GetUserSharedSalt();
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