'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

gulp.task('lint', function() {
  return gulp.src(['./routes/**/*.js', 'lib/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint2', function() {
  return gulp.src(['gulpfile.js', './routes/**/*.js', 'lib/**/*.js'])
    .pipe(eslint('.eslintrc'))
    //.pipe(eslint.format('checkstyle', process.stderr))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js', {
      read: false
    })
    .pipe(mocha({
      require: ['should'],
      reporter: 'xunit-file'
    }));
});

gulp.task('cover', function(cb) {
  gulp.src(['routes/**/*.js', 'lib/**/*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      gulp.src(['test/**/*.js'])
        .pipe(mocha({
          require: ['should']
        }))
        .pipe(istanbul.writeReports({
          dir: 'test-assets/coverage',
          reporters: ['lcov', 'cobertura', 'clover', 'text-summary']
        }))
        .pipe(istanbul.enforceThresholds({
          thresholds: {
            global: 90
          }
        })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
});

gulp.task('watch', function() {
  var watcher = gulp.watch('**/*.js', ['lint']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['lint', 'test'], function() {});
