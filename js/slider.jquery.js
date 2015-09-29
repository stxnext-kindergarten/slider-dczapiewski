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
        this.$images = this.$element.find('li a img');
        this.activeSlide = 0;
        this.imagesLength = this.$images.length;
        this.defaults = $.extend({}, {
            runWith: 0
        }, options);

        this.createButtons();
        this.createIndicators();
   };

   Slider.prototype = {
        createButtons: function createButtons() {
            var $prevSlideButton = $('<div/>').addClass('slide-button prev-slide-button'),
                $nextSlideButton = $('<div/>').addClass('slide-button next-slide-button'),
                $buttonsParent = $(this).parent().children('ul'),
                self = this;

            this.$elementParent.append([$prevSlideButton, $nextSlideButton]);

            $prevSlideButton.click(function() {
                var nextOne = (self.activeSlide > 0) ? self.activeSlide-1 : self.imagesLength-1,
                    $slidee = $(this).parent().children('ul');

                self.nextSlide(nextOne, $slidee);
            });

            $nextSlideButton.click(function() {
                var nextOne = (self.activeSlide < self.imagesLength-1) ? self.activeSlide+1 : 0,
                    $slidee = $(this).parent().children('ul');
                    
                self.nextSlide(nextOne, $slidee);
            });
        },

        createIndicators: function createIndicators() {
            var $indicatorsDiv = $('<div/>').addClass('indicators-div'),
                $indicator,
                self = this,
                i = 0;

                this.$images.each(function() {
                    $indicator = $('<div/>').addClass('slide-indicator').data('slide', i);
                    $indicatorsDiv.append($indicator);

                    $indicator.click(function() {
                        var slide = $(this).data('slide'),
                            $slidee = $(this).parent().parent().children('ul');

                        self.nextSlide(slide, $slidee);
                    });

                    i += 1;
                });


                this.$elementParent.append($indicatorsDiv);
                this.nextSlide(false, this.$element);
        },

        nextSlide: function nextSlide(slideIdx, $slidee) {
            var $indicatorDiv = $slidee.parent().children('.indicators-div').children();

            slideIdx = slideIdx || this.defaults.runWith;
            this.activeSlide = slideIdx;

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