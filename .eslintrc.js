module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  plugins: ['prettier'],
  extends: [
    'standard',
    'prettier',
    'plugin:import/warnings',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
      },
    ],
    'no-console': [
      'error',
      {'allow': ['warn', 'error', 'log']}
    ],
  },
  settings: {
    'import/resolver': 'webpack'
  },
};
