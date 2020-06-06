const gulp = require('gulp');
const browserSync = require('browser-sync');

const { paths } = require('../config');
const { cleanEmptyDirs } = require('./utils');
const assets = require('./assets');
const twig = require('./twig');
const scripts = require('./scripts');
const styles = require('./styles');

function initBrowserSync() {
  browserSync.init({
    notify: false,
    ghostMode: false,
    localOnly: true,
    open: false,
    online: false,
    xip: false,
    tunnel: null,
    server: {
      baseDir: paths.buildDir,
      serveStaticOptions: {
        extensions: ['html'],
      },
    },
  });
}

gulp.task(
  'watch',
  gulp.series('build.development', () => {
    initBrowserSync();

    let allDoneTimeoutId = null;

    const doneCb = function() {
      allDoneTimeoutId && clearTimeout(allDoneTimeoutId);

      setTimeout(() => {
        cleanEmptyDirs(paths.buildDir);
        browserSync.reload();
        allDoneTimeoutId = null;
      }, 200);
    };

    assets.runWatcher(doneCb);
    twig.runWatcher(doneCb);
    scripts.runWatcher(doneCb);

    styles.runWatcher(browserSync.stream);
  })
);
