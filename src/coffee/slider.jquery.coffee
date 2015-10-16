###
Slider jQuery Plugin
Allows to create slider with images.

Put your images as nested in ul > li > a.
Example:

     <ul id="gallery">
        <li>
            <a href="#">
                <img src="gallery/image1.png">
            </a>
        </li>
        <li>
            <a href="#">
                <img src="gallery/image2.png">
            </a>
        </li>
    </ul>

Having something like above, you can turn it into slides gallery by call of .slider() method
on an element.
Example:

    $('#gallery').slider();
###


(($) ->
    Slider = ($element, options) ->
        wrapper = $ '<div class="slideshow" />'
        $element.wrap wrapper

        @config = $.extend {}, active: 0, options
        @$element = $element
        @$wrapper = $element.parent()
        @$images = $ 'li > a > img', $element
        @imagesLength = @$images.length
        @activeSlide = @config.active

        @createButtons()
        @createDots()
        @setDots @activeSlide

    ###
    Creates buttons allowing to switch to previous or next slide.
    ###
    Slider::createButtons = ->
        self = @
        $prevSlideButton = $ '<a href="#" class="slide-button prev-slide-button" />'
        $nextSlideButton = $ '<a href="#" class="slide-button next-slide-button" />'

        @$wrapper.append [$prevSlideButton, $nextSlideButton]
        $('.slide-button', @$wrapper).on 'click', (evt) ->
            evt.preventDefault()
            slideIdx

            if $(@).hasClass 'prev-slide-button'
                slideIdx = if self.activeSlide > 0 then self.activeSlide - 1 else self.imagesLength - 1
            else
                slideIdx = if self.activeSlide < self.imagesLength - 1 then self.activeSlide + 1 else 0

            self.nextSlide slideIdx

    ###
    Creates indicators that show which slide is being shown.
    Each of them allows to switch slide displayed by clicking it.
    ###
    Slider::createDots = ->
        $dots = $ '<ul class="navigation-bar" />'

        @$images.each (idx) =>
            $dot = $ '<li class="slide-indicator" />'
            $dotLink = $ '<a href="#" />'
            $dot.append $dotLink
            $dots.append $dot

            $dotLink.on 'click', (evt) =>
                evt.preventDefault()
                @nextSlide idx

        @$wrapper.append $dots

    ###
    Draws the dots indicating which slide is currently displayed.
    
    @param {number} slideIdx Index of the slide being shown.
    ###
    Slider::setDots = (slideIdx) ->
        $dots = $ '.navigation-bar > li.slide-indicator a', @$wrapper

        $dots.removeClass 'active'
            .eq slideIdx
            .addClass 'active'

    ###
    Change the slide displayed by its index that is counted from 0 (pass 0 to display first slide).
    
    @param {number} slideIdx Index of the slide supposed to be shown.
    ###
    Slider::nextSlide = (slideIdx) ->
        @activeSlide = slideIdx
        @$element.css 'left', ((+slideIdx * 800) * -1) + 'px'
        @setDots slideIdx

    $.fn.slider = (options) ->
        options ?= {}

        @each ->
            new Slider $(@), options

        return @
) jQuery