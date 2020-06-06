const gulp = require('gulp');
const del = require('del');
const twig = require('gulp-twig');
const md5File = require('md5-file');
const path = require('path');
const fs = require('fs');

const { paths, htmlIncludes } = require('../config');

gulp.task('twig.cleanup', () => {
  return del([`${paths.buildDir}/*.html`]);
});

gulp.task('twig.build', () => {
  return gulp
    .src([`${paths.srcDir}/*.twig`])
    .pipe(
      twig({
        base: paths.srcDir,
        data: {
          env: {
            styles: htmlIncludes.styles.map(item =>
              transformToIncludePath(item)
            ),
            scripts: htmlIncludes.scripts.map(item =>
              transformToIncludePath(item)
            ),
          },
        },
      })
    )
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('twig', gulp.series('twig.cleanup', 'twig.build'));

function runWatcher(done) {
  gulp.watch(
    `${paths.srcDir}/**/*.twig`,
    gulp.series('twig', cb => {
      done();
      cb();
    })
  );
}

function transformToIncludePath(relPath) {
  const fullPath = path.join(paths.buildDir, relPath);

  if (!fs.existsSync(fullPath)) return relPath;

  const hash = md5File.sync(fullPath);
  return relPath + '?v=' + hash.slice(0, 10);
}

module.exports = { runWatcher };
