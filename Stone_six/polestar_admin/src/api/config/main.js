import router from '@/router'
import { apiURL } from './ip-config'

let baseURL = ''
baseURL = apiURL
const SUCCESS_CODE = 200
export default {
    method: 'get', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: baseURL,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',  //Form Data
        //'Content-Type': 'application/json;charset=utf-8'   //Json
        // 'Content-type': 'multipart/form-data'             //上传
    },

    req: function (config) {
        // Do something before request is sent
        // console.log('发送的数据', config.params || config.data)
        return config;
    },

    res: function (response) {
        // Do something with response data
        // console.log('返回的数据', response)
        if (response.data.code == response.config.successCode || response.data.code == SUCCESS_CODE) {
            return response.data.data
        } else if(response.data.code == 401) {
            // alert('用户信息验证失败，请重新登陆')
            router.replace('/login');
            return Promise.reject(response.data);
        } else {
            return Promise.reject(response.data);
        }
        return response;
    },

    withCredentials: true,    //默认为false
    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 9000,
    // timeout: 30000,

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
