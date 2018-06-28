<template>
	<div class="supervise">
		<v-header></v-header>
		<div>
			<button class="btnS" v-on:click='quite'>{{hospital}}</button>
			<mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" class="mint-popup-4" closeOnClickModal="false">
				<mt-picker :slots="dateSlots" @change="onDateChange" :closeOnClickModal="false" :visible-item-count="5" :show-toolbar="false" cancelText="取消"></mt-picker>
			</mt-popup>
		</div>
		<div>
			<ul class="ulstyle">
				<li class="listyle" @click="click('/supervisor/order/list','orderNew')">
					<img src="../../assets/u41.png">
					<div class="msgstyle">
						<p>新订单</p>
						<p>{{orderMsg.orderNewCount}}</p>
					</div>
				</li>
				<li class="listyle" @click="click('/supervisor/order/list','orderWaitStart')">
					<img src="../../assets/u43.png">
					<div class="msgstyle">
						<p>待开始</p>
						<p>{{orderMsg.orderWaitStartCount}}</p>
					</div>
				</li>
				<li class="listyle" @click="click('/supervisor/order/list','orderProgressing')">
					<img src="../../assets/u45.png">
					<div class="msgstyle">
						<p>进行中</p>
						<p>{{orderMsg.orderProgressingCount}}</p>
					</div>
				</li>
				<li class="listyle" @click="click('/supervisor/order/list','orderWaitingEnd')">
					<img src="../../assets/u47.png">
					<div class="msgstyle">
						<p>快结束</p>
						<p>{{orderMsg.orderWaitingEnd}}</p>
					</div>
				</li>
				<li class="listyle" @click="click('/supervisor/order/list','orderWaitPay')">
					<img src="../../assets/u41.png">
					<div class="msgstyle">
						<p>待付款</p>
						<p>{{orderMsg.orderWaitPayCount}}</p>
					</div>
				</li>
				<li class="listyle" @click="click('/supervisor/order/list','orderEnd')">
					<img src="../../assets/u43.png">
					<div class="msgstyle">
						<p>取消/终止</p>
						<p>{{orderMsg.orderEndCount}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div>
			<ul class="ulstyle2">
				<li class="listyle2" @click="click('/worker/notice')">
					<img src="../../assets/u77.png">
					<p>发布公告</p>
				</li>
				<li class="listyle3" @click="click('/order/dispatch')">
					<img src="../../assets/u82.png">
					<p>派单</p>
				</li>
				<li class="listyle4" @click="click('/worker/appeal')">
					<img src="../../assets/u87.png">
					<p>投诉处理</p>
				</li>
			</ul>
		</div>
		<div class="workstyle">
			<p>护工状态</p>
		</div>
		<div>
			<table class="table">
				<tr>
					<td>护工</td>
					<td>状态</td>
				</tr>
				<tr v-for="item in countName">
					<td>{{item.name}}</td>
					<td>在线</td>
				</tr>
			</table>
		</div>
	</div>

</template>
<script>
import vHeader from './../common/Header.vue'
import { Cell, Toast, Popup } from 'mint-ui'
import router from './../../router'
import util from './../../js/util/util.js'
export default {
  data() {
    return {
      popupVisible: false,
      dateSlots: [
        {
          flex: 3,
          values: ['所有医院'],
          id: [-1],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      hospital: '请选择医院',
      cur_hospitalId: -1,
      orderMsg: [],
      countName: []
    }
  },
  created() {
    this.$store.state.headings = this.$router.history.current.name //修改标题
    this.$store.state.isFooterShow = true //显示底部导航
  },
  components: {
    vHeader,
    Cell
  },
  watch: {
    popupVisible: function(newVal, oldVal) {
      let $this = this
      if (newVal == false) {
        //隐藏选项卡后获取重新选择的医院
        console.log('您当前选择的医院是' + this.hospital)
      }
      //将医院名称转换成对应id
      for (let index = 0; index < this.dateSlots[0].values.length; index++) {
        if (this.dateSlots[0].values[index] === this.hospital) {
          this.cur_hospitalId = this.dateSlots[0].id[index]
        }
      }
      //重新从服务器获取订单数据
      util.Ajax(
        '/api/supervisions/orderCount?_method=POST',
        {
          hosipitalId: $this.cur_hospitalId
        },
        function(data) {
          $this.orderMsg = data.data.data
        }
      )
    }
  },
  methods: {
    quite: function() {
      this.popupVisible = true
    },
    onDateChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
      this.checkHospital = values[0]
      this.hospital = this.checkHospital
    },
    click: function(_url,ordertype) {
      console.log(_url,ordertype,this.cur_hospitalId)
      let $this = this
      util.pushRouter(router, _url, {
        ordertype:ordertype,
        hospitalId:$this.cur_hospitalId,
      })
    }
  },
  mounted: function() {
    let $this = this

    util.Ajax(
      '/api/supervisions/manageHosipitalList?_method=POST',
      {},
      function(data) {
        console.log(data.data.data)
        let curData = data.data.data
        for (let index = 0; index < curData.length; index++) {
          $this.dateSlots[0].values.push(curData[index].name)
          $this.dateSlots[0].id.push(curData[index].hospital_id)
        }
      }
    )

    util.Ajax(
      '/api/supervisions/orderCount?_method=POST',
      {
        hosipitalId: $this.dateSlots[0].id[0]
      },
      function(data) {
        $this.orderMsg = data.data.data
      }
    )

    util.Ajax(
      '/api/supervisions/workerList?_method=POST',
      {
        hosipitalId: $this.dateSlots[0].id[0]
      },
      function(data) {
        console.log(data.data.data)
        $this.countName = data.data.data
      }
    )
  }
}
</script>
<style scoped>
.supervise {
  padding-bottom: 70px;
}
.btnS {
  width: 60%;
  display: block;
  font-size: 1.2rem;
  margin: 0.8rem auto;
  margin-top: 70px;
  border: 0;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: #00cc66;
  color: #fff;
  border-radius: 10px 10px 10px 10px;
}
.mint-popup-4 {
  width: 100%;
}
.supervise .ulstyle {
  width: 100%;
  /* height: 5rem; */
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  margin: auto;
  padding: 1rem 0 0 0;
  line-height: 2rem;
  font-size: 2rem;
  /* background-color: #a1a1a1; */
  /* color: rgb(255, 255, 255); */
  /* border: 1px solid rgb(90, 166, 230); */
  text-align: center;
  vertical-align: middle;
  flex-wrap: wrap;
}

.supervise .ulstyle .listyle {
  width: 40%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 10%;
  margin-bottom: 20px;
}

.supervise .ulstyle .listyle > img {
  margin: 0;
}

.supervise .ulstyle .listyle .msgstyle p {
  font-size: 1.4rem;
  padding-left: 5px;
  font-weight: 600;
  text-align: left;
}

.supervise .ulstyle2 {
  /* width: 100%; */
  display: flex;
}

.supervise .ulstyle2 .listyle2 {
  width: 35%;
  background-color: rgb(255, 142, 45);
  justify-content: center;
  text-align: center;
}

.supervise .ulstyle2 .listyle3 {
  width: 30%;
  background-color: rgb(91, 197, 142);
  text-align: center;
}
.supervise .ulstyle2 .listyle4 {
  width: 35%;
  background-color: rgb(255, 142, 45);
  text-align: center;
}

.supervise .ulstyle2 img {
  margin: 10px 0;
  height: 40px;
}

.supervise .ulstyle2 p {
  color: white;
  font-size: 1.4rem;
  /* padding:5px 0; */
}

.supervise .workstyle {
  width: 100%;
  padding: 10px 0;
  background-color: rgb(224, 224, 224);
  border-radius: 0px 0px 50px 50px;
}

.supervise .workstyle p {
  text-align: center;
}

.supervise .table {
  width: 98%;
  margin: 1rem auto;
}
.supervise .table {
  border: 1px solid #ccc;
  text-align: center;
}
.supervise .table td:nth-child(1) {
  border: 1px solid #ccc;
  padding: 0.2rem 0;
  width: 30%;
}

.supervise .table td:nth-child(2) {
  border: 1px solid #ccc;
  padding: 0.2rem 0;
}
</style>