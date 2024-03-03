/* eslint-disable no-return-assign */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

let _hasPnpm
exports.hasPnpm = () => {
    if (_hasPnpm != null) {
        return _hasPnpm
    }
    try {
        execSync('pnpm -v', { stdio: 'ignore' })
        return (_hasPnpm = true)
    } catch (e) {
        return (_hasPnpm = false)
    }
}

exports.hasProjectPnpm = (cwd) => {
    const lockFile = path.join(cwd, 'pnpm-lock.yaml')
    const result = fs.existsSync(lockFile)
    return checkYarn(result)
}

function checkYarn(result) {
    if (result && !exports.hasPnpm()) throw new Error("The project seems to require pnpm but it's not installed.")
    return result
}

let _hasGit
exports.hasGit = () => {
    if (_hasGit !== undefined) {
        return _hasGit
    }

    try {
        execSync('git --version', { stdio: 'ignore' })
        return (_hasGit = true)
    } catch (e) {
        return (_hasGit = false)
    }
}

const _gitProjects = new Map()

exports.hasProjectGit = (cwd) => {
    if (_gitProjects.has(cwd)) {
        return _gitProjects.get(cwd)
    }

    let result
    try {
        execSync('git status', { stdio: 'ignore', cwd })
        result = true
    } catch (e) {
        result = false
    }

    _gitProjects.set(cwd, result)
    return result
}
