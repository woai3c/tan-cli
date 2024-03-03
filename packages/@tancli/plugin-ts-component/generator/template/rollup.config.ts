import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import type { InputPluginOption, OutputOptions, RollupWatchOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import { watch } from 'rollup'
<% if (babel) { %>
import babel from '@rollup/plugin-babel'
<% } %>
const fileName = 'min-math'
const globalName = 'MinMath'

function getOptions(output: OutputOptions | OutputOptions[]) {
    const config: RollupWatchOptions = {
        input: 'src/index.ts',
        output,
        plugins: [
            resolve({
                browser: true,
            }),
            commonjs(),
            typescript(),
            json({
                compact: true,
            }),
        ],
    }
    <% if (babel) { %>
    if (process.env.NODE_ENV === 'production') {
        ;(config.plugins as InputPluginOption[]).push(
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
            })
        )
    }
    <% } %>
    return config
}

if (process.env.NODE_ENV === 'development') {
    const watcher = watch(getOptions(getOutput('umd')))
    console.log('rollup is watching for file change...')

    watcher.on('event', (event) => {
        switch (event.code) {
            case 'START':
                console.log('rollup is rebuilding...')
                break
            case 'ERROR':
                console.log('error in rebuilding.')
                break
            case 'END':
                console.log('rebuild done.\n\n')
        }
    })
}

const formats = ['es', 'umd']

function getOutput(format: 'es' | 'umd') {
    return {
        format,
        file: `dist/${fileName}.${format === 'es' ? 'mjs' : 'js'}`,
        name: globalName,
    }
}

export default getOptions(formats.map(getOutput))
