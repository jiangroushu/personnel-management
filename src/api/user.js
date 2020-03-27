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
     * @description 获取用户列表
     *
     */
    static getUserList(data) {
        return fetch({
            url: '/userInfo/getAllUserInfo',
            method: 'get',
            params: data
        })
    }

    /**
     * @description 修改用户信息
     *
     */
    static updateUser(data) {
        return fetch({
            url: '/userInfo/saveUserInfo',
            method: 'post',
            data
        })
    }

    /**
     * @description 新增用户信息
     *
     */
    static addUser(data) {
        return fetch({
            url: '/userInfo/addUser',
            method: 'post',
            data
        })
    }

    /**
     *  @description 获取工资信息列表
     *
     */
    static getUserWagesList(data) {
        return fetch({
            url: '/user/getUserWagesList',
            method: 'get',
            params: data
        })
    }

    /**
     *  @description 获取活动信息列表
     *
     */
    static getActivityList(data) {
        return fetch({
            url: '/user/getActivityList',
            method: 'get',
            params: data
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
}
