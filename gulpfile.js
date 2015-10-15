var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    config = require('./config'),
    runSequence = require('run-sequence'),
    shell = require('gulp-shell');

/*
 * Clean distribution files.
 */
gulp.task('clean', function() {
    var cleanable = [
        config.paths.dist.root,
        config.paths.src.component.root.fonts,
        config.paths.src.component.root.components,
    ];

    cleanable = cleanable.concat(config.paths.src.component.used);

    gulp.src(cleanable, {read: false})
        .pipe(clean({force: true}));
});

/*
 * Install bower dependecies.
 */
gulp.task('component:install', shell.task('bower install'));

/*
 * Move needed bower components.
 */
gulp.task('component:move', function() {
    // jQuery JS
    gulp.src(config.paths.src.component.js.jquery)
        .pipe(gulp.dest(config.paths.src.roots.js));

    // Bootstrap JS
    gulp.src(config.paths.src.component.js.bootstrap)
        .pipe(gulp.dest(config.paths.src.roots.js));

    // Bootstrap CSS
    gulp.src(config.paths.src.component.css.bootstrap)
        .pipe(gulp.dest(config.paths.src.roots.css));

    // Bootstrap fonts
    gulp.src(config.paths.src.component.fonts.bootstrap)
        .pipe(gulp.dest(config.paths.src.roots.fonts));
});

/*
 * Generate scripts.
 */
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

/*
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

/*
 * Copy needed files.
 */
gulp.task('copy:images', function() {
    gulp.src(config.paths.src.img)
        .pipe(gulp.dest(config.paths.dist.img));
});

/*
 * Prepare needed resources.
 */
gulp.task('dev', function(cb) {
    runSequence(
        ['clean', 'component:install'],
        'component:move',
        ['script:dev', 'styles:app', 'copy:images'],
        cb
    );
});

gulp.task('prod', function(cb) {
    runSequence(
        ['clean', 'component:install'],
        'component:move',
        ['script:prod', 'styles:app', 'styles:minify', 'copy:images'],
        cb
    );
});

gulp.task('default', ['dev']);