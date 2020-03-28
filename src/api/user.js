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
     *  @description 获取上下班信息列表
     *
     */
    static getUserWorkAttendanceList(data) {
        return fetch({
            url: '/user/getUserWorkAttendanceList',
            method: 'get',
            params: data
        })
    }

    /**
     *  @description 获取请假、加班、出差信息列表
     *
     */
    static getSpecialUserWorkAttendanceList(data) {
        return fetch({
            url: '/user/getSpecialUserWorkAttendanceList',
            method: 'get',
            params: data
        })
    }

    /**
     *  @description 新增请假、加班、出差信息列表
     *
     */
    static addSpecialist(data) {
        return fetch({
            url: '/user/createSpecialUserWorkAttendance',
            method: 'post',
            data
        })
    }

    /**
     *  @description 修改请假、加班、出差信息列表
     *
     */
    static updateSpecialist(data) {
        return fetch({
            url: '/user/updateSpecialUserWorkAttendance',
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
     * @description 修改用户工资信息
     *
     */
    static updateWage(data) {
        return fetch({
            url: '/user/updateUserWages',
            method: 'post',
            data
        })
    }

    /**
     * @description 新增用户工资信息
     *
     */
    static addWage(data) {
        return fetch({
            url: '/user/createUserWages',
            method: 'post',
            data
        })
    }

    /**
     *  @description 获取招聘信息列表
     *
     */
    static getRecruitList(data) {
        return fetch({
            url: '/user/getRecruitList',
            method: 'get',
            params: data
        })
    }

    /**
     * @description 修改招聘信息
     *
     */
    static updateRecruitList(data) {
        return fetch({
            url: '/user/updateRecruit',
            method: 'post',
            data
        })
    }

    /**
     * @description 新增招聘信息
     *
     */
    static addRecruitList(data) {
        return fetch({
            url: '/user/createRecruit',
            method: 'post',
            data
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
     * @description 新增活动信息
     *
     */
    static addActive(data) {
        return fetch({
            url: '/user/createActivity',
            method: 'post',
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
            url: '/user/logout',
            method: 'get'
        })
    }
}
