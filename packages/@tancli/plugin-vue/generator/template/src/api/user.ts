import request from '@/utils/request'

export function login(options: AnyObject): Promise<AnyObject> {
    return request({
        url: '/assembly/users/login',
        method: 'post',
        data: options,
    })
}

export function logout() {
    return request({
        url: '/assembly/users/logout',
        method: 'post',
    })
}

export function refreshTokenApi(data: { refreshToken: string }): Promise<{
    access_token: string
    refresh_token: string
    expires_in: string
    token_type: string
}> {
    return request({
        url: '/assembly/users/refresh-token',
        method: 'post',
        data,
    })
}

export function firstChangePasswordApi(options: AnyObject) {
    return request({
        url: '/assembly/users/init-password',
        method: 'patch',
        data: options,
    })
}

export function changePasswordApi(options: AnyObject) {
    return request({
        url: '/assembly/users/password',
        method: 'patch',
        data: options,
    })
}
