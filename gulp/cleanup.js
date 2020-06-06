const gulp = require('gulp');
const del = require('del');

const { paths } = require('../config');
const { cleanEmptyDirs } = require('./utils');

gulp.task('cleanup', () => {
  return del([`${paths.buildDir}/**`]);
});

gulp.task('cleanup.empty-dir', done => {
  cleanEmptyDirs(paths.buildDir);
  done();
});
