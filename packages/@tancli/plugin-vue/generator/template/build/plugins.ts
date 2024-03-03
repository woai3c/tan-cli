import vue from '@vitejs/plugin-vue'
import { viteBuildInfo } from './info'
import svgLoader from 'vite-svg-loader'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { splitVendorChunkPlugin } from 'vite'

export function getPluginsList(command: string, mode: string) {
    const plugins = [
        vue(),
        vueJsx(),
        DefineOptions(),
        visualizer(),
        viteBuildInfo(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        // svg组件化支持
        svgLoader(),
        viteCompression({
            threshold: 10240, // 对 10kb 以上的文件进行压缩
        }),
        splitVendorChunkPlugin(),
    ]

    return plugins
}
