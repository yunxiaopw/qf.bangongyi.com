// 年会留资 路由模块

export const leaveInformationRouters = [
    // 留资页
    {
        path: '/leaveInformation',
        name: 'leaveInformation',
        component: () => import('@/views/leaveInformation/index.vue'),
    },
]