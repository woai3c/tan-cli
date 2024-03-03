/* eslint-disable prettier/prettier */
const writeFileTree = require('@tancli/cli/src/utils/write-file-tree')
const generateReadme = require('./utils/generate-readme')
const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (generator, options = {}) => {
    const config = {
        name: 'min-math',
        description: 'ts 组件库模板',
        main: 'dist/min-math.js',
        module: 'dist/min-math.mjs',
        types: 'dist/index.d.ts',
        scripts: {
            dev: 'rimraf dist && rollup --config rollup.config.ts --configPlugin typescript2 --environment NODE_ENV:development',
            build: 'rimraf dist && rollup --config rollup.config.ts --configPlugin typescript2 --environment NODE_ENV:production && npm run type-generate',
            test: 'vitest',
            lint: 'eslint . --ext .js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
            prepare: 'husky install',
            type: 'tsc -p ./tsconfig.build.json',
            'type-check': 'tsc --noEmit',
            'type-generate':
                'tsc -p ./tsconfig.build.json && api-extractor run --config=./api-extractor.json && rimraf temp && node scripts/copyDTS.mjs',
            release: 'npm run build && npm run test && node scripts/release.mjs',
        },
        'lint-staged': {
            'src/**/*.{ts,js}': ['eslint --fix', 'git add'],
        },
        devDependencies: {
            '@microsoft/api-extractor': '^7.36.4',
            '@rollup/plugin-commonjs': '^25.0.4',
            '@rollup/plugin-json': '^5.0.2',
            '@rollup/plugin-node-resolve': '^15.2.1',
            '@types/minimist': '^1.2.2',
            '@types/node': '^18.17.12',
            chalk: '^5.3.0',
            eslint: '^8.48.0',
            'eslint-config-airbnb-vue3-ts': '^0.2.4',
            execa: '^8.0.1',
            husky: '^8.0.3',
            jsdom: '^22.1.0',
            'lint-staged': '^13.3.0',
            prompts: '^2.4.2',
            rimraf: '^3.0.2',
            rollup: '^3.28.1',
            'rollup-plugin-typescript2': '^0.35.0',
            semver: '^7.5.4',
            typescript: '^4.9.5',
            vitest: '^0.34.3',
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
