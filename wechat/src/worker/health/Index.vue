<template>
  <div class="Health">
    <mt-swipe :auto="4000" style="height: 220px;" >
      <mt-swipe-item v-for="item in imgMsgList"><img :src="item.advPicURL"></mt-swipe-item>
    </mt-swipe>
    <div class="info">
      <div class="ti" v-on:click='go("/worker/healthconsultationList")'>
        <i class="iconfont icon">&#xe61c;</i>资讯
        <i class="iconfont right">&#xe600;</i>
      </div>
      <ul>
        <!-- <li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li>
				<li v-on:click='go("/worker/healthconsultationDetails")'><a>如何防范于未然如何防范于未然如何防范于未然如何防范于未然如何防范于未然</a></li> -->
      </ul>
    </div>
  </div>
</template>
<style type="text/css" scoped="scoped">
.Healthtitle {
  width: 96%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  margin: 1rem auto;
  background-color: #94ca52;
  border-radius: 5px;
  color: #fff;
  font-size: 1.4rem;
}
.Healthtitle .navigation {
  font-size: 2rem;
  padding: 0 0.5rem 0 1rem;
}

.Health {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.Health .info {
  width: 96%;
  min-height: 400px;
  margin: 0 auto 1rem;
  border-radius: 10px;
  display: block;
}
.Health .info .ti {
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  position: relative;
  padding-left: 4rem;
}
.Health .info .icon {
  font-size: 1.6rem;
  background: #00c1de;
  padding: 0.3rem;
  color: #fff;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  border-radius: 2px;
}
.Health .info .right {
  font-size: 1.6rem;
  color: #00c1de;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.Health .info ul {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  padding: 1rem 0;
  padding-bottom: 80px;
}
.Health .info ul li {
  line-height: 27px;
  font-size: 1.2rem;
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
}
.Health .info ul li a {
  color: #646464;
}
.Health .info ul li:before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #94ca52;
  border-radius: 50%;
  margin-right: 1rem;
}
</style>
<script>
import router from './../../router'
import util from './../../js/util/util.js'
import { Swipe, SwipeItem, DatetimePicker, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      imgMsgList : [],
    }
  },
  components: {
    Swipe,
    SwipeItem
  },
  created() {
    this.$store.state.isFooterShow = true //显示底部导航
    this.$store.state.flag = 2
    document.title = '护工之家'
  },
  methods: {
    go: function(url) {
      util.pushRouter(router, url, {})
    },
    msgBox: function(_msg, _url) {
      MessageBox.alert(_msg).then(action => {
        this.go(_url)
      })
    }
  },
  mounted: function() {
    //加载完成后执行
    let $this = this
    //获取
    util.Ajax('/api/sysAdvert/userHomeList?_method=GET', {}, function(data) {
      console.log(data.data.data)
      $this.imgMsgList = data.data.data
      for (let index = 0; index < $this.imgMsgList.length; index++) {
        $this.imgMsgList[index].advPicURL=$this.$store.state.alternateUrl+data.data.data[index].advPicURL
        console.log($this.imgMsgList[index].advPicURL)
      }
    })

    util.Ajax(
      '/api/work/isBasicInfoWork/' + this.$store.state.userId,
      {},
      function(data) {
        $this.infoData = data.data
        console.log($this.infoData)
        if ($this.infoData.workStatus == 0) {
          console.log('该用户还未完善信息')
          $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
          return
        }
        if ($this.infoData.basicInfo_desc == '护工信息已完善') {
          util.Ajax(
            '/api/work/isAuthWork/' + $this.$store.state.userId,
            {},
            function(data) {
              console.log(data.data)
              $this.validateData = data.data
              if ($this.validateData.workStatus == 'approved') {
              } else if ($this.validateData.workStatus == 'disapproved') {
                $this.msgBox(
                  '个人信息认证失败，请重新认证',
                  '/worker/attestation'
                )
              } else if ($this.validateData.workStatus == 'checking') {
                $this.msgBox('个人信息认证中，请等待', '/worker/Me')
              } else if ($this.validateData.workStatus == 'unchecked') {
                $this.msgBox('请进行个人信息认证', '/worker/attestation')
              }
            }
          )
        } else if ($this.infoData.basicInfo_desc == '护工信息未完善') {
          $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
        }
      }
    )
  }
}
</script>
