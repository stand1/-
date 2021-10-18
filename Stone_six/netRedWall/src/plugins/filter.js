import Vue from 'vue'
const Filters = {
    formatSex(value){
        var str;
        switch(value){
            case 'male':
                str = '男';
                break;
            case 'female':
                str = '女';
                break;
            default :
                str = '未知';
        }
        return str
    },
    filterImgUrl(val){
        if(/\.aliyuncs\.com/i.test(val) &&/\.mp4/.test(val.toLowerCase())){
            return val
        }
        else if(/\.aliyuncs\.com/i.test(val) &&/\?x-oss-process\=video/.test(val) && ! /x-oss-process\=image/i.test(val) ){
            // return val+'&x-oss-process=image/quality,q_80/resize,w_360'
            return val+'&x-oss-process=image/quality,q_80'
        }
        else if ( /\.aliyuncs\.com/i.test(val) && ! /x-oss-process\=image/i.test(val) ){
            // return val+'?x-oss-process=image/quality,q_80/resize,w_360'
            return val+'?x-oss-process=image/quality,q_80'
        } else if ( val ) {
            return val
        }
    },
    videoShot(val){
        // if ( /\.mp4$/i.test(val ) ){
        if ( /\.aliyuncs\.com/i.test(val) ){
            return val+'?x-oss-process=video/snapshot,t_10,f_jpg,w_360,h_0,m_fast'
        } else if ( val ) {
            return val
        }
    },
    videoShotNew(val){
      if ( /video\/snapshot/i.test( val )  ) {
        // 默认有截屏不处理
        return val
      } else if (/\.aliyuncs\.com/i.test( val ) &&/\.mp4/i.test( val ) )  {
        return val + '?x-oss-process=video/snapshot,t_10,f_jpg,w_360,h_0,m_fast'
      }
      return val
    },
    formatMoney(value){
        if (value) {
        value = Number(value);
        return '￥ ' + value.toFixed(2);
        }
    },
    parseTime (time, cFormat){
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
}

export default Filters
