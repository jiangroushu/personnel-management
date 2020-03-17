import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 *
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true
        },
        component: () => import('@/view/login/login.vue')
    },
    // {
    //     path: '/',
    //     name: '_home',
    //     redirect: '/dashboard',
    //     component: Main,
    //     meta: {
    //         notCache: true
    //     },
    //     children: [
    //         {
    //             path: '/dashboard',
    //             name: 'dashboard',
    //             meta: {
    //                 title: 'Dashboard',
    //                 notCache: true,
    //                 icon: 'md-pulse'
    //             },
    //             component: () => import('@/view/single-page/dashboard')
    //         }
    //     ]
    // },
    {
        path: '/',
        name: '_user',
        redirect: '/home',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: 'home',
                name: '员工信息管理',
                meta: {
                    title: '员工信息管理',
                    notCache: true,
                    icon: 'md-people'
                },
                props: route => ({
                    isAdd: Boolean(route.query.isAdd)
                }),
                component: () => import('@/view/single-page/user')
            }
        ]
    },
    {
        path: '/message',
        name: 'message',
        component: Main,
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        children: [
            {
                path: 'message_page',
                name: 'message_page',
                meta: {
                    icon: 'md-notifications',
                    title: '消息中心'
                },
                component: () => import('@/view/single-page/message/index.vue')
            }
        ]
    },
    {
        path: '/electricity_bill',
        name: '考勤管理',
        meta: {
            icon: 'logo-buffer',
            title: '考勤管理'
        },
        component: Main,
        children: [
            {
                path: 'meter_setting',
                name: '上班登记',
                meta: {
                    icon: 'md-trending-up',
                    title: '上班登记'
                },
                component: () => import(/* webpackChunkName: "electricity_bill" */ '@/view/electricity-bill/meter-setting.vue')
            },
            {
                path: 'user_setting',
                name: '下班登记',
                meta: {
                    icon: 'md-trending-down',
                    title: '下班登记'
                },
                component: () => import(/* webpackChunkName: "electricity_bill" */ '@/view/electricity-bill/user-setting.vue')
            },
            {
                path: 'tariff_setting',
                name: '请假登记',
                meta: {
                    icon: 'ios-infinite',
                    title: '请假登记'
                },
                component: () => import(/* webpackChunkName: "electricity_bill" */ '@/view/electricity-bill/tariff-setting.vue')
            },
            {
                path: 'transaction',
                name: '加班登记',
                meta: {
                    icon: 'md-list',
                    title: '加班登记'
                },
                component: () => import(/* webpackChunkName: "electricity_bill" */ '@/view/electricity-bill/transaction.vue')
            },
            {
                path: 'travel',
                name: '出差登记',
                meta: {
                    icon: 'ios-briefcase-outline',
                    title: '出差登记'
                },
                component: () => import(/* webpackChunkName: "electricity_bill" */ '@/view/electricity-bill/travel.vue')
            }
        ]
    },
    {
        path: '/wage',
        name: '_wage',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: 'wage_management',
                name: '工资管理',
                meta: {
                    title: '工资管理',
                    notCache: true,
                    icon: 'logo-yen'
                },
                component: () => import('@/view/single-page/wage')
            }
        ]
    },
    {
        path: '/history',
        name: '_history',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: 'home',
                name: '招聘管理',
                meta: {
                    title: '招聘管理',
                    notCache: true,
                    icon: 'md-person-add'
                },
                component: () => import('@/view/single-page/history')
            }
        ]
    },
    {
        path: '/training',
        name: '_training',
        component: Main,
        meta: {
            notCache: true
        },
        children: [
            {
                path: 'training_setting',
                name: '培训管理',
                meta: {
                    title: '培训管理',
                    notCache: true,
                    icon: 'ios-paper'
                },
                component: () => import('@/view/single-page/training')
            }
        ]
    },
    {
        path: '/error_logger',
        name: 'error_logger',
        meta: {
            hideInBread: true,
            hideInMenu: true
        },
        component: Main,
        children: [
            {
                path: 'error_logger_page',
                name: 'error_logger_page',
                meta: {
                    icon: 'ios-bug',
                    title: '错误收集'
                },
                component: () => import(/* webpackChunkName: "error_page" */ '@/view/single-page/error-logger.vue')
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {
            hideInMenu: true
        },
        component: () => import(/* webpackChunkName: "error_page" */ '@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {
            hideInMenu: true
        },
        component: () => import(/* webpackChunkName: "error_page" */ '@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {
            hideInMenu: true
        },
        component: () => import(/* webpackChunkName: "error_page" */ '@/view/error-page/404.vue')
    }
]
