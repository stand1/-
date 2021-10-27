import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '@/pages/layout/Layout'
import Home from '@/pages/home/index'


// import SeatingCenter from '@/pages/seating-center/index'
import { localKey } from '@/api/config/ip-config'
Vue.use(Router)
let userInfo = JSON.parse(localStorage.getItem(localKey + 'userInfo'))
export const constantRouterMap = [{
        path: '/',
        component: Home,
        redirect: "/home/index",
        hidden: true
    },
    { path: '/login', component: _import('login/newIndex'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    {
        path: '/home',
        component: Layout,
        redirect: '/home/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('home/index'), name: '审核' }]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('user/index'), name: '个人' }]
    },
    {
        path: '/team',
        component: Layout,
        redirect: '/team/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('team/index'), name: '团队' }]
    },
    {
        path: '/answers',
        component: Layout,
        redirect: '/answers/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('answers/index'), name: '常见问题' }]
    },
    {
        path: '/bannerManage',
        component: Layout,
        redirect: '/bannerManage/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('bannerManage/index'), name: 'banner管理' }]
    },
    {
        path: '/activityManager',
        component: Layout,
        redirect: '/activityManager/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('activityManager/index'), name: '活动管理' }]
    },
    {
        path: '/tutorManager',
        component: Layout,
        redirect: '/tutorManager/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('tutorManager/index'), name: '导师管理' }]
    },
    {
        path: '/dataStatistics',
        component: Layout,
        redirect: '/dataStatistics/index',
        icon: 'index_icon',
        meunShow: 1,
        hidden: false,
        noDropdown: true,
        children: [{ path: 'index', component: _import('dataStatistics/index'), name: '数据统计' }]
    },
    { path: '/saveTutor', component: _import('tutorManager/saveTutor'), hidden: true },
    { path: '/activity', component: _import('activityManager/activity'), hidden: true },
    { path: '/banner', component: _import('bannerManage/banner'), hidden: true },
    { path: '/answersManager', component: _import('answers/answersManager'), hidden: true },
    { path: '/examine', component: _import('home/examine'), hidden: true },
    { path: '*', redirect: '/404', hidden: true }
]



const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
