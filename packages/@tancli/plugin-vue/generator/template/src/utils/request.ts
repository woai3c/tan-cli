/* eslint-disable camelcase */
import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { closeLoading, disableLoading, enableLoading, showLoading } from './loading'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const request = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_PATH,
    timeout: 30000,
})

interface PendingRequest {
    name: string
    cancel: Function
}

// 正在执行的请求
export const pendingRequests: PendingRequest[] = []

interface ExtendInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    requestId: string
}

// 在白名单里的接口允许重复请求
const apiWhiteList: string[] = []
request.interceptors.request.use(
    (config: ExtendInternalAxiosRequestConfig) => {
        showLoading()
        // 请求唯一标识
        // 如果一个项目里有多个不同 baseURL 的请求
        // 可以改成 `${config.method}-${config.baseURL}-${config.url}`
        const requestId = `${config.method}-${config.url}`

        // 找当前请求的标识是否存在 pendingRequest 中，即是否重复请求了
        if (!apiWhiteList.includes(config.url as string)) {
            const requestIndex = pendingRequests.findIndex((item) => item.name === requestId)
            if (requestIndex > -1) {
                // 取消上个重复的请求
                pendingRequests[requestIndex].cancel()
                pendingRequests.splice(requestIndex, 1)
            }
        }

        // 为这次请求创建一个的 axios 的 cancelToken 标识
        const source = axios.CancelToken.source()
        config.cancelToken = source.token
        // 设置自定义配置 requestId 项，主要用于响应拦截中
        config.requestId = requestId
        // 记录本次请求的标识
        pendingRequests.push({
            name: requestId,
            cancel: source.cancel,
        })

        return config
    },
    (error) => Promise.reject(error)
)

request.interceptors.response.use(
    (response) => {
        closeLoading()

        const config = response.config as ExtendInternalAxiosRequestConfig
        // 根据请求拦截里设置的 requestId 配置来寻找对应 pendingRequest 里对应的请求标识
        const markIndex = pendingRequests.findIndex((item) => item.name === config.requestId)
        // 找到了就删除该标识
        markIndex > -1 && pendingRequests.splice(markIndex, 1)

        if (response.data instanceof ArrayBuffer) {
            return response.data
        }

        if (response.status >= 200 && response.status < 300) {
            return response.data
        }

        const { message, msg } = response?.data || {}
        if (message || msg) {
            ElMessage.error(message || msg)
        }

        throw Error(response.data)
    },
    (error) => {
        closeLoading()

        // 如果是取消请求，则直接返回
        if (error?.name === 'CanceledError') return Promise.reject(error)

        const { message, msg } = error?.response?.data || {}
        if (message || msg || error?.message) {
            ElMessage.error(message || msg || error?.message)
        }

        return Promise.reject(error)
    }
)

export function wrapRequest<T>(request: (options: any) => Promise<any>) {
    const loading = ref(false)
    const data = ref<any>()
    const error = ref<Error>()

    function start(options?: any) {
        disableLoading()
        loading.value = true

        return request(options)
            .then((res: T) => {
                data.value = res
                return res
            })
            .catch((err: Error) => {
                error.value = err
                throw err
            })
            .finally(() => {
                enableLoading()
                loading.value = false
            })
    }

    return { loading, data, error, start }
}

export default request
