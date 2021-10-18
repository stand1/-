import Axios from 'axios'
import qs from 'qs'
import login from './modules/login'
import post from './modules/post'
import chat from './modules/chat'
import index from './modules/index'
import router from '@/router'
import store from '../store/index'
import topic from './modules/topic'
const modules = [login, chat, index, post, topic];

class GetData {
    constructor() { }
    sendAjax(options, params) {
        if (router.app.$route) {
            if (router.app.$route.query.tenant) {
                store.state.tenant = router.app.$route.query.tenant
                sessionStorage.setItem("B2_tenant", router.app.$route.query.tenant)
            }
            options.headers['tenant'] = router.app.$route.query.tenant || store.state.tenant || sessionStorage.getItem("B2_tenant");
        }

        // console.log('======',sessionStorage.getItem("token"))
        // console.log('======',sessionStorage.getItem("mallToken"))

        
        options.headers['token'] = sessionStorage.getItem("token");
        options.headers['mallToken'] = sessionStorage.getItem("mallToken");

        this.initInterceptor()
        Axios.interceptors.request.use(options.req || new Function());
        Axios.interceptors.response.use(options.res || new Function());
        if (options.method === 'post') {
            if ((options.headers['Content-Type'] && options.headers['Content-Type'].indexOf('application/json')) !== -1) {
                options.data = params;
            } else {
                options.data = options.data || qs.stringify(params, {
                    indices: false
                })
            }
        } else {
            options.params = params
        }

        return Axios(options)
    }
    fetch(params) { //基础方法
        this.initInterceptor()
        return Axios(params)
    }
    initInterceptor() {
        Axios.interceptors.request.handlers = []
        Axios.interceptors.response.handlers = []
    }
}
const injectFunction = function (constructor) {
    modules.forEach((value) => {
        for (let i in value) {
            constructor.prototype[i] = value[i]
        }
    })
}
injectFunction(GetData)
const api = function (Vue, options) {
    Vue.prototype.$getData = new GetData()
}
const getData = new GetData()
export {
    api,
    getData
}