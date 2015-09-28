/*!
 * Slider jQuery Plugin
 * Allows to create an image gallery.
 */

(function($) {
   var Slider = function Slider($element, options) {
        var $slideshowDiv = $('<div/>').addClass('slideshow');
        options = options || {};

        this.$element = $element;
        this.$element.wrap($slideshowDiv);
        this.$elementParent = this.$element.parent();
        this.config = $.extend({}, {
            runWith: 0,
            activeSlide: 0,
            imagesLength: this.$element.find('li a img').length
        }, options);

        this.createButtons();
        this.createIndicators();
   };

   Slider.prototype = {
        createButtons: function createButtons() {
            var $prevSlideButton = $('<div/>').addClass('slide-button prev-slide-button'),
                $nextSlideButton = $('<div/>').addClass('slide-button next-slide-button'),
                _this = this;

            this.$elementParent.append($prevSlideButton).append($nextSlideButton);

            $prevSlideButton.click(function() {
                var nextOne = (_this.config.activeSlide > 0) ? _this.config.activeSlide-1 : _this.config.imagesLength-1;
                _this.nextSlide(nextOne, $(this).parent().children('ul'));
            });

            $nextSlideButton.click(function() {
                var nextOne = (_this.config.activeSlide < _this.config.imagesLength-1) ? _this.config.activeSlide+1 : 0;
                _this.nextSlide(nextOne, $(this).parent().children('ul'));
            });
        },

        createIndicators: function createIndicators() {
            var $indicatorsDiv = $('<div/>').addClass('indicators-div'),
                $indicator,
                _this = this,
                i;

                for (i = 0; i < this.config.imagesLength; i++) {
                    $indicator = $('<div/>').addClass('slide-indicator').data('slide', i);
                    $indicatorsDiv.append($indicator);

                    $indicator.click(function() {
                        var slide = ($(this).data('slide'));
                        _this.nextSlide(slide, $(this).parent().parent().children('ul'));
                    });
                }

                this.$elementParent.append($indicatorsDiv);
                this.nextSlide(false, this.$element);
        },

        nextSlide: function nextSlide(slideIdx, $slidee) {
            var $indicatorDiv = $slidee.parent().children('.indicators-div').children();

            slideIdx = slideIdx || this.config.runWith;
            this.config.activeSlide = slideIdx;

            $slidee.css('left', ((+slideIdx * 800) * -1) + 'px');
            $indicatorDiv
                .removeClass('active')
                .filter(function() {
                    return $(this).data('slide') === slideIdx;
                })
                .addClass('active');
        }
   };

   $.fn.slider = function(options) {
        this.each(function() {
            new Slider($(this), options);
        });

        return this;
   };
})(jQuery);