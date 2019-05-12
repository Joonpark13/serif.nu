module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    "react/jsx-filename-extension": "off",
    "import/no-unresolved": "off",
    "no-plusplus": "off",
    "object-curly-newline": "off",
    "prefer-destructuring": "off",
    "no-confusing-arrow": "off"
  },
  plugins: ['jest', 'react', 'jsx-a11y', 'import'],
  env: {
    "jest/globals": true,
  },
  globals: {
    document: true,
    window: true,
    fetch: true,
    FIREBASE_CONFIG: 'readonly',
  },
};
