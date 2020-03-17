import axios from 'axios'
import { getToken } from '@/libs/util'
import User from '@/api/user'
import store from '@/store'
import config from '@/config'
import iView from 'iview'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const service = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus(status) {
        return status === 200
    }
})

// request 拦截器
service.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// 是否正在刷新的标记
// let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
// let requests = []
// response 拦截器
// service.interceptors.response.use(
//     response => {
//         if (response.data.code === 0) {
//             return response.data
//         } else if (response.data.code === 10103) {
//             const config = response.config
//             if (!isRefreshing) {
//                 isRefreshing = true
//                 return User.refreshToken()
//                     .then(res => {
//                         store.commit('setToken', res.data)
//                         // 队列重新请求
//                         requests.forEach(cb => cb(res.data))
//                         // 清空队列
//                         requests = []
//                         return service(config)
//                     })
//                     .catch(err => {
//                         // eslint-disable-next-line
//                         console.error('refreshtoken error =>', err)
//                         window.location.href = '/'
//                     })
//                     .finally(() => {
//                         isRefreshing = false
//                     })
//             } else {
//                 // 正在刷新token，返回一个未执行resolve的promise
//                 return new Promise(resolve => {
//                     // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
//                     requests.push(res => {
//                         store.commit('setToken', res)
//                         resolve(service(config))
//                     })
//                 })
//             }
//         } else {
//             iView.Message.error(response.data.message)
//             return Promise.reject(response.data.message)
//         }
//     },
//     error => {
//         // eslint-disable-next-line no-console
//         console.log('err' + error)
//         return Promise.reject(error)
//     }
// )

export default service
