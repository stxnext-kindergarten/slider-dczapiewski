require.config({
    paths: {
        'jQuery': '../components/jquery/dist/jquery.js'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    },
    packages: [
    	{
    		name: 'cs',
    		location: '../components/require-cs',
    		main: 'cs'
    	},
    	{
    		name: 'cofee-script',
    		location: '../components/coffeescript',
    		main: 'extras/cofee-script'
    	}
    ]
});

require(['cs!slider.jquery'], function(slider) {
    $('#views-slides, #animals-slides').slider();
});