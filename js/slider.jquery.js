/*!
 * Slider jQuery Plugin
 * Allows to create slider with images.
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
 */

(function($) {
    var Slider = function Slider($element, options) {
        var wrapper = $('<div class="slideshow" />');
        $element.wrap(wrapper);

        this.config = $.extend({}, {active: 0}, options);
        this.$element = $element;
        this.$wrapper = $element.parent();
        this.$images = $('li > a > img', $element);
        this.imagesLength = this.$images.length;
        this.activeSlide = this.config.active;

        this.createButtons();
        this.createDots();
        this.setDots(this.activeSlide);
    };

    Slider.prototype = {

        /**
         * Creates buttons allowing to switch to previous or next slide.
         */
        createButtons: function() {
            var self = this,
                $prevSlideButton = $('<a href="#" class="slide-button prev-slide-button" />'),
                $nextSlideButton = $('<a href="#" class="slide-button next-slide-button" />');

            $prevSlideButton.click(function(evt) {
                evt.preventDefault();
                var slideIdx = (self.activeSlide > 0) ? self.activeSlide - 1 : self.imagesLength - 1;

                self.nextSlide(slideIdx);
            });

            $nextSlideButton.click(function(evt) {
                evt.preventDefault();
                var slideIdx = (self.activeSlide < self.imagesLength - 1) ? self.activeSlide + 1 : 0;

                self.nextSlide(slideIdx);
            });

            /*
            ŻEBY TEN KOD DZIAŁAŁ, TRZEBA NAJPIERW WYWOŁAĆ this.$wrapper.append([$prevSlideButton, $nextSlideButton])
            DOTĄD NOWE ELEMENTY DODAWANE BYŁY NA KOŃCU, ZŁAMANA ZOSTAŁABY KONWENCJA

            var navigationButtons = $('.slide-button', this.$wrapper);
            navigationButtons.css('border-radius','0px');
            navigationButtons.click(function(evt) {
                evt.preventDefault();
                var slideIdx;

                if ($(this).hasClass('prev-slide-button')) {
                    slideIdx = (self.activeSlide > 0) ? self.activeSlide - 1 : self.imagesLength - 1;
                } else {
                    slideIdx = (self.activeSlide < self.imagesLength - 1) ? self.activeSlide + 1 : 0;
                }

                self.nextSlide(slideIdx);
            });*/

            this.$wrapper.append([$prevSlideButton, $nextSlideButton]);
        },

        /**
         * Creates indicators that show which slide is being shown.
         * Each of them allows to switch slide displayed by clicking it.
         */
        createDots: function() {
            var self = this,
                $dots = $('<ul class="navigation-bar" />'),
                $dot,
                $dotLink;

            this.$images.each(function(idx) {
                $dot = $('<li class="slide-indicator" />');
                $dotLink = $('<a href="#" />');
                $dot.append($dotLink);
                $dots.append($dot);

                $dotLink.click(function(evt) {
                    evt.preventDefault();
                    self.nextSlide(idx);
                });
            });

            this.$wrapper.append($dots);
        },

        /**
         *
         */
         setDots: function(slideIdx) {
            var $dots = $('.navigation-bar > li.slide-indicator a', this.$wrapper);

            $dots
                .removeClass('active')
                .eq(slideIdx).
                addClass('active');
         },

        /**
         * Change the slide displayed by its index that is counted from 0 (pass 0 to display first slide).
         * 
         * @param {number} slideIdx Index of the slide supposed to be shown.
         * @param {Element} $slidee A jQuery element that images are wrapped into.
         * Here it is the <ul> element that method slider() has been called on.
         */
        nextSlide: function(slideIdx) {
            var $slidee = this.$element,
                self = this;

            this.activeSlide = slideIdx;

            $slidee.css('left', ((+slideIdx * 800) * -1) + 'px');
            this.setDots(slideIdx);
        }
    };

    $.fn.slider = function(options) {
        options = options || {};

        this.each(function() {
            new Slider($(this), options);
        });
        return this;
    };
})(jQuery);