<template>
    <div class="workersDetails">
       <v-header></v-header>
       <div ref="wrapper" :style="{height: wrapperHeight + 'px' }">
            <loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"
                  :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
                      <div v-for="(item,index) in items" class="workerslist"  v-on:click='popupClik(item.work_id)' >
						  <div class="left"><img :src="item.avatar" />
						  </div>
						  <div class="mian">
						     <h3>{{item.name}}</h3>
							 <p>{{item.age}}岁</p>
							 <p>{{item.exp}}年</p>
						  </div>
						  <div class="right">
						  	   <i class="iconfont" v-for="(i,index) in 5" :class="{'on':item.star>=index}">&#xe62f;</i>
						  </div>
						</div>
                 </loadmore>
       </div>
			 <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="mint-popup-1">
		           <div class="personal-popup">
		           	   <i class="iconfont stop" v-on:click="stopClik">&#xe612;</i>
		           	   <img :src="personal.avatar"  class="headPortrait"/>
		           	   <div class="icon-box">
		           	     <i class="iconfont" v-for="(i,index) in 5" :class="{'on':personal.star>=index}">&#xe62f;</i>
		           	   </div>
		           	   <div class="bntbox"><span>{{personal.city}}</span><span>{{personal.gender_desc}}</span><span>{{personal.age}}岁</span><span>{{personal.exp}}年护领</span></div>
		           	   <div class="btns" v-on:click='go("/customer/history",personal.work_id)'>服务历史</div>
		           	   <div class="personal-profile">个人介绍</div>
		           	   <div class="personal-referral">{{personal.description}}</div>
		           	   <button class="btn" v-on:click='orderCreate("/customer/orderdetails")'>确定下单</button>
		           </div>
		   </mt-popup>
    </div>
</template>
<script>
	import router from './../../router';
    import util from './../../js/util/util.js';
    import vHeader from './../common/Header.vue';
    import {Cell,Popup,Loadmore,Toast} from 'mint-ui';
    export default {
    	data(){
    		return {
    		   popupVisible1:false,
    		   personal:'',
    		   Page:1,//第几页
    		   Limit:3,
    		   allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
    		   wrapperHeight: 0,
    		   items:[],
    		   getList(){
    		   	    var $this=this;
		        	let gender=this.$route.query.gender;
		        	let level=this.$route.query.level;
		        	console.log($this.Page+gender+level)
    		    	 util.Ajax('/api/work/list?_method=POST',{"gender":gender,"level":level,"page":$this.Page,"limit":$this.Limit},function(data){
    		    	 	 var data=data.data;
					     	 if(!data || data.length == 0){
					     	 	  $this.allLoaded = true;// 若数据已全部获取完毕
                                  $this.$refs.loadmore.onBottomLoaded();
					     	 }else{
					     	 	 $this.allLoaded = data.length < $this.Limit;// 若数据已全部获取完毕
					     	 	 for (var i in data) {
                                     $this.items.push(data[i]);
                                }
					     	 }
					      })
    		    }
//  		   [{
//  		   	  "id":'1',
//  		   	  "avatar":"/static/img/css/common/fav_icon.gif",
//  		   	  "name":"李春花",
//  		   	  "age":"54",
//  		   	  "exp":"3",
//  		   	  "star":"0"
//  		   }]
    		}
    	},
    		created() {
    		  this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Popup,
            Cell,
            Loadmore
        },
        methods:{
        	loadTop(id) { //下拉刷新
                //下拉加载
                this.items = [];
                this.Page = 1;
                this.getList()
                this.$refs.loadmore.onTopLoaded(id);// 固定方法，查询完要调用一次，用于重新定位
                this.$refs.loadmore.onBottomLoaded();
            },
            loadBottom(id) { //上拉加载更多数据
                this.Page+=1;
                this.getList(); // 加载更多数据
            },
            translateChange(translate){
                //console.log(translate);
            },
            handleTopChange(status) {
                 // console.log(status)
            },
        	go:function(url,Id){
        		console.log(Id+"===")
        	  util.pushRouter(router,url,{"workId":Id});
        	},
        	orderCreate:function(url){ //下单
        		
        		//userId 用户ID
				//hospitalId 医院ID
				//workId 护工ID
				//patientGender 病人性别('male', 'female')
				//workerGender 护工性别('male', 'female')
				//dependentLevel 护理等级('level1','level2','level3',)
				//nursingTime 护理时间( 'day','dayNight','night')
				//startDate 开始时间
				//endDate 结束时间
        		
        		let userId=this.$store.state.userId;
        		let hospitalId=this.$route.query.hospitalId;
        		let workId=this.personal.work_id;
        		let patientGender=this.personal.gender;
        		let workerGender=this.personal.gender;
        		let dependentLevel="level"+this.personal.level;
        		let nursingTime="day";
        		let startDate=this.$route.query.startDate;
        		let endDate=this.$route.query.endDate;
        		console.log(hospitalId+"============")
        		  util.Ajax('/api/order/orderCreate?_method=PUT',{
        		  	      "userId":userId,
        		  	      "hospitalId":hospitalId,
        		  	      "workId":workId,
		        		  "patientGender":patientGender,
		        		  "workerGender":workerGender,
		        		  "dependentLevel":dependentLevel,
		        		  "nursingTime":nursingTime,
		        		  "startDate":startDate,
		        		  "endDate":endDate
	        		  },function(data){
	        		  	     console.log(data)
	        		  	   if(data.data.status=="0"){//下单成功
	        		  	   	  util.pushRouter(router,url,{"status":data.data.data.status,"orderId":data.data.data.id});
	        		  	   }
			          })
        	},
        	popupClik:function(id){
        		 this.popupVisible1 = true;
        		 let $this=this;
        		 console.log(id)
        		  util.Ajax('/api/work/'+id+"?_method=GET",{},function(data){
		     	console.log(data)
		     	 if(data){
		     	 	 $this.personal=data.data
		     	 }
		     	 
		      })
        		 
        	},
        	stopClik:function(){
        		this.popupVisible1 = false
        	}
        },
        mounted:function(){
        	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        	this.getList();
        }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.workersDetails{position: absolute; top:0;left:0;bottom: 0; right: 0; width: 100%; height: 100%; padding-top: 4rem;}
	.workersDetails .workerslist{display: flex;background: #fff; box-sizing: border-box;  width: 98%; margin:1rem auto 0; padding: 1rem; border-radius: 5px;}
	.workersDetails .workerslist .left{ width:30%; box-sizing: border-box; padding-right: 1rem;}
	.workersDetails .workerslist .left img{border-radius: 5px;}
	.workersDetails .workerslist .mian{padding:0; width:35%; overflow: hidden;}
	.workersDetails .workerslist .mian h3{font-size: 1.4rem; margin-bottom: 1rem;}
	.workersDetails .workerslist .right{position: relative;}
	.workersDetails .workerslist .right .iconfont{margin-right: 0.2rem;}
	.workersDetails .workerslist .right .on{color: #00CC66;}
	.workersDetails .mint-popup{ width:90%;box-sizing: border-box;border-radius: 5px;}
	/**个人信息**/
	.personal-popup{position: relative; padding:1rem; width: 100%;box-sizing: border-box;}
	.personal-popup .headPortrait{width:100px; height:100px; margin: 0 auto; display: block; border-radius: 50%; background: #eee;}
	.personal-popup .stop{position: absolute; top:0.5rem; right:0.5em; color: #F32043;font-size:1.8rem;}
	.personal-popup .bntbox span{ display: inline-block; border: 1px solid #eee; padding: 0.5rem; margin-right: 0.5rem; border-radius: 5px;}
	.personal-popup .icon-box{ width: 100%; text-align: center; padding: 1rem 0;}
	.personal-popup .icon-box .iconfont{ margin-right: 0.5rem;font-size: 1.6rem;}
	.personal-popup .icon-box .on{color: #00CC66;}
	.personal-popup .btn{padding: 1rem;border:0; width: 8rem; color: #fff; text-align: center; background: #00CC66; margin:1rem auto; display: block; border-radius: 5px; font-size: 1.2rem;}
    .personal-popup .btns{padding:0.5rem 1rem;border:0; width:5rem;color:#404040; text-align: center; background: #eee; margin:1.5rem auto; display: block; border-radius: 5px; font-size: 1.2rem;}
    .personal-popup .personal-profile{text-align: center;margin-bottom:1rem;font-weight:700; display: block; font-size:18px;}
    .personal-popup .personal-referral{ text-indent:2rem; line-height: 1.7rem;}
</style>