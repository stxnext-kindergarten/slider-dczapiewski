var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

gulp.task('default', function() {
    gutil.log('==', gutil.colors.green('Slider'), 'jQuery Plugin', '==');
});

gulp.task('dev', function() {
    gulp.src('src/**')
    .pipe(gulp.dest('dist'));
});

gulp.task('prod', function() {
    gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

    gulp.src('dist/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});