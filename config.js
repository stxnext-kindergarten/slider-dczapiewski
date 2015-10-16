exports.paths = {
    src: {
        js: [
            'src/components/jquery/dist/jquery.js',
            'src/components/bootstrap/dist/js/bootstrap.js',
            'src/js/app.coffee',
            'src/js/slider.jquery.coffee',
            'src/js/**/*.coffee'
        ],
        css: [
            'src/components/bootstrap/dist/css/bootstrap.css',
            'src/css/**/*.css'
        ],
        img: [
            'src/img/**/*'
        ],
        fonts: [
            'src/components/bootstrap/fonts/**'
        ]
    },
    dist: {
        root: 'dist',
        js: 'dist/js',
        css: 'dist/css',
        img: 'dist/img',
        fonts: 'dist/fonts'
    }
};