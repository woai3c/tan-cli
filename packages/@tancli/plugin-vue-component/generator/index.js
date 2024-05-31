const writeFileTree = require('@tancli/cli/src/utils/write-file-tree')
const generateReadme = require('./utils/generate-readme')
const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (generator, options = {}) => {
    const config = {
        version: '0.1.0',
        main: 'dist/counter.umd.js',
        module: 'dist/counter.mjs',
        unpkg: './dist/counter.umd.js',
        jsdelivr: './dist/counter.umd.js',
        types: 'dist/index.d.ts',
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'run-p type-check build-only',
            test: 'vitest',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
            format: 'prettier --write src/',
            release: 'npm run build && npm run test && node scripts/release.mjs',
            'build-only': 'vite build',
            prepare: 'husky install',
            preview: 'vite preview',
            'type-check': 'tsc --noEmit && vue-tsc --noEmit --skipLibCheck',
        },
        files: ['dist', 'package.json', 'README.md', 'types'],
        publishConfig: {
            access: 'public',
            registry: 'https://registry.npmjs.org/',
        },
        'lint-staged': {
            '*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}': ['eslint --fix', 'prettier --write'],
        },
        browserslist: ['> 1%', 'not ie 11', 'not op_mini all'],
        peerDependencies: {
            vue: '^3.3.4',
        },
        devDependencies: {
            '@types/jsdom': '^21.1.6',
            '@types/node': '^20.12.5',
            '@vitejs/plugin-vue': '^5.0.4',
            '@vitejs/plugin-vue-jsx': '^3.1.0',
            '@vue/test-utils': '^2.4.5',
            '@vue/tsconfig': '^0.5.1',
            autoprefixer: '^10.4.19',
            chalk: '^5.3.0',
            cssnano: '^7.0.1',
            eslint: '^8.57.0',
            'eslint-config-airbnb-vue3-ts': '^0.3.0',
            husky: '^9.0.11',
            jsdom: '^24.0.0',
            'lint-staged': '^15.2.2',
            'npm-run-all2': '^6.1.2',
            postcss: '^8.4.38',
            'rollup-plugin-visualizer': '^5.12.0',
            sass: '^1.77.2',
            'sass-loader': '^14.2.1',
            tailwindcss: '^3.4.3',
            terser: '^5.31.0',
            typescript: '~5.4.0',
            vite: '^5.2.8',
            'vite-plugin-css-injected-by-js': '^3.5.1',
            'vite-plugin-dts': '^3.9.1',
            'vite-plugin-vue-devtools': '^7.0.25',
            'vite-svg-loader': '^5.1.0',
            vitest: '^1.4.0',
            'vue-tsc': '^2.0.11',
        },
    }

    if (options.babel) {
        config.devDependencies['@babel/plugin-transform-runtime'] = '^7.22.10'
        config.devDependencies['@babel/preset-env'] = '^7.22.10'
        config.devDependencies['@babel/runtime'] = '^7.22.10'
        config.devDependencies['@rollup/plugin-babel'] = '^6.0.3'
    }

    generator.extendPackage(config)
    generator.render('./template', options)

    writeFileTree(generator.context, {
        'README.md': generateReadme(generator.pkg, loadOptions().packageManager),
    })
}
