import router from '@/router'
import {
    apiURL
} from './ip-config'
import {
    Toast
} from 'vant';
import mixins from '@/plugins/mixins';




let baseURL = ''
baseURL = apiURL
console.log(apiURL)
const SUCCESS_CODE = 200
export default {
    method: 'get', // default
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //Form Data
        //'Content-Type': 'application/json;charset=utf-8'   //Json
        // 'Content-Type': 'multipart/form-data'             //上传
        "pathname": window.location.pathname,
        "href": window.location.href,
        'Admin-Token': "8d47330f1c284bda88399c9317194c79"
    },
    req: function (config) {
        // Do something before request is sent
        // console.log('发送的数据', config.params || config.data)
        return config;
    },

    res: function (response) {
   
        if (response.data.code == response.config.successCode || response.data.code == SUCCESS_CODE || response.data.code == 0) {
            return response.data.data || response.data
        } else if (response.data.code == 401) {
            // alert('用户信息验证失败，请重新登陆');
            // Toast('用户信息验证失败，请重新登陆');
            var ua = navigator.userAgent;
            if (!!ua.match(/REDT/ig)) {
                if (!!ua.match(/iosApp/ig)) {
                    window.webkit.messageHandlers.REDTShowLoginPage.postMessage('1');
                } else {
                    // window.REDT.REDTShowLoginPage('2'); //退2步
                    window.REDT.REDTShowLoginPage('1'); //退2步
                }
            } else {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
                    wx.miniProgram.getEnv((res) => {
                        if (res.miniprogram) {
                            // console.log("在小程序里");
                            wx.miniProgram.navigateTo({
                                url: '/pages/login/index'
                            })
                            // window.localStorage.setItem("isMiniApp", true);
                        } else {
                            console.log("不在小程序里");
                            router.push('/login');
                            // window.localStorage.setItem("isMiniApp", false);
                        }
                    })
                } else {
                    router.push('/login');
                    // window.localStorage.setItem("isMiniApp", false);
                }
            }
            return Promise.reject(response.data);
        } else {
            return Promise.reject(response.data);
        }
        return response;
    },

    withCredentials: true, //默认为false
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 10000,

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function (status) {
        return status === 200 || status === 401 // default
    }
}