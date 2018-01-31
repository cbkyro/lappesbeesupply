/**
 * Shipping Calculator - In a Modal
 *
 * Pops open a modal for entering "postage + packaging" details
 * and then updates the cart once a quote has been selected.
 *
 * @arg scope   Selector
 *      The selector for the dom element to bind functionality to
 *      (don't bind to content changing via ajax, use a wrapper)
 *
 * @arg modalId Selector (ID)
 *      An #ID to use for the modal selector to which modal functionality
 *      (to handle the form getting quotes) is bound.
 *
 * Also requires markup with the following elements
 *    - [data-shipping-calculator-toggle] : Toggles modal open
 *    - #shipping-modal : Hidden div on page holding base modal markup
 * Within the modal itself:
 *    - [data-shipping-errors] : Div to load alert flash messages into.
 *    - [data-shipping-calculator] form : The form submitted to calculate shipping
 *    - select[name="shipping-country"] : Select that triggers updating state selection
 *    - [data-shipping-quotes] : Empty div to load shipping quotes form into
 *    - [data-modal-close] : Triggers the modal to close
 */

import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import Loading from 'bc-loading';
import refreshContent from './refreshContent';
import Modal from 'bc-modal';
import loadingOptions from '../components/loadingOptions';

export default class ShippingCalcModal {
  constructor(options = {}) {

    this.options = $.extend({
      $scope: $('[data-cart-footer]'),
      modalId: '#shipping-modal-displayed',
    }, options);

    // Callbacks not necessary with current implementation.
    this.callbacks = $.extend({
      // willUpdate: () => console.log('Modal Update requested.'),

      // Close the modal when update completed
      didUpdate: () => {
        this.shippingLoading.hide();
        this.ShippingModal.close();
      },
    }, options.callbacks);

    // Set up the modal in which to display the shipping calculator.
    this.ShippingModal = new Modal({
      el: $('#shipping-modal'),
      modalId: this.options.modalId,
      afterShow: this._bindEvents.bind(this),
    });

    // When clicking one of the shipping calc toggles, launch the modal
    this.options.$scope.on('click','[data-shipping-calculator-toggle]', () => {
      this.ShippingModal.open();
    });
  }

  // Bindings for within the modal
  _bindEvents($modal) {

    // Bind class to the modal content
    this.$shippingModalContent = $modal;

    this.shippingAlerts = new Alert($('[data-shipping-errors]'), '[data-shipping-calculator]');
    this.shippingLoading = new Loading(loadingOptions, false, '[data-shipping-calculator]');

    // When changing country, update the available province / states
    this.$shippingModalContent.on('change', 'select[name="shipping-country"]', (event) => {
      this._updateStates(event);
    });

    // Bind the cart actions to the updated modal display.
    // Calculate shipping on form submit.
    this.$shippingModalContent.on('submit', '[data-shipping-calculator] form', (event) => {
      event.preventDefault();
      this._calculateShipping();
    });

    // Bind the "cancel" button
    this.$shippingModalContent.on('click', '[data-modal-close]', (event) => {
      event.preventDefault();
      this.ShippingModal.close();
    });

    this.$shippingQuotes = $('[data-shipping-quotes]', this.$shippingModalContent);
    // Reset the displayed quote (if there was one from a previous attempt)
    this.$shippingQuotes.empty();
  }

  // Update the province / states displayed based on country.
  _updateStates(event) {
    const $target = $(event.currentTarget);
    const country = $target.val();
    const $stateElement = $('[name="shipping-state"]');

    utils.api.country.getByName(country, (err, response) => {
      if (response.data.states.length) {
        const stateArray = [];
        stateArray.push(`<option value="">${response.data.prefix}</option>`);
        $.each(response.data.states, (i, state) => {
          stateArray.push(`<option value="${state.id}">${state.name}</option>`);
        });
        $stateElement.replaceWith(`<select class="form-select" id="shipping-state" name="shipping-state" data-field-type="State">${stateArray.join(' ')}</select>`);
      } else {
        $stateElement.replaceWith('<input type="text" id="shipping-state" name="shipping-state" data-field-type="State">');
      }
    });
  }

  // Calculates the shipping method
  _calculateShipping() {

    const params = {
      country_id: $('[name="shipping-country"]', this.$shippingModalContent).val(),
      state_id: $('[name="shipping-state"]', this.$shippingModalContent).val(),
      zip_code: $('[name="shipping-zip"]', this.$shippingModalContent).val(),
    };

    utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
      if (response.data.quotes) {
        this.shippingAlerts.clear();
        this.$shippingQuotes.html(response.content);
      } else {
        this.shippingAlerts.error(response.data.errors.join('\n'));
      }
      this.ShippingModal.position();
      // bind the select button
      this.$shippingQuotes.find('.button[type="submit"]').on('click', (event) => {
        event.preventDefault();
        this.shippingLoading.show();
        const quoteId = $('[data-shipping-quote]:checked').val();

        utils.api.cart.submitShippingQuote(quoteId, (response) => {
          refreshContent(this.callbacks.didUpdate);
        });
      });
    });
  }
}
