/* eslint-disable prettier/prettier */
const writeFileTree = require('@tancli/cli/src/utils/write-file-tree')
const generateReadme = require('./utils/generate-readme')
const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (generator, options = {}) => {
    const config = {
        scripts: {
            dev: 'vite --mode localhost',
            'dev:dev': 'vite',
            build: 'run-p type-check build-only',
            'build:dev': 'run-p type-check build-only:dev',
            'build-only': 'cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 vite build',
            'build-only:dev': 'cross-env NODE_ENV=development NODE_OPTIONS=--max-old-space-size=4096 vite build --mode development',
            report: 'cross-env vite build',
            preview: 'vite preview',
            'type-check': 'tsc --noEmit && vue-tsc --noEmit --skipLibCheck',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
            'lint:css': 'stylelint --fix src/**/*.{scss,css,sass}',
            prepare: 'husky install',
            'test': 'vitest'
        },
        'lint-staged': {
            'src/**/*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'git add'],
            'src/**/*.{scss,css,sass}': ['stylelint --fix --allow-empty-input', 'git add'],
        },
        browserslist: ['> 1%', 'not ie 11', 'not op_mini all'],
        dependencies: {
            '@vueuse/core': '^9.13.0',
            'axios': '^1.4.0',
            'dayjs': '^1.11.9',
            'element-plus': '^2.3.10',
            '@element-plus/icons-vue': '^2.1.0',
            'nprogress': '^0.2.0',
            'pinia': '^2.1.6',
            'tdesign-vue-next': '^1.5.2',
            'vue': '^3.3.4',
            'vue-router': '^4.2.4'
        },
        devDependencies: {
            '@types/jsdom': '^20.0.1',
            '@types/node': '^16.18.46',
            '@types/nprogress': '0.2.0',
            '@vitejs/plugin-vue': '^4.3.3',
            '@vitejs/plugin-vue-jsx': '^3.0.2',
            '@vue/runtime-core': '^3.3.4',
            '@vue/test-utils': '^2.4.1',
            '@vue/tsconfig': '^0.1.3',
            'autoprefixer': '^10.4.15',
            'chalk': '^5.3.0',
            'cross-env': '^7.0.3',
            'cssnano': '^5.1.15',
            'eslint': '^8.47.0',
            'eslint-config-airbnb-vue3-ts': '^0.2.4',
            'husky': '^8.0.3',
            'jsdom': '^20.0.3',
            'lint-staged': '^13.3.0',
            'npm-run-all': '^4.1.5',
            'picocolors': '^1.0.0',
            'postcss': '^8.4.28',
            'rollup': '^3.28.1',
            'rollup-plugin-visualizer': '^5.9.2',
            'sass': '^1.66.1',
            'stylelint': '^15.10.3',
            'stylelint-config-standard-scss': '^10.0.0',
            'stylelint-scss': '^5.1.0',
            'tailwindcss': '^3.3.3',
            'terser': '^5.19.2',
            'typescript': '~4.7.4',
            'unplugin-auto-import': '^0.15.3',
            'unplugin-vue-components': '^0.24.1',
            'unplugin-vue-define-options': '^1.3.17',
            'vite': '^4.4.9',
            'vite-plugin-compression': '^0.5.1',
            'vite-svg-loader': '^3.6.0',
            'vitest': '^0.34.2',
            'vue-tsc': '^1.8.8'
        },
    }

    if (options.babel) {
        config.devDependencies['@vitejs/plugin-legacy'] = '^4.1.1'
    }

    generator.extendPackage(config)
    generator.render('./template', options)

    writeFileTree(generator.context, {
        'README.md': generateReadme(generator.pkg, loadOptions().packageManager),
    })
}
