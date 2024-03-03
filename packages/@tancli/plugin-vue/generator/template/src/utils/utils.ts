// 在 localhost 或 https 环境下才能使用 navigator.clipboard
const canUseClipboard = navigator.clipboard && window.isSecureContext
export function copyData(data: string) {
    return new Promise<void>((resolve) => {
        const textArea = document.createElement('textarea')
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        if (canUseClipboard) {
            navigator.clipboard
                .writeText(data)
                .then(resolve)
                .catch(() => {
                    textArea.value = data
                    textArea.focus()
                    textArea.select()
                    document.execCommand('copy')
                    textArea.remove()
                    resolve()
                })
        } else {
            textArea.value = data
            textArea.focus()
            textArea.select()
            document.execCommand('copy')
            textArea.remove()
            resolve()
        }
    })
}

export function $(selector: string) {
    return document.querySelector(selector)
}

export const { isArray } = Array

const urlRE = /(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
export function isURL(url = '') {
    return urlRE.test(url)
}

export function noop() {}
