module.exports = {
    preset: 'ts-jest',
    globals: {
        __DEV__: true,
        __BROWSER__: true
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/useApi.ts',
        '!src/index.ts',
        '!src/injectionSymbol.ts'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/index.ts',
        'src/useApi.ts',
        'src/global.d.ts',
        'src/shield.d.ts'
    ],
    testMatch: ['<rootDir>/__tests__/**/*.spec.ts?(x)'],
    watchPathIgnorePatterns: ['<rootDir>/node_modules'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\js$': 'babel-jest'
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
