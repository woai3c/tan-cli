const { execSync } = require('child_process')

module.exports = function getNpmPackageVersion(npmName) {
    const versions = execSync(`npm info ${npmName} versions --json`)
    const result = JSON.parse(versions.toString())
    return typeof result === 'string' ? result : result.pop()
}
