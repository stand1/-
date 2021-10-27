import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'


// register global progress.
const whiteList = ['/login', '404', '401'] // 免登录白名单
router.beforeEach((to, from, next) => {

    next();
    // return



    //NProgress.start()                // 开启Progress
    if (store.getters.getUserId) {
        if (to.path === '/' || to.path === '/login') {
            next();
            return
            next({ path: '/home/index' })
                //NProgress.done() 
        } else if (to.path === '/404' || to.path === '/401') {
            next()
                // return
        } else {

            next()



            return
            let accessList = store.getters.getAccessList
            let menuList = store.getters.getMenuList
            if (menuList.length === 0) {
                store.dispatch('getMenuList').then(res => {
                        store.commit('SET_MENULIST', res.menuList)
                        store.commit('SET_ACCESSLIST', res.accessList)
                        if (res.menuList.length == 0 && res.accessList.length == 0) {
                            //先清缓存再登录
                            store.commit('CLEAR_USER')
                            next({ path: '/login' })
                        } else {
                            next({...to, replace: true })
                        }
                        // next({ ...to, replace: true }) 
                    })
                    .catch((err) => {
                        store.dispatch('LogOut').then(() => {
                            Message.error(err || '长时间未操作请重新登录！')
                            next({ path: '/login' })
                            location.reload(); // 为了重新实例化vue-router对象 避免bug
                        })
                    })
            } else {
                if (accessList.some(item => item.indexOf(to.path) >= 0)) {
                    next()
                } else {
                    // next({ path: '/401' })
                    next('/401')
                }
            }

            // next()

            //页面实时修改当前账号的权限时用
            // if (store.getters.getRoles.length === 0) {
            //   store.dispatch('GenerateRoutes',{roles}).then(() => {   // 生成可访问的路由表
            //     router.addRoutes(store.getters.addRouters)    // 动态添加可访问路由表
            //     next({ ...to })                               // hack方法确保addRoutes已完成
            //   })
            // }else{
            //   next()
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
                //NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
})

router.afterEach(() => {
    //NProgress.done()                // 结束Progress
})