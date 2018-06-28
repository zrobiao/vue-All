<template>
  <div class="seniorInfo">
    <v-header></v-header>
    <div class="compile" v-on:click="compileClick">{{isUpdateT}}</div>
    <div class="head-portrait">
      <p>头像</p>
      <div class="form-group">
        <img :src="userData.avatar" class="portrait" />
        <img :src="isImage" v-if="isImage" class="portrait">
        <input type="file" class="form-control" accept="image/*" @change="onFileChange">
      </div>
    </div>
    <div v-if="isAdd">
      <mt-cell title="姓名" :value="userData.name"></mt-cell>
      <mt-cell title="常用联系人电话" :value="userData.phoneNum"></mt-cell>
      <mt-cell title="性别" :value="userData.gender==='female'?'女':'男'"></mt-cell>
      <mt-cell title="身份证号" :value="userData.idCardNum"></mt-cell>
      <mt-cell title="出生日期" :value="userData.birthday"></mt-cell>
      <mt-cell title="服务经验">{{userData.exp}}年</mt-cell>
      <mt-cell title="所在省份/所在城市">{{userData.prov}}/{{userData.city}}</mt-cell>
      <!--<mt-cell title="所在城市" :value="userData.city"></mt-cell>-->
      <mt-cell title="个人简介" :value="userData.description"></mt-cell>
    </div>
    <div v-if="!isAdd">
      <mt-field label="姓名" placeholder="请输入用户名" v-model="userData.name"></mt-field>
      <mt-field label="常用人电话" placeholder="请输入您的电话" v-model="userData.phoneNum"></mt-field>
      <mt-field label="性别" placeholder="请输入您的性别" id="input-sex"></mt-field>
      <mt-radio class="page-part" v-model="userData.gender" v-bind:options="options1"></mt-radio>
      <mt-field id="cardId" label="身份证号" placeholder="请输入您的身份证号码" v-model="userData.idCardNum" v-if="isApproved==false"></mt-field>
      <mt-cell title="身份证号" :value="userData.idCardNum" v-if="isApproved"></mt-cell>
      <mt-cell title="出生日期" :value="userData.birthday"></mt-cell>
      <mt-field label="服务经验" placeholder="年限在0-20年" v-model="userData.exp" id="input-experience"></mt-field>
      <div class="select-citylist">
        <label>居住城市</label>
        <div>
          <select v-model="selectedProv">
            <option v-for="yx in prov" :value="yx.areaName">
              {{yx.areaName}}
            </option>
          </select>
          <select v-model="selectedCity">
            <option v-for="zy in city" :value="zy.areaName">
              {{zy.areaName}}
            </option>
          </select>
        </div>
      </div>
      <mt-field label="个人简介" placeholder="请输入您的个人简介" v-model="userData.description" style="clear: both;" type="textarea" row="10"></mt-field>
      <button class="button infoButton" v-on:click="saveClick">保存</button>
    </div>
  </div>
</template>
<script type="text/babel">
import vHeader from './../common/Header.vue'
import util from './../../js/util/util.js'
import { Cell } from 'mint-ui'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import axios from 'axios'

export default {
  data() {
    return {
      isImage: false,
      isAdd: true,
      isApproved: false,
      userData: {},
      imageFile: '',
      idCardNum: '',
      value1: '',
      value2: '',
      state: 'warning',
      isUpdateT: '填写资料',
      curWorkId: '',
      cityvalue: '无选中',
      citypopupVisible: false,
      selectedProv: '',
      selectedCity: '',
      prov: [],
      city: [],
      provControl:'',
      cityControl:'',
      options1: [
        {
          label: '男',
          value: 'male'
        },
        {
          label: '女',
          value: 'female'
        }
      ],
      paramUserId: 0,
      value: '',
      initMtDate: new Date('1960-01-01'),
      selectBirthday: new Date('1960-01-01')
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
    this.paramUserId = this.$store.state.userId
    this.getUserBaseInfoFlag()
  },
  components: {
    vHeader,
    Cell
  },
  watch: {
    'userData.idCardNum': function(newVal, oldVal) {
      if (newVal.length == '18') {
        this.userData.birthday = util.getCardData(newVal)
      }
    },
    selectedProv: function() {
      let $this = this 
      this.city = [] 
      this.cityControl = ''
      console.log(this.selectedProv)
      this.provControl = this.selectedProv
      //根据选择的省份选择城市
      util.Ajax('/api/sysAreaInfo?_method=GET', {provName:this.selectedProv}, function(data) {
        console.log(data.data)
        $this.city = data.data
      })
    },
    selectedCity:function(){
      console.log(this.selectedCity) 
      this.cityControl = this.selectedCity
    }
  },
  mounted() {
    let $this = this
    util.Ajax('/api/work/isAuthWork/' + $this.$store.state.userId, {}, function(
      data
    ) {
      console.log(data.data)
      $this.validateData = data.data
      if ($this.validateData.workStatus == 'approved') {
        console.log('护工已认证')
        $this.isApproved = true
      } else {
        console.log('护工未认证')
        $this.isApproved = false
      }
    })
    util.Ajax('/api/sysAreaInfo?_method=GET', {}, function(data) {
      console.log(data.data)
      //this.provList = data.data
      $this.prov = data.data
    })
  },
  methods: {
    getUserBaseInfoFlag: function() {
      var $this = this
      var userBaseFlagURL = '/api/work/isBasicInfoWork/' + this.paramUserId
      axios
        .get(userBaseFlagURL)
        .then(response => {
          let curData = response.data
          if (curData.basicInfo_desc == '护工信息已完善') {
            this.getUserWorkInfo(curData)
          } else {
            $this.isUpdateT = '填写资料'
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    open(picker) {
      this.$refs[picker].open()
    },
    FinishTiemChange: function(data) {
      var selectDate = data
      var selectMonth =
        selectDate.getMonth() + 1 < 10
          ? '0' + (selectDate.getMonth() + 1)
          : selectDate.getMonth() + 1
      var selectDay =
        selectDate.getDate() < 10
          ? '0' + selectDate.getDate()
          : selectDate.getDate()
      var selectStr =
        selectDate.getFullYear() + '-' + selectMonth + '-' + selectDay
      this.userData.birthday = selectStr
    },
    getUserWorkInfo: function(curData) {
      var $this = this
      $this.curWorkId = curData.work_Id
      var getworkInfoURL = '/api/work/' + $this.curWorkId
      axios
        .get(getworkInfoURL)
        .then(response => {
          $this.userData = response.data
          console.log($this.userData)
          let newUrl = $this.userData.avatar
          if ($this.userData.avatar.indexOf('https://') === -1) {
            newUrl = $this.$store.state.imgUrl + $this.userData.avatar
          }
          $this.userData.avatar = newUrl
          $this.addressProvince = $this.userData.prov
          $this.addressCity = $this.userData.city
          $this.userData.curCity =
            $this.userData.prov + '/' + $this.userData.city
          //赋值更新城市
          $this.cityvalue = $this.userData.curCity
          $this.cityModel = $this.userData.curCity
          if ($this.userData.level == 3) {
            $this.userData.level = '高级'
          } else if ($this.userData.level == 2) {
            $this.userData.level == '中级'
          } else {
            $this.userData.level == '初级'
          }
          $this.isUpdateT = '更新资料'
        })
        .catch(error => {
          console.log(error)
        })
    },
    compileClick: function() {
      //编辑
      this.isAdd = false
    },
    saveClick: function() {
      //保存
      let $this = this
      let name = $this.userData.name
      let gender = $this.userData.gender
      $this.userData.level = $this.value2
      let level = ''
      if ($this.value2 == '高级') {
        level = 3
      } else if ($this.value2 == '中级') {
        level = 2
      } else {
        level = 1
      }
      let exp = $this.userData.exp
      let phoneNum = $this.userData.phoneNum
      let openId = $this.userData.openId
      let prov =$this.provControl
        //$this.cityvalue != '无选中' ? $this.cityvalue.split('/')[0] : '未填写'
      let city =$this.cityControl
        //$this.cityvalue != '无选中' ? $this.cityvalue.split('/')[1] : '未填写'
      let idCardNum = $this.userData.idCardNum
      let description = $this.userData.description
      let birthday = this.userData.birthday
      console.log('birthday' + birthday)
      let userId = this.$store.state.userId
      let workId = $this.curWorkId
      let image = $this.imageFile
      if (util.isEmpty(name)) {
        Toast('请输入您的姓名')
        return
      } else if (!util.isEmpty(name)) {
        var reg = /^[\u4e00-\u9fa5]{2,4}$/
        if (!reg.test(name)) {
          Toast('请正确填写姓名！姓名为两到四个汉字。')
          return
        }
      }
      if (util.isEmpty(phoneNum)) {
        Toast('请输入您的电话号码')
        return
      } else if (!util.isEmpty(phoneNum)) {
        var reg = /^1[0-9]{10}/
        if (!reg.test(phoneNum)) {
          Toast('请正确填写手机号！' + phoneNum)
          return
        }
      }
      if (util.isEmpty(gender)) {
        Toast('请输入您的性别')
        return
      }

      if (util.isEmpty(birthday)) {
        Toast('请输入您的出生年月')
        return
      }
      if (util.isEmpty(idCardNum)) {
        Toast('请输入您的身份证号')
        return
      } else if (!util.isEmpty(idCardNum)) {
        var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (pattern.test(idCardNum) == false) {
          Toast('身份证号输入错误')
          return
        }
      }
      if (util.isEmpty(level)) {
        Toast('请输入您想服务的等级')
        return
      }
      if (util.isEmpty(exp)) {
        Toast('请输入您工作了多少年')
        return
      } else if (exp > 20) {
        Toast('请正确填写工作年份！')
        return
      }
      if (util.isEmpty(gender)) {
        Toast('请输入您的性别')
        return
      }
      if (util.isEmpty(description)) {
        Toast('请输入您的个人简介')
        return
      }
      if ($this.isUpdateT == '填写资料') {
        if (util.isEmpty(image)) {
          Toast('请上传您的照片')
          return
        }
      }
      if (prov == '未填写' || prov == '无选中' || prov == 'undef' ||prov == '') {
        Toast('请选择您居住的省份以及城市')
        return
      }
      if (city == '未填写' || city == '无选中' || city == 'undef' || city =='') {
        Toast('请选择您居住的省份以及城市')
        return
      }
      console.log('您要更新的城市为' + prov + city)
      let formData = new FormData()
      formData.append('workAvatar', image)
      formData.append('name', name)
      formData.append('gender', gender)
      if ($this.isUpdateT == '更新资料') {
        formData.append('workId', workId)
      } else {
        formData.append('userId', userId)
      }
      formData.append('level', level)
      formData.append('exp', exp)
      formData.append('phoneNum', phoneNum)
      formData.append('prov', prov)
      formData.append('city', city)
      formData.append('idCardNum', idCardNum)
      console.log('更新的身份证号为' + idCardNum)
      formData.append('description', description)
      formData.append('birthday', birthday)
      let config = {
        heaers: { enctype: 'multipart/form-data' }
      } //添加请求头
      var postURL = '/api/work/addWork/'
      if ($this.isUpdateT === '更新资料') {
        postURL = 'api/work/updateWork/'
      }
      axios
        .post(postURL, formData, config)
        .then(response => {
          console.log(response.data)
          if (response.status == 200) {
            Toast('资料填写成功')
            this.isAdd = true
            var userBaseFlagURL =
              '/api/work/isBasicInfoWork/' + this.paramUserId
            axios
              .get(userBaseFlagURL)
              .then(response => {
                let curData = response.data
                if (curData.basicInfo_desc == '护工信息已完善') {
                  this.getUserWorkInfo(curData)
                } else {
                  $this.isUpdateT = '填写资料'
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          } else {
            Toast('服务器打盹了,再试一次叫醒它！')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    compress: function(file, quality, callback) {
      //图片压缩的方法
      if (!window.FileReader || !window.Blob) {
        // Toast('您的浏览器不支持图片压缩')
        return errorHandler('您的浏览器不支持图片压缩')()
      }
      var reader = new FileReader()
      var mimeType = file.type || 'image/jpeg'
      reader.onload = createImage
      reader.onerror = errorHandler('图片读取失败！')
      reader.readAsDataURL(file)
      function createImage() {
        var dataURL = this.result
        var image = new Image()
        image.onload = compressImage
        image.onerror = errorHandler('图片加载失败')
        image.src = dataURL
      }
      function compressImage() {
        var canvas = document.createElement('canvas')
        var ctx
        var dataURI
        var result
        canvas.width = this.naturalWidth
        canvas.height = this.naturalHeight
        ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        dataURI = canvas.toDataURL(mimeType, quality)
        result = dataURIToBlob(dataURI)
        callback(null, result)
      }
      function dataURIToBlob(dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1]
        var base64 = dataURI.replace(/^[^,]+,/, '')
        var byteString = atob(base64)

        var ia = new Uint8Array(byteString.length)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ia], { type: type })
      }
      function errorHandler(message) {
        return function() {
          var error = new Error('Compression Error:', message)
          callback(error, null)
        }
      }
    },
    onFileChange(e) {
      //头像处理 在提交的方法里，通过 this.isImage 即可
      let $this = this
      this.isAdd = false
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      let file = e.target.files[0]
      console.log('压缩前')
      console.log(file)
      this.compress(file, 0.5, function(err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log('压缩返回数据')
        console.log(data)
        $this.imageFile = data
      })
    },
    createImage(file) {
      var isImage = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = e => {
        vm.isImage = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}

var i = {
  北京: ['北京'],
  广东: ['广州', '深圳']
}
</script>
<style>
.seniorInfo {
  margin-top: 4rem;
  padding: 0 1rem 4rem 1rem;
}
.mint-cell-value {
  max-width: 70%;
  padding: 12px 0;
  color: #494949;
}

#input-city > .mint-cell-wrapper > .mint-cell-value > input {
  display: none;
}

#input-sex > .mint-cell-wrapper > .mint-cell-value > input {
  display: none;
}

#input-level > .mint-cell-wrapper > .mint-cell-value > input {
  display: none;
}

.popup_content .mint-cell-wrapper {
  height: 60px;
}

.popup_content .mint-popup {
  width: 100%;
}

.popup_content .city-operation-btn {
  float: left;
  width: 33%;
  text-align: center;
  font-size: 1.6rem;
  padding: 10px 0 12px 0;
  color: #94ca52;
}

.words-black {
  color: #323232 !important;
}

.popup_content .picker {
  clear: both;
}

#input-city1 {
  position: absolute;
  z-index: 9;
  margin-top: 8px;
}

#choose-city {
  width: 50%;
  float: right;
  margin-top: -42px;
  margin-right: 10px;
}

.compile {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 1000;
  color: #fff;
  font-size: 1.2rem;
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

.seniorInfo .mint-field-core {
  text-align: right;
  color: #494949;
  border: 1px solid #eee;
  padding: 0.3rem;
}
.seniorInfo .mint-field-clear {
  margin-left: 8px;
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

.form-control {
  position: absolute;
  top: 2rem;
  right: 0;
  width: 80px;
  opacity: 0;
}

.mint-cell-wrapper {
  border-bottom: 1px solid #f5f5f5;
}

#input-city {
  margin-top: 40px;
}

#input-city > .mint-cell-wrapper > .mint-cell-value > input {
  display: none;
}

#choose-city {
  width: 50%;
  float: right;
  margin-top: -76px;
  margin-right: 10px;
}

#input-city > .mint-cell-wrapper {
  border-bottom: none;
}

.page-part {
  width: 60%;
  float: right;
  margin-top: -56px;
}

.page-part > .mint-cell {
  width: 50%;
  float: left;
}

#radio-level > .mint-cell {
  width: 33%;
}

#radio-level {
  width: 72%;
}

#radio-level .mint-radiolist-label {
  padding: 0;
}

#radio-level .mint-radio-core {
}

#radio-level .mint-radio-label {
  float: right;
  margin: 2px 16px 0 0;
}
.select-citylist {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.select-citylist label {
  flex: 0 0 auto;
  width: 105px;
  display: block;
}
.select-citylist > div {
  display: flex;
  flex: 0 0 auto;
  max-width: 70%;
  justify-content: right;
}
.select-citylist > div > select {
  flex: 0 0 auto;
  width: 100px;
  display: block;
  text-align: right;
}
.select-citylist > div > select:not(:last-child) {
  margin-right: 10px;
}
@media screen and (max-width: 384px) {
  #radio-level .mint-radio-label {
    margin: 2px 6px 0 0;
  }
}

@media screen and (max-width: 360px) {
  #radio-level .mint-radio-label {
    margin: 2px 2px 0 0;
  }
}

@media screen and (max-width: 320px) {
  #radio-level .mint-radio-label {
    margin: 3px -8px 0 0;
  }
}

/* @component-namespace page {
  @component toast {
    @descendent wrapper {
      padding: 0 20px;
      position: absolute 50% * * *;
      width: 100%;
      transform: translateY(-50%);
      button:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
} */
</style>