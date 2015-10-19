var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    config = require('./config'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell'),
    gulpif = require('gulp-if'),
    coffee = require('gulp-coffee');

/**
 * Clean distribution files.
 */
gulp.task('clean', function() {
    gulp.src(config.paths.dist.root, {read: false})
        .pipe(clean({force: true}));
});

/**
 * Install bower dependecies.
 */
gulp.task('component:install', shell.task('bower install'));

/**
 * Generate scripts.
 */
gulp.task('scripts:requirejs', function() {
    gulp.src(config.paths.src.requirejs)
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('scripts:dev', function() {
    gulp.src(config.paths.src.js)
        .pipe(gulpif(/\.coffee$/, coffee()))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('scripts:prod', function() {
    gulp.src(config.paths.src.js)
        .pipe(gulpif(/\.coffee$/, coffee()))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('scripts-dev', ['scripts:requirejs', 'scripts:dev']);
gulp.task('scripts-prod', ['scripts:requirejs', 'scripts:prod']);

/**
 * CSS styles.
 */
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

/**
 * Copy needed files.
 */
gulp.task('copy:images', function() {
    gulp.src(config.paths.src.img)
        .pipe(gulp.dest(config.paths.dist.img));
});

gulp.task('copy:fonts', function() {
    gulp.src(config.paths.src.fonts)
        .pipe(gulp.dest(config.paths.dist.fonts));
});

/**
 * Prepare needed resources.
 */
gulp.task('dev', function(cb) {
    runSequence(
        ['clean', 'component:install'],
        ['scripts-dev', 'styles:app', 'copy:images', 'copy:fonts'],
        cb
    );
});

gulp.task('prod', function(cb) {
    runSequence(
        ['clean', 'component:install'],
        ['scripts-prod', 'styles:app', 'styles:minify', 'copy:images', 'copy:fonts'],
        cb
    );
});

gulp.task('default', ['dev']);
