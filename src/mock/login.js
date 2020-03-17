import { getParams } from '@/libs/util'
const USER_MAP = {
    super_admin: {
        name: 'super_admin',
        user_id: '1',
        access: ['super_admin', 'admin'],
        token: 'super_admin',
        avatar: 'https://pic2.zhimg.com/80/v2-8df0e1ada7af09d3c62f2ba5ec4e4266_hd.jpg'
    },
    admin: {
        name: 'admin',
        user_id: '2',
        access: ['admin'],
        token: 'admin',
        avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
    }
}

export const login = req => {
    req = JSON.parse(req.body)
    return { token: USER_MAP[req.userName].token }
}

export const getUserInfo = req => {
    const params = getParams(req.url)
    return USER_MAP[params.token]
}

export const logout = req => {
    return null
}
