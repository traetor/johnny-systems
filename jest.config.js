module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Jeśli używasz setupFilesAfterEnv
    moduleNameMapper: {
        '\\.(scss|sass|css)$': '<rootDir>/__mocks__/styleMock.js',
    },
};