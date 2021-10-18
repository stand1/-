import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import {api} from '@/api'
import 'vant/lib/index.css';
// import "../src/assets/iconfont/iconfont.css"
import './style/index.less'
import {  Tree } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Tree);

import{CheckboxGroup,Icon,Field,Area,Popup,RadioGroup, Radio,NavBar,Form,Button,DatetimePicker,Picker,Swipe, SwipeItem,Checkbox,Search,Tab, Tabs,Col, Row ,Divider,Tag,ContactCard,Overlay, Sidebar, SidebarItem,Pagination ,Dialog,PullRefresh,Toast,List,CellGroup } from 'vant';
import 'lib-flexible'

import filters from './plugins/filter';

import 'amfe-flexible'
import "./style/public.css"
import * as socketApi from '@/api/socket'
// import './assets/tailwind.css'
import './assets/global.less'

import mixins from './plugins/mixins';

// import "@/components/index"
// import  VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
import "swiper/css/swiper.min.css";

Vue.use(Area);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(Popup);
Vue.use(Field)
Vue.use(Radio);
Vue.use(RadioGroup)
Vue.use(NavBar)
Vue.use(api)
Vue.use(Form)
Vue.use(Checkbox);
Vue.use(Button)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Col);
Vue.use(Row);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(ContactCard);
Vue.use(Overlay);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(List);
Vue.use(CellGroup);
Vue.use(CheckboxGroup);


Vue.config.productionTip = false

Vue.prototype.socketApi = socketApi
Vue.use(mixins)

import SearchTree from 'vue-search-tree'
Vue.use(SearchTree)

window.myApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

