require.config({
    paths: {
        'jQuery': 'src/components/jquery/dist/jquery.js'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    },
    packages: [
    	{
    		name: 'cs',
    		location: 'src/components/require-cs',
    		main: 'cs'
    	},
    	{
    		name: 'cofee-script',
    		location: 'src/components/coffeescript',
    		main: 'extras/cofee-script'
    	}
    ]
});

require(['cs!slider.jquery'], function(slider) {
    $('#views-slides, #animals-slides').slider();
});