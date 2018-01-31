/**
 *  Sets up the homepage slideshow to display different features
 *  along with pagination controls to switch between slides.
 *
 *  Can pass in an object set of options.
 *
 *  @param el      selector string
 *    Selector that defines the container in which the slides markup is.
 *
 *  @param delay   number (milliseconds)
 *    How quickly the slide should transition (data injected in template)
 *
 *  @param nav     selector string
 *    The data attribute that is on the next / previous buttons.
 */

import $ from 'jquery';
import Flickity from 'flickity-imagesloaded';
import 'flickity-bg-lazyload';

export default class Carousel {

  constructor(opts = {}) {
    this.$carousel = $('[data-carousel-slides]');
    this.$slides = $('[data-carousel-item]');

    this.options = $.extend({
      el: '[data-carousel-slides]',
      delay: '100',
      nav: '[data-carousel-pagination]',
    }, opts);

    this._init();
    this._bindEvents();
    this._bindArrowButtons();
  }

  _init() {
    this.flickity = new Flickity(this.$carousel[0], {
      cellAlign: 'left',
      autoPlay: this.options.delay,
      prevNextButtons: false,
      pageDots: false,
      adaptiveHeight: false,
      wrapAround: true,
      imagesLoaded: true,
      bgLazyLoad: true,
    });

    // Stop the player from firing a bunch in the background
    window.onblur = () => { this.flickity.deactivatePlayer(); };
    window.onfocus = () => { this.flickity.activatePlayer(); };
  }

  _bindEvents() {
    // Toggle aria-hidden on slides
    this.flickity.on('select', () => {
      this.$slides
        .eq(this.flickity.selectedIndex)
        .attr('aria-hidden', false)
        .siblings()
        .attr('aria-hidden', true);
    });
  }

  _bindArrowButtons() {
    // Slideshow arrows on either side of the product description area.
    $('[data-carousel-nav]').on('click', this.options.nav, (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      if ($target.data('carousel-pagination') === 'next') {
        this.flickity.next();
      } else {
        this.flickity.previous();
      }
    });
  }
}
