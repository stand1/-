import Axios from 'axios'
import qs from 'qs'
import login from './modules/login'
import common from './modules/common'
import polestar from './modules/polestar'
import Store from '../store'


const modules = [login, common, polestar];

class GetData {
    constructor() {}
 
    sendAjax(options, params) {
        this.initInterceptor()
        Axios.interceptors.request.use(options.req || new Function());
        Axios.interceptors.response.use(options.res || new Function());
        for(var i in params){
            if(params[i]===''){
                delete params[i]
            }
        }
        if (options.method === 'post') {
            if(/application\/json/.test(options.headers['Content-type'])){
                options.data = options.data || JSON.stringify(params);
            }else{
                options.data = options.data || qs.stringify(params, { indices: false });
            }
        } else {
            options.params = params
        }
        let token;
        if(Store.getters.getToken){
            token = Store.getters.getToken;
        }else{
            token = ''
        }
        options.headers['token'] = token;

        return Axios(options)
    }

    fetch(params) {  //基础方法
        this.initInterceptor()
        return Axios(params)
    }

    initInterceptor() {
        Axios.interceptors.request.handlers = []
        Axios.interceptors.response.handlers = []
    }
}

const injectFunction = function(constructor) {
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
    api, getData
}
