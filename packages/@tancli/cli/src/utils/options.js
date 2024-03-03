const fs = require('fs')
const { cloneDeep } = require('lodash')
const { getRcPath } = require('./rc-path')
const exit = require('./exit')
const { error } = require('./logger')

// eslint-disable-next-line no-multi-assign
const rcPath = (exports.rcPath = getRcPath('.tanrc'))

let cachedOptions

exports.loadOptions = () => {
    if (cachedOptions) {
        return cachedOptions
    }

    if (fs.existsSync(rcPath)) {
        try {
            cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
        } catch (e) {
            error(
                'Error loading saved preferences: '
                    + '~/.mvcrc may be corrupted or have syntax errors. '
                    + 'Please fix/delete it and re-run vue-cli in manual mode.\n'
                    + `(${e.message})`
            )
            exit(1)
        }

        return cachedOptions
    }
    return {}
}

exports.saveOptions = (toSave) => {
    const options = Object.assign(cloneDeep(exports.loadOptions()), toSave)

    cachedOptions = options
    try {
        fs.writeFileSync(rcPath, JSON.stringify(options, null, 2))
        return true
    } catch (e) {
        error(`Error saving preferences: make sure you have write access to ${rcPath}.\n (${e.message})`)
    }
}

exports.savePreset = (name, preset) => {
    preset = filter(preset)
    const presets = cloneDeep(exports.loadOptions().presets || {})
    presets[name] = preset

    return exports.saveOptions({ presets })
}

function filter(preset, keys = ['preset', 'save', 'saveName', 'packageManager']) {
    preset = { ...preset }
    keys.forEach((key) => {
        delete preset[key]
    })

    return preset
}
