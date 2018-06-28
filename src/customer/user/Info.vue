<template>
	<div class="info">
		<v-header></v-header>
		<div class="compile" v-on:click="compileClick">编辑</div>
		<div class="head-portrait">
			<p>头像</p>
			<div class="form-group">
				<img :src="avatar" class="portrait" />
				<img :src="isImage" v-if="isImage" class="portrait">
				<input v-if="!isAdd" type="file" class="form-control" @change="onFileChange">
			</div>
		</div>
		<div v-if="isAdd">
			<mt-cell title="姓名" v-bind:value="userData.name"></mt-cell>
			<mt-cell title="电话" v-bind:value="userData.phoneNum"></mt-cell>
			<mt-cell title="性别" v-bind:value="userSexValue"></mt-cell>
			<mt-cell title="出生日期" v-bind:value="userData.birthday"></mt-cell>
		</div>
		<div v-if="!isAdd">
			<mt-field label="姓名" placeholder="请输入用户名" v-model="userData.name"></mt-field>
			<mt-field label="电话" placeholder="请输入电话" v-model="userData.phoneNum"></mt-field>
			<mt-datetime-picker type="date" ref="picker2" v-bind:startDate="initMtDate" v-model="selectBirthday" yearFormat="{value}年" monthFormat="{value}月" dateFormat="{value}日" @confirm="FinishTiemChange"></mt-datetime-picker>
			<div class="mint-cell mint-field">
				<div class="mint-cell-left"></div>
				<div class="mint-cell-wrapper">
					<div class="mint-cell-title">
						<span class="mint-cell-text">出生日期</span>
					</div>
					<div class="mint-cell-value" style="line-height:24px;">
						<p class="mint-field-core" v-on:click="open('picker2')">
							{{userData.birthday}}
							<i class="iconfont picker">&#xe609;</i>
						</p>
					</div>
				</div>
				<div class="mint-cell-right"></div>
			</div>
			<mt-radio title="性别" v-model="userData.gender" v-bind:options="UserSex"></mt-radio>
			<!-- <mt-field  label="出生日期" v-on:click="open('picker2')"  v-model="userData.birthday"  placeholder="请输入生日" ></mt-field> -->
			<button class="button infoButton" v-on:click="saveClick">保存</button>
		</div>
	</div>
</template>
<style>
.info {
  margin-top: 4rem;
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
.compile {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 1000;
  color: #fff;
  font-size: 1.2rem;
}
.info .mint-field-core {
  text-align: right;
  color: #494949;
  border: 1px solid #eee;
  padding: 0.3rem;
}
.infoButton {
  position: fixed;
  left: 50%;
  bottom: 10%;
  background: #94ca52;
  color: #fff;
  width: 10rem;
  border: 0;
  margin-left: -5rem;
  font-size: 1.3rem;
}
.form-control {
  position: absolute;
  top: 2rem;
  right: 0;
  width: 80px;
  opacity: 0;
}
.info .mint-radiolist {
  display: inline-block;
  width: 100%;
  padding: 0 10px;
}
.info .mint-radiolist > * {
  display: inline-block;
  vertical-align: middle;
}
.info .mint-radiolist .mint-radiolist-title {
  margin: 0;
  width: 90px;
  font-size: 16px;
  color: #4d4d4d;
}
</style>
<script>
// import moment from 'moment'
import router from "./../../router";
import util from "./../../js/util/util.js";
import vHeader from "./../common/Header.vue";
import { Cell, Toast, DatetimePicker, MessageBox } from "mint-ui";
import axios from "axios";
export default {
  data() {
    return {
      isImage: false,
      isImageURL: "",
      avatar: "",
      isAdd: true,
      userData: {},
      userSexValue: "男",
      initMtDate: new Date("1960-01-01"),
      selectBirthday: new Date("1960-01-01"),
      value: "",
      UserSex: [
        {
          label: "男",
          value: "male"
        },
        {
          label: "女",
          value: "female"
        }
      ]
      /*{
				    "id": 1,
				    "openId": "oDAEOv4aV21upSgx7JLZPbhdEYbU",
				    "compileusername": "oDAEOv4aV21upSgx7JLZPbhdEYbU@nursingWork",
				    "name": "晖",
				    "birthday": "1997-12-07",
				    "phoneNum": "13985160123",
				    "gender": "male",
				    "avatar": "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&hs=0&pn=3&spn=0&di=169813820110&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=547138142%2C3998729701&os=1840643701%2C1875487181&simid=3533872911%2C354593644&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fwww.hnlywz.com%2Fa%2Fupload%2Fbd118381382.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bigsyoz_z%26e3Bv54AzdH3F8da9bld_z%26e3Bip4s&gsm=0",
				    "createdById": null
				},*/
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
    compileClick: function() {
      //编辑
      this.isAdd = false;
    },
    saveClick: function() {
      //保存
      
      let $this = this;
      let name = $this.userData.name;
      let phoneNum = $this.userData.phoneNum;
      let gender = $this.userData.gender;
      let birthday = $this.userData.birthday;
      if (util.isEmpty(name)) {
        Toast("请输入您的姓名");
        return;
      } else if (!util.isEmpty(name)) {
        var reg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!reg.test(name)) {
          Toast("请正确填写姓名！姓名为两到四个汉字。");
          return;
        }
      }
      if (util.isEmpty(phoneNum)) {
        Toast("请输入您的电话号码");
        return;
      } else if (!util.isEmpty(phoneNum)) {
        var reg = /^1[0-9]{10}/;
        if (!reg.test(phoneNum)) {
          Toast("请正确填写手机号！" + phoneNum);
          return;
        }
      }
      if (util.isEmpty(gender)) {
        Toast("请输入您的性别");
        return;
      }
      if (util.isEmpty(birthday)) {
        Toast("请输入您的出生年月");
        return;
      }
      let formData = new FormData();
      if ($this.isImageURL != "") {
        formData.append("avatar", $this.isImageURL);
      } else {
        formData.append("avatar", $this.userData.avatar);
      }
      formData.append("gender", $this.userData.gender);
      formData.append("name", $this.userData.name);
      formData.append("phoneNum", $this.userData.phoneNum);
      formData.append("birthday", $this.userData.birthday);
      let config = {
        heaers: {
          enctype: "multipart/form-data"
        }
      };
      axios
        .post(
          "/api/user/" + this.$store.state.userId + "/update?_method=PATCH",
          formData,
          config
        )
        .then(response => {
          console.log(response);
          if (response.status === 200) {
						$this.isAdd = true;
            if (response.data) {
              var data = response.data;
              $this.userData = data;
              $this.isImage = false;
              $this.isImageURL = "";
              if ($this.userData.avatar) {
                if ($this.userData.avatar.indexOf("https://") === 0) {
                  $this.avatar = $this.userData.avatar;
                } else {
                  $this.avatar =
                    $this.$store.state.imgUrl + $this.userData.avatar;
                }
              }
              if ($this.userData.birthday) {
                $this.userData.birthday = $this.userData.birthday.split("T")[0];
                $this.selectBirthday = new Date($this.userData.birthday);
              }
              $this.userSexValue =
                $this.userData.gender == "male" ? "男" : "女";
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          $this.msgShow("服务器打盹了,再试一次叫醒它!");
        });
    },
    onFileChange(e) {
      //头像处理 在提交的方法里，通过 this.isImage 即可
      this.isAdd = false;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var _self = this;
      this.createImage(files[0]);
      this.compress(files[0], 0.5, function(err, data) {
        if (err) {
          return;
        }
        _self.isImageURL = data;
      });
    },
    createImage(file) {
      var isImage = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        vm.isImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    open(picker) {
      this.$refs[picker].open();
    },
    FinishTiemChange: function(data) {
      var selectDate = data;
      var selectMonth =
        selectDate.getMonth() + 1 < 10
          ? "0" + (selectDate.getMonth() + 1)
          : selectDate.getMonth() + 1;
      var selectDay =
        selectDate.getDate() < 10
          ? "0" + selectDate.getDate()
          : selectDate.getDate();
      var selectStr =
        selectDate.getFullYear() + "-" + selectMonth + "-" + selectDay;
      this.userData.birthday = selectStr;
    },
    msgShow: function(msg, op) {
      MessageBox.alert(msg).then(action => {
        if (op) {
          location.reload();
        }
      });
    },
    compress: function(file, quality, callback) {
      //图片压缩的方法
      if (!window.FileReader || !window.Blob) {
        return errorHandler("您的浏览器不支持图片压缩")();
      }
      var reader = new FileReader();
      var mimeType = file.type || "image/jpeg";
      reader.onload = createImage;
      reader.onerror = errorHandler("图片读取失败！");
      reader.readAsDataURL(file);
      function createImage() {
        var dataURL = this.result;
        var image = new Image();
        image.onload = compressImage;
        image.onerror = errorHandler("图片加载失败");
        image.src = dataURL;
      }
      function compressImage() {
        var canvas = document.createElement("canvas");
        var ctx;
        var dataURI;
        var result;
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        dataURI = canvas.toDataURL(mimeType, quality);
        result = dataURIToBlob(dataURI);

        callback(null, result);
      }
      function dataURIToBlob(dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1];
        var base64 = dataURI.replace(/^[^,]+,/, "");
        var byteString = atob(base64);

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: type });
      }

      function errorHandler(message) {
        return function() {
          var error = new Error("Compression Error:", message);
          callback(error, null);
        };
      }
    }
  },
  mounted: function() {
    //加载完成后执行
    var $this = this;
    util.Ajax(
      "/api/user/" + this.$store.state.userId + "?_method=GET",
      {},
      function(data) {
        $this.userData = data.data;
        console.log($this.userData);
        if ($this.userData.birthday) {
          $this.userData.birthday = $this.userData.birthday.split("T")[0];
          $this.selectBirthday = new Date($this.userData.birthday);
        }
        if ($this.userData.avatar) {
          if ($this.userData.avatar.indexOf("https://") === 0) {
            $this.avatar = $this.userData.avatar;
          } else {
            $this.avatar = $this.$store.state.imgUrl + $this.userData.avatar;
          }
        }
        $this.userSexValue = $this.userData.gender == "male" ? "男" : "女";
      }
    );
    console.log($this.selectBirthday);
  }
};
</script>
