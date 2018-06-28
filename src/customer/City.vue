<template>
    <div class="Hospital">
       <v-header></v-header>
       <div class="cityInfo">
	   <div class="title4">贵阳</div> 
	   <ul class="first-child">
	      <li>定位城市</li>
	   </ul>
	    <ul>   
	       <li>南明区</li>
		   <li>云岩区</li>
		   <li>观山湖区</li>
		   <li>白云区</li>
		   <li>小河区</li>
	    </ul>
	      <div class="title4">按字母排序</div> 
		      <ul class="letters_lst">
		          <li v-for="item in alphabet">{{item}}</li>
		</ul> 
     <div v-for="item in CityInfo">
		 <div class="title5">
		    <span>{{item.AlphabetStr}}</span> 
		    <span>(以{{item.AlphabetStr}}为开头的城市名)</span>
		 </div>
		  <ul>
		     <li v-for="item in item.list">{{item.AreaName}}</li>
		  </ul>
      </div>
    </div>
       
       
       
    </div>
</template>
<script>
    import vHeader from './../common/Header.vue';
    import{Cell} from 'mint-ui';
    export default {
    	data(){
    		return {
    			 alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    			 CityInfo: [{
    		"AlphabetStr": "A",
            "list": [
                {
                    "AreaCode": "152900",
                    "AreaName": "阿拉善盟",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "210300",
                    "AreaName": "鞍山市",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "340800",
                    "AreaName": "安庆市",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "410500",
                    "AreaName": "安阳市",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "513200",
                    "AreaName": "阿坝藏族羌族自治州",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "520400",
                    "AreaName": "安顺市",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "542500",
                    "AreaName": "阿里地区",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "610900",
                    "AreaName": "安康市",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "652900",
                    "AreaName": "阿克苏地区",
                    "AlphabetStr":"A"
                },
                {
                    "AreaCode": "654300",
                    "AreaName": "阿勒泰地区",
                    "AlphabetStr":"A"
                }
            ]
        },
        {
            "AlphabetStr": "B",
            "list": [
                {
                    "AreaCode": "110100",
                    "AreaName": "北京市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "130600",
                    "AreaName": "保定市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "150200",
                    "AreaName": "包头市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "150800",
                    "AreaName": "巴彦淖尔市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "210500",
                    "AreaName": "本溪市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "220600",
                    "AreaName": "白山市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "220800",
                    "AreaName": "白城市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "340300",
                    "AreaName": "蚌埠市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "341600",
                    "AreaName": "亳州市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "371600",
                    "AreaName": "滨州市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "450500",
                    "AreaName": "北海市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "451000",
                    "AreaName": "百色市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "461400",
                    "AreaName": "白沙黎族自治县",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "461800",
                    "AreaName": "保亭黎族苗族自治县",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "511900",
                    "AreaName": "巴中市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "520500",
                    "AreaName": "毕节市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "530500",
                    "AreaName": "保山市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "610300",
                    "AreaName": "宝鸡市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "620400",
                    "AreaName": "白银市",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "652700",
                    "AreaName": "博尔塔拉蒙古自治州",
                    "AlphabetStr": "B"
                },
                {
                    "AreaCode": "652800",
                    "AreaName": "巴音郭楞蒙古自治州",
                    "AlphabetStr": "B"
                }
            ]
        },
        {
            "AlphabetStr": "C",
            "list": [
                {
                    "AreaCode": "130800",
                    "AreaName": "承德市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "130900",
                    "AreaName": "沧州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "140400",
                    "AreaName": "长治市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "150400",
                    "AreaName": "赤峰市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "211300",
                    "AreaName": "朝阳市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "220100",
                    "AreaName": "长春市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "320400",
                    "AreaName": "常州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "341100",
                    "AreaName": "滁州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "341700",
                    "AreaName": "池州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "430100",
                    "AreaName": "长沙市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "430700",
                    "AreaName": "常德市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "431000",
                    "AreaName": "郴州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "445100",
                    "AreaName": "潮州市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "451400",
                    "AreaName": "崇左市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "461200",
                    "AreaName": "澄迈县",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "461500",
                    "AreaName": "昌江黎族自治县",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "500100",
                    "AreaName": "重庆市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "510100",
                    "AreaName": "成都市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "532300",
                    "AreaName": "楚雄彝族自治州",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "542100",
                    "AreaName": "昌都市",
                    "AlphabetStr": "C"
                },
                {
                    "AreaCode": "652300",
                    "AreaName": "昌吉回族自治州",
                    "AlphabetStr": "C"
                }
            ]
        },
        {
            "AlphabetStr": "D",
            "list": [
                {
                    "AreaCode": "140200",
                    "AreaName": "大同市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "210200",
                    "AreaName": "大连市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "210600",
                    "AreaName": "丹东市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "230600",
                    "AreaName": "大庆市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "232700",
                    "AreaName": "大兴安岭地区",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "370500",
                    "AreaName": "东营市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "371400",
                    "AreaName": "德州市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "441999",
                    "AreaName": "东莞市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "460400",
                    "AreaName": "儋州市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "460900",
                    "AreaName": "东方市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "461000",
                    "AreaName": "定安县",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "510600",
                    "AreaName": "德阳市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "511700",
                    "AreaName": "达州市",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "532900",
                    "AreaName": "大理白族自治州",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "533100",
                    "AreaName": "德宏傣族景颇族自治州",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "533400",
                    "AreaName": "迪庆藏族自治州",
                    "AlphabetStr": "D"
                },
                {
                    "AreaCode": "621100",
                    "AreaName": "定西市",
                    "AlphabetStr": "D"
                }
            ]
        },
        {
            "AlphabetStr": "E",
            "list": [
                {
                    "AreaCode": "150600",
                    "AreaName": "鄂尔多斯市",
                    "AlphabetStr": "E"
                },
                {
                    "AreaCode": "420700",
                    "AreaName": "鄂州市",
                    "AlphabetStr": "E"
                },
                {
                    "AreaCode": "422800",
                    "AreaName": "恩施土家族苗族自治州",
                    "AlphabetStr": "E"
                }
            ]
        },
        {
            "AlphabetStr": "F",
            "list": [
                {
                    "AreaCode": "210400",
                    "AreaName": "抚顺市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "210900",
                    "AreaName": "阜新市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "341200",
                    "AreaName": "阜阳市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "350100",
                    "AreaName": "福州市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "361000",
                    "AreaName": "抚州市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "440600",
                    "AreaName": "佛山市",
                    "AlphabetStr": "F"
                },
                {
                    "AreaCode": "450600",
                    "AreaName": "防城港市",
                    "AlphabetStr": "F"
                }
            ]
        },
        {
            "AlphabetStr": "G",
            "list": [
                {
                    "AreaCode": "360700",
                    "AreaName": "赣州市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "440100",
                    "AreaName": "广州市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "450300",
                    "AreaName": "桂林市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "450800",
                    "AreaName": "贵港市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "510800",
                    "AreaName": "广元市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "511600",
                    "AreaName": "广安市",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "513300",
                    "AreaName": "甘孜藏族自治州",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "520100",
                    "AreaName": "贵阳",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "623000",
                    "AreaName": "甘南藏族自治州",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "632600",
                    "AreaName": "果洛藏族自治州",
                    "AlphabetStr": "G"
                },
                {
                    "AreaCode": "640400",
                    "AreaName": "固原市",
                    "AlphabetStr": "G"
                }
            ]
        },
        {
            "AlphabetStr": "H",
            "list": [
                {
                    "AreaCode": "130400",
                    "AreaName": "邯郸市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "131100",
                    "AreaName": "衡水市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "150100",
                    "AreaName": "呼和浩特市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "150700",
                    "AreaName": "呼伦贝尔市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "211400",
                    "AreaName": "葫芦岛市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "230100",
                    "AreaName": "哈尔滨市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "230400",
                    "AreaName": "鹤岗市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "231100",
                    "AreaName": "黑河市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "320800",
                    "AreaName": "淮安市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "330100",
                    "AreaName": "杭州市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "330500",
                    "AreaName": "湖州市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "340100",
                    "AreaName": "合肥市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "340400",
                    "AreaName": "淮南市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "340600",
                    "AreaName": "淮北市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "341000",
                    "AreaName": "黄山市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "371700",
                    "AreaName": "菏泽市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "410600",
                    "AreaName": "鹤壁市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "420200",
                    "AreaName": "黄石市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "421100",
                    "AreaName": "黄冈市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "430400",
                    "AreaName": "衡阳市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "431200",
                    "AreaName": "怀化市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "441300",
                    "AreaName": "惠州市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "441600",
                    "AreaName": "河源市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "451100",
                    "AreaName": "贺州市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "451200",
                    "AreaName": "河池市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "460100",
                    "AreaName": "海口市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "532500",
                    "AreaName": "红河哈尼族彝族自治州",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "610700",
                    "AreaName": "汉中市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "630200",
                    "AreaName": "海东市",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "632200",
                    "AreaName": "海北藏族自治州",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "632300",
                    "AreaName": "黄南藏族自治州",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "632500",
                    "AreaName": "海南藏族自治州",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "632800",
                    "AreaName": "海西蒙古族藏族自治州",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "652200",
                    "AreaName": "哈密地区",
                    "AlphabetStr": "H"
                },
                {
                    "AreaCode": "653200",
                    "AreaName": "和田地区",
                    "AlphabetStr": "H"
                }
            ]
        },
        {
            "AlphabetStr": "J",
            "list": [
                {
                    "AreaCode": "140500",
                    "AreaName": "晋城市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "140700",
                    "AreaName": "晋中市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "210700",
                    "AreaName": "锦州市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "220200",
                    "AreaName": "吉林市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "230300",
                    "AreaName": "鸡西市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "230800",
                    "AreaName": "佳木斯市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "330400",
                    "AreaName": "嘉兴市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "330700",
                    "AreaName": "金华市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "360200",
                    "AreaName": "景德镇市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "360400",
                    "AreaName": "九江市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "360800",
                    "AreaName": "吉安市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "370100",
                    "AreaName": "济南市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "370800",
                    "AreaName": "济宁市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "410800",
                    "AreaName": "焦作市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "419098",
                    "AreaName": "济源市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "420800",
                    "AreaName": "荆门市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "421000",
                    "AreaName": "荆州市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "440700",
                    "AreaName": "江门市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "445200",
                    "AreaName": "揭阳市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "620200",
                    "AreaName": "嘉峪关市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "620300",
                    "AreaName": "金昌市",
                    "AlphabetStr": "J"
                },
                {
                    "AreaCode": "620900",
                    "AreaName": "酒泉市",
                    "AlphabetStr": "J"
                }
            ]
        },
        {
            "AlphabetStr": "K",
            "list": [
                {
                    "AreaCode": "410200",
                    "AreaName": "开封市",
                    "AlphabetStr": "K"
                },
                {
                    "AreaCode": "530100",
                    "AreaName": "昆明市",
                    "AlphabetStr": "K"
                },
                {
                    "AreaCode": "650200",
                    "AreaName": "克拉玛依市",
                    "AlphabetStr": "K"
                },
                {
                    "AreaCode": "653000",
                    "AreaName": "克孜勒苏柯尔克孜自治州",
                    "AlphabetStr": "K"
                },
                {
                    "AreaCode": "653100",
                    "AreaName": "喀什地区",
                    "AlphabetStr": "K"
                }
            ]
        },
        {
            "AlphabetStr": "L",
            "list": [
                {
                    "AreaCode": "131000",
                    "AreaName": "廊坊市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "141000",
                    "AreaName": "临汾市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "141100",
                    "AreaName": "吕梁市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "211000",
                    "AreaName": "辽阳市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "220400",
                    "AreaName": "辽源市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "320700",
                    "AreaName": "连云港市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "331100",
                    "AreaName": "丽水市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "341500",
                    "AreaName": "六安市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "350800",
                    "AreaName": "龙岩市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "371200",
                    "AreaName": "莱芜市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "371300",
                    "AreaName": "临沂市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "371500",
                    "AreaName": "聊城市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "410300",
                    "AreaName": "洛阳市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "411100",
                    "AreaName": "漯河市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "431300",
                    "AreaName": "娄底市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "450200",
                    "AreaName": "柳州市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "451300",
                    "AreaName": "来宾市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "461300",
                    "AreaName": "临高县",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "461600",
                    "AreaName": "乐东黎族自治县",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "461700",
                    "AreaName": "陵水黎族自治县",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "510500",
                    "AreaName": "泸州市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "511100",
                    "AreaName": "乐山市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "513400",
                    "AreaName": "凉山彝族自治州",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "520200",
                    "AreaName": "六盘水市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "530700",
                    "AreaName": "丽江市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "530900",
                    "AreaName": "临沧市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "540100",
                    "AreaName": "拉萨市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "542600",
                    "AreaName": "林芝市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "620100",
                    "AreaName": "兰州市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "621200",
                    "AreaName": "陇南市",
                    "AlphabetStr": "L"
                },
                {
                    "AreaCode": "622900",
                    "AreaName": "临夏回族自治州",
                    "AlphabetStr": "L"
                }
            ]
        },
        {
            "AlphabetStr": "M",
            "list": [
                {
                    "AreaCode": "231000",
                    "AreaName": "牡丹江市",
                    "AlphabetStr": "M"
                },
                {
                    "AreaCode": "340500",
                    "AreaName": "马鞍山市",
                    "AlphabetStr": "M"
                },
                {
                    "AreaCode": "440900",
                    "AreaName": "茂名市",
                    "AlphabetStr": "M"
                },
                {
                    "AreaCode": "441400",
                    "AreaName": "梅州市",
                    "AlphabetStr": "M"
                },
                {
                    "AreaCode": "510700",
                    "AreaName": "绵阳市",
                    "AlphabetStr": "M"
                },
                {
                    "AreaCode": "511400",
                    "AreaName": "眉山市",
                    "AlphabetStr": "M"
                }
            ]
        },
        {
            "AlphabetStr": "N",
            "list": [
                {
                    "AreaCode": "320100",
                    "AreaName": "南京市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "320600",
                    "AreaName": "南通市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "330200",
                    "AreaName": "宁波市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "350700",
                    "AreaName": "南平市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "350900",
                    "AreaName": "宁德市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "360100",
                    "AreaName": "南昌市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "411300",
                    "AreaName": "南阳市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "450100",
                    "AreaName": "南宁市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "511000",
                    "AreaName": "内江市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "511300",
                    "AreaName": "南充市",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "533300",
                    "AreaName": "怒江傈僳族自治州",
                    "AlphabetStr": "N"
                },
                {
                    "AreaCode": "542400",
                    "AreaName": "那曲地区",
                    "AlphabetStr": "N"
                }
            ]
        },
        {
            "AlphabetStr": "P",
            "list": [
                {
                    "AreaCode": "211100",
                    "AreaName": "盘锦市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "350300",
                    "AreaName": "莆田市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "360300",
                    "AreaName": "萍乡市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "410400",
                    "AreaName": "平顶山市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "410900",
                    "AreaName": "濮阳市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "510400",
                    "AreaName": "攀枝花市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "530800",
                    "AreaName": "普洱市",
                    "AlphabetStr": "P"
                },
                {
                    "AreaCode": "620800",
                    "AreaName": "平凉市",
                    "AlphabetStr": "P"
                }
            ]
        },
        {
            "AlphabetStr": "Q",
            "list": [
                {
                    "AreaCode": "130300",
                    "AreaName": "秦皇岛市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "230200",
                    "AreaName": "齐齐哈尔市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "230900",
                    "AreaName": "七台河市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "330800",
                    "AreaName": "衢州市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "350500",
                    "AreaName": "泉州市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "370200",
                    "AreaName": "青岛市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "429500",
                    "AreaName": "潜江市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "441800",
                    "AreaName": "清远市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "450700",
                    "AreaName": "钦州市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "460600",
                    "AreaName": "琼海市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "461900",
                    "AreaName": "琼中黎族苗族自治县",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "522300",
                    "AreaName": "黔西南布依族苗族自治州",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "522600",
                    "AreaName": "黔东南苗族侗族自治州",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "522700",
                    "AreaName": "黔南布依族苗族自治州",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "530300",
                    "AreaName": "曲靖市",
                    "AlphabetStr": "Q"
                },
                {
                    "AreaCode": "621000",
                    "AreaName": "庆阳市",
                    "AlphabetStr": "Q"
                }
            ]
        },
        {
            "AlphabetStr": "R",
            "list": [
                {
                    "AreaCode": "371100",
                    "AreaName": "日照市",
                    "AlphabetStr": "R"
                },
                {
                    "AreaCode": "542300",
                    "AreaName": "日喀则市",
                    "AlphabetStr": "R"
                }
            ]
        },
        {
            "AlphabetStr": "S",
            "list": [
                {
                    "AreaCode": "130100",
                    "AreaName": "石家庄市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "140600",
                    "AreaName": "朔州市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "210100",
                    "AreaName": "沈阳市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "220300",
                    "AreaName": "四平市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "220700",
                    "AreaName": "松原市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "230500",
                    "AreaName": "双鸭山市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "231200",
                    "AreaName": "绥化市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "310100",
                    "AreaName": "上海市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "320500",
                    "AreaName": "苏州市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "321300",
                    "AreaName": "宿迁市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "330600",
                    "AreaName": "绍兴市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "341300",
                    "AreaName": "宿州市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "350400",
                    "AreaName": "三明市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "361100",
                    "AreaName": "上饶市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "411200",
                    "AreaName": "三门峡市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "411400",
                    "AreaName": "商丘市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "419000",
                    "AreaName": "省直辖县级行政区划",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "420300",
                    "AreaName": "十堰市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "421300",
                    "AreaName": "随州市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "429000",
                    "AreaName": "省直辖县级行政区划",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "429700",
                    "AreaName": "神农架林区",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "430500",
                    "AreaName": "邵阳市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "440200",
                    "AreaName": "韶关市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "440300",
                    "AreaName": "深圳市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "440500",
                    "AreaName": "汕头市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "441500",
                    "AreaName": "汕尾市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "460200",
                    "AreaName": "三亚市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "460300",
                    "AreaName": "三沙市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "469000",
                    "AreaName": "省直辖县级行政区划",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "510900",
                    "AreaName": "遂宁市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "542200",
                    "AreaName": "山南地区",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "611000",
                    "AreaName": "商洛市",
                    "AlphabetStr": "S"
                },
                {
                    "AreaCode": "640200",
                    "AreaName": "石嘴山市",
                    "AlphabetStr": "S"
                }
            ]
        },
        {
            "AlphabetStr": "T",
            "list": [
                {
                    "AreaCode": "120100",
                    "AreaName": "天津市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "130200",
                    "AreaName": "唐山市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "140100",
                    "AreaName": "太原市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "150500",
                    "AreaName": "通辽市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "211200",
                    "AreaName": "铁岭市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "220500",
                    "AreaName": "通化市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "321200",
                    "AreaName": "泰州市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "331000",
                    "AreaName": "台州市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "340700",
                    "AreaName": "铜陵市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "370900",
                    "AreaName": "泰安市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "429600",
                    "AreaName": "天门市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "461100",
                    "AreaName": "屯昌县",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "520600",
                    "AreaName": "铜仁市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "610200",
                    "AreaName": "铜川市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "620500",
                    "AreaName": "天水市",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "652100",
                    "AreaName": "吐鲁番地区",
                    "AlphabetStr": "T"
                },
                {
                    "AreaCode": "654200",
                    "AreaName": "塔城地区",
                    "AlphabetStr": "T"
                }
            ]
        },
        {
            "AlphabetStr": "W",
            "list": [
                {
                    "AreaCode": "150300",
                    "AreaName": "乌海市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "150900",
                    "AreaName": "乌兰察布市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "320200",
                    "AreaName": "无锡市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "330300",
                    "AreaName": "温州市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "340200",
                    "AreaName": "芜湖市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "370700",
                    "AreaName": "潍坊市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "371000",
                    "AreaName": "威海市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "420100",
                    "AreaName": "武汉市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "450400",
                    "AreaName": "梧州市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "460500",
                    "AreaName": "五指山市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "460700",
                    "AreaName": "文昌市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "460800",
                    "AreaName": "万宁市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "532600",
                    "AreaName": "文山壮族苗族自治州",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "610500",
                    "AreaName": "渭南市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "620600",
                    "AreaName": "武威市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "640300",
                    "AreaName": "吴忠市",
                    "AlphabetStr": "W"
                },
                {
                    "AreaCode": "650100",
                    "AreaName": "乌鲁木齐市",
                    "AlphabetStr": "W"
                }
            ]
        },
        {
            "AlphabetStr": "X",
            "list": [
                {
                    "AreaCode": "130500",
                    "AreaName": "邢台市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "140900",
                    "AreaName": "忻州市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "152200",
                    "AreaName": "兴安盟",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "152500",
                    "AreaName": "锡林郭勒盟",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "320300",
                    "AreaName": "徐州市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "341800",
                    "AreaName": "宣城市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "350200",
                    "AreaName": "厦门市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "360500",
                    "AreaName": "新余市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "410700",
                    "AreaName": "新乡市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "411000",
                    "AreaName": "许昌市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "411500",
                    "AreaName": "信阳市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "420600",
                    "AreaName": "襄阳市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "420900",
                    "AreaName": "孝感市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "421200",
                    "AreaName": "咸宁市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "429400",
                    "AreaName": "仙桃市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "430300",
                    "AreaName": "湘潭市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "433100",
                    "AreaName": "湘西土家族苗族自治州",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "532800",
                    "AreaName": "西双版纳傣族自治州",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "610100",
                    "AreaName": "西安市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "610400",
                    "AreaName": "咸阳市",
                    "AlphabetStr": "X"
                },
                {
                    "AreaCode": "630100",
                    "AreaName": "西宁市",
                    "AlphabetStr": "X"
                }
            ]
        },
        {
            "AlphabetStr": "Y",
            "list": [
                {
                    "AreaCode": "140300",
                    "AreaName": "阳泉市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "140800",
                    "AreaName": "运城市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "210800",
                    "AreaName": "营口市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "222400",
                    "AreaName": "延边朝鲜族自治州",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "230700",
                    "AreaName": "伊春市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "320900",
                    "AreaName": "盐城市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "321000",
                    "AreaName": "扬州市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "360600",
                    "AreaName": "鹰潭市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "360900",
                    "AreaName": "宜春市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "370600",
                    "AreaName": "烟台市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "420500",
                    "AreaName": "宜昌市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "430600",
                    "AreaName": "岳阳市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "430900",
                    "AreaName": "益阳市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "431100",
                    "AreaName": "永州市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "441700",
                    "AreaName": "阳江市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "445300",
                    "AreaName": "云浮市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "450900",
                    "AreaName": "玉林市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "511500",
                    "AreaName": "宜宾市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "511800",
                    "AreaName": "雅安市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "530400",
                    "AreaName": "玉溪市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "610600",
                    "AreaName": "延安市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "610800",
                    "AreaName": "榆林市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "632700",
                    "AreaName": "玉树藏族自治州",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "640100",
                    "AreaName": "银川市",
                    "AlphabetStr": "Y"
                },
                {
                    "AreaCode": "654000",
                    "AreaName": "伊犁哈萨克自治州",
                    "AlphabetStr": "Y"
                }
            ]
        },
        {
            "AlphabetStr": "Z",
            "list": [
                {
                    "AreaCode": "130700",
                    "AreaName": "张家口市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "321100",
                    "AreaName": "镇江市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "330900",
                    "AreaName": "舟山市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "350600",
                    "AreaName": "漳州市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "370300",
                    "AreaName": "淄博市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "370400",
                    "AreaName": "枣庄市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "410100",
                    "AreaName": "郑州市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "411600",
                    "AreaName": "周口市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "411700",
                    "AreaName": "驻马店市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "430200",
                    "AreaName": "株洲市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "430800",
                    "AreaName": "张家界市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "440400",
                    "AreaName": "珠海市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "440800",
                    "AreaName": "湛江市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "441200",
                    "AreaName": "肇庆市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "442099",
                    "AreaName": "中山市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "510300",
                    "AreaName": "自贡市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "512000",
                    "AreaName": "资阳市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "520300",
                    "AreaName": "遵义市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "530600",
                    "AreaName": "昭通市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "620700",
                    "AreaName": "张掖市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "640500",
                    "AreaName": "中卫市",
                    "AlphabetStr": "Z"
                },
                {
                    "AreaCode": "659000",
                    "AreaName": "自治区直辖县级行政区划",
                    "AlphabetStr": "Z"
                }
            ]
        }
    ]
    		}
    	},
    	created() {
    		 this.$store.state.headings=this.$router.history.current.name; //修改标题
    		  this.$store.state.isFooterShow=false; //显示底部导航
    	},
        components:{
            vHeader,
            Cell
        },mounted: function () { //加载完成后执行
        	
      }
    }
</script>
<style>
	.head-portrait{ position: relative; width: 100%; display: flex; box-sizing: border-box; padding:3rem 1rem; background: #fff;font-size: 16px;}
	.portrait{ width: 60px; height: 60px;border-radius: 50%; overflow: hidden; float: right; position: absolute; top:1rem; right:1rem;}
	.Hospital{margin-top:4rem;}
	/***City 选择城市页**/
.cityInfo{-webkit-overflow-scrolling:touch;position: absolute; top:4rem; z-index: 90; left:0;right: 0;bottom: 0; width:100%;height:100%;overflow-y:scroll;padding:0; margin:0 auto; background: #fff;box-sizing: border-box;}
.cityInfo .title5,.cityInfo .title4{
   width:100%; 
   font-size: 14px;
   height:30px;
   line-height:30px;
   margin:0 auto;
   background: #f2f2f2; display: block; padding:0;padding-left: 15px; box-sizing: border-box;}
.cityInfo .title5 span{ color:#999; margin-left: 5px;}
.cityInfo ul{ width: 100%; overflow: hidden; margin: 0 auto; padding:10px 0 0 0; display: block;}
.cityInfo ul.first-child li{margin-bottom:0;}
.cityInfo ul li{ width: 21%; float: left; text-align: center; 
border: 1px solid #e0e0e0;margin: 0; padding: 5px 0; margin-bottom: 10px; margin-left: 9px;overflow:hidden; text-overflow: ellipsis; white-space: nowrap;
font-size: 12px;
}
.cityInfo ul.city-list{ width: 100%; text-align: left;border: 0; }
.cityInfo ul.city-list li{ width: 100%;text-align: left; border: 0;border-bottom: 1px solid #eee;}
.cityInfo ul.city-list li ul{ margin: 0 auto;}
.cityInfo ul.city-list li ul li{ line-height: 9px; border:0}
</style>