require.config({
    paths: {
        'jQuery': '../components/jquery/dist/jquery'
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
    		name: 'coffee-script',
    		location: '../components/coffeescript',
    		main: 'extras/coffee-script'
    	}
    ]
});

require(['cs!slider.jquery'], function(slider) {
    $('#views-slides, #animals-slides').slider();
});