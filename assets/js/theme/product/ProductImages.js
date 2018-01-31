/**
 *  Sets up the product images
 *
 *  Can pass in an object set of options.
 *
 *  @param slidesWrapper      string
 *    Specify the container in which the main image slideshow sits.
 *
 */

import _ from 'lodash';
import Flickity from 'flickity';
import fitVids from 'fitvids';
import baguetteBox from 'baguettebox.js';
import imagesLoaded from 'imagesloaded';
import utils from '@bigcommerce/stencil-utils';
import getContentFromCSS from '../utils/getContentFromCSS';

export default class ImageSlides {

  constructor(opts = {}) {
    this.$window = $(window);
    this.$animateBase = $('html, body');

    this.options = $.extend({
      slidesWrapper: '.product-slides-wrap',
    }, opts);

    this.lightboxIsOn = false;
    this.imageSizes = this.options.context.themeSettings._images;

    // Apply fitvid / fullwidth to videos in slides.
    fitVids('.product-slide-video');

    this._bindEvents();
    this._revealImages();

    // Don't init if we're on tiny screen
    if (getContentFromCSS('.product-slides-wrap') !== 'disable-lightbox') {
      this._initImageLightbox();
    }

    // Use flickity for quickshop
    if ($('.quick-shop-image-column').length) {
      this.quickShopImages = new Flickity('[data-quickshop-images-primary]', {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        imagesLoaded: true,
      });

      if ($('[data-quickshop-images-secondary]').length) {

        this.$slidesPagination = $('[data-quickshop-images-secondary]');

        // Select thumb when slide changes
        this.quickShopImages.on('cellSelect', () => {
          const selectedSlideIndex = this.quickShopImages.selectedIndex;
          this.$slidesPagination.children('.qs-img-wrapper').removeClass('active');
          this.$slidesPagination.children('.qs-img-wrapper').eq(selectedSlideIndex).addClass('active');
        });

        // Activate the pagination controls
        $('.quick-shop-secondary-image .qs-img-wrapper').on('click', '.replaced-image', (e) => {
          e.preventDefault();

          // Select slide index based on thumbnail
          const $target = $(e.currentTarget);
          const $parent = $target.parent();
          const $index = $parent.prevAll().length;

          $parent.addClass('active').siblings().removeClass('active');
          this.quickShopImages.select($index);
        });
      }
    }
  }

  _bindEvents() {
    this.$window.on('resize', _.debounce(() => {
      if (this.lightboxIsOn && getContentFromCSS('.product-slides-wrap') === 'disable-lightbox') {
        this._destroyImageLightbox();
      } else if (!this.lightboxIsOn && getContentFromCSS('.product-slides-wrap') !== 'disable-lightbox') {
        this._initImageLightbox();
      }
    }, 10));
  }

  newImage(imgObj = {}) {
    const mobileOffset = this.$window.width() > 720 ? 0 : 50;
    // Show a specific image when a new product variants has been selected.
    const originalSrc = utils.tools.image.getSrc(imgObj.data);
    const largeImgSrc = utils.tools.image.getSrc(imgObj.data, this.imageSizes.large);
    const largeNewImage = $(`
      <a class="product-slide" href="${originalSrc}" target="_blank">
        <img src="${largeImgSrc}" alt="${imgObj.alt}">
      </a>`);

    if (! $(`img[src="${largeImgSrc}"]`).length) {
      if (this.lightboxIsOn) {
        this._destroyImageLightbox();
      }
      $(this.options.slidesWrapper).append(largeNewImage);
      this._revealImages(() => {
        this.$animateBase.animate({
          scrollTop: $('.product-slides-wrap .product-slide').last().offset().top - mobileOffset,
        });
      });
      this._initImageLightbox();
    } else {
      this._revealImages(() => {
        this.$animateBase.animate({
          scrollTop: $(`img[src="${largeImgSrc}"]`).offset().top - 40 - mobileOffset,
        });
      });
    }
  }

  // For options with no images scroll to the first image
  defaultImage(imgObj = {}) {
    const mobileOffset = this.$window.width() > 720 ? 0 : 50;
    const firstImage = $(this.options.slidesWrapper).find('img:first');
  }

  newQuickShopImage(imgObj = {}) {
    const largeImgSrc = utils.tools.image.getSrc(imgObj.data, this.imageSizes.productlist);
    const largeNewImage = $(`<img src="${largeImgSrc}" alt="${imgObj.alt}" data-product-image>`);

    if (! $(`img[src="${largeImgSrc}"]`).length) {
      this.quickShopImages.append(largeNewImage);
      imagesLoaded('.quick-shop-image-column', () => {
        this.quickShopImages.resize();
        this.quickShopImages.select(this.quickShopImages.cells.length - 1);
      });
    } else {
      const $images = $('[data-product-image]');
      const imageIndex = $images.index($(`img[src="${largeImgSrc}"]`));
      this.quickShopImages.select(imageIndex);
    }
  }

  // For options with no images scroll to the first image
  quickShopDefaultImage(imgObj = {}) {
    this.quickShopImages.select(0);
  }

  _initImageLightbox() {
    baguetteBox.run('[data-images-primary]');
    this.lightboxIsOn = true;
  }

  _destroyImageLightbox() {
    baguetteBox.destroy();
    this.lightboxIsOn = false;
  }

  _revealImages(callback = function(){}) {
    imagesLoaded(this.options.slidesWrapper, (instance) => {
      instance.elements.forEach((el) => {
        $(el).find('.product-slide').addClass('loaded');
      });

      callback();
    });
  }
}
