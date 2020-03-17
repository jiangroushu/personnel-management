import fetch from '@/libs/fetch'

export default class History {
    /**
     *
     *
     */
    static getHistoryList(data) {
        return fetch({
            url: '/v1/funds',
            method: 'get',
            params: data
        })
    }
}
