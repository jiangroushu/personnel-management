import fetch from '@/libs/fetch'

export default class User {
    /**
     *
     * @description 登录
     */
    static login(data) {
        return fetch({
            url: '/user/login',
            method: 'post',
            data
        })
    }

    /**
     * @description 获取登录用户信息
     *
     */
    static getUserInfo(data) {
        return fetch({
            url: `/user/getUserName&token=${data}`,
            method: 'get',
            data
        })
    }
    /**
     *
     * @description 刷新token
     *
     */
    static refreshToken() {
        return fetch({
            url: '/v1/adminUser/refreshToken',
            method: 'get'
        })
    }

    /**
     * @description 退出登录
     *
     */
    static logout() {
        return fetch({
            url: '/v1/adminUser/logout',
            method: 'get'
        })
    }

    /**
     * @description 获取用户列表
     *
     */
    static getUserList(data) {
        return fetch({
            url: '/v1/appUser',
            method: 'get',
            params: data
        })
    }

    /**
     *
     * @description 充值
     */
    static topUp(data) {
        return fetch({
            url: '/v1/funds/deposit',
            method: 'post',
            data
        })
    }
    /**
     *
     * @description 退款
     */
    static refund(data) {
        return fetch({
            url: '/v1/funds/refund',
            method: 'post',
            data
        })
    }
}
