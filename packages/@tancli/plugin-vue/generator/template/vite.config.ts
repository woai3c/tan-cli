import { resolve } from 'path'
import { getPluginsList } from './build/plugins'
import type { UserConfigExport, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
<% if (babel) { %>
import legacy from '@vitejs/plugin-legacy'
<% } %>

const root: string = process.cwd()

const pathResolve = (dir: string): string => resolve(__dirname, '.', dir)

const alias: Record<string, string> = {
    '@': pathResolve('src'),
    '@build': pathResolve('build'),
}

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const { VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, root)

    const config: Record<string, any> = {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias,
        },
        // vitest 配置
        test: {
            globals: true,
            environment: 'jsdom',
            watch: false,
        },
        server: {
            port: VITE_PORT,
            host: '0.0.0.0',
            proxy: {},
        },
        plugins: getPluginsList(command, mode),
        build: {
            reportCompressedSize: false, // 关掉 gzip 压缩报告
            minify: 'terser',
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                },
            },
        },
    }

    if (mode === 'production') {
        config.build.terserOptions = {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        }
        <% if (babel) { %>
        config.plugins.push(
            legacy({
                targets: [
                    '> 1%',
                    'not ie 11',
                    'not op_mini all',
                    'chrome >= 78',
                    'edge >= 78',
                    'firefox >= 72',
                    'safari >= 13',
                    'opera >= 67',
                ],
            })
        )
        <% } %>
    } else {
        config.build.sourcemap = true
    }

    return config
}
