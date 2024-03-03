declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'unplugin-vue-define-options/vite'
declare module 'element-plus/dist/locale/zh-cn.mjs'