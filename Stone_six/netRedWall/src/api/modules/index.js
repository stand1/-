import mainConfig from '../config/main'

export default {
    //通过品牌获取车系
    getCarByBrandId(params={}) {
        let config = {
            url: 'api/crm/rb-message/car/getCarByBrandId',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 客户列表
    getCarTypeByCarId(params) {
        let config = {
            url: 'api/v1.0/redt_b_car/carConfig/getCarTypeByCarId',
            method: 'get'
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
    },
    newFormMainServer(obj) {
        let config = {
            baseURL: obj.baseURL?obj.baseURL: apiURL,
            url: obj.url,
            method: 'post',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            timeout: 60000
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), obj.params)
    },
    addLine(params={}) {
        let config = {
            url: 'api/v1.0/newGame/red/addLine',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    sends(params={}) {
        let config = {
            url: 'api/v1.0/newGame/red/send',
            method: 'post',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    topicList(params={}) {
        let config = {
            url: 'api/v1.0/newGame/red/topicList',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    userList(params={}) {
        let config = {
            url: 'api/v1.0/newGame/red/userList',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    sendSms(params={}) {
        let config = {
            url: 'api/v1.0/newuser/user/sendSms',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
}