const path = require('path');

const paths = new (function() {
  this.rootDir = __dirname;
  // source paths
  this.srcDir = path.resolve(__dirname, './src/');
  this.assetsDir = path.resolve(this.srcDir, './assets');
  this.componentsDir = path.resolve(this.srcDir, './Components');
  this.sharedDir = path.resolve(this.srcDir, './shared');
  this.sharedJsDir = path.resolve(this.sharedDir, './scripts');

  // build paths
  this.buildDir = path.resolve(__dirname, './dist');

  // apply babel loader to this directories
  this.ES6_DirArr = [
    this.componentsDir,
    this.sharedJsDir,
    /node_modules\/@frontant\//,
  ];

  // configuration paths
  this.eslintrc = path.resolve(__dirname, '.eslintrc.js');
  this.babelrc = path.resolve(__dirname, '.babelrc.js');
  this.webpack = path.resolve(__dirname, 'webpack.config.js');
  this.modernizr = path.resolve(__dirname, 'modernizr.config.js');
})();

const alias = {
  '~': paths.srcDir,
};

// files are relative to 'paths.buildDir'
const htmlIncludes = {
  styles: ['main.css'],
  scripts: ['modernizr.js', 'vendor.js', 'main.js'],
};

module.exports = { paths, alias, htmlIncludes };
