/* eslint-disable prettier/prettier */
const writeFileTree = require('@tancli/cli/src/utils/write-file-tree')
const generateReadme = require('./utils/generate-readme')
const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (generator, options = {}) => {
    const config = {
        main: 'dist/counter.umd.js',
        module: 'dist/counter.mjs',
        unpkg: './dist/counter.umd.js',
        jsdelivr: './dist/counter.umd.js',
        types: 'dist/index.d.ts',
        scripts: {
            dev: 'vite',
            build: 'run-p type-check build-only',
            preview: 'vite preview',
            'build-only': 'vite build',
            'type-check': 'tsc --noEmit && vue-tsc --noEmit --skipLibCheck',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
            'lint:css': 'stylelint --fix src/**/*.{scss,css,sass}',
            prepare: 'husky install',
            release: 'npm run build && npm run test && node scripts/release.mjs',
            test: 'vitest',
        },
        files: ['dist', 'package.json', 'README.md', 'types'],
        publishConfig: {
            access: 'public',
            registry: 'https://registry.npmjs.org/',
        },
        'lint-staged': {
            'src/**/*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'git add'],
            'src/**/*.{scss,css,sass}': ['stylelint --fix --allow-empty-input', 'git add'],
        },
        browserslist: ['> 1%', 'not ie 11', 'not op_mini all'],
        peerDependencies: {
            vue: '^3.3.4',
        },
        devDependencies: {
            '@types/jsdom': '^21.1.2',
            '@types/node': '^18.17.9',
            '@vitejs/plugin-vue': '^4.3.3',
            '@vitejs/plugin-vue-jsx': '^3.0.2',
            '@vue/test-utils': '^2.4.1',
            'rollup-plugin-visualizer': '^5.9.2',
            cssnano: '^6.0.1',
            autoprefixer: '^10.4.15',
            chalk: '^5.3.0',
            eslint: '^8.47.0',
            'eslint-config-airbnb-vue3-ts': '^0.2.4',
            execa: '^7.2.0',
            husky: '^8.0.3',
            jsdom: '^22.1.0',
            'lint-staged': '^13.3.0',
            minimist: '^1.2.8',
            'npm-run-all': '^4.1.5',
            postcss: '^8.4.28',
            prompts: '^2.4.2',
            rimraf: '^5.0.1',
            sass: '^1.66.1',
            semver: '^7.5.4',
            stylelint: '^15.10.3',
            'stylelint-config-standard-scss': '^9.0.0',
            'stylelint-scss': '^5.1.0',
            tailwindcss: '^3.3.3',
            terser: '^5.19.2',
            typescript: '^5.2.2',
            vite: '^4.4.9',
            'vite-plugin-css-injected-by-js': '^3.3.0',
            'vite-plugin-dts': '^3.5.2',
            'vite-svg-loader': '^4.0.0',
            vitest: '^0.34.2',
            'vue-tsc': '^1.8.8',
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
