import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import truncate from '../utils/truncate';
import ProductUtils from '../product/ProductUtils';
import ProductImages from '../product/ProductImages';
import QuantityWidget from './QuantityWidget';
import loadingOptions from './loadingOptions';
import {refreshCart} from '../components/minCart';
import productViewTemplates from '../product/productViewTemplates';
import ColorSwatch from '../product/ColorSwatch';

import Modal from 'bc-modal';

export default class QuickShop {
  constructor(context) {
    this.context = context;
    this.product;
    this.id = null;
    this.spinner = $(loadingOptions.loadingMarkup);

    this.QuickShopModal = new Modal({
      el: $('<div id="quick-shop-modal">'),
      modalClass: 'quick-shop-modal',
      afterShow: ($modal) => {
        this._modalLoadingState($modal);
        this._fetchProduct($modal, this.id);
      },
    });

    this._bindEvents();
  }

  /**
   * Show spinner
   */
  _modalLoadingState($modal) {
    $modal
      .prepend(loadingOptions.loadingMarkup)
      .find('.loading-wrapper')
      .addClass('visible') // Necessary since loading is invisible by default
      .on('click', () => {
        // Loading is in the way of clicking the modal overlay
        this.QuickShopModal.close();
      });
  }

  /**
   * Launch quickshop modal on click and set up id variable
   */
  _bindEvents() {
    $('body').on('click', '[data-quick-shop]', (event) => {
      event.preventDefault();
      this.id = $(event.currentTarget).data('quick-shop');
      if (!this.id) { return; }

      this.QuickShopModal.open();
    });
  }

  /**
   * Run ajax fetch of product and add to modal. Bind product functionality and show the modal
   * @param {jQuery} $modal - the root (appended) modal element.
   * @param {integer} id - product id
   */
  _fetchProduct($modal, id) {
    utils.api.product.getById(id, { template: 'product/quick-shop-modal' }, (err, response) => {
      $modal.find('.modal-content').append(response);

      // Init FB like if necessary
      if ($modal.find('.facebook-like').length) {
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }

      truncate($('.product-summary'), $('.more-link'));

      // set up product utils (adding to cart, options)
      // TODO: JS isn't hooked up properly yet here

      $modal.imagesLoaded(() => {
        this.images = new ProductImages({context: this.context});
        new QuantityWidget({scope: $modal});

        this.product = new ProductUtils($modal.find('.product-block'), {
          priceWithoutTaxTemplate: productViewTemplates.priceWithoutTax,
          priceWithTaxTemplate: productViewTemplates.priceWithTax,
          pricesBothTemplate: productViewTemplates.pricesBoth,
          priceSavedTemplate: productViewTemplates.priceSaved,
          callbacks: {
            didUpdate: () => { refreshCart(); },
            switchImage: _.bind(this.images.newQuickShopImage, this.images),
            defaultImage: _.bind(this.images.quickShopDefaultImage, this.images),
          },
        }).init(this.context);

        this.swatches = new ColorSwatch(); // Init our color swatches

        // reposition modal with content
        this.QuickShopModal.position();
        $modal.addClass('loaded');
      });
    });
  }
}
