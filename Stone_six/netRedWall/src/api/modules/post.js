import mainConfig from '../config/main'

export default {  
    // 获取帖子视频分类
    getArticleVideoTypeList(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/article/getVideoClassify',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 发草稿
    publishDraft(params) {
        let config = {
            url: '/api/v1.0/newarticle/article/publishDraft',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 发文章
    publishPost(params) {
        let config = {
            url: '/api/v1.0/newarticle/article/publish',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 发图片
    publishImg(params) {
        let config = {
            url: params.url?params.url:'/api/v1.0/newarticle/article/publishImg',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 发视频
    publishVideo(params) {
        let config = {
            url: '/api/v1.0/newarticle/article/publishVideo',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取杂志素材
    getMagazineBg(params={}) {
        let config = {
            url: '/api/v1.0/newuser/magazine/getImgSource',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },   
    // 生成杂志
    createMagazine(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/common/watePicOssUrl',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 图片截图
    cropImage(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/common/cutePic',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // 获取帖子列表
    getPostList(params) {
        let config = {
            url: '/api/v1.0/newuser/user/sendSmsForLogin',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getPostDetail(params={}) {
        let config = {
            url: '/api/crm/redt-b-admin/api/v1.0/redt-b-admin/article/getArticleDetail',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getPostComments(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/comment/getComments',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getCommentReplys(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/reply/getReplys',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    postLike(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/like/like',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    postUnlike(params={}) {
        let config = {
            url: '/api/v1.0/newarticle/like/unlike',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // postUnlike(params={}) {
    //     let config = {
    //         url: '/api/v1.0/newarticle/like/unlike',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    postFollowUser(params={}){
        let config = {
            url: '/api/v1.0/newuser/user/followUser',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    postUnFollowUser(params={}){
        let config = {
            url: '/api/v1.0/newuser/user/unfollowUser',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    communityFollow(params={}){
        let config = {
            url: '/api/v1.0/newcommunity/community/focus',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    communityUnFollow(params={}){
        let config = {
            url: '/api/v1.0/newcommunity/community/unFocus',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    publishComment(params={}) {       //发表评论||编写评论
        let config = {
            url: '/api/v1.0/newarticle/comment/edit',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    publishReply(params={}) {       //发表回复||编写回复
        let config = {
            url: '/api/v1.0/newarticle/reply/edit',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getCommentPPL(params={}) {       //获取帖子评论用户
        let config = {
            url: '/api/v1.0/newarticle/article/getUserByArticleId',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    }

    
}
