<template>
    <div class="sendorders">
       <v-header></v-header>
		<div class="list">
			<i class="iconfont">&#xe633;</i>
			<h3>陪护医院</h3>
			<p v-on:click='hospitalCilk("/supervisor/hospital")'><span class="info">{{hospitalName}}</span><i class="iconfont city-icon">&#xe629;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe607;</i>
			<h3>开始时间</h3>
			<p  v-on:click="open('picker1')" >{{startDate}} <i class="iconfont picker">&#xe609;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe60f;</i>
			<h3>结束时间</h3>
			<p v-on:click="open('picker2')" >{{endDate}} <i class="iconfont picker">&#xe609;</i></p>
		</div>
		<div class="list">
			<i class="iconfont">&#xe638;</i>
			<h3>服务金额</h3>
			<p>
				<input  value="" />
			</p>
		</div>
	<div class="list">
			<i class="iconfont">&#xe62c;</i>
			<h3>客户姓名</h3>
			<p>
				<input value="" />
			</p>
	</div>
	<div class="list">
			<i class="iconfont">&#xe616;</i>
			<h3>客户电话</h3>
			<p>
				<input value="" />
			</p>
	</div>
	<div class="list">
			<i class="iconfont">&#xe610;</i>
			<h3>其他说明</h3>
			<p></p>
	</div>
	<textarea class="info-textarea" rows="6"></textarea>
	<button class="button button-green" v-on:click='hospitalCilk("/supervisor/workerList")'>下一步</button>
   <mt-datetime-picker type="date" ref="picker1" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="StartTiemChange"></mt-datetime-picker>
      
    <mt-datetime-picker type="date" ref="picker2" v-model="value" year-format="{value}" month-format="{value}月"
      date-format="{value}日" hourFormat="{value}时" minuteFormat="{value}分" @confirm="FinishTiemChange"></mt-datetime-picker>
	</div>
	
    </div>
</template>
<style type="text/css" scoped="scoped">
	.sendorders{background: #fff;position: absolute;top:0;left:0;right: 0; bottom: 0; width: 100%; height: 100%; padding-top: 4.5rem;}
    .sendorders .list{display: flex; box-sizing: border-box; width: 100%;margin: 0 auto; padding: 1rem; background: #fff;}
    .sendorders .list h3{font-size: 1.3rem; padding: 0 1rem; min-width:25%;}
    .sendorders .list .iconfont{font-size:1.8rem;}
    .sendorders .list input{padding:5px;box-sizing: border-box; display: block;}
    .sendorders .list p{height: 100%; width: 80%; line-height:1.9rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;position: relative;}
    .sendorders .list .info{ width:80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block;}
    .sendorders .work-info{background: #fff; color:#F32043; text-indent:9rem; padding:0.5rem 0; font-size: 1.2rem;}
    .sendorders .but{border-radius: 5px; border:1px solid #eee;background: #fff; padding: 0.5rem 0; width:3.5rem; margin-right: 0.5rem;}
    .sendorders .but-red{background:#F32043;color: #fff;}
    .sendorders .total{ position:fixed;left:0;bottom:4.5rem; background: #eee; height: 4rem; width: 100%; box-sizing: border-box; display: flex;}
    .sendorders .price{ width:50%; text-align: center; box-sizing: border-box; padding:0.5rem;}
    .sendorders .price .red{font-size:1.3rem;}
    .sendorders .fees-and-services{ height: 4rem; line-height: 4rem; width:25%;background: #F32043; color: #fff; text-align: center; font-size: 1.2rem;}
    .sendorders .choose-care{height: 4rem; line-height: 4rem; width:25%;background:#00CC66; color: #fff; text-align: center; font-size: 1.2rem;}
    .sendorders  .on{color:#00CC66}
    .sendorders .iconfont{ margin-right: 0.5rem;}
    .sendorders .list  .city-icon{font-size: 1.2rem; color: #00CC66;margin-left: 1rem;position: absolute; top:0; right: 0;}
    .sendorders .button{ display: block; margin:2rem auto;}
     .sendorders .info-textarea{ width: 90%; margin: 0 auto; display: block;}
</style>
<script>
    import vHeader from './../common/Header.vue';
    import router from './../../router';
    import util from './../../js/util/util.js';
    import{Cell,Toast,MessageBox } from 'mint-ui';
  export default {
    data () {
      return {
      	hospitalId:'',
      	hospitalName:'',
      	Longitude:'',
        Latitude:'',
      	Star:1,
      	isStar:0,
      	flag:0,
      	isMale:true,
        isFemale:false,
      	ison:false,
      	series:'1',
      	female:'',
      	price:'',
      	value:'',
      	startDate:"",
      	endDate:""
      }
    },
    components: {
    	vHeader
    },
    created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		 this.$store.state.isFooterShow=true; //显示底部导航
    		 this.$store.state.flag=0;
    		 document.title="找护工"
    		 var $this=this;
	  		util.getSessionLocation(function (location) { //获取经度
	            	    $this.longitude = location.Longitude;
	                   $this.latitude = location.Latitude;
	            
	          });
    	},
    methods: {
  	hospitalCilk:function(url){
  		util.pushRouter(router,url,{"page":"workers"});
  	},
     go:function(url){
       	util.pushRouter(router,url,{})
     },
      open(picker) {
        this.$refs[picker].open();
      },
      StartTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate();
        this.startDate=Tiem;
        console.log(this.startDate)
        this.priceInfo()
      },
       FinishTiemChange(value){
      	console.log(value)
      	var DateInfo = new Date(value);
        let  Tiem= DateInfo.getFullYear() + '-' + (DateInfo.getMonth() + 1) + '-' + DateInfo.getDate();
        this.endDate=Tiem;
//      if(this.endDate>this.startDate){
//      	Toast("开始时间必须小于结束时间")
//      }
        this.priceInfo()
      }
  },
   mounted:function(){
   	 if(this.$route.query.hospitalName==undefined){
   	 	 var $this=this;
           	 util.Ajax('/api/hospital/distance?_method=GET',{"lng":$this.longitude,"lat":$this.latitude},function(data){
    		  	  	  $this.hospitalName=data.data.name;
    		  	  	  $this.hospitalId=data.data.hospital_id;
		      })
   	 }else{
   	 	this.hospitalId=this.$route.query.hospitalId;
   	 	this.hospitalName=this.$route.query.hospitalName
   	 }
   	 
   	 var myDate = new Date(); //时间
   	 var myYear=myDate.getFullYear();        //获取当前年份(2位)
   	 var myMonth= myDate.getMonth();      //获取当前月份(0-11,0代表1月)
   	 var myDate= myDate.getDate();        //获取当前日(1-31)
   	 this.startDate=myYear + "-" + (myMonth + 1)+ "-" +myDate
   	 this.endDate=myYear + "-" + (myMonth + 1)+ "-" +myDate
   }
  }
</script>
