import Vue from 'vue'
import Router from 'vue-router'
import { getUrlParams } from "@/utils/utils"

import { 
  personalAffairsSystemRouters,
  payAdministrationSystemRouters,
  leaveInformationRouters,
  h5Routers
}  from "./routersModule"


Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home'),
    },
    // 人事系统 模块
    ...personalAffairsSystemRouters,
    // 薪酬系统 模块
    ...payAdministrationSystemRouters,
    // 年会留资 模块
    ...leaveInformationRouters,
    // 移动端页面 模块
    ...h5Routers,
    // 拖拽组件试玩
    {
      path: '/drag',
      name: 'drag',
      component: () => import('@/views/drag'),
    },
  ]
})


//设置路由导航守卫
// router.beforeEach((to, from, next) => {
//   let path = getUrlParams('urlPath')
//   if(to.path !== path && path) {
//     next({path})
//   }else{
//     next()
//   }
// })

export default router

