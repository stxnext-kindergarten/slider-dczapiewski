exports.paths = {
    src: {
        components: {
            root: 'src/components',
            requirejs: 'src/components/requirejs/require.js'
        },
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
        ],
        html: [
            'src/haml/**/*.haml'
        ]
    },
    dist: {
        root: 'dist',
        js: 'dist/js',
        css: 'dist/css',
        img: 'dist/img',
        fonts: 'dist/fonts',
        index: 'index.html'
    }
};