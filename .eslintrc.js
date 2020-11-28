module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  parser: "babel-eslint",
  extends: ['eslint-config-egg'],
  rules: {
    semi: ['error', 'never'],
    strict: 0,
    'space-before-function-paren': ['error', 'always'],
    indent: ['error', 2],
    'function-paren-newline': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'array-bracket-spacing': 0,
    'no-undef-init': 0,
    'no-else-return': 0,
    'jsdoc/check-tag-names': 0,
    'no-loop-func': 0,
    'no-return-assign': 0,
  },
}