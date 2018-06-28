<template>
  <div class="order-totals">
    <v-header></v-header>
    <div class="list">
      <i class="iconfont">&#xe633;</i>
      <h3>添加医院</h3>
      <div>
        <div v-for="(items,index) in hospitals">
          <p> {{items.name}}</p>
          <button class="but" v-on:click='deleteHospital(index)'>删除</button>
        </div>
        <p v-on:click='go("/worker/hospital",curIndex)' class="addhospital" v-if="isAdd">
          <i class="iconfont">&#xe63e;</i>{{addText}}</p>
      </div>
    </div>
    <!-- <div class="list">
      <i class="iconfont">&#xe630;</i>
      <h3>护理类型</h3>
      <p>
        <div v-for="level in levels">
          <button class="but" :class="{'but-red':level.flags==true}" v-on:click='serveClik(level.id)'>{{level.name}}</button>
        </div>
      </p>
    </div> -->
    <div class="list">
      <h3>接单状态</h3>
      <h3>暂停接单</h3>
      <mt-switch v-model="isValue"></mt-switch>
      <h3>开始接单</h3>
    </div>
    <button class="button button-green" v-on:click='identified'>确认设置</button>
  </div>
</template>


<script>
import router from './../../router'
import util from './../../js/util/util.js'
import vHeader from './../common/Header.vue'
import { Cell, Checklist, Switch, Toast } from 'mint-ui'
export default {
  data() {
    return {
      isAdd: true, // 是否需要添加医院的按钮
      addText: '', //添加按钮上的文字显示
      isValue: false, //是否接单
      curIndex: 1, //当前是第几个医院
      limitCity: '贵州省', //限制城市
      limitCode: '贵阳市', //限制编码
      hospitals: [], //医院集合
      meta: {
        keepAlive: false // 需要被缓存
      },
      levels: [
        { id: '0', name: '非卧床', flags: false, msg: '' },
        { id: '1', name: '卧床', flags: false, msg: '' },
        { id: '2', name: '特殊', flags: false, msg: '' }
      ]
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = false //显示底部导航
  },
  components: {
    vHeader,
    Cell,
    Checklist
  },
  methods: {
    go: function(url, index, curData) {
      util.pushRouter(router, url, {
        index: index,
        curData: curData,
        limitCity: this.limitCity,
        limitCode: this.limitCode
      })
    },
    identified: function() {
      //console.log('确认设置')
      let workId = this.$store.state.workId
      let $this = this
      //接单医院设置
      let hospital = ''
      let intercept = 0
      let hospitals = JSON.parse(localStorage.getItem('hospitals'))
      for (let index = 0; index < hospitals.length; index++) {
        if (!util.isEmpty(hospitals[index].hospital_id)) {
          if (intercept == 0) {
            hospital += hospitals[index].hospital_id
            intercept = intercept + 1
          } else if (intercept == 1) {
            hospital += ',' + hospitals[index].hospital_id
            intercept = intercept + 1
          } else if (intercept == 2) {
            hospital += ',' + hospitals[index].hospital_id
          }
        }
      }
      console.log('设置的医院id:' + hospital)
      if (hospital=='') {
        Toast('请至少添加一个医院')
        return
      }
      //接单等级设置
      let level = 'level1,level2,level3'
      //上传数据到服务器
      util.Ajax(
        'api/work/' + workId + '/service?_method=PUT',
        {
          dependentLevel: level,
          hospitalIds: hospital
        },
        function(data1) {
          Toast('医院设置成功')
          localStorage.setItem('hospitals', null)
        }
      )
      //设置接单状态
       $this.ServiceStartChange()
    },
    ServiceStartChange: function () {
      let $this = this
      let workId = $this.$store.state.workId
      //设置是否开启接单
      let choose =$this.isValue===true?'active':'inactive'
      util.Ajax(
        'api/work/' + workId + '/service?_method=PATCH',
        {
          workStatus: choose
        },
        function(data) {
         Toast('接单设置成功')
          util.pushRouter(router, '/worker', {})
        }
      )
    },
    deleteHospital: function(index) {
      console.log('删除的医院:' + index)
      let curhospitals = JSON.parse(localStorage.getItem('hospitals'))
      curhospitals.splice(index,1)
      localStorage.removeItem('hospitals');
      localStorage.setItem('hospitals', JSON.stringify(curhospitals))
      //将新数据赋值到本地
      let hospitals = JSON.parse(localStorage.getItem('hospitals'))
      this.hospitals = hospitals
      this.checkAdd()
    },
    checkAdd: function() {
      //console.log('添加医院检测')
      let hospitals2 = JSON.parse(localStorage.getItem('hospitals'))
      if (!util.isEmpty(hospitals2)) {
        //console.log('医院长度' + hospitals2.length)
        let num = 3 - hospitals2.length
        this.addText = '还可以添加' + num + '家医院'
        if (num > 3 || num < 1) {
          this.isAdd = false
        } else {
          this.isAdd = true
        }
      } else {
        //console.log('医院长度')
        this.isAdd = true
        this.addText = '还可以添加3家医院'
      }
    },
    initData: function() {
      //console.log('数据初始化')
      let $this = this
      let workId = $this.$store.state.workId
      let userId = $this.$store.state.userId
      //localStorage.setItem('hospitals', null)
      util.Ajax('api/work/' + workId + '/service?_method=GET', {}, function(
        data
      ) {
        let curData = data.data
        //console.log(curData)
        if (util.isEmpty(localStorage.getItem('hospitals'))) {
          //console.log('设置本地记录')
          localStorage.setItem('hospitals', JSON.stringify(curData.hospital))
          let hospitals = JSON.parse(localStorage.getItem('hospitals'))
          if (hospitals != null) {
            $this.hospitals = hospitals
            let num = 3 - $this.hospitals.length
            if (num > 0 && num <= 3) {
              $this.isAdd = true
              $this.addText = '还可以添加' + num + '个医院'
            } else {
              $this.isAdd = false
            }
          }
        }

        //护理等级初始化
        let curlevel = curData.dependentLevel
        for (let index = 0; index < curlevel.length; index++) {
          $this.levels[index].msg = curlevel[index]
          if ($this.levels[index].msg == 'level1') {
            $this.levels[0].flags = true
          } else if ($this.levels[index].msg == 'level2') {
            $this.levels[1].flags = true
          } else if ($this.levels[index].msg == 'level3') {
            $this.levels[2].flags = true
          }
        }
      })
      util.Ajax(
        'api/work/getWorkStatus/' + userId + '?_method=GET',
        {},
        function(data2) {
          //console.log(data2.data)
          let curType = data2.data.workStatus
          if (curType == 'active') {
            $this.isValue = true
          } else {
            $this.isValue = false
          }
        }
      )
    },
    isVerb: function() {
      //判断医院id是否添加过(防止页面刷新时重复添加)
      let curhospitals = JSON.parse(localStorage.getItem('hospitals'))
      if (!curhospitals) {
        return false
      }
      for (let index = 0; index < curhospitals.length; index++) {
        if (curhospitals[index].hospital_id == this.$route.query.hospitalId) {
          console.log('已存在，不能重复添加')
          return true
        }
      }
      console.log('不存在，可以添加')
      return false
    }
  },
  mounted: function() {
    //加载完成后执行的内容
    let $this = this
    this.initData()
    //this.isVerb()
    console.log('路由id' + $this.$route.query.hospitalId)
    if ($this.$route.query.hospitalId != undefined && this.isVerb() == false) {
      console.log('添加医院加载')
      util.Ajax(
        '/api/hospital/' + $this.$route.query.hospitalId + '?_method=GET',
        {},
        function(data) {
          let curData = data.data
          console.log(data.data)
          //将新数据存入缓存
          let curhospitals = JSON.parse(localStorage.getItem('hospitals'))
          curhospitals.push(curData)
          localStorage.setItem('hospitals', JSON.stringify(curhospitals))
          //将新数据赋值到本地
          let hospitals = JSON.parse(localStorage.getItem('hospitals'))
          $this.hospitals = hospitals
          let num = 3 - $this.hospitals.length
          if (num > 0 && num < 3) {
            $this.isAdd = true
            $this.addText = '还可以添加' + num + '个医院'
          } else {
            $this.isAdd = false
          }
        }
      )
    } else {
      console.log('正常加载')
      //如果没有新id时。同样的将缓存赋值到本地
      let hospitals = JSON.parse(localStorage.getItem('hospitals'))
      if (hospitals != null) {
        $this.hospitals = hospitals
        let num = 3 - $this.hospitals.length
        if (num > 0 && num <= 3) {
          $this.isAdd = true
          $this.addText = '还可以添加' + num + '个医院'
        } else {
          $this.isAdd = false
        }
      }
    }
    //this.checkAdd()
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
.order-totals {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 4rem;
}
.order-totals .list {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
}
.order-totals .list h3 {
  font-size: 1.2rem;
  padding: 0 1rem;
}
.order-totals .list .iconfont {
  font-size: 1.6rem;
}
.order-totals .list p {
  margin-bottom: 3px;
}
.order-totals .but {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  padding: 0.5rem 0;
  width: 3.5rem;
  margin-right: 0.5rem;
}
.order-totals .but-red {
  background: #94ca52;
  color: #fff;
}
.order-totals .button-green {
  display: block;
  margin: 5rem auto;
  background: #94ca52;
  border-color: #94ca52;
  font-size: 1.2rem;
}
.order-totals .addhospital {
  border: 1px solid #94ca52;
  margin-top: 1rem;
  border-radius: 5px;
  display: block;
  width: 100%;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  overflow: hidden;
  padding: 5px 5px;
  font-size: 1.2rem;
}
.mt-radio .mint-cell-wrapper,
.mt-radio .mint-cell:last-child {
  background: none;
  padding: 0;
}
.mt-radio .mint-cell {
  min-height: 35px;
  margin-top: -4px;
}
.mt-radio .mint-radiolist-title,
.mt-radio .mint-checklist-title {
  display: none;
}
.mt-radio .mint-checklist-label {
  padding: 0;
}
.mt-radio .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #94ca52;
  border-color: #94ca52;
}
</style>
