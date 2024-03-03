import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import type { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { visualizer } from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'
<% if (babel) { %>
import babel from '@rollup/plugin-babel'
<% } %>

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const config: UserConfigExport = {
        plugins: [
            vue(),
            vueJsx(),
            cssInjectedByJsPlugin(),
            visualizer(),
            svgLoader(),
            dts({
                tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
                rollupTypes: true,
            }),
        ],
        test: {
            globals: true,
            environment: 'jsdom',
            watch: false,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        define: {
            'process.env.VITEST': mode === 'test',
        },
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'Counter',
                fileName: 'counter',
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue',
                    },
                },
                <% if (babel) { %>
                plugins: [
                    babel({
                        extensions: ['.js', '.ts', '.vue'],
                        babelHelpers: 'runtime',
                        plugins: ['@babel/plugin-transform-runtime'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: false,
                                    targets: {
                                        browsers: ['last 2 versions', '> 1%', 'not ie <= 11'],
                                    },
                                },
                            ],
                        ],
                    }),
                ],
                <% } %>
            },
        },
    }

    return config
}
