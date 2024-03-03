const { hasProjectPnpm } = require('./utils/env')
const executeCommand = require('./utils/execute-command')
const { log } = require('./utils/logger')

const PACKAGE_MANAGER_CONFIG = {
    npm: {
        install: ['install'],
    },
    pnpm: {
        install: ['install'],
    },
    yarn: {
        install: [],
    },
}

class PackageManager {
    constructor(context, packageManager) {
        this.context = context
        this._registries = {}

        if (packageManager) {
            this.bin = packageManager
        } else if (context) {
            if (hasProjectPnpm(context)) {
                this.bin = 'pnpm'
            } else {
                this.bin = 'npm'
            }
        }
    }

    async runCommand(command, args) {
        const prevNodeEnv = process.env.NODE_ENV
        // In the use case of Vue CLI, when installing dependencies,
        // the `NODE_ENV` environment variable does no good;
        // it only confuses users by skipping dev deps (when set to `production`).
        delete process.env.NODE_ENV

        await executeCommand(this.bin, [...PACKAGE_MANAGER_CONFIG[this.bin][command], ...(args || [])], this.context)

        if (prevNodeEnv) {
            process.env.NODE_ENV = prevNodeEnv
        }
    }

    async install() {
        return await this.runCommand('install')
    }
}

module.exports = PackageManager
