const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const aliasImporter = require('node-sass-alias-importer');
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');

sass.compiler = require('node-sass');

const { paths, alias } = require('../config');
const { fileExistsCheck } = require('./utils');

gulp.task('styles.cleanup', () => {
  return del(`${paths.buildDir}/main.{css,css.map}`);
});

gulp.task('styles.build', () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return gulp
    .src(`${paths.srcDir}/main.scss`)
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ['node_modules'],
        importer: [aliasImporter({ ...alias })],
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(gulpif(isProduction, cleanCss()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('styles', gulp.series('styles.cleanup', 'styles.build'));

function runWatcher(streamFunc) {
  gulp.watch(
    [`${paths.srcDir}/**/*.scss`],
    gulp.series('styles', () => {
      return gulp
        .src(`${paths.buildDir}/main.css`, { allowEmpty: true })
        .pipe(fileExistsCheck())
        .pipe(streamFunc());
    })
  );
}

module.exports = { runWatcher };
