<template>
    <div class="registation">
       <v-header></v-header>

				<div class="g-login"><img src="../../../static/img/updata/logo/logo.png"></div>
				<div class="m-login">
					<div class="page-part">
						<div class="login-field"><i class="iconfont">&#xe611;</i> <input placeholder="请输入您的手机" type="tel" maxlength="11"></div>
						<div class="login-field"><i class="iconfont">&#xe627;</i> <input label=" " placeholder="请输入您的验证码" type="tel" maxlength="6">
							<!----><span class="code code-get">免费获取验证码</span></div>
							<button class="mint-button btn-login">登录</button>
						<div class="sponsor-box">点击“登录” 按钮表示您已同意并阅读 “<span class="blue">用户协议</span>”。</div>
					</div>
				</div> 
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
      }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.registation{background:#fff;box-sizing: border-box; padding-top: 4rem; position: absolute; top:0;left:0;bottom: 0;right: 0; width: 100%; height: 100%;}
	/**登录**/

	.registation .g-login{width: 100%;overflow: hidden;height: auto;margin: 0;padding: 0;}
	.registation .g-login img{ width:80px; height:80px; margin:1rem auto; display: block;}
	.registation .btn-login{ width:98%;margin: 3rem auto 1rem; padding: 1rem 0; display: block; background:#00CC66;border: 0; color: #fff; font-size:1.6rem;}
	
	
	/**手机获取验证码**/
	.registation .code{ margin:0; padding:0; width:10rem;text-align: center; position:absolute;bottom:1.5rem;right:0.5rem; border:1px solid #eee; border-radius:5px;background: #eee;color: #999;height:3rem; line-height:3rem; font-size:1.3rem}
	.registation .code-get{background:#00CC66;color:#fff;text-align: center;height:3rem;border:1px solid #00CC66; line-height:3rem; font-size:1rem}
	.registation .page-part{margin-top:1rem; position: relative; overflow: hidden;}
	.registation .m-login{background:#fff; padding-bottom:2rem;}
	.registation .mint-field .mint-cell-title{ width: 42px;}
	.registation .mint-field-other{left:1.5rem;top:1.2rem;position: absolute; width: 42px;}
	.registation .mint-cell-wrapper{border-bottom: 1px solid #eee;background-image:none}
	.registation .login-field{ width: 100%; position: relative; height:6rem;line-height:6rem; overflow: hidden; border-bottom: 1px solid #eee;}
	.registation .login-field input{ width:100%; border: 0; height:4rem; line-height:4rem;line-height: normal; padding-left:4rem;font-size:1.2rem;}
	.registation .login-field .iconfont{position: absolute;top:0rem;left: 1rem;font-size: 2rem; color: #999;}
   .registation .sponsor-box{text-align: center;}
</style>