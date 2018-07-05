import axios from 'axios'
import util from './util';
import { Toast, Indicator } from 'mint-ui';
export default {
	/**
	 * 获取cookie
	 * @param {String} name 名称
	 * @param {String} value 内容
	 * @param {String} minutes 多少分钟后失效
	 */
	setCookie: function(name, value, minutes) {
		minutes = minutes || 20;
		var dateNow = new Date();
		dateNow.setMinutes(dateNow.getMinutes() + minutes);
		document.cookie = name + "=" + escape(value) + ";expires=" + dateNow.toGMTString();
	},
	/**
	 * 获取cookie
	 * @param {String} name 要获取的cookie的名称
	 */
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if(arr = document.cookie.match(reg)) return unescape(arr[2]);

		return null;
	},
	/**
	 * 清除 cookie
	 * @param {String} name 要清除的cookie的名称
	 */
	removeCookie: function(name) {
		util.setCookie(name, "", -1);
	},
	/**
	 * 获取 token
	 */
	getToken: function() {
		var token = util.getQueryString("Token");
		return token || "default";
	},
	/**
	 * 根据请求参数名称 获取请求参数值
	 * @param {String} name 参数名称
	 */
	getQueryString: function(name) { //获取浏览器参数 name为参数名
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.href.substr(window.location.href.indexOf('?') + 1);
		r = r.match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
	/**
	 * 根据请求参数名称 获取请求参数值
	 * @param {Object} router 路由对象
	 * @param {String} path 路由名称
	 * @param {Object} queryParams 请求参数
	 */
	pushRouter: function(router, path, queryParams) { //获取浏览器参数 name为参数名
		queryParams = queryParams || {};
		if(!queryParams.Token) queryParams.Token = util.getToken();
		router.push({
			path: path,
			query: queryParams
		});
	},
	/**
	 * 去除字符串空格
	 * @param {String} str 要处理的内容
	 * @param {String} is_global 是否所有 1是 0只去除前后空格
	 */
	trimStr: function(str, is_global) {
		var result;
		result = str.replace(/(^\s+)|(\s+$)/g, "");
		if(is_global) {
			result = result.replace(/\s/g, "");
		}
		return result;
	},
	Ajax: function(reqPath, paramArray, successCallBack, failuredCallBack) {
		var reqPath = reqPath + (reqPath.indexOf("?") == -1 ? "?" : "&") + "timeSerialize=" + (new Date()).getTime();
		// var baseUrl = 'http://localhost:8080', //请求地址http://192.168.0.141:8080
		//          reqPath=baseUrl+reqPath;
		let Type = getMethod(reqPath, "_method");

		function getMethod(reqPath, name) { //获取_method参数类型
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = reqPath.substr(reqPath.indexOf('?') + 1);
			r = r.match(reg);
			if(r != null) return unescape(r[2]);
			return "GET";
		}
		if(Type == "GET") {
			axios.get(reqPath, {
					params: paramArray
				})
				.then(function(response) {
					//			      if (response.status == 200) {
					//			                successCallBack(response);
					//			            }else{
					//			                Toast("服务器打盹了,再试一次叫醒它！");
					//			            }
					successCallBack(response);
				})
				.catch(function(error) {
					var resp = error.response;
					successCallBack(error.response);
					// console.log(error.response);
				});
		} else {
			console.log("Post")
			axios.post(reqPath, paramArray).then(function(response) {
				//				     if (response.status == 200) {
				//			                successCallBack(response);
				//			            }else{
				//			                Toast("服务器打盹了,再试一次叫醒它！");
				//			            }
				successCallBack(response);
			}).catch(function(error) {
				var resp = error.response;
				//status报错！！！
				// switch (resp.status) {
				//     case 500:
				//         Toast("服务器错误！");
				//         break;
				//     default:
				//         Toast(resp.data.message);
				//         break;
				// }
				successCallBack(error.response);
			});
		}
	},
	getSessionLocation: function(callback) { //高德浏览器定位城市
		var $this = this;
		var locationCookieKey = 'location';
		var location = $this.getCookie(locationCookieKey);
		if(location) {
			location = JSON.parse(location);
			callback(location); //返回城市信息
		} else {
			var geolocation = new AMap.Geolocation({
				resizeEnable: true,
				enableHighAccuracy: true, //是否使用高精度定位，默认:true
				timeout: 10000 //超过10秒后停止定位，默认：无穷大
			});
			geolocation.getCurrentPosition(); //浏览器定位
			AMap.event.addListener(geolocation, 'complete', function(data) {
				var Longitude = data.position.getLng();
				var Latitude = data.position.getLat();
				var geocoder = new AMap.Geocoder();
				var lnglatXY = [Longitude, Latitude]
				geocoder.getAddress(lnglatXY, function(status, result) {
					if(status === 'complete' && result.info === 'OK') {
						var _city = result.regeocode.addressComponent.city;
						var _district = result.regeocode.addressComponent.district;
						var _province = result.regeocode.addressComponent.province;
						var _street = result.regeocode.addressComponent.street;
						var _streetNumber = result.regeocode.addressComponent.streetNumber;
						var _township = result.regeocode.addressComponent.township;
						var _address = _province + _city + _street + _township + _streetNumber;
						var _adcode = result.regeocode.addressComponent.adcode;
						location = {
							"provinceCode": _adcode.substring(0, 2) + '0000',
							"cityCode": '', //_adcode.substring(0, 4) + '00'
							"cityCodeId": _adcode.substring(0, 4) + '00',
							"adcode": _adcode,
							"province": _province,
							"city": _city,
							"district": _district,
							"Longitude": Longitude,
							"Latitude": Latitude,
							"address": _address
						};
						$this.setCookie(locationCookieKey, JSON.stringify(location), 1);
						callback(location); //返回城市信息
					}
				});
			})
			//定位失败返回贵阳市
			AMap.event.addListener(geolocation, 'error', function(data) {
				location = {
					//                  "adcode": "520113",
					//                  "cityCode": '', //520100
					//                  "cityCodeId":'520100',
					//                  "provinceCode": '520000',
					//                  "city": '贵阳市',
					//                  "province": '贵州省',
					//                  "Longitude": 106.692152,
					//                  "Latitude": 26.58156,
					//                  "address": '贵州省贵阳市云岩区'
					"adcode": "",
					"cityCode": '', //520100
					"cityCodeId": '',
					"provinceCode": '',
					"city": '贵阳市',
					"province": '贵州省',
					"Longitude": 0,
					"Latitude": 0,
					"address": ''
				};
				callback(location); //返回城市信息
			});
		}
	},
	DrivingFunction: function(longitude, latitude, shopLongitude, shopLatitude) { //规划导航路线
		//创建驾车路线规划组件
		var driving = new AMap.Driving({
			hideMarkers: true
		});
		//console.log(shopLongitude+"==="+shopLatitude+"=="+longitude+"===="+latitude);
		//根据起终点坐标规划驾车路线[116.379028, 39.865042], [116.427281, 39.903719],
		driving.search([longitude, latitude], [shopLongitude, shopLatitude], function(status, result) {
			driving.searchOnAMAP({
				origin: result.origin,
				destination: result.destination
			});
		})
	},
	VueLazyload: function() {
		//图片赖加载
		Vue.use(VueLazyload, {
			preLoad: 1.3,
			error: require("./../../assets/bj_logo.png"),
			loading: require("./../../assets/bj_loading.gif"),
			attempt: 1
		})
	},
	isEmpty: function(str) {
		if(str == "" || str == "null" || str == "undefined" || str == null || str == undefined) {
			return true;
		} else {
			return false;
		}
	},

	isIDCard: function(idcard) {
		idcard = idcard.toUpperCase(); // 对身份证号码做处理
		var ereg;

		var Y, JYM;
		var S, M;
		/*基本校验*/
		//if (String.isNullOrEmpty(idcard)) return false;
		var idcard_array = new Array();
		idcard_array = idcard.split("");

		/*身份号码位数及格式检验*/
		switch(idcard.length) {
			case 15:
				if((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
				} else {
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
				}
				if(ereg.test(idcard)) {
					return true;
				} else {
					return false;
				}
				break;
			case 18:
				//18位身份号码检测
				//出生日期的合法性检查
				//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
				//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
				if(parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9XxAa]$/; //闰年出生日期的合法性正则表达式
				} else {
					ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9XxAa]$/; //平年出生日期的合法性正则表达式
				}

				if(ereg.test(idcard)) { //测试出生日期的合法性
					//计算校验位
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
						(parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
						(parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
						(parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
						(parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
						(parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
						(parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
						parseInt(idcard_array[7]) * 1 +
						parseInt(idcard_array[8]) * 6 +
						parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1);
					/*判断校验位*/
					if(M == idcard_array[17]) { /*检测ID的校验位false;*/
						return true;
					} else if(idcard_array[17] == 'A') { //A结尾不校验规则
						return true;
						/*检测ID的校验位false;*/
					} else {
						return false;
					}
				} else {
					return false;
				}
				break;
			default:
				return false;
		}
	},
	getCardData: function(id, type) {
		var data = parseInt(id.substr(6, 4)) + "-" + parseInt(id.substr(10, 2)) + "-" + parseInt(id.substr(12, 2))
		return data
	},
	//获取用户信息
	getUser: function() {
		axios.get('/api/user/me', {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(resp) {
			if(resp) {
				window.user = resp.data;
			}
		})
	},
	/**
	 * 获取指定的URL参数值
	 * URL:http://www.quwan.com/index?name=tyler
	 * 参数：paramName URL参数
	 * 调用方法:getParam("name")
	 * 返回值:tyler
	 */
	getParam: function(paramName) {
		paramValue = "", isFound = !1;
		if(this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
			arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
			while(i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
		}
		return paramValue == "" && (paramValue = null), paramValue
	}

}