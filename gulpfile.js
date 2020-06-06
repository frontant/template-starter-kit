const gulp = require('gulp');

require('./gulp/build');
require('./gulp/watch');

gulp.task('default', gulp.series('build'));
