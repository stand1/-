import mainConfig from '../config/main'

export default {
    // 获取banner列表
    bannerList(params) {
        let config = {
            url: 'api/v1.0/jx/banner/page',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 修改banner位置
    changeBanner(params) {
        let config = {
            url: 'api/v1.0/jx/banner/changeOrder',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取Banner详情
    bannerDetails(params) {
        let config = {
            url: 'api/v1.0/jx/banner/getById',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 删除Banner
    delBanner(params) {
        let config = {
            url: 'api/v1.0/jx/banner/delete',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 新增（修改）Banner
    saveBanner(params) {
        let config = {
            url: 'api/v1.0/jx/banner/save',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取活动列表
    activityList(params) {
        let config = {
            url: 'api/v1.0/jx/activity/page',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取活动详情
    activityDetails(params) {
        let config = {
            url: 'api/v1.0/jx/activity/getById',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 删除活动
    delActivity(params) {
        let config = {
            url: 'api/v1.0/jx/activity/delete',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 新增（修改）活动
    saveActivity(params) {
        let config = {
            url: 'api/v1.0/jx/activity/save',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取导师列表
    tutorList(params) {
        let config = {
            url: 'api/v1.0/jx/tutor/page',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 修改导师位置
    changeTutor(params) {
        let config = {
            url: 'api/v1.0/jx/tutor/changeOrder',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取导师详情
    tutorDetails(params) {
        let config = {
            url: 'api/v1.0/jx/tutor/getById',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 删除导师
    delTutor(params) {
        let config = {
            url: 'api/v1.0/jx/tutor/delete',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 新怎（编辑）导师
    saveTutor(params) {
        let config = {
            url: 'api/v1.0/jx/tutor/save',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取问题列表
    questionList(params) {
        let config = {
            url: 'api/v1.0/jx/question/page',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取问题详情
    questionDetails(params) {
        let config = {
            url: 'api/v1.0/jx/question/getById',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 删除问题
    delQuestion(params) {
        let config = {
            url: 'api/v1.0/jx/question/delete',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 新增（修改）活动
    saveQuestion(params) {
        let config = {
            url: 'api/v1.0/jx/question/save',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取审核列表
    examineList(params) {
        let config = {
            url: 'api/v1.0/jx/team/page',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取审核详情
    examineDetails(params) {
        let config = {
            url: 'api/v1.0/jx/team/getById',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 审核项目
    examine(params) {
        let config = {
            url: 'api/v1.0/jx/team/approve',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 数据统计
    statistics(params) {
        let config = {
            url: 'api/v1.0/jx/team/statistics',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 导出数据
    export(params) {
        let config = {
            url: 'api/v1.0/jx/team/export',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 上传图片
    uploadFiles(params) {
        let config = {
            url: 'api/newuser/file/upload',
            method: 'post',
            data: params,
            headers: {
                'Content-type': 'multipart/form-data'
            },
            timeout: 60000
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
}