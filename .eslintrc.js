module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    // this can't detect optional chaining right now
    "no-unused-expressions": "off",
  },
};
