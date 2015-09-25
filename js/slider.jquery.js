/*!
 * Slider jQuery Plugin
 * Allows to create an image galerry.
 */

(function ($) {

    $.fn.slider = function (options) {

        var config;
        var utils;
        var init;

        config = $.extend({}, {
            runWith: 0,
            activeSlide: 0
        }, options);

        utils = {
            nextSlide: function (slide, slidee) {
                slide = slide || config.runWith;
                config.activeSlide = slide;
                slidee.css('left', ((+slide * 800) * -1) + 'px');

                slidee.parent().children('.indicatorsDiv').children().removeClass('active');
                slidee.parent().children('.indicatorsDiv').children().filter(function () {
                    return $(this).data('slide') == slide;
                }).addClass('active');
            }
        };

        init = function init($element) {
            var $slideshowDiv,
                $elementParent,
                $images,
                $prevSlideButton,
                $nextSlideButton,
                $indicatorsDiv,
                $indicator;

            $slideshowDiv = $('<div/>').addClass('slideshow');
            $element.wrap($slideshowDiv);
            $elementParent = $element.parent();
            $images = $element.find('li a img').length;

            $prevSlideButton = $('<div/>').addClass('slideButton prevSlideButton');
            $nextSlideButton = $('<div/>').addClass('slideButton nextSlideButton');
            $elementParent.append($prevSlideButton).append($nextSlideButton);

            $prevSlideButton.click(function () {
                nextOne = (config.activeSlide > 0) ? config.activeSlide-1 : $images-1;
                utils.nextSlide(nextOne, $(this).parent().children('ul'));
            });

            $nextSlideButton.click(function () {
                nextOne = (config.activeSlide < $images-1) ? config.activeSlide+1 : 0;
                utils.nextSlide(nextOne, $(this).parent().children('ul'));
            });

            $indicatorsDiv = $('<div/>').addClass('indicatorsDiv');
            for (var i = 0; i < $images; i++) {
                $indicator = $('<div/>').addClass('slideIndicator').data('slide', i);
                $indicatorsDiv.append($indicator);

                $indicator.click(function () {
                    var slide = ($(this).data('slide'));
                    utils.nextSlide(slide, $(this).parent().parent().children('ul'));
                });
            }
            $elementParent.append($indicatorsDiv);

            utils.nextSlide(false, $element);
        };

        this.each(function () {
            init($(this));
        });

        return this;
    };
})(jQuery);