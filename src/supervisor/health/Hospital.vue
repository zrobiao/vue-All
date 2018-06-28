<template>
	<div class="Hospital">
	   	<v-header></v-header>
	   	
  <div class="page-indexlist">
  
    <div class="page-indexlist-wrapper">
      <mt-index-list>
      		 <div class="cityInfo">
      		 <div class="title4">附近医院</div> 
      		 <div class="title5" v-if="isMsg">{{msg}}</div>
	      		 <template v-for="items in LocalHospital">
	      		 	<template v-for="(item,index) in items.regions">
				    <ul class="first-tow" v-for="item in items.regions">  
				         <li v-on:click='go(info.hospital_name,info.hospital_id)' v-for="info in item.name">{{info.hospital_name}}</li>
				    </ul>
	      		 	</template>
	      		 </template>
			</div>
		        <mt-index-section v-for="(item,index) in alphabet" :index="item.initial" :key="index">
			        <mt-cell v-for="(cell,index) in item.cells[0].list" :key="index" :title="cell.AreaName" v-on:click.native="areaClick(cell.AreaCode,cell.AreaName)">
			        </mt-cell>
		        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
  <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
   	  <div class="con">
   	  	  <template v-for="items in TheHospitalData">
   	  	  	 <div class="mttitle">
   	  	 	<mt-button @click.native="popupVisible3 = false" class="iconbtn" size="large" type="primary"><i  class="iconfont ">&#xe600;</i></mt-button>
   	  	 	{{items.city}}
   	  	 </div>
   	  	 <div class="scroller">
   	  	 	<div  v-for="item in items.regions">
   	  	 		 <h3>{{item.region}}</h3>
	   	  	   <ul>  
				 <li v-on:click='go(info.hospital_name,info.hospital_id)' v-for="info in item.name">{{info.hospital_name}}</li>
		      </ul>
   	  	 	</div>
	      </div>
   	  	 
   	  	</template>
   	  	</div>
    </mt-popup>
  	   </div>
</template>

<style>
	.page-indexlist{ margin-top: 4rem;}
	.cityInfo{-webkit-overflow-scrolling:touch;width:100%;background: #fff;box-sizing: border-box;}
	.cityInfo .title5,.cityInfo .title4{ width:100%;  font-size: 14px; height:30px;line-height:30px;margin:0 auto;background:#fafafa; display: block; padding:0;padding-left: 15px; box-sizing: border-box;}
	.cityInfo .title5 span{ color:#999; margin-left: 5px;}
	.cityInfo ul{ width: 100%; overflow: hidden; margin: 0 auto; padding:10px 0 0 0; display: block;}
	.cityInfo ul.first-child li{margin-bottom:0;}
	.cityInfo ul li{ width: 21%; float: left; text-align: center; 
	border: 1px solid #e0e0e0;margin: 0; padding: 5px 0; margin-bottom: 10px; margin-left: 9px;overflow:hidden; text-overflow: ellipsis; white-space: nowrap;
	font-size: 12px;
	}
	.cityInfo .title5{font-size:1rem;background: #fff;}
	.cityInfo ul.first-tow li{width:45%;}
	.cityInfo ul.city-list{ width: 100%; text-align: left;border: 0; }
	.cityInfo ul.city-list li{ width: 100%;text-align: left; border: 0;border-bottom: 1px solid #eee;}
	.cityInfo ul.city-list li ul{ margin: 0 auto;}
	.cityInfo ul.city-list li ul li{ line-height: 9px; border:0}
	.Hospital .mint-popup{ width:100%; background: #fff; height: 100%; box-sizing: border-box; background: rgba(0,0,0,0.8);}
	.Hospital .mint-popup .con{width:80%; height: 100%; background: #fff; position: absolute; top:0;right: 0; bottom: 0;}
	.Hospital .mint-popup .iconbtn{border-radius:0; background: #eee;color: #fff; display: block; height: 3rem; line-height: 3rem; width:25%; position: absolute; top:0;right:0}
	.Hospital .mint-popup .iconbtn .iconfont{font-size: 2rem;}
	.Hospital .mint-popup .mttitle{position: relative; width: 100%; padding: 0; padding-left: 0.5rem; box-sizing: border-box; margin: 0; border-bottom: 1px solid #eee; height: 3rem;font-size: 1.4rem;line-height:3rem;}
    .Hospital .mint-popup h3{font-size: 1rem; font-weight: 700; padding: 0.5rem;}
    .Hospital .mint-popup li{padding: 0.5rem;}
    .Hospital .scroller{ width: 100%; height: 100%; overflow-y: scroll;box-sizing: border-box;}
</style>

<script type="text/babel">
    import router from './../../router';
    import util from './../../js/util/util.js';
    import vHeader from './../common/Header.vue';
    import{Cell,Popup } from 'mint-ui';
 
  export default {
    data() {
      return {
      	msg:"正在定位中",
      	isMsg:true,
      	popupVisible3: false,
      	TheHospitalData:'',
        alphabet:[],
        hospitalName:'',
        LocalHospital:''
      }
    },components:{
            vHeader,
            Cell,
            Popup 
        },
    created() {
    	var $this=this;
       this.$store.state.headings=this.$router.history.current.name; //修改标题
       this.$store.state.isFooterShow=false; //显示底部导航
	    util.Ajax('/api/area?_method=GET',{},function(data){
		      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
			       let cells =data.data.filter(o => o.AlphabetStr && o.AlphabetStr.substring(0,1).toUpperCase() === initial);
			         if (cells && cells.length > 0) {
			             $this.alphabet.push({
							          initial,
							          cells
							        });
			         }
			     });
	    	})
	    util.getSessionLocation(function (location) { //获取附近医院
	    	         if(location){
	    	         	    util.Ajax('/api/hospital/region?_method=GET',{"areacode":location.adcode,"city":location.city,"region":location.district},function(data){
		          	 	    if(data.data.length>0){
		          	 	    	$this.LocalHospital=data.data;
		          	 	    	$this.isMsg=false;
		          	 	    }else{
		          	 	    	$this.msg="当前你的附近没有合作的医院"
		          	 	    }
			             })
	    	         }else{
	    	         	 $this.msg="定位失败！"
	    	         }
	        });
    },
    methods:{
          areaClick:function(AreaCode,AreaName){
          	var $this=this;
          	 this.popupVisible3 = true;
          	 console.log(AreaCode+"==="+AreaName)
          	 util.Ajax('/api/hospital/region?_method=GET',{"areacode":AreaCode,"city":AreaName},function(data){
          	 	    console.log(data)
		     		$this.TheHospitalData=data.data
		      })
          },
           go:function(hospitalName,hospitalId){
           	    let page=this.$route.query.page;
           	      util.pushRouter(router,"/supervisor/sendorders",{hospitalName:hospitalName,"hospitalId":hospitalId})	
          },
    },mounted:function(){
    	
	    }
}
</script>
