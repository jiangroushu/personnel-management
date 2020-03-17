import fetch from '@/libs/fetch'

export default class Electricity {
    /**
     *
     * @description 获取电表数据
     */
    static getElectricMeter(data) {
        return fetch({
            url: '/v1/device/electricMeter',
            method: 'get',
            params: data
        })
    }
    /**
     *
     * @description 新增
     */
    static addElectricMeter(data) {
        return fetch({
            url: '/v1/device/electricMeter',
            method: 'post',
            data
        })
    }
    /**
     *
     * @description 修改
     */
    static modifyElectricMeter(data) {
        return fetch({
            url: '/v1/device/electricMeter',
            method: 'put',
            data
        })
    }
}
