import $ from 'jquery';
import _ from 'lodash';
import PageManager from '../PageManager';
import ProductUtils from './product/ProductUtils';
import QuantityWidget from './components/QuantityWidget';
import ProductImages from './product/ProductImages';
import ColorSwatch from './product/ColorSwatch';
import Tabs from 'bc-tabs';
import ProductReviews from './product/Reviews';
import ShareLinks from './components/ShareLinks';
import {refreshCart} from './components/minCart';
import productViewTemplates from './product/productViewTemplates';
import {createContextLink} from './components/returnToLink';
import getContentFromCSS from './utils/getContentFromCSS';

export default class Product extends PageManager {
  constructor() {
    super();

    this.el = '[data-product-container]';
    this.$el = $(this.el);

    this._bindScroll();
  }

  loaded() {

    // Init additional product page components
    new ProductReviews(this.context);
    new ShareLinks();
    this.images = new ProductImages({context: this.context}); // Enable product images
    this.tabs = new Tabs(); // Set up the tabbed content.
    this.swatches = new ColorSwatch(); // Init our color swatches
    this.quantityControl = new QuantityWidget({scope: '[data-cart-item-add]'});

    this.ProductUtils = new ProductUtils(this.el, {
      priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
      priceWithTaxTemplate: productViewTemplates.priceWithTax,
      pricesBothTemplate: productViewTemplates.pricesBoth,
      priceSavedTemplate: productViewTemplates.priceSaved,
      callbacks: {
        didUpdate: () => { refreshCart(); },
        switchImage: _.bind(this.images.newImage, this.images),
        defaultImage:_.bind(this.images.defaultImage, this.images),
      },
    }).init(this.context);

    createContextLink('[data-return-to-link]', this.context.backToShopping);

    // Scroll down to the product reviews when tab parameter in url
    if (window.location.search.indexOf('tab=ProductReviews') > -1) {
      $('html, body').animate({
        scrollTop: $('.product-info-reviews').offset().top,
      }, 500);
    }

  }

  _bindScroll() {
    const $win = $(window);
    const $descriptionWrap = this.$el;
    const $description = $('.product-information');
    const descriptionOffset = $description.offset().top;
    const position = {
      stickyTop: {
        position: 'fixed',
        top: 0,
        bottom: 'auto',
      },
      stickyBottom: {
        position: 'fixed',
        top: 'auto',
        bottom: 0,
      },
      absoluteBottom: {
        position: 'absolute',
        top: 'auto',
        bottom: 0,
      },
      reset: {
        position: 'static',
        top: 'auto',
        bottom: 'auto',
      },
    };

    let descriptionState = true;
    let pauseScroll = false;

    $win.on('scroll', () => {
      const descriptionHeight = $description.outerHeight();

      // bail if images are shorter than description or we're in the single column layout
      if (($('.main-product-graphic').outerHeight() <= descriptionHeight) || getContentFromCSS('.product-information') !== 'enable-sticky') {
        $description.removeClass('sticky').css(position.reset);
        return;
      }

      const winHeight = $win.height();
      const scrollTop = $win.scrollTop();
      const scrollBottom = winHeight + scrollTop;
      // we've scrolled past the product description (going down)
      const isSticky = descriptionOffset < scrollTop;
      const isTallerThanWin = descriptionHeight > winHeight;
      // drop of the description at the bottom of the wrapper
      const absoluteThresholdBottom = scrollBottom > ($descriptionWrap.offset().top + $descriptionWrap.outerHeight());
      const absoluteThresholdTop = ($descriptionWrap.offset().top + $descriptionWrap.outerHeight()) < (scrollTop + descriptionHeight);

      const reposition = function(location) {
        if (descriptionState !== isTallerThanWin) {
          pauseScroll = true;
          $description
            .addClass('sticky')
            .removeAttr('style')
            .css({
              position: 'fixed',
              [location]: winHeight - descriptionHeight,
            })
            .animate({
              [location]: 0,
            }, () => {
              pauseScroll = false;
            });
          descriptionState = isTallerThanWin;
        }
      };

      if (isSticky) {
        if (isTallerThanWin) {
          // fixed bottom
          if (scrollBottom > (descriptionOffset + descriptionHeight)) {
            reposition('bottom');

            if (!pauseScroll) {
              $description.addClass('sticky').css(position.stickyBottom);
            }
          } else {
            // reset because we're scrolling back up and stuck to the bottom
            $description.removeClass('sticky').css(position.reset);
          }

          // absolute bottom
          if (absoluteThresholdBottom) {
            $description.removeClass('sticky').css(position.absoluteBottom);
          }
        } else {
          // fixed top
          reposition('top');

          if (!pauseScroll) {
            $description.addClass('sticky').css(position.stickyTop);
          }

          // absolute bottom
          if (absoluteThresholdTop) {
            $description.removeClass('sticky').css(position.absoluteBottom);
          }
        }
      } else {
        // reset description state in case we scrolled up and then back
        descriptionState = isTallerThanWin;

        // reset because we're back at the top of the page
        $description.removeClass('sticky').css(position.reset);
      }
    });

    // Force position in case we load part way down the page
    $(document).trigger('scroll');

    // Fix layout if window is resized
    $win.on('resize', _.debounce(() => {
      $(document).trigger('scroll');
    }, 10));
  }
}
