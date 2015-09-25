(function ($) {
    $.fn.slider = function (options) {
        return this.each( function () {
            var uuid,
                options,
                $slideshowDiv,
                $element,
                slideTo,
                $prevSlideButton,
                $nextSlideButton,
                images,
                indicatorsDiv,
                indicator;

            /**
             * Generating UUID of the element so that none could be doubled.
             */
            uuid = 'slider-' + $('.slideshow').length;

            /**
             * Options of the slideshow.
             */
            options = $.extend({
                runWith: 0,
                activeSlide: 0
            }, options);

            /**
             * Wrapping exisiting listed slides into the plugin's layer.
             */
            $slideshowDiv = $('<div/>', { id: uuid }).addClass('slideshow');
            $element = $(this);
            $element.wrap($slideshowDiv);

            /**
             * Slides to the slide stated as argument passed or defaultly to first one.
             */
            slideTo = function (slide, sliderId) {
                slide = slide || options.runWith;
                sliderId = sliderId || uuid;
                options.activeSlide = slide;

                //$element.css('left', ((+slide * 800) * -1) + 'px');
                $('#' + sliderId).children( 'ul' ).css('left', ((+slide * 800) * -1) + 'px');

                $('#' + sliderId + ' .slideIndicator').removeClass('active');
                $('#' + sliderId + ' .slideIndicator').filter('#' + slide).addClass('active');
            };

            /**
             * Inserting previous and next slide buttons.
             */
            $prevSlideButton = $('<div/>').addClass('slideButton prevSlideButton');
            $nextSlideButton = $('<div/>').addClass('slideButton nextSlideButton');
            $(this).parent().append($prevSlideButton).append($nextSlideButton);

            /**
             * Rendering active slide indicators.
             */
            images = $(this).find('li a img').length;
            indicatorsDiv = $('<div/>').addClass('indicatorsDiv');
            for (var i = 0; i < images; i++) {
                indicator = $('<div/>', { id: i }).addClass('slideIndicator');
                indicatorsDiv.append(indicator);
            }
            $(this).parent().append(indicatorsDiv);

            /**
             * Attaching events to previous and next slide buttons.
             */
            $('.slideButton').on('click', function () {
                var button = $(this),
                    sliderId = button.parent().prop('id'),
                    activeSlide = options.activeSlide,
                    nextOne;

                /* Previous and next slide button event. */
                if (button.hasClass('prevSlideButton')) {
                    nextOne = (activeSlide > 0) ? activeSlide-1 : images-1;
                }
                if (button.hasClass('nextSlideButton')) {
                    nextOne = (activeSlide < images-1) ? activeSlide+1 : 0;
                }
                slideTo(nextOne, sliderId);
            });

            $('.slideIndicator').on('click', function () {
                var indicator = $(this),
                    activeSlide = indicator.prop('id'),
                    sliderId = indicator.parent().parent().prop('id');
                slideTo(activeSlide, sliderId);
            });

            /**
             * Having had everything needed written go on to fire the plugin.
             */
            slideTo();
        });
    };
})(jQuery);