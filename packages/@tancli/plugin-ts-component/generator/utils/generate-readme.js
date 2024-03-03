const descriptions = {
    dev: '开发',
    build: '构建',
    release: '发布',
    lint: '校验代码',
    'lint:css': '校验 css 代码',
    test: '单元测试',
}

function printScripts(pkg, packageManager) {
    return Object.keys(pkg.scripts || {})
        .map((key) => {
            if (!descriptions[key]) return ''
            return [
                `\n## ${descriptions[key]}`,
                '```',
                `${packageManager} ${packageManager !== 'yarn' ? 'run ' : ''}${key}`,
                '```',
                '',
            ].join('\n')
        })
        .join('')
}

module.exports = function generateReadme(pkg, packageManager) {
    return [
        `# ${pkg.name}\n`,
        '## 安装依赖',
        '```',
        `${packageManager} install`,
        '```',
        printScripts(pkg, packageManager),
    ].join('\n')
}
