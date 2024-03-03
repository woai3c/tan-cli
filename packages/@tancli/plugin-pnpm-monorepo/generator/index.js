module.exports = (generator, options = {}) => {
    const config = {
        name: 'monorepo-demo',
        private: true,
        scripts: {
            preinstall: 'npx only-allow pnpm',
            prepare: 'husky install',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore',
        },
        'lint-staged': {
            'packages/**/*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
        },
        devDependencies: {
            chalk: '^5.3.0',
            eslint: '^8.48.0',
            'eslint-config-airbnb-vue3-ts': '^0.2.4',
            execa: '^7.2.0',
            husky: '^8.0.3',
            'lint-staged': '^13.3.0',
            minimist: '^1.2.8',
            'npm-run-all': '^4.1.5',
            prompt: '^1.3.0',
            prompts: '^2.4.2',
            semver: '^7.5.4',
            typescript: '^5.2.2',
        },
    }

    generator.extendPackage(config)
    generator.render('./template', options)
}
