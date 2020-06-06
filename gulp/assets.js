const gulp = require('gulp');
const del = require('del');

const { paths } = require('../config');
const { fileExistsCheck, setupFileCopyWatcher } = require('./utils');

gulp.task('assets.cleanup', () => {
  return del(`${paths.buildDir}/{images,fonts,icons}`);
});

gulp.task('assets.build', () => {
  return gulp
    .src(`${paths.assetsDir}/{images,fonts,icons}/**`, {
      base: paths.assetsDir,
      allowEmpty: true,
    })
    .pipe(fileExistsCheck())
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('assets', gulp.series('assets.cleanup', 'assets.build'));

function runWatcher(done) {
  setupFileCopyWatcher({
    glob: `${paths.assetsDir}/{images,fonts,icons}/**`,
    cwd: paths.assetsDir,
    destDir: paths.buildDir,
    done: done,
  });
}

module.exports = { runWatcher };
