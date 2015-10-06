var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

/**
 * Default action when gulp is run with no task.
 * Displays welcome message.
 */
gulp.task('default', function() {
    gutil.log('==', gutil.colors.green('Slider'), 'jQuery Plugin', '==');
});

/**
 * Copies files from /src directory to /dist directory.
 */
gulp.task('dev', function() {
    gulp.src('src/**')
    .pipe(gulp.dest('dist'));
});

/**
 * Minifies JavaScript and CSS files.
 */
gulp.task('prod', function() {
    gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    gulp.src('dist/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});