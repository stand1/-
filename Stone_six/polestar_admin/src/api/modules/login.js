import mainConfig from '../config/main'

export default {
    // 登录
    login(params) {
        let config = {
            url: 'api/v1.0/jx/admin/login',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // //注册账号
    // register(params) {
    //     let config = {
    //         url: '/register',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //判断登录
    // isLogin(params) {
    //     let config = {
    //         url: '/isLogin',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //示忙
    // agentBusyOrNot(params) {
    //     let config = {
    //         url: '/agent/busyOrNot',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //查询坐席状态   //UN_READY : 登录未就绪 READY 就绪， BUSY 示忙
    // getAgentStatus(params) {
    //     let config = {
    //         url: 'agent/getStatus',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    //退出登录
    logout(params) {
        let config = {
            // url: '/logout',
            url: '/api/v1.0/iclubst/user/logout',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //修改密码
    // changePassword(params) {
    //     let config = {
    //         url: '/updatePassword',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //话机登录
    // callLogin(params) {
    //     let config = {
    //         url: '/call/login',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //获取菜单和权限列表
    // getMenuList() {
    //     let config = {
    //         url: '/menu/new',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config))
    // },
    // //记录上下线存库
    // recordChangeStatus(params) {
    //     let config = {
    //         url: '/agent/changeStatus',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //记录上下线list
    // recordChangeStatusList(params) {
    //     let config = {
    //         url: '/session/onlineRcd',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // //下线前查看是否做完全部工单
    // checkAllOnoffline(params) {
    //     let config = {
    //         url: '/agent/isAllDoworklist',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
}