export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.js'],
  coveragePathIgnorePatterns: [
    './src/config',
    'node_modules'
  ]
};
