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
});

/**
 * Merges JavaScript and CSS files from /src directory to /dist directory.
 */
gulp.task('dev', function() {
    gulp.src(config.paths.src.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));

    gulp.src(config.paths.src.css)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));

    gulp.src(config.paths.src.img)
        .pipe(gulp.dest(config.paths.dist.img));
});

/**
 * Minifies and merges JavaScript and CSS files from /src directory
 * to /dist directory.
 */
gulp.task('prod', function() {
    gulp.src(config.paths.src.js)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));

    gulp.src(config.paths.src.css)
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));

    gulp.src(config.paths.src.img)
        .pipe(gulp.dest(config.paths.dist.img));
});