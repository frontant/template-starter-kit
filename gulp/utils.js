const fs = require('fs');
const path = require('path');
const through = require('through2');
const del = require('del');
const gulp = require('gulp');

const { paths } = require('../config');

// clear empty directories recursively
const cleanEmptyDirs = dir => {
  const isDir = fs.existsSync(dir) && fs.statSync(dir).isDirectory();

  if (!isDir) {
    return;
  }

  let files = fs.readdirSync(dir);
  if (files.length > 0) {
    files.forEach(file => {
      var fullPath = path.join(dir, file);
      cleanEmptyDirs(fullPath);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    files = fs.readdirSync(dir);
  }

  if (files.length === 0) {
    fs.rmdirSync(dir);
  }
};

const fileExistsCheck = () => {
  return through.obj((chunk, enc, cb) => {
    if (!fs.existsSync(chunk.path)) {
      cb(); // filter not existing files
    } else {
      cb(null, chunk);
    }
  });
};

const pathCheck = srcPath => {
  if (!srcPath.startsWith(paths.rootDir)) {
    throw new Error(
      'It is not allowed to transform resources outside the working directory'
    );
  }
};

const copyFile = (srcFile, cwd, destDir) => {
  const basename = srcFile.substring(cwd.length + 1);
  const destPath = path.resolve(destDir, basename);

  pathCheck(destPath);

  fs.mkdirSync(path.dirname(destPath), { recursive: true }, err => {
    if (err) throw err;
  });

  fs.copyFileSync(srcFile, destPath, err => {
    if (err) throw err;
  });

  console.log('changed', srcFile);
};

function removePath(srcPath, cwd, destDir) {
  const basename = srcPath.substring(cwd.length + 1);
  const destPath = path.resolve(destDir, basename);

  pathCheck(destPath);

  const delPaths = del.sync(destPath);

  delPaths.length && console.log('removed', destPath);
}

const setupFileCopyWatcher = ({ glob, cwd, destDir, done }) => {
  if (!glob || !destDir || !cwd) {
    throw new Error('bad parameters');
  }

  let allDoneTimeoutId = null;

  const allDone = function() {
    allDoneTimeoutId && clearTimeout(allDoneTimeoutId);

    allDoneTimeoutId = setTimeout(() => {
      done();
      allDoneTimeoutId = null;
    }, 100);
  };

  gulp
    .watch(glob, {
      events: ['add', 'addDir', 'change', 'unlink', 'unlinkDir'],
      usePolling: true,
      interval: 100,
      binaryInterval: 200,
      depth: 10,
    })
    .on('change', srcPath => {
      copyFile(srcPath, cwd, destDir);
      done && allDone();
    })
    .on('add', srcPath => {
      copyFile(srcPath, cwd, destDir);
      done && allDone();
    })
    .on('unlink', srcPath => {
      removePath(srcPath, cwd, destDir);
      done && allDone();
    })
    .on('unlinkDir', srcPath => {
      removePath(srcPath, cwd, destDir);
      done && allDone();
    });
};

module.exports = {
  cleanEmptyDirs,
  fileExistsCheck,
  setupFileCopyWatcher,
};
