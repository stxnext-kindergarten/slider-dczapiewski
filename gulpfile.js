var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    config = require('./config');


gulp.task('clean', function() {
    gulp.src(config.paths.dist.root, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('script:dev', function() {
    gulp.src(config.paths.src.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('script:prod', function() {
    gulp.src(config.paths.src.js)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('styles:app', function() {
    gulp.src(config.paths.src.css)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('styles:minify', function() {
    gulp.src(config.paths.src.css)
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('copy:images', function() {
    gulp.src('src/img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('dev', ['clean', 'script:dev', 'styles:app', 'copy:images']);
gulp.task('prod', ['clean', 'script:prod', 'styles:app', 'styles:minify', 'copy:images']);
gulp.task('default', ['dev']);