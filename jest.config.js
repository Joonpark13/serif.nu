module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/index.js',
    '!src/util/env.js',
    '!src/util/to-js.js',
    '!src/util/colors.js',
    '!**/__snapshots__/**',
  ],
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupTestFrameworkScriptFile: '<rootDir>test-setup.js',
  moduleDirectories: ['src', 'node_modules'],
};
