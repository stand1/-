import mainConfig from '../config/main'
import { apiURL } from '../config/ip-config'
export default {
    //登录
    // 获取验证码
    getSMSCode(params) {
        let config = {
            url: '/api/v2/common/sendSMSCode',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //上传图片
    uploadFile(params) {
        let config = {
            url: '/api/v2/common/uploadOneFile',
            method: 'post',
            data: params,
            headers: {
                'Content-type': 'multipart/form-data'
            },
            timeout: 60000
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), {})
    },
     //获取省市联动数据
    getCityList(params) {
        let config = {
            url: '/api/v2/city/listBySelect',
            method: 'post',
            successCode: 200
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getOSSSign(params={}) {  //获取OSS签名
        let config = {
            // url: 'api/v1.0/redt_b_user/oss/sign',
            url:'/api/v1.0/photo/oss/sign',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config),params)
    },
    getOSSKey(params) {
        let config = {
            url: '/common/ossSignature',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    formMainServer(obj) {
        let config = {
            baseURL: obj.baseURL?obj.baseURL: apiURL,
            url: obj.url,
            method: obj.method || 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), obj.params)
    }
}