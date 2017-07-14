'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var run = require('run-sequence');
var del = require('del');
var bs = require('browser-sync').create();

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy:html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy:fonts', function() {
  return gulp.src('fonts/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy:news', function() {
  return gulp.src('data/news.json')
    .pipe(gulp.dest('build/data'));
});

gulp.task('normalize', function() {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('normalize.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('style', function() {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(bs.stream());
});

gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', function() {
  return gulp.src(['node_modules/picturefill/dist/picturefill.js', 'js/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('build', function(cb) {
  run(
    'clean',
    'copy:html',
    'normalize',
    'style',
    'copy:fonts',
    'images',
    'scripts',
    'copy:news',
    cb
  );
});

gulp.task('serve', function() {
  bs.init({
    server: 'build'
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch("*.html", ['copy:html', bs.reload]);
});
