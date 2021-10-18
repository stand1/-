import Vue from 'vue'
import VueRouter from 'vue-router'
import bdtongji from "@/plugins/bdtongji";
import wxshare from "@/plugins/initWX";
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'gender',
    meta: {
      title: "网红墙"
    },
    component: () => import('../views/index/gender.vue')
  },
  {
    path: '/gender',
    name: 'gender',
    meta: {
      title: "网红墙"
    },
    component: () => import('../views/index/gender.vue')
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: "网红墙"
    },
    component: () => import('../views/home/index.vue')
  }
  // {
  //   path: '*',
  //   name: '404',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
  // }
]


const router = new VueRouter({
  routes
})
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "";
  // wxshare(to);
  // bdtongji(to);
  next();
});


export default router;
