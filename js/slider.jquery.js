(function ($) {
    $.fn.slider = function (options) {

        return this.each( function () {
            
            var options,
                slideshowDiv,
                element,
                slideTo,
                prevSlideButton,
                nextSlideButton,
                images,
                indicatorsDiv,
                indicator;

            /*
             * Options of the slideshow.
             */
            options = $.extend({
                runWith: 0,
                activeSlide: 0
            }, options);

            /*
             * Wrapping exisiting listed slides into the plugin's layer.
             */
            slideshowDiv = $('<div/>').addClass('slideshow');
            element = $(this);
            $(this).wrap(slideshowDiv);

            /*
             * Slides to the slide stated as argument passed or defaultly to first one.
             */
            slideTo = function (slide) {
                slide = slide || options.runWith;
                options.activeSlide = slide;

                element.css('left', ((+slide * 800) * -1) + 'px');

                $('.slideIndicator').removeClass('active');
                $('.slideIndicator').filter('#' + slide).addClass('active');
            };

            /*
             * Inserting previous and next slide buttons.
             */
            prevSlideButton = $('<div/>').addClass('slideButton prevSlideButton');
            nextSlideButton = $('<div/>').addClass('slideButton nextSlideButton');
            $(this).parent().append(prevSlideButton).append(nextSlideButton);

            /*
             * Rendering active slide indicators.
             */
            images = $(this).find('li a img').length;
            indicatorsDiv = $('<div/>').addClass('indicatorsDiv');
            for (var i = 0; i < images; i++) {
                indicator = $('<div/>', { id: i }).addClass('slideIndicator');
                indicatorsDiv.append(indicator);
            }
            $(this).parent().append(indicatorsDiv);

            /*
             * Attaching events to previous and next slide buttons.
             */
            $('.slideButton').on('click', function () {

                var button = $(this);
                var activeSlide = options.activeSlide;
                var nextOne;

                /* Previous and next slide button event. */
                if (button.hasClass('prevSlideButton')) {
                    nextOne = (activeSlide > 0) ? activeSlide-1 : images-1;
                }
                if (button.hasClass('nextSlideButton')) {
                    nextOne = (activeSlide < images-1) ? activeSlide+1 : 0;
                }
                slideTo(nextOne);

            });

            $('.slideIndicator').on('click', function () {
                var activeSlide = $(this).prop('id');
                slideTo(activeSlide);
            });

            /*
             * Having had everything needed written go on to fire the plugin.
             */
            slideTo();

        });

    };
})(jQuery);