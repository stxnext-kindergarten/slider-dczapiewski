/*!
 * Slider jQuery Plugin
 * Allows to create an image gallery.
 *
 * Put your images as nested in ul > li > a.
 * Example:
 *
 *      <ul id="gallery">
 *          <li>
 *              <a href="#">
 *                  <img src="gallery/image1.png">
 *              </a>
 *          </li>
 *          <li>
 *              <a href="#">
 *                  <img src="gallery/image2.png">
 *              </a>
 *          </li>
 *      </ul>
 *
 * Having something like above, you can turn it into slides gallery by call of .slider() method on an element.
 * Example:
 *
 *      $('#gallery').slider();
 *
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
        this.config = $.extend({}, {
            active: 0
        }, options);

        this.createButtons();
        this.createIndicators();
        this.nextSlide(this.config.active, this.$element);
   };

   Slider.prototype = {
        /**
         * Creates buttons allowing to switch to previous or next slide.
         *
         */
        createButtons: function createButtons() {
            var $prevSlideButton = $('<div/>').addClass('slide-button prev-slide-button'),
                $nextSlideButton = $('<div/>').addClass('slide-button next-slide-button'),
                $buttonsParent = $(this).parent().children('ul'),
                self = this;

            this.$elementParent.append([$prevSlideButton, $nextSlideButton]);

            $prevSlideButton.click(function() {
                var nextOne = (self.activeSlide > 0) ? self.activeSlide - 1 : self.imagesLength - 1,
                    $slidee = $(this).parent().children('ul');

                self.nextSlide(nextOne, $slidee);
            });

            $nextSlideButton.click(function() {
                var nextOne = (self.activeSlide < self.imagesLength - 1) ? self.activeSlide + 1 : 0,
                    $slidee = $(this).parent().children('ul');

                self.nextSlide(nextOne, $slidee);
            });
        },

        /**
         * Creates indicators that show which slide is being shown.
         * Each of them allows to switch slide displayed by clicking it.
         *
         */
        createIndicators: function createIndicators() {
            var $indicatorsDiv = $('<div/>').addClass('indicators-div'),
                $indicator,
                self = this;

                this.$images.each(function(idx) {
                    $indicator = $('<div/>').addClass('slide-indicator').data('slide', idx);
                    $indicatorsDiv.append($indicator);

                    $indicator.click(function() {
                        var $this = $(this),
                            slide = $this.data('slide'),
                            $slidee = $this.parent().parent().children('ul');

                        self.nextSlide(slide, $slidee);
                    });
                });

                this.$elementParent.append($indicatorsDiv);
                this.nextSlide(false, this.$element);
        },

        /**
         * Change the slide displayed by its index that is counted from 0 (pass 0 to display first slide).
         * 
         * @param {number} slideIdx Index of the slide supposed to be shown.
         * @param {Element} $slidee A jQuery element that images are wrapped into.
         * Here it is the <ul> element that method slider() has been called on.
         */
        nextSlide: function nextSlide(slideIdx, $slidee) {
            var $indicatorDiv = $slidee.parent().children('.indicators-div').children(),
                self = this;

            this.activeSlide = slideIdx || this.config.active;

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