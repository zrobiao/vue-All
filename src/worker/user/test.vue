<template>
  <div class="test">
    <img src="../../assets/logo.png" alt="" id="img1">
    <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change1($event)">

    <img src="../../assets/logo.png" alt="" id="img2">
    <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change2($event)">

    <img src="../../assets/logo.png" alt="" id="img3">
    <input type="file" accept="image/png,image/jpg,image/jpeg" @change="change3($event)">

    <div class="submit-btn ">
      <button class="btn " v-on:click="submitClick">提交审核</button>
    </div>
  </div>
</template>

<script>
import vHeader from './../common/Header.vue'
import { Indicator, Cell, MessageBox } from 'mint-ui'
import util from './../../js/util/util.js'
import { Toast } from 'mint-ui'
import axios from 'axios'
export default {
  data() {
    return {
      imageFile1: '',
      imageFile2: '',
      imageFile3: ''
    }
  },

  methods: {
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     *            用url方式表示的base64图片数据
     */

    // convertBase64UrlToBlob(urlData) {
    //   console.log(urlData.src)
    //   console.log(urlData.src)

    //   var bytes = window.atob(urlData.src.split(',')[1]) //去掉url的头，并转换为byte

    //   //处理异常,将ascii码小于0的转换为大于0
    //   var ab = new ArrayBuffer(bytes.length)
    //   var ia = new Uint8Array(ab)
    //   for (var i = 0; i < bytes.length; i++) {
    //     ia[i] = bytes.charCodeAt(i)
    //   }

    //   return new Blob([ab], { type: 'image/png' })
    // },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    change1(event) {
      let $this = this
      let image1 = document.getElementById('img1') //预览对象
      console.log(image1)
      this.clip(event, {
        resultObj: image1,
        aspectRatio: 1
      })
      $this.imageFile1 = this.dataURLtoFile(image1.src, 'test1')
      //console.log($this.imageFile1)
    },

    change2(event) {
      let image2 = document.getElementById('img2') //预览对象
      this.clip(event, {
        resultObj: image2,
        aspectRatio: 1
      })
      this.imageFile2 = this.dataURLtoFile(image2.src, 'test2')
    },

    change3(event) {
      let image3 = document.getElementById('img3') //预览对象
      this.clip(event, {
        resultObj: image3,
        aspectRatio: 1
      })
      this.imageFile3 = image3
      this.imageFile3 = this.dataURLtoFile(image3.src, 'test3')
    },

    submitClick: function() {
      console.log('提交审核')
      this.getFile()
      let $this = this
      let workId =  $this.$store.state.workId
      console.log(workId)
      let imageFile1 = $this.imageFile1
      let imageFile2 = $this.imageFile2
      let imageFile3 = $this.imageFile3
      console.log('imageFile1')
      console.log(imageFile1)
      console.log('imageFile2')
      console.log(imageFile2)
      console.log('imageFile3')
      console.log(imageFile3)
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
              $this.msgShow('提交成功，等待验证结果 ', 1)
              //$this.isUpload = false
              //$this.reSet()
            } else {
              Toast(response.data)
              console.log(response.data)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  padding-bottom: 70px;
}
img {
  display: block;
  width: 269px;
  height: 184px;
  margin: 0 auto;
}
h3 {
  text-align: center;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

input[type='file'] {
  outline: none;
  margin-top: 20px;
}

#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #1aad19;
  color: #fff;
}
#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  color: #fff;
  background: #e64340;
}
#clip_container.container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}
#clip_container.container > div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#clip_image {
  max-width: 100%;
}

.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 100px;
  width: 100px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}
.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>

