// 薪酬管理 路由模块

export const payAdministrationSystemRouters = [
    // 薪酬管理 相关页面
    // {
    //     path: '/regularization',
    //     name: 'regularization',
    //     component: () => import('@/views/hrm/regularization/index'),
    // },
  // 薪酬总览
    // {
    //     path: '/payOverall',
    //     name: 'payOverall',
    //     component: () => import('@/views/remuneration/overall/Index.vue'),
    // },
  // 薪酬明细相关
    // {
    //     path: '/payDetail',
    //     name: 'payDetail',
    //     component: () => import('@/views/remuneration/detail/Index.vue'),
    // },
  // 薪酬设置
    // {
    //     path: '/paySetting',
    //     name: 'paySetting',
    //     component: () => import('@/views/remuneration/setting/attendance/index.vue'),
    // },
   // 审批发薪
    // 人事页面
  //   {
  //       path: '/payCheckGrant',
  //       name: 'payCheckGrant',
  //       component: () => import('@/views/remuneration/checkGrant/Index.vue'),
  //   },
  //   // 审核页面
  //   {
  //     path: '/payAdminCheckGrant',
  //     name: 'payAdminCheckGrant',
  //     component: () => import('@/views/remuneration/checkGrant/adminCheck.vue'),
  //   },
  //   // 历史记录
  //   {
  //     path: '/payHistory',
  //     name: 'payHistory',
  //     component: () => import('@/views/remuneration/checkGrant/history.vue'),
  //   },
  // // 薪酬详情
  //   {
  //     path: '/payDetails',
  //     name: 'payDetails',
  //     component: () => import('@/views/remuneration/checkGrant/details.vue'),
  //   },

     // 薪酬计算
    {
      path: '/intellectSalary',
      name: 'intellectSalary',
      component: () => import('@/views/remuneration/intellectSalary/Index.vue'),
    },
    // 新建薪资组
    {
      path: '/newSalary',
      name: 'newSalary',
      component: () => import('@/views/remuneration/intellectSalary/newSalary/Index.vue'),
    },
   
    // 编辑薪资组
    {
      path: '/editPage',
      name: 'editPage',
      component: () => import('@/views/remuneration/intellectSalary/editPage.vue')
     
    },
    // 数据采集
    {
      path: '/dataCollection',
      name: 'dataCollection',
      component: () => import('@/views/remuneration/dataCollection/Index.vue')
     
    },
    // 编辑数据采集
    {
      path: '/dataEditPage',
      name: 'dataEditPage',
      component: () => import('@/views/remuneration/dataCollection/editPage.vue')
     
    },
    // 新建数据采集
    {
      path: '/newCollectData',
      name: 'newCollectData',
      component: () => import('@/views/remuneration/dataCollection/newCollectData/Index.vue')
     
    },
    // 配置采集项
    {
      path: '/twoStep',
      name: 'twoStep',
      component: () => import('@/views/remuneration/dataCollection/newCollectData/components/twoStep.vue')
     
    },
    // 数据维护
    {
      path: '/dataMaintenance',
      name: 'dataMaintenance',
      component: () => import('@/views/remuneration/dataCollection/dataMaintenance/Index.vue')
     
    },

    //数据采集-- 设置基本信息
    {
      path: '/firstStep',
      name: 'firstStep',
      component: () => import('@/views/remuneration/dataCollection/newCollectData/components/firstStep.vue')
     
    },
    // 数据采集--在线编辑
    {
      path: '/onlineEdit',
      name: 'onlineEdit',
      component: () => import('@/views/remuneration/dataCollection/dataMaintenance/onlineEdit.vue')
     
    },
    // 数据采集--操作记录
    {
      path: '/setRecord',
      name: 'setRecord',
      component: () => import('@/views/remuneration/dataCollection/dataMaintenance/setRecord.vue')
     
    },

    // 数据填报
    {
      path: '/addCollect',
      name: 'addCollect',
      component: () => import('@/views/remuneration/dataCollection/addCollect/Index.vue'),
    },
    
]
