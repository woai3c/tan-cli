import { ref } from 'vue'

let loadingCount = 0
let isLoadingEnabled = true

/**
 * 页面 loading
 */
export const isShowPageLoading = ref(false)

export function showLoading() {
    if (!isLoadingEnabled) return

    loadingCount++
    isShowPageLoading.value = true
}

export function closeLoading() {
    if (!isLoadingEnabled) return

    setTimeout(() => {
        loadingCount--
        if (loadingCount <= 0) {
            loadingCount = 0
            isShowPageLoading.value = false
        }
    }, 100)
}

export function enableLoading() {
    isLoadingEnabled = true
    resetLoading()
}

export function disableLoading() {
    isLoadingEnabled = false
    resetLoading()
}

function resetLoading() {
    loadingCount = 0
    isShowPageLoading.value = false
}
