'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var babel = require('gulp-babel');
var mergeStream = require('merge-stream');
var del = require('del');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

var config = require('./gulpconfig');

var isAndroidEmulator = false; // required for --emulator flag of tns
var logPattern = 'V/JS';

gulp.task('clean', function() {
  console.log(chalk.blue('Cleaning repo...'));
  del(config.clean.path);
});

gulp.task('copy', function() {
  console.log(chalk.blue('Transpiling and copying files...'));

  var es6 = gulp.src(config.files.es6.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-commonjs']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.files.dest));

  var es5 = gulp.src(config.files.es5.src)
    .pipe(plumber())
    .pipe(gulp.dest(config.files.dest));

  var res = gulp.src(config.files.resources.src)
    .pipe(plumber())
    .pipe(gulp.dest(config.files.dest));

  var merged = mergeStream(es6, es5);
  merged.add(res);

  return merged;
});

gulp.task('deploy', function(cb) {
  console.log(chalk.blue('Deploying...'));

  var child;

  var tns = (process.platform === 'win32' ? 'tns.cmd' : 'tns');
  if (isAndroidEmulator) {
    child = spawn(tns, ['livesync', 'android', '--watch', '--emulator'], {cwd: process.cwd()});
  } else {
    child = spawn(tns, ['livesync', 'android', '--watch'], {cwd: process.cwd()});
  }
  var stdout = '';
  var stderr = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    stdout += data;
    console.log(data);
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    stderr += data;
    console.log(chalk.red(data));
  });

  child.on('close', function(code) {
    console.log('Done with exit code', code);
  });

  cb();

});

gulp.task('lint', function () {
  return gulp.src(config.lint.src)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function() {
  console.log(chalk.blue('Watcher started, will restart emulator when files change'));
  gulp.watch(config.watch.src, ['copy']);
});

gulp.task('log', function() {
  var child = spawn('adb', ['logcat'], {cwd: process.cwd()});
  var stdout = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    if (data.indexOf(logPattern) > -1) {
      console.log(data);
    }
    stdout += data;
  });

  child.on('close', function(code) {
    console.log('Done with exit code', code);
  });
});

gulp.task('run', function() {
  runSequence(
    'clean',
    'log',
    'copy',
    'deploy',
    'watch');
});

// default task runs with genymotion
gulp.task('default', function() {
  isAndroidEmulator = false;
  logPattern = 'V/JS';
  runSequence('run');
});

// emulator task runs with android emulator
gulp.task('emulator', function() {
  isAndroidEmulator = true;
  logPattern = 'V JS';
  runSequence('run');
});

// live task runs on real device
gulp.task('live', function() {
  isAndroidEmulator = false;
  logPattern = 'V/JS';
  runSequence('run');
});
