const gulp = require('gulp');
const del = require('del');
const modernizr = require('gulp-modernizr');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const { paths } = require('../config');

gulp.task('modernizr.cleanup', () => {
  return del(`${paths.buildDir}/modernizr.js`);
});

gulp.task('modernizr.build', () => {
  return gulp
    .src('fake', { allowEmpty: true })
    .pipe(modernizr(require(paths.modernizr)))
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(rename('modernizr.js'))
    .pipe(gulp.dest(`${paths.buildDir}`));
});

gulp.task('modernizr', gulp.series('modernizr.cleanup', 'modernizr.build'));
