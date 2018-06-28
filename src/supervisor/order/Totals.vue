<template>
	<div class="Workers">
		<mt-swipe :auto="4000" style="height: 100px;">
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u23.jpg"></mt-swipe-item>
		  <mt-swipe-item><img src="../../../static/img/updata/slide/u21.jpg"></mt-swipe-item>
		</mt-swipe>
		<div class="list">
			<i class="iconfont">&#xe633;</i>
			<h3>陪护医院</h3>
			<p v-on:click='go("/customer/hospital")'>贵州省第一人民医院</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe622;</i>
			<h3>开始时间</h3>
			<p  v-on:click="open('picker1')" >{{StartTiem}}</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe622;</i>
			<h3>结束时间</h3>
			<p v-on:click="open('picker2')" >{{FinishTiem}}</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe630;</i>
			<h3>服务星级</h3>
			<p> <button v-for="(item,index) in ServiceStar" class="but" :class="{'but-red':flag==index}" v-on:click='serveClik(item.number,index)'>{{item.title}}</button>
			</p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe61b;</i>
			<h3>护工性别</h3>
			<p>
				<button v-for="(item,index) in gender" class="but" :class="{'but-red':genderflag>=index}" v-on:click='genderClik(item.number,index)'>{{item.title}}</button>
			</p>
		</div>
	<div class="list">
			<i class="iconfont">&#xe630;</i>
			<h3>服务星级</h3>
			<p>
				<i class="iconfont" v-for="(item,index) in 5" v-on:click='starClik(index)' :class="{'on':isStar>=index}">&#xe62f;</i>
			</p>
		</div>
		<div class="work-info">（该星级暂无可用护工）</div>
    <div class="total">
    	<div class="price">合计：<span class="red">￥360.00</span>元<br>(￥120元/天)</div>
    	<div class="fees-and-services" v-on:click='go("/customer/Servicedescription")'>收费与服务</div>
    	<div class="choose-care" v-on:click='go("/customer/workersDetails")'>选护工</div>
    </div>

   <mt-datetime-picker type="datetime" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>
    <mt-datetime-picker type="datetime" ref="picker2" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange"></mt-datetime-picker>
	</div>
</template>

<script>
import router from './../../router';
import util from './../../js/util/util.js';
import{Swipe, SwipeItem,DatetimePicker  } from 'mint-ui';
export default {
    data () {
      return {
      	isStar:-1,
      	flag:0,
      	genderflag:0,
      	ison:false,
      	ServiceStar:[{
             "title":"初级",
             "number":"160"
           },{
             "title":"中级", 
             "number":"220"
           },{
             "title":"高级",
             "number":'250'
           }],
        gender:[{
        	"title":"男",
             "number":"0"
        },{
        	"title":"女",
             "number":"1"
        }],
      	value:'',
      	StartTiem:"20016-1-12 12:3:0",
      	FinishTiem:"20017-1-1 0:0:0"
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    created() {
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=0;
    		 document.title="找护工"
    	},
    methods: {
    serveClik:function(num,index){ //选择高级
  		this.flag=index;
  	  },
  	starClik:function(index){ //点击选中
  			this.isStar=index
  	},
  	genderClik:function(num,index){ //男女
  		this.genderflag=index;
  	},
     go:function(url){
       	util.pushRouter(router,url,{})
     },
      open(picker) {
      	console.log(picker)
        this.$refs[picker].open();
      },
      StartTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate() + ' ' + DateInfo.getHours() + ':' + DateInfo.getMinutes() + ':' + DateInfo.getSeconds();
        this.StartTiem=Tiem;
      },
       FinishTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate() + ' ' + DateInfo.getHours() + ':' + DateInfo.getMinutes() + ':' + DateInfo.getSeconds();
        this.FinishTiem=Tiem;
      }
  },
    
  }
</script>
<style type="text/css" scoped>
    .Workers{background: #fff;position: absolute;top:0;left:0;right: 0; bottom: 0; width: 100%; height: 100%;}
    .Workers .list{display: flex; box-sizing: border-box; width: 100%;margin: 0 auto; padding: 1rem; background: #fff;}
    .Workers .list h3{font-size: 1.2rem; padding: 0 1rem;}
    .Workers .list .iconfont{font-size:1.6rem;}
    .Workers .list p{height: 100%; line-height:1.9rem;}
    .Workers .work-info{background: #fff; color:#F32043; text-indent:9rem; padding:0.5rem 0; font-size: 1.2rem;}
    .Workers .but{border-radius: 5px; border:1px solid #eee;background: #fff; padding: 0.5rem 0; width:3.5rem; margin-right: 0.5rem;}
    .Workers .but-red{background:#ef4f4f;color: #fff;}
    .Workers .total{ position:fixed;left:0;bottom:4rem; background: #eee; height: 4rem; width: 100%; box-sizing: border-box; display: flex;}
    .Workers .price{ width:50%; text-align: center; box-sizing: border-box; padding:0.5rem;}
     .Workers .price .red{font-size:1.3rem;}
    .Workers .fees-and-services{ height: 4rem; line-height: 4rem; width:25%;background: #F32043; color: #fff; text-align: center; font-size: 1.2rem;}
    .Workers .choose-care{height: 4rem; line-height: 4rem; width:25%;background:#00CC66; color: #fff; text-align: center; font-size: 1.2rem;}
    .Workers  .on{color:#00CC66}
    .Workers .iconfont{ margin-right: 0.5rem;}
</style>