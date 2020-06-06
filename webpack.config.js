const CodeframeFormatter = require('eslint-codeframe-formatter');

const { paths, alias } = require('./config');

const scssVariables = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
};

const linter = {
  enforce: 'pre',
  test: /\.js$/,
  include: paths.srcDir,
  loader: 'eslint-loader',
  options: {
    emitWarning: true,
    formatter: CodeframeFormatter,
    emitError: true,
    configFile: paths.eslintrc,
  },
};

const javascript = {
  test: /\.js$/,
  include: paths.ES6_DirArr,

  use: {
    loader: 'babel-loader',
    options: {
      configFile: paths.babelrc,
    },
  },
};

const config = {
  devtool: 'source-map',
  entry: {
    vendor: `${paths.srcDir}/vendor.js`,
    main: `${paths.srcDir}/main.js`,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: paths.buildDir,
    filename: '[name].js',
  },
  module: {
    rules: [scssVariables, linter, javascript],
  },
  resolve: {
    alias,
    symlinks: false,
  },
  plugins: [],
};

module.exports = config;
