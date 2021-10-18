import mainConfig from '../config/main'
import {
    apiURL
} from '../config/ip-config'
export default {
    //主页
    getHomeModel() {
        let config = {
            url: '/api/crm/rb-message/activity/indexPageInfo',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), {})
    },

    //左边
    // 客户列表
    getAgentUserList(params) {
        let config = {
            url: '/agent/userList',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getMINIOSign() { //获取MINIO签名
        let config = {
            url: '/api/v1.0/redt_b_user/file/stsSign',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), {})
    },

    //中间
    //获取客户聊天记录
    getChatRecord(params) {
        let config = {
            url: '/chatmessage/listPage',
            method: 'post'
        }
        mainConfig.headers['token'] = params.token
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //结束对话
    closeChat(params) {
        let config = {
            url: '/agent/close',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //获取个人快捷回复列表
    getPersonalQuicklyReplyList(params) {
        let config = {
            url: '/knowledge/quickly/personal/list',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //添加个人快捷回复
    addPersonalQuicklyReply(params) {
        let config = {
            url: '/knowledge/quickly/personal/add',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //删除个人快捷回复
    deletePersonalQuicklyReply(params) {
        let config = {
            url: '/knowledge/delete',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },



    //右侧   userBaseInfo
    //获取客户基本信息
    getClientBaseInfo(params) {
        let config = {
            url: '/agentuser/info/contacts',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取用户类型列表
    getSelectClientType(params) {
        let config = {
            url: 'agentuser/info/select/type',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取潜客等级列表
    getClientLevelList(params) {
        let config = {
            url: 'agentuser/info/select/level',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取意向车型列表
    getAimCarList(params) {
        let config = {
            url: 'agentuser/info/select/aimCar',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取客户标签列表
    getClientLabelList(params) {
        let config = {
            url: 'agentuser/info/select/label',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //修改客户基本信息
    modifyClientBaseInfo(params) {
        let config = {
            url: '/agentuser/info/contacts/edit',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取快捷回复分类
    getQuicklyReplyTypeList(params) {
        let config = {
            url: '/knowledge/category/quickly/listLv1',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取快捷回复树数据
    getQuicklyReplyTreeList(params) {
        let config = {
            url: '/knowledge/listQuickly4Console',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //根据分类id获取快捷回复
    getQuicklyReplyList(params) {
        let config = {
            url: '/knowledge/listByCategory',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //查询车辆订单
    getCarOrderList(params) {
        let config = {
            url: '/agentuser/order/car',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //精品订单
    getFineOrderList(params) {
        let config = {
            url: '/agentuser/order/jp',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //保险订单
    getInsuranceOrderList(params) {
        let config = {
            url: '/agentuser/order/bx',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //服务订单
    getServiceOrderList(params) {
        let config = {
            url: '/agentuser/order/servicePack',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //历史记录-聊天记录
    getHistoryChatMessage(params) {
        let config = {
            url: '/chatmessage/listPage',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //根据输入内容匹配话术
    matchInputKnowledge(params) {
        let config = {
            url: '/knowledge/match',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //选择匹配到的话术
    selectMatchKnowledge(params) {
        let config = {
            url: '/knowledge/clickMatch',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    getOSSSign() { //获取OSS签名
        let config = {
            url: 'api/v1.0/redt_b_user/oss/sign',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), {})
    },

    //获取客户聊天记录
    getChatRecord(params) {
        let config = {
            url: '/api/crm/rb-message/salesUser/chat/chatHistory',
            method: 'get'
        }
        mainConfig.headers['token'] = params.token
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    formMainServer(obj) {
        let config = {
            url: obj.baseURL ? obj.baseURL : obj.url,
            method: obj.method || 'post'
        }
        // mainConfig.headers['Admin-Token'] = obj.token
        mainConfig.headers['Content-Type'] = obj.contentType || 'application/x-www-form-urlencoded'
        return this.sendAjax(Object.assign({}, mainConfig, config), obj.params)
    },
    getServiceList(params) {
        let config = {
            // url: '/api/v1.0/redt_b_knowledge/selfservice/list',
            url: '/api/crm/rb-message/selfservice/list',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    //根据服务id查问题列表
    getQuestionList(params) {
        let config = {
            // url: '/api/v1.0/redt_b_knowledge/selfservice/listByCategoryId',
            url: '/api/crm/rb-message/selfservice/listByCategoryId',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //点击自助服务问题
    clickQuestion(params) {
        let config = {
            url: '/api/crm/rb-message/selfservice/click',
            // url: '/api/v1.0/redt_b_knowledge/selfservice/click',
            method: 'post'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    //获取消息
    getMessage(params) {
        let config = {
            url: '/api/v1.0/redt_b_user/salesUser/chat/getMessage',
            method: 'get'
        }

        mainConfig.headers.salerId = params.salerId
        console.log(mainConfig)
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },

    // saveAccessRecords(params) {
    //     let config = {
    //         url: '/api/v1.0/redt_b_user/accessRecords/saveAccessRecords',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // addAccessRecordsEndTime(params) {
    //     let config = {
    //         url: '/api/v1.0/redt_b_user/accessRecords/addAccessRecordsEndTime',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    // addAccessRecordsEndTime(params) {
    //     let config = {
    //         url: '/api/v1.0/redt_b_user/accessRecords/addAccessRecordsEndTime',
    //         method: 'post'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    //获取省市联动数据
    getProvinceList(params = {}) {
        let config = {
            url: '/api/v1.0/redt_b_tool/sys/getAllProvince',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    getCityList(params = {}) {
        let config = {
            url: '/api/v1.0/redt_b_tool/sys/getCityBylProvince',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    // createTourClient(params={}) {
    //     let config = {
    //         url: '/api/v1.0/redt_b_user/salesUser/createTourClient',
    //         method: 'get'
    //     }
    //     return this.sendAjax(Object.assign({}, mainConfig, config), params)
    // },
    listGarage(params = {}) {
        let config = {
            url: '/api/v1.0/redt_b_car/car/listGarage',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
    searchFullText(params = {}) {
        let config = {
            // url: 'api/v1.0/redt_b_knowledge/knowledge/searchFullText',
            url: '/api/crm/rb-message/knowledge/searchFullText',
            method: 'get'
        }
        return this.sendAjax(Object.assign({}, mainConfig, config), params)
    },
            

    favorites(params) {
        let config = {
            url: "/api/crm/material/materialCollection/collectionGroupList",
            method: "post",
            params: {
                pageNum: 1,
                pageSize: 30,
            }
        }

        // mainConfig.headers['Admin-Token'] = "8d47330f1c284bda88399c9317194c79"
        return this.sendAjax(Object.assign({}, mainConfig, config), params)

    },


    //素材详情接口
 detailscalled(params) {
    let config = {
      url: '/api/crm/material/materialSearch/getMaterialById',
      method: 'post',
    }
    mainConfig.headers['Admin-Token'] = '8d47330f1c284bda88399c9317194c79'
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  }
,
  collection(params) {
    let config = {  
      url: '/api/crm/materialCollection/collectionMaterial',
      method: 'post',
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  },

  getCollectDataList(params) {
    let config ={
      url: '/api/crm/material/materialCollection/getcollectionMaterial',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  },

  //接待消息
   privatechat(params) {
    let config = {
      url: '/api/crm/rb-message/salesUser/chat/friendList',
      method: 'get',
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  },


  // 列表勾选发送消息
 messagesent(params) {
    let config = {
      url: '/api/crm/rb-message/group/sendMsg',
      method: 'post',
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  },

  //发送接口素材使用
  materialuse(params) {
    let config = {
      url: '/api/crm/material/materialSearch/useMaterial',
      method: 'post',
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  },


  /**
 * 获取群发列表
 */ getMassList(params) {
    let config = {
      url: '/api/crm/rb-message/group/getGroupList',
      method: 'get',
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  }

}