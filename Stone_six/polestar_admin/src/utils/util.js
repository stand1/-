var Util = {
	checkTel: (tel) => {
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if(!myreg.test(tel)) { //失败
			return false;
		}
		return true;
	},
	dateFormat(tmp, fmt) {
		var date = null;
		if(!tmp) {
			return "";
		}
		if(tmp instanceof Date) {
			date = tmp;
		} else if(typeof tmp == "string" || typeof tmp == "number") {
			date = new Date(tmp);
		} else {
			return "";
		}
		if(date == "Invalid Date") {
			var aaa = tmp.replace(/-/g, "/");
			date = new Date(aaa);
		}
		if(!fmt) {
			fmt = "yyyy-MM-dd";
		}
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	},
	parseTimehk(time, cFormat) {
		if (arguments.length === 0) {
		  return null
		}
		const format = cFormat || '{y}/{m}/{d}'
		let date
		if (typeof time === 'object') {
		  date = time
		} else {
		  if (('' + time).length === 10) time = parseInt(time) * 1000
		  date = new Date(time)
		}
		const formatObj = {
		  y: date.getFullYear(),
		  m: date.getMonth() + 1,
		  d: date.getDate(),
		  h: date.getHours(),
		  i: date.getMinutes(),
		  s: date.getSeconds(),
		  // a: date.getDay()
		}
		const time_str = format.replace(/{(y|m|d)+}/g, (result, key) => {
		  let value = formatObj[key]
		  // if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
		  if (result.length > 0 && value < 10) {
			value = '0' + value
		  }
		  return value || 0
		})
		return time_str
	},
	parseTimeDateAndTime(time, cFormat) {
		if (arguments.length === 0) {
			return null
		}
		const format = cFormat || '{m}.{d} {h}:{i}'
		let date
		if (typeof time === 'object') {
			date = time
		} else {
			if (('' + time).length === 10) time = parseInt(time) * 1000
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			// a: date.getDay()
		}
		const time_str = format.replace(/{(m|d|h|i)+}/g, (result, key) => {
			let value = formatObj[key]
			// if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	},
	parseTime(time, cFormat) {     
		if (arguments.length === 0) {
			return null
		}
		const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
		let date
		if (typeof time === 'object') {
			date = time
		} else {
			if (('' + time).length === 10) time = parseInt(time) * 1000
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			// a: date.getDay()
		}
		const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			let value = formatObj[key]
			// if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	},
	formatNum(str) {      //货币转换
		var newStr = "";
		var count = 0;

		if(str.indexOf(".") == -1) {
			for(var i = str.length - 1; i >= 0; i--) {
				if(count % 3 == 0 && count != 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr;
				}
				count++;
			}
			str = newStr + ".00"; //自动补小数点后两位
			return str
		} else {
			for(var i = str.indexOf(".") - 1; i >= 0; i--) {
				if(count % 3 == 0 && count != 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr; //逐个字符相接起来
				}
				count++;
			}
			str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
			return str
		}
	},   
	filterArr(arr,findkey,val,returnkey){    //返回value值
		returnkey?"":returnkey=findkey;
		for(var i in arr){
			if(arr[i][findkey]==val) return arr[i][returnkey]
		}
		return undefined
	},
	findArr(arr,findkey,val){   //返回index
		for(var i in arr){
			if(arr[i][findkey]==val) return i
		}
		return undefined
	},
	// findArr(arr,findkey,val){   //返回index
	// 	for(var i in arr){
	// 		if(arr[i][findkey]==val) return i
	// 	}
	// 	return undefined
	// }
}
export default Util