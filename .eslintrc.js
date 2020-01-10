 
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ],
    '@typescript-eslint/semi': [
      'error',
      'always',
      { omitLastInOneLineBlock: true }
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-shadow': ['error', { builtinGlobals: true, hoist: 'all' }],
    'no-useless-catch': 'error',
    'arrow-parens': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};