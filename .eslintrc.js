module.exports = {
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": "off",
    "no-console": "off"
  },
  "globals": {
    "document": true,
    "window": true,
    "fetch": true
  },
  "plugins": ["jest"],
  "env": {
    "jest/globals": true
  },
};
