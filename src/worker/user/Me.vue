<template>
  <div class="Me">
    <div class="me" v-on:click='go("worker/info",userData.openId)'>
      <div class="user-img"><img :src="avatar"></div>
      <div class="title">
        <p class="name">{{userData.name}}</p>
        <!--<p>{{userData.phoneNum}}</p>-->
        <i class="iconfont" v-for="(item,index) in 5" :class="{'on':isStar>index}">&#xe62f;</i>
      </div>
      <div class="state">{{fruit}}</div>
    </div>
    <div class="me-tab">
      <mt-cell to='/worker/seniorInfo' :title=curType v-if='infoOver'>
        <i slot="icon" class="iconfont" style="background:#45c6c8;">&#xe63c;</i>
      </mt-cell>
      <!-- attestation -->
      <mt-cell to='/worker/attestation' title="护工认证" v-if='flagAttest'>
        <i slot="icon" class="iconfont" style="background:#5aa6e6;">&#xe648;</i>
      </mt-cell>
      <mt-cell to='/worker/thewallet' title="钱包">
        <i slot="icon" class="iconfont" style="background:#FF4F2D;">&#xe623;</i>
      </mt-cell>
      <!-- <mt-cell to='/worker/coupons' title="优惠券">
				<i slot="icon" class="iconfont" style="background:#009BF7;">&#xe638;</i>
			</mt-cell> -->
      <mt-cell to='/worker/about' title="关于我们">
        <i slot="icon" class="iconfont" style="background:#F32043;">&#xe61b;</i>
      </mt-cell>
      <mt-cell to='/worker/service' title="服务条款">
        <i slot="icon" class="iconfont" style="background:#00CC66;">&#xe617;</i>
      </mt-cell>
      <!-- <mt-cell to='/worker/complaints' title="投诉建议">
				<i slot="icon" class="iconfont" style="background:#FDAA3B;">&#xe62b;</i>
			</mt-cell> -->
      <mt-cell title="服务热线" to="tel:96028">
        <i slot="icon" class="iconfont" style="background:#AE5BFE;">&#xe616;</i>
        <span class="red" style="margin-right:3rem;">96028</span>
      </mt-cell>
      <mt-cell v-on:click.native="toSharing(1)" title="我的分享">
        <i slot="icon" class="iconfont" style="background:#00B7FF;">&#xe618;</i>
      </mt-cell>
      <!-- <mt-cell v-on:click.native="toSharing(2)" title="分享用户">
        <i slot="icon" class="iconfont" style="background:#00B7FF;">&#xe618;</i>
      </mt-cell> -->
      <mt-cell v-on:click.native="toCollect" title="收款码">
        <i slot="icon" class="iconfont" style="background:#FDAA3B;">&#xe618;</i>
      </mt-cell>
      <!-- <mt-cell  title="我的推荐">
        <i slot="icon" class="iconfont" style="background:#FDAA3B;">&#xe618;</i>
      </mt-cell> -->
    </div>
  </div>
</template>

<script>
import router from './../../router'
import util from './../../js/util/util.js'
import { Indicator, Cell, MessageBox, Toast } from 'mint-ui'
export default {
  data() {
    return {
      userData: {},
      infoData: {},
      validateData: {},
      flagAttest: false,
      infoOver: false,
      curType: '护工信息(未完善)',
      fruit: '未认证',
      isStar: 0,
      avatar: ''
      /*{
				    "id": 1,
				    "openId": "oDAEOv4aV21upSgx7JLZPbhdEYbU",
				    "username": "oDAEOv4aV21upSgx7JLZPbhdEYbU@nursingWork",
				    "name": "晖",
				    "birthday": "1997-12-07",
				    "phoneNum": "13985160123",
				    "gender": "male",
				    "avatar": "http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A4%B4%E5%83%8F&hs=0&pn=3&spn=0&di=169813820110&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=547138142%2C3998729701&os=1840643701%2C1875487181&simid=3533872911%2C354593644&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fwww.hnlywz.com%2Fa%2Fupload%2Fbd118381382.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bigsyoz_z%26e3Bv54AzdH3F8da9bld_z%26e3Bip4s&gsm=0",
				    "createdById": null
				},*/
    }
  },
  created() {
    this.$store.state.isFooterShow = true //显示底部导航
    this.$store.state.flag = 3
    document.title = '我的'
  },
  components: {
    Cell
  },
  methods: {
    go: function(url, openId) {
      console.log(openId)
      util.pushRouter(router, url, {
        openId: openId
      })
    },
    toCollect: function() {
      this.isCreat()
    },
    isCreat: function() {
      let $this = this
      util.Ajax(
        'api/order/isCreateOrder?_method=GET',
        {
          workId: $this.$store.state.workId
        },
        function(data) {
          console.log('获取接单信息')
          let isCreatMsg = data.data
          console.log(isCreatMsg.data)
          if (!isCreatMsg.status) {
            console.log('1.我要查询号的订单号为' + isCreatMsg.data)
            let orderid = isCreatMsg.data
            MessageBox.confirm(isCreatMsg.message).then(action => {
              util.pushRouter(router, '/supervisor/details', {
                orderid: orderid
              })
            })
          }else {
            util.pushRouter(router, '/worker/collect', {})
          }
        }
      )
    },
    toSharing: function(sharingId) {
      util.pushRouter(router, '/worker/sharing', {
        sharingId: sharingId
      })
    },
    getUser: function(id) {
      let $this = this
      util.Ajax('/api/user/' + id + '?_method=GET', {}, function(data) {
        console.log('获取用户信息')
        console.log(data.data)
        $this.userData = data.data
      })
    },

    msgBox: function(_msg, _url) {
      MessageBox.alert(_msg).then(action => {
        this.go(_url)
      })
    },

    checkWorker: function() {
      let $this = this
      util.Ajax('/api/work/' + $this.$store.state.workId, {}, function(data) {
        console.log('查看护工信息')
        console.log(data.data)
        $this.userData = data.data
        $this.isStar = $this.userData.star
        if ($this.userData.avatar) {
          if ($this.userData.avatar.indexOf('https://') === 0) {
            $this.avatar = $this.userData.avatar
          } else {
            $this.avatar = $this.$store.state.imgUrl + $this.userData.avatar
          }
        }
      })
    },

    fruitWorker: function() {
      let $this = this
      util.Ajax(
        '/api/work/isAuthWork/' + $this.$store.state.userId,
        {},
        function(data) {
          console.log(data.data)
          $this.validateData = data.data
          if ($this.validateData.workStatus == 'approved') {
            $this.flagAttest = false
            $this.fruit = '已认证'
          } else if ($this.validateData.workStatus == 'disapproved') {
            console.log('护工认证失败')
            //checking状态或者其他
            $this.flagAttest = true
            $this.fruit = '未通过'
            //$this.msgBox('个人信息认证失败，请重新认证', '/worker/attestation')
          } else if ($this.validateData.workStatus == 'checking') {
            $this.fruit = '认证中'
            //$this.msgBox('个人信息认证中，请等待', '/worker/Me')
          } else if ($this.validateData.workStatus == 'unchecked') {
            //checking状态或者其他
            $this.flagAttest = true
            $this.fruit = '未认证'
            //$this.msgBox('请进行个人信息认证', '/worker/attestation')
          }
        }
      )
    },

    userMsg: function() {
      let $this = this
      util.Ajax(
        '/api/work/isBasicInfoWork/' + this.$store.state.userId,
        {},
        function(data) {
          console.log('查看用户信息是否完善')
          console.log(data.data)
          $this.infoData = data.data
          if ($this.infoData.workStatus == 0) {
            $this.infoOver = true
            $this.flagAttest = false
            $this.curType = '护工信息(未完善)'
            $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
            return
          }
          if ($this.infoData.basicInfo_desc == '护工信息已完善') {
            $this.infoOver = true
            $this.curType = '护工信息(已完善)'
            $this.$store.state.workId = data.data.work_Id
            if (!util.isEmpty(data.data.work_Id)) {
              util.setCookie('workId', data.data.work_Id)
            } else {
              $this.$store.state.workId = util.getCookie('workId')
            }
            $this.checkWorker()
            $this.fruitWorker()
          } else if ($this.infoData.basicInfo_desc == '护工信息未完善') {
            $this.curType = '护工信息(未完善)'
            $this.infoOver = true
            $this.flagAttest = false
            $this.msgBox('请完善你的个人信息', '/worker/seniorInfo')
          }
        }
      )
    }
  },
  mounted: function() {
    var $this = this
    //微信
    if (window.user) {
      $this.$store.state.userId = window.user.user_id
      $this.getUser($this.$store.state.userId)
      $this.userData = window.user
      if ($this.userData.avatar) {
        if ($this.userData.avatar.indexOf('https://') === 0) {
          $this.avatar = $this.userData.avatar
        } else {
          $this.avatar = $this.$store.state.imgUrl + $this.userData.avatar
        }
        $this.userMsg()
      } 
      else {
        util.getUser()
      }  
    }

    util.Ajax('/api/agreement/queryAboutUS?_method=GET', {}, function(data) {
      //console.log(data)
      $this.msg = data.data.data.content
    })
     //$this.userMsg() //本地
    //_______________________
    //  util.Ajax('/api/user/me?_method=GET', {}, function(data) {
    //    console.log(data)
    //    if(data){
    //    	  $this.$store.state.userId = data.data.user_id
    // 		      console.log('userId:' + $this.$store.state.userId)
    // 		      $this.getUser($this.$store.state.userId)
    // 		      util.Ajax('/api/user/' + this.$store.state.userId, {}, function(data) {
    // 		        $this.userData = data.data;
    // 		          if($this.userData.avatar){
    // 		            if($this.userData.avatar.indexOf('https://')===0){
    // 		              $this.avatar= $this.userData.avatar
    // 		            }else{
    // 		              $this.avatar=$this.$store.state.imgUrl+$this.userData.avatar
    // 		            }
    // 		          }
    // 		      }) //2018年1月23日19:32:35
    //    }
    //  }) //2018-03-15

    //2018年2月26日10:09:38本地
    // util.Ajax('/api/user/' + this.$store.state.userId, {}, function(data) {
    //   console.log('拿到用户信息')
    //   console.log(data.data)
    //   $this.userData = data.data
    //   if ($this.userData.avatar) {
    //     if ($this.userData.avatar.indexOf('https://') === 0) {
    //       $this.avatar = $this.userData.avatar
    //     } else {
    //       $this.avatar = $this.$store.state.imgUrl + $this.userData.avatar
    //     }
    //   }
    // }) //2018年1月23日19:32:35
  }
}
</script>
<style>
.Me {
  padding-bottom: 80px;
}

.Me .me {
  width: 100%;
  padding: 1rem;
  background: #fff;
  display: flex;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 8px solid #eee;
}

.Me .user-img {
  width: 30%;
  height: 80px;
  text-align: left;
}

.Me .name {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.Me .title {
  padding-left: 1.5rem;
  font-size: 1.4rem;
}

.Me .state {
  width: 40%;
  text-align: right;
  color: #fd6f37;
  font-size: 1.4rem;
  line-height: 80px;
  padding-right: 10px;
}

.Me .user-img img {
  width: 80px;
  height: 80px;
  /* border-radius: 50%; */
  display: block;
}

.Me .mint-cell-wrapper {
  border-bottom: 4px solid #f5f5f5;
}

.Me .mint-cell:before {
  content: ' ';
  position: absolute;
  top: 20px;
  right: 15px;
  display: block;
  width: 10px;
  height: 10px;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  transform: rotate(45deg);
}

.Me .mint-cell-title {
  position: relative;
}

.Me .mint-cell-title .mint-cell-text {
  margin-left: 4rem;
}

.Me .mint-cell .iconfont {
  margin-right: 1.2rem;
  font-size: 1.4em;
  position: absolute;
  top: -0.4rem;
  left: 0;
  background: #ccc;
  padding: 0.2rem;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  display: block;
  overflow: hidden;
  width: 2rem;
}

.me-tab .mint-cell:first-child {
  background-image: -webkit-linear-gradient(
    bottom,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-image: linear-gradient(
    0deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 50%
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top;
}

.Me .iconfont {
  margin-right: 0.5rem;
  font-size: 1.8rem;
}

.Me .on {
  color: #94ca52;
}
</style>
