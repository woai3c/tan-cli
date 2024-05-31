const writeFileTree = require('@tancli/cli/src/utils/write-file-tree')
const generateReadme = require('./utils/generate-readme')
const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (generator, options = {}) => {
    const config = {
        version: '0.1.0',
        private: true,
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'run-p type-check "build-only {@}" --',
            'build:dev': 'run-p type-check "build-only {@}" --  --mode development',
            preview: 'vite preview',
            'test:unit': 'vitest --watch=false',
            'build-only': 'vite build',
            'type-check': 'vue-tsc --build --force',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
            format: 'prettier --write src/',
            prepare: 'husky',
        },
        'lint-staged': {
            '*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}': ['eslint --fix', 'prettier --write'],
        },
        dependencies: {
            pinia: '^2.1.7',
            vue: '^3.4.21',
            'vue-router': '^4.3.0',
        },
        devDependencies: {
            '@tsconfig/node20': '^20.1.4',
            '@types/jsdom': '^21.1.6',
            '@types/node': '^20.12.5',
            '@vitejs/plugin-vue': '^5.0.4',
            '@vitejs/plugin-vue-jsx': '^3.1.0',
            '@vue/test-utils': '^2.4.5',
            '@vue/tsconfig': '^0.5.1',
            autoprefixer: '^10.4.19',
            chalk: '^5.3.0',
            eslint: '^8.57.0',
            'eslint-config-airbnb-vue3-ts': '^0.3.0',
            husky: '^9.0.11',
            jsdom: '^24.0.0',
            'lint-staged': '^15.2.2',
            'npm-run-all2': '^6.1.2',
            postcss: '^8.4.38',
            sass: '^1.77.2',
            'sass-loader': '^14.2.1',
            tailwindcss: '^3.4.3',
            terser: '^5.31.0',
            typescript: '~5.4.0',
            vite: '^5.2.8',
            'vite-plugin-vue-devtools': '^7.0.25',
            vitest: '^1.4.0',
            'vue-tsc': '^2.0.11',
        },
    }

    if (options.babel) {
        config.devDependencies['@vitejs/plugin-legacy'] = '^5.4.1'
    }

    generator.extendPackage(config)
    generator.render('./template', options)

    writeFileTree(generator.context, {
        'README.md': generateReadme(generator.pkg, loadOptions().packageManager),
    })
}
