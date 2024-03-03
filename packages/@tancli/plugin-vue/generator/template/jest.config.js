/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                isolatedModules: true,
                tsconfig: 'tsconfig.json',
                useESM: true,
            },
        ],
    },
    moduleNameMapper: {
        '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    },
}
