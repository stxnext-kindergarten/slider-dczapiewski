exports.paths = {
    src: {
        js: [
            'src/js/jquery.min.js',
            'src/js/slider.jquery.js',
            'src/js/app.js',
            'src/js/**/*.js'
        ],
        css: [
            'src/css/**/*.css'
        ],
        img: [
            'src/img/**/*'
        ],
        component: {
            js: {
                jquery: 'src/components/jquery/dist/jquery.js',
                bootstrap: 'src/components/bootstrap/dist/js/bootstrap.js'
            },
            css: {
                bootstrap: 'src/components/bootstrap/dist/css/bootstrap.css'
            },
            fonts: {
                bootstrap: 'src/components/bootstrap/fonts/*'
            },
            root: {
                fonts: 'src/fonts',
                components: 'src/components'
            },
            used: [
                'src/js/jquery.js',
                'src/js/bootstrap.js',
                'src/css/bootstrap.css'
            ]
        },
        roots: {
            js: 'src/js',
            css: 'src/css',
            fonts: 'src/fonts'
        }
    },
    dist: {
        root: 'dist/',
        js: 'dist/js',
        css: 'dist/css',
        img: 'dist/img'
    },
    components: [
        'jquery',
        'bootstrap'
    ]
};