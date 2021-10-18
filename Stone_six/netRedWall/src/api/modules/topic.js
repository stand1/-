import mainConfig from '../config/main'

export default {
    // 热门话题
    getHotTopics(params = {}) {
        let config = {
            url: '/api/v1.0/newarticle/home/getHotTopics',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取标签
    getSearchTags(params = {}) {
        let config = {
            url: '/api/v1.0/newarticle/article/getAllTag',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取标签基础信息
    getTagDetail(params = {}) {
        let config = {
            url: '/api/v1.0/newarticle/article/getTagDetail',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },  
    // 获取标签下的文章
    getArticleByTagId(params = {}) {
        let config = {
            url: '/api/v1.0/newarticle/article/getArticleByTagSettingId',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取标签下的品牌应用
    getBrandAppByTagId(params = {}) {
        let config = {
            url: '/api/v1.0/newGame/app/getBrandAppByTagId',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    

    
}
