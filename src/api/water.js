import fetch from '@/libs/fetch'

export default class Water {
    /**
     *
     *
     */
    static getWaterMeter(data) {
        return fetch({
            url: '/v1/device/waterMeter',
            method: 'get',
            params: data
        })
    }
}
