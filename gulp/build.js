const gulp = require('gulp');

require('./cleanup');
require('./scripts');
require('./styles');
require('./twig');
require('./assets');
require('./modernizr');

gulp.task('set-production-mode', done => {
  process.env.NODE_ENV = 'production';
  done();
});

gulp.task(
  'build.development',
  gulp.series(
    gulp.parallel('scripts', 'styles', 'assets'),
    'modernizr',
    'twig',
    'cleanup.empty-dir'
  )
);

gulp.task('build', gulp.series('set-production-mode', 'build.development'));
