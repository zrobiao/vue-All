<template>
	<div class="anv" v-if="$store.state.isFooterShow">
		  <div v-for="(item,index) in items" :class="{'on':flag==index}" v-on:click="go(item.pagePath,index)">
		  	<i class="iconfont" :class="item.iconPath"></i>
		  	{{item.title}}
		  </div>
	</div>
</template>
<style>
 .anv{position: fixed; 
 bottom:0;left:0;margin: 0;
  padding: 0; background-color: #fafafa; display: flex; width: 100%;
  border-top:1px solid #eee;
  }
 .anv>div{width: 25%;padding:5px 0;font-size:14px;display:flex; float: left; text-align: center;flex-direction: column;color: #909090}
 .anv>div>i{font-size:1.7rem;}
 .anv>div.on{ color: #94ca52; }
</style>
<script>
import router from "./../../router"
import util from  "./../../js/util/util.js"
export default {
  data () {
    return {
    	 flag:this.$store.state.flag,
    	 items:[{
             "title":"工作",
             "pagePath":"/worker",
             "iconPath":"icon-dianzidangan",
           },{
             "title":"任务",
             "pagePath":"/worker/order",
             "iconPath":"icon-dingdan",
           },{
             "title":"护工之家",
             "pagePath":"/worker/health",
             "iconPath":"icon-shouye",
           },{
             "title":"我的",
             "pagePath":"/worker/Me",
             "iconPath":"icon-wode",
           }]
    }
  },
  methods: {
  	go:function(url,index){ //地址跳转
  		this.flag=index;
  	    util.pushRouter(router,url,{})
  	}
  }
}
</script>

