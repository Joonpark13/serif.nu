module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/index.js',
    '!src/material-ui-style-install.js',
    '!src/actions/**',
    '!src/effects/**',
    '!src/util/env.js',
    '!src/util/to-js.js',
    '!src/util/colors.js',
    '!src/util/firebase.js',
    '!**/__snapshots__/**',
    '!src/reducers/index.js',
  ],
  coverageReporters: process.env.COVERAGE_REPORT === 'on' ? ['html', 'text'] : ['html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: [
    '<rootDir>test-setup.js'
  ],
  moduleDirectories: ['src', 'node_modules'],
};
