var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    config = require('./config'),
    bower = require('bower');


gulp.task('clean', function() {
    var cleanable = [
        config.paths.dist.root,
        'src/fonts',
        'src/components',
        'src/js/jquery.js',
        'src/js/bootstrap.js',
        'src/css/bootstrap.css'
    ];

    gulp.src(cleanable, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('component:install', function(cb) {
    bower.commands.install(config.paths.components, {save: true}, {})
        .on('end', function(installed) {
            cb();
        });
});

gulp.task('component:move', ['component:install'], function() {
    // jQuery JS
    gulp.src('src/components/jquery/dist/jquery.js')
        .pipe(gulp.dest('src/js'));

    // Bootstrap JS
    gulp.src('src/components/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('src/js'));

    // Bootstrap CSS
    gulp.src('src/components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('src/css'));

    // Bootstrap fonts
    gulp.src('src/components/bootstrap/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

/*gulp.task('script:dev', ['component:move'], function() {
    gulp.src(config.paths.src.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('script:prod', ['component:move'], function() {
    gulp.src(config.paths.src.js)
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.paths.dist.js));
});

gulp.task('styles:app', ['component:move'], function() {
    gulp.src(config.paths.src.css)
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('styles:minify', ['component:move'], function() {
    gulp.src(config.paths.src.css)
        .pipe(minifyCss())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(config.paths.dist.css));
});

gulp.task('copy:res', ['component:move'], function() {
    // Images
    gulp.src(config.paths.src.img)
        .pipe(gulp.dest(config.paths.dist.img));

    // Bootstrap fonts
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('dev', ['clean', 'component:move', 'script:dev', 'styles:app', 'copy:res']);
gulp.task('prod', ['clean', 'component:move', 'script:prod', 'styles:app', 'styles:minify', 'copy:res']);
gulp.task('default', ['dev']);*/