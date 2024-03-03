const { loadOptions } = require('@tancli/cli/src/utils/options')

module.exports = (api, pkgName) => {
    api.injectPrompt({
        name: 'babel',
        type: 'confirm',
        message: '是否需要接入 babel',
        default: false,
    })

    const packageManager = loadOptions().packageManager || 'npm'
    const arr = [
        '👉  执行下面的命令开始开发:\n',
        `cd ${pkgName}`,
        `${packageManager === 'npm' ? 'npm run' : 'pnpm'} dev\n`,
    ]

    api.injectEnddingPrompt(arr)
}
