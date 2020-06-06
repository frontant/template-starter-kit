const gulp = require('gulp');
const webpack = require('webpack');
const del = require('del');

const { paths } = require('../config');

gulp.task('scripts.cleanup', () => {
  return del([
    `${paths.buildDir}/vendor.{js,js.map}`,
    `${paths.buildDir}/main.{js,js.map}`,
  ]);
});

gulp.task('scripts.build', done => {
  const compiler = webpack(require(paths.webpack));

  compiler.run((err, stats) => {
    try {
      if (err) {
        throw new Error(err.toString());
      } else if (stats.hasErrors() || stats.hasWarnings()) {
        throw new Error(stats.toString());
      }
    } catch (e) {
      console.error(e);
    } finally {
      done();
    }
  });
});

gulp.task('scripts', gulp.series('scripts.cleanup', 'scripts.build'));

function runWatcher(done) {
  gulp.watch(
    `${paths.srcDir}/**/*.js`,
    gulp.series('scripts', 'twig', cb => {
      done();
      cb();
    })
  );
}

module.exports = { runWatcher };
