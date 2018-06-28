<template>
  <div class="registation">
    <div class="reg-head">
      <h1>{{$store.state.headings}}</h1>
    </div>

    <div class="g-login">
      <img src="/static/img/updata/logo/logo.png">
    </div>
    <div class="m-login">
      <div>
        <div class="login-field">
          <i class="iconfont">&#xe611;</i>
          <input placeholder="请输入您的手机" type="tel" maxlength="11" v-model="phoneNum">
        </div>
        <div class="login-field">
          <i class="iconfont">&#xe627;</i>
          <input label=" " placeholder="请输入您的验证码" type="tel" maxlength="6" v-model="verifyCode">
          <span v-if="sendMsgDisabled" class="code">{{time + '秒后获取'}}</span>
          <span v-if="!sendMsgDisabled" class="code code-get" @click="send">免费获取验证码</span>
        </div>
        <button class="mint-button btn-login" v-on:click="registationClick">登录</button>
        <div class="sponsor-box">点击“登录” 按钮表示您已同意并阅读 “
          <span class="blue" v-on:click='go("/worker/agreement")'>用户协议</span>”。</div>
      </div>
    </div>
  </div>
</template>
<style>
.registation .reg-head {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 auto;
  background: #94ca52;
  text-align: center;
  font-size: 14px;
}
.registation .reg-head h1 {
  font-size: 1.3rem;
  width: 100%;
  color: #fff;
}
.registation .reg-head .left {
  position: absolute;
  top: 0;
  left: 1rem;
  color: #fff;
}
.registation .reg-head .left i {
  font-size: 1.4rem;
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
.registation {
  background: #fff;
  box-sizing: border-box;
  padding-top: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
/**登录**/

.registation .g-login {
  width: 100%;
  overflow: hidden;
  height: auto;
  margin: 0;
  padding: 0;
  position: relative;
  background: url('/static/img/css/common/pa_bg.png');
  background-size: 100%;
}
.registation .g-login img {
  width: 80px;
  height: 80px;
  margin: 2rem auto;
  display: block;
}
.registation .btn-login {
  width: 98%;
  margin: 3rem auto 1rem;
  padding: 1rem 0;
  display: block;
  background: #00cc66;
  border: 0;
  color: #fff;
  font-size: 1.6rem;
}

/**手机获取验证码**/
.registation .code {
  margin: 0;
  padding: 0;
  width: 10rem;
  text-align: center;
  position: absolute;
  bottom: 1.5rem;
  right: 0.5rem;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #eee;
  color: #999;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.3rem;
}
.registation .code-get {
  background: #00cc66;
  color: #fff;
  text-align: center;
  height: 3rem;
  border: 1px solid #00cc66;
  line-height: 3rem;
  font-size: 1rem;
}
.registation .page-part {
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}
.registation .m-login {
  background: #fff;
  padding-bottom: 2rem;
}
.registation .mint-field .mint-cell-title {
  width: 42px;
}
.registation .mint-field-other {
  left: 1.5rem;
  top: 1.2rem;
  position: absolute;
  width: 42px;
}
.registation .mint-cell-wrapper {
  border-bottom: 1px solid #eee;
  background-image: none;
}
.registation .login-field {
  width: 100%;
  position: relative;
  height: 6rem;
  line-height: 6rem;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}
.registation .login-field input {
  width: 100%;
  border: 0;
  height: 4rem;
  line-height: 4rem;
  line-height: normal;
  padding-left: 4rem;
  font-size: 1.2rem;
}
.registation .login-field .iconfont {
  position: absolute;
  top: 0rem;
  left: 1rem;
  font-size: 2rem;
  color: #dcdcdc;
}
.registation .sponsor-box {
  text-align: center;
}
</style>
<script>
// import vHeader from './../common/Header.vue'
import router from './../../router'
import util from './../../js/util/util.js'
import { Cell, Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      time: 60, // 发送验证码倒计时
      phoneNum: '',
      verifyCode: '',
      sendMsgDisabled: false,
      reg: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/ //手机验证码
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    Cell
  },
  methods: {
    go: function(url) {
      util.pushRouter(router, url, {})
    },
    registationClick: function() {
      let phoneNum = this.phoneNum
      let verifyCode = this.verifyCode
      if (!phoneNum || phoneNum.length == 0) {
        Toast('请输入手机号！')
        return false
      }
      if (!this.reg.test(phoneNum)) {
        Toast('手机号格式不正确！')
        return false
      }

      if (!verifyCode || verifyCode.length < 4) {
        Toast('请输入正确的六位数验证码！')
        return false
      }
      util.Ajax(
        '/api/user/me?_method=PATCH',
        { phoneNum: phoneNum, verifyCode: verifyCode },
        function(data) {
          if (data) {
            util.getUser();
          	setTimeout(function () {
	            util.pushRouter(router, '/worker/Me');
	          }, 2000)
          }
        }
      )
    },

    send: function() {
      let phoneNum = this.phoneNum
      let me = this
      if (!phoneNum || phoneNum.length == 0) {
        Toast('请输入手机号！')
        return false
      }
      if (!this.reg.test(phoneNum)) {
        Toast('手机号格式不正确！')
        return false
      }
      util.Ajax(
        '/api/user/isDuplicatePhone?_method=GET',
        {
          phoneNum: phoneNum,
          userType: 'nursingWorker'
        },
        function(data) {
          if (data.data.result == false) {  
            me.sendMsgDisabled = true
            let interval = window.setInterval(function() {
              if (me.time-- <= 0) {
                me.time = 60
                me.sendMsgDisabled = false
                window.clearInterval(interval)
              }
            }, 1000)
            util.Ajax(
              '/api/verify-code?_method=POST',
              { phoneNum: phoneNum },
              function(data) {
                if (data) {
                  console.log(data)
                  Toast('验证码已经发送，请注意查收！')
                }
              }
            )
          } else if (data.data.result) {
            MessageBox.alert('该手机号已注册！')
          }
        }
      )
    }
  },
  mounted: function() {
    //加载完成后执行
  }
}
</script>
