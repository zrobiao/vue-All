<template style="background-color: white;">
  <div class="Attestation main">
    <v-header></v-header>
    <div class="cell" style="padding-top: 20px;">
      <!-- <mt-field id="cardId" label="身份证号" placeholder="请输入您的身份证号码" v-model="idCardNum"></mt-field> -->
    </div>
    <div class="cell">
      <span>身份证照片</span>
      <div class="upload-box">
        <div class="upload-cell">
          <p>正面</p>
          <div class="preview">
            <!-- <button class="btn" v-on:click="frontClick">
							<i slot="icon" class="iconfont" style="color: #CCCCCC;">&#xe63e;</i>
						</button> -->
            <img src="/static/img/updata/slide/plus.png" class="portrait" />
            <img :src="isImage1" v-if="isImage1" class="portrait">
            <input type="file" class="form-control" accept="image/*" @change="onFileChange">
          </div>
        </div>
        <div class="upload-cell fr ">
          <p>反面</p>
          <div class="preview ">
            <!--<button class="btn " v-on:click="reverseClick ">-->
            <!--<i slot="icon " class="iconfont " style="color: #CCCCCC; ">&#xe63e;</i></button>-->
            <img src="/static/img/updata/slide/plus.png " class="portrait" />
            <img :src="isImage2" v-if="isImage2" class="portrait">
            <input type="file" class="form-control" accept="image/*" @change="onFileChange2">
          </div>
        </div>
      </div>
    </div>
    <div class="cell">
      <span>健康证</span>
      <div class="upload-box">
        <div class="upload-cell">
          <p>主页</p>
          <div class="preview">
            <!--<button class="btn" v-on:click="cardClick">
							<i slot="icon" class="iconfont" style="color: #CCCCCC;">&#xe63e;</i>
						</button>-->
            <img src="/static/img/updata/slide/plus.png" class="portrait" />
            <img :src="isImage3" v-if="isImage3" class="portrait" />
            <input type="file" class="form-control" accept="image/*" @change="onFileChange3" />
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btn ">
      <button class="btn " v-on:click="submitClick">提交审核</button>
    </div>
  </div>
</template>
<script type="text/babel">
import vHeader from './../common/Header.vue'
import { Indicator, Cell, MessageBox } from 'mint-ui'
import util from './../../js/util/util.js'
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  data() {
    return {
      isImage1: false,
      isImage2: false,
      isImage3: false,
      imageFile1: '',
      imageFile2: '',
      imageFile3: '',
      //idCardNum: '',
      isUpload: false,
      workId: '',
      avatar: ''
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    Cell
  },
  mounted: function() {
    //加载完成后执行
    var $this = this
    util.Ajax(
      '/api/work/isBasicInfoWork/' + $this.$store.state.userId,
      {},
      function(data) {
        let curData = data.data
        $this.workId = curData.work_Id
      }
    )
  },
  methods: {
    frontClick: function() {
      //身份证正面照
      console.log('身份证正面照')
    },
    reverseClick: function() {
      //身份证背面照
      console.log('身份证背面照')
    },
    cardClick: function() {
      //健康证照
      console.log('健康证照')
    },
    msgShow: function(msg, op) {
      MessageBox.alert(msg).then(action => {
        if (op) {
          location.reload()
        }
      })
      //
    },
    reSet: function() {
      // this.isImage1 = false
      // this.isImage2 = false
      // this.isImage3 = false
      // this.imageFile1 = null
      // this.imageFile2 = null
      // this.imageFile3 = null
      // this.idCardNum = ''
      // this.isUpload = false
      // util.pushRouter(router,'/worker/attestation', {})
    },
    submitClick: function() {
      if (this.isUpload == true) {
        console.log('认证中请等待')
        return this.msgShow('认证中请等待')
      }
      console.log('提交审核')
      let $this = this
      let workId = $this.workId
      //let idCardNum = $this.idCardNum
      let imageFile1 = $this.imageFile1
      let imageFile2 = $this.imageFile2
      let imageFile3 = $this.imageFile3
      //console.log('需要提交审核的身份证号为:' + idCardNum)
      // console.log('需要提交审核的护工号号为:' + workId)
      // if (util.isEmpty(idCardNum)) {
      //   Toast('请输入您的身份证号')
      //   return
      // } else if (!util.isEmpty(idCardNum)) {
      //   var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      //   if (pattern.test(idCardNum) == false) {
      //     Toast('身份证号输入错误')
      //     return
      //   }
      // }
      if (util.isEmpty(imageFile1)) {
        Toast('请上传身份证正面照片')
        return
      }
      if (util.isEmpty(imageFile2)) {
        Toast('请上传身份证背面照片')
        return
      }
      if (util.isEmpty(imageFile3)) {
        Toast('请上传身份证主页照片')
        return
      }
      this.isUpload = true
      let formData = new FormData()
      formData.append('workId', workId)
      //formData.append('idCardNum', idCardNum)
      formData.append('workAuth', imageFile1)
      formData.append('workAuth', imageFile2)
      formData.append('workAuth', imageFile3)
      let config = {
        heaers: {
          enctype: 'multipart/form-data'
        }
      }
      axios
        .post('/api/work/authWork/', formData, config)
        .then(response => {
          if (response.status == 200) {
            if (response.data.status == 1) {
              $this.msgShow('提交成功，等待验证结果 ',1)
              //$this.isUpload = false
              //$this.reSet()
            } else {
              Toast(response.data)
              //$this.isUpload = false
              $this.reSet()
              return
            }
          } else {
            $this.msgShow('服务器打盹了,再试一次叫醒它!')
            //$this.isUpload = false
            //$this.reSet()
          }
        })
        .catch(function(error) {
          //$this.msgShow(error.message)
          //$this.reSet()
        })
    },
    compress: function(file, quality, callback) {
      //图片压缩的方法
      if (!window.FileReader || !window.Blob) {
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

      //上传图片【
      //console.log("可以过了????????? ")
      //$this.state = 'error';
      let file = e.target.files[0]
      this.imageFile1 = file
      console.log('压缩前1')
      console.log(file)
      this.compress(file, 0.5, function(err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log('压缩返回数据1')
        console.log(data)
        $this.imageFile1 = data
      })
      console.log(this.imageFile1)
    },
    createImage(file) {
      var isImage = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = e => {
        vm.isImage1 = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange2(e) {
      //头像处理 在提交的方法里，通过 this.isImage 即可
      let $this = this
      this.isAdd = false
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage2(files[0])

      //上传图片【
      //console.log("可以过了????????? ")
      //$this.state = 'error';
      let file = e.target.files[0]
      console.log('压缩前2')
      console.log(file)
      this.compress(file, 0.5, function(err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log('压缩返回数据2')
        console.log(data)
        $this.imageFile2 = data
      })
      //this.imageFile2 = file
      //console.log(this.imageFile2)
    },
    createImage2(file) {
      var isImage = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = e => {
        vm.isImage2 = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange3(e) {
      //头像处理 在提交的方法里，通过 this.isImage 即可
      let $this = this
      this.isAdd = false
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage3(files[0])

      //上传图片【
      //console.log("可以过了????????? ")
      //$this.state = 'error';
      let file = e.target.files[0]
      console.log('压缩前3')
      console.log(file)
      this.compress(file, 0.5, function(err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log('压缩返回数据3')
        console.log(data)
        $this.imageFile3 = data
      })
      //this.imageFile3 = file
      //console.log(this.imageFile3)
    },
    createImage3(file) {
      var isImage = new Image()
      var reader = new FileReader()
      var vm = this
      reader.onload = e => {
        vm.isImage3 = e.target.result
      }
      reader.readAsDataURL(file)
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

html,
body,
input,
span {
  margin: 0;
  padding: 0;
}

.fr {
  float: right !important;
}

.main {
  width: 88%;
  margin: 20px auto;
}

.cell {
  width: 100%;
  font-size: 20px;
  margin-bottom: 30px;
  color: #323232;
}

.cell > span {
  display: inline-block;
  width: 34%;
}

.cell > input {
  width: 62%;
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  background-color: transparent;
}

.upload-box {
  width: 100%;
  height: 140px;
}

.upload-cell {
  width: 45%;
  float: left;
}

.upload-cell > p {
  font-size: 16px;
  color: #94ca52;
  padding: 12px 0;
}

.preview {
  width: 100%;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  /*background-image: url(add.png);*/
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
  text-align: center;
  line-height: 80px;
  position: relative;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
}

.preview > input {
  opacity: 0;
}

.portrait {
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: none !important;
  overflow: hidden;
  float: none;
  position: absolute;
  top: 0%;
  left: 0%;
}

.iconfont {
  font-size: 30px;
}

.btn {
  border: none;
  background-color: transparent;
  outline: none;
  color: white;
}

.submit-btn {
  width: 200px;
  height: 40px;
  margin: 40px auto;
  border-radius: 4px;
  background-color: #94ca52;
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}

.form-control {
}

@media screen and (max-width: 375px) {
  .cell,
  .cell > input {
    font-size: 18px;
  }
  .preview {
    height: 70px;
    line-height: 70px;
  }
}

@media screen and (max-width: 320px) {
  .cell,
  .cell > input {
    font-size: 16px;
  }
  .upload-cell > p {
    font-size: 14px;
  }
  .preview {
    height: 64px;
    line-height: 64px;
  }
}
</style>