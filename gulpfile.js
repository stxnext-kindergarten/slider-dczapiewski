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
    coffee = require('gulp-coffee'),
    rjs = require('gulp-requirejs-optimize'),
    haml = require('gulp-haml'),
    sass = require('gulp-sass');

/**
 * Build HTML basing on Haml.
 */
gulp.task('html:build', function() {
    gulp.src(config.paths.src.html)
        .pipe(haml())
        .pipe(gulp.dest('.'));
});

/**
 * Clean distribution files.
 */
gulp.task('clean', function() {
    var cleanable = [
        config.paths.dist.root,
        config.paths.src.components.root,
        config.paths.dist.index
    ];

    gulp.src(cleanable, {read: false})
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
    gulp.src(config.paths.src.components.requirejs)
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
        .pipe(gulpif(/\.scss$/, sass().on('error', sass.logError)))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('styles:minify', function() {
    gulp.src(config.paths.src.css)
        .pipe(gulpif(/\.scss$/, sass().on('error', sass.logError)))
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
        ['html:build', 'scripts-dev', 'styles:app', 'copy:images', 'copy:fonts'],
        cb
    );
});

gulp.task('prod', function(cb) {
    runSequence(
        ['clean', 'component:install'],
        ['html:build', 'scripts-prod', 'styles:app', 'styles:minify', 'copy:images', 'copy:fonts'],
        cb
    );
});

gulp.task('default', ['dev']);
