# Simple Slider jQuery Plugin

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
  
Having something like above, you can turn it into slides gallery by call of .slider() method on an element.
Example:
  
        $('#gallery').slider();

## Installation

1. Install all required dependencies via npm.
    `npm install`

2. Generate final files with Gulp.
   To concat scripts and styles and move resources like images, run *gulp dev*
    `gulp dev`

    To concat scripts and styles and move resources like images and minify scripts and styles, run *gulp prod*
    `gulp prod`