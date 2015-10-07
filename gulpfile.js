var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    config = require('./config');

/**
 * Default action when gulp is run with no task.
 * Displays welcome message.
 */
gulp.task('default', function() {
    gutil.log('==', gutil.colors.green('Slider'), 'jQuery Plugin', '==');
    gutil.log(config.paths.js, config.paths.css);
});

/**
 * Merges JavaScript and CSS files from /src directory to /dist directory.
 */
gulp.task('dev', function() {
    gulp.src(config.path.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));

    gulp.src(config.path.css)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});

/**
 * Minifies and merges JavaScript and CSS files from /src directory
 * to /dist directory.
 */
gulp.task('prod', function() {
    gulp.src(config.path.js)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));

    gulp.src(config.path.css)
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});