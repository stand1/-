import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import mainMixin from '@/mixins';
import filters from './filters';
import GlobalComponents from '@/components';
// import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import {api} from '@/api';
// import './permission';
import 'swiper/dist/css/swiper.css';
import './assets/iconfont/iconfont.css';
import './assets/iconfont2/iconfont.css';
import './assets/newiconfont/iconfont.css';



import VueClipboard from "vue-clipboard2"
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true

Vue.use(ElementUI)
Vue.use(mainMixin)
Vue.use(api)
Vue.use(VueAxios,Axios);

// register global utility filters.
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Object.keys(GlobalComponents).forEach(i => Vue.component(i, GlobalComponents[i]));


/* eslint-disable no-new */

window.EVENTBUS = new Vue()

Vue.config.productionTip = false

window.myApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
