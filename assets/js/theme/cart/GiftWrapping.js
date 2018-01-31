/**
 * GIFTWRAPPING
 *
 * Functionality on the cart page re: displaying a giftwrap modal and submission
 *
 * TODO: Update this documentation / heading
 *
 * @arg options   Object
 *    Object containing configuration for Coupon Codes.
 *
 * @arg options.scope   selector string
 *    Dom element containing the coupon code form.
 *    Should be a wrapper component that won't change with ajax (for binding)
 *
 * @arg options.context   object (required)
 *    Theme object containing translation strings.
 */

import utils from '@bigcommerce/stencil-utils';
import Modal from 'bc-modal';
import refreshContent from './refreshContent';
import Loading from 'bc-loading';
import loadingOptions from '../components/loadingOptions';

export default class GiftWrapping {
  constructor(options = {}) {

    this.options = $.extend({
      scope: '[data-cart-content]',
      trigger: '[data-item-giftwrap]',
      remove: '[data-giftwrap-remove]',
    }, options);

    this.$cartContent = $(this.options.scope);
    this.context = options.context;

    this._initialize();
  }

  _initialize() {
    this.itemId; // later assigned the id of the current product

    this.GiftWrapModal = new Modal({
      modalClass: 'giftwrap-modal',
      afterShow: ($modal) => {
        this._getForm($modal);
      },
    });

    this._bindPageEvents();
  }

  // Bind functionality to giftwrap links.
  _bindPageEvents() {
    this.$cartContent.on('click', this.options.trigger, (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      this.itemId = $target.data('item-giftwrap');

      this.GiftWrapModal.open();
    });
    this.$cartContent.on('click', this.options.remove, (event) => {
      if(!confirm(this.context.removeGiftWrap)) {event.preventDefault();}
    });

  }

  // Run once the modal has been opened..
  _getForm($modal) {
    const options = { template: 'cart/giftwrap-form' };

    $modal
      .prepend(loadingOptions.loadingMarkup)
      .find('.loading-wrapper')
      .addClass('visible') // Necessary since loading is invisible by default
      .on('click', () => {
        // Loading is in the way of clicking the modal overlay
        this.GiftWrapModal.close();
      });

    utils.api.cart.getItemGiftWrappingOptions(this.itemId, options, (err, response) => {
      if (response) {
        $modal.find('.modal-content').append(response.content);
        this._bindModalEvents($modal);

        // reposition modal with content
        this.GiftWrapModal.position();

        // Class added to display the modal once content is available
        $modal.addClass('loaded');

      } else {
        this.GiftWrapModal.close();
      }
    });
  }

  _bindModalEvents($modal) {
    $modal.on('change', () => {
      this.GiftWrapModal.position();
    });

    // Select giftwrapping individually or together
    $modal.find('[data-giftwrap-type]').on('change', (event) => {
      this._toggleSingleMultiple($modal, event.currentTarget.value);
    });

    // Select the type of gift wrapping for a particular item
    $('[data-giftwrap-select]').change((event) => {
      const $select = $(event.target);
      const index = $select.data('index');
      const id = $select.val();

      if (!id) { return; }
      const allowMessage = $select.find(`option[value=${id}]`).data('allow-message');

      $(`[data-giftwrap-image-${index}]`).addClass('hidden');
      $(`[data-giftwrap-image-${index}="${id}"]`).removeClass('hidden');

      if (allowMessage) {
        $(`[data-giftwrap-message-${index}]`).removeClass('hidden');
      } else {
        $(`[data-giftwrap-message-${index}]`).addClass('hidden');
      }
    });

    $('[data-giftwrap-select]').trigger('change');

    // Set up a loading indicator to use on top of giftwrap message when submitted
    this.shippingLoading = new Loading(loadingOptions, false, '.giftwrap-modal');

    // On submission, send giftwrap option back to server via ajax
    // and close the modal / refresh the cart.
    $modal.on('submit', '[data-giftwrap-form]', (event) => {
      event.preventDefault();
      this.shippingLoading.show();

      const formdata = $('[data-giftwrap-form]').serialize();

      $.post('/cart.php', formdata, () => {
        refreshContent(() => {
          this.GiftWrapModal.close();
        });
      });
    });
  }

  // Toggles displaying single / multiple wrap options
  _toggleSingleMultiple($modal, value) {
    const $singleForm = $modal.find('[data-giftwrap-single]');
    const $multiForm  = $modal.find('[data-giftwrap-multiple]');

    if (value === 'different') {
      $singleForm.addClass('hidden');
      $multiForm.removeClass('hidden');
    }  else {
      $singleForm.removeClass('hidden');
      $multiForm.addClass('hidden');
    }
  }
}
