require.config
    paths:
        'jQuery': 'src/components/jquery/dist/jquery.js'
    shim:
        'jQuery':
            exports: '$'

require ['slider.jquery'], (slider) ->
    $('#views-slides, #animals-slides').slider()