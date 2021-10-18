import mainConfig from '../config/main'

export default {
    // 登录
    sendCode(params) {
        let config = {
            url: '/api/v1.0/redt_b_user/salesUser/sendSmsForLogin',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // login(params) {
    //     let config = {
    //         url: '/api/crm/crmCustomerCus/loginWithCheckCode',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
        // 登录
        login(params) {
            let config = {
                url: '/api/v1.0/newuser/user/loginForCheckcode',
                method: 'post'
            }
            return this.sendAjax(Object.assign({}, mainConfig, config), params)
        },
        // token获取用户信息
        phoneByToken(params) {
            let config = {
                url: '/api/v1.0/mall/custom/xunyou/api/getUserByPhone',
                method: 'post'
            }
            return this.sendAjax(Object.assign({}, mainConfig, config), params)
        },   




    isLogin(params) {
        let config = {
            url: '/api/v1.0/redt_b_user/salesUser/clientIsLogin',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    saveClientIntentionModel(params) {
        let config = {
            url: '/api/v1.0/redt_b_car/carConfig/saveClientIntentionModel',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    saveBrowseModelRecords(params) {
    let config = {
        url: '/api/v1.0/redt_b_user/browseModelRecords/saveBrowseModelRecords',
        method: 'post'
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },



    // 获取验证码
    getSMSCode(params) {
        let config = {
            url: '/api/v1.0/newuser/user/sendSmsForLogin',
            method: 'post',
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取帖子素材
    getArticleList(params) {
        let config = {
            url: '/api/v1.0/newcommunity/community/getArticle',
            method: 'get',
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取全部手机号展示
    getAllPhoneNum(params) {
        let config = {
            url: '/api/v1.0/newuser/user/showHotPhones',
            method: 'get',
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
}