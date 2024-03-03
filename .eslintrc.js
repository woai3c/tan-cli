module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    globals: { defineOptions: 'readonly' },
    extends: ['eslint-config-airbnb-vue3-ts'],
    ignorePatterns: ['iconfont.js'],
    rules: {},
}
