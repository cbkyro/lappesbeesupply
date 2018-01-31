/**
 * GIFT CARDS / CERTIFICATES
 *
 * Functionality on the cart page re: submitting a gift certificate
 *
 * @arg options   Object
 *    Object containing configuration for Coupon Codes.
 *
 * @arg options.scope   selector string
 *    Dom element containing the coupon code form.
 *    Should be a wrapper component that won't change with ajax (for binding)
 *
 * @arg options.context   Object (required)
 *    Theme object containing translation strings.
 *
 * Also requires markup with the following elements within the scope.
 *    - [data-coupon-code-form] : The form that is submitted with coupon code entered
 *    - [data-gift-certificate-errors] : Div to load alert flash messages into.
 *    - [data-coupon-code-input] : Input holding the actual coupon code value.
 */

import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class GiftCertificates {
  constructor(options) {
    this.options = $.extend({
      scope: '[data-cart-footer]',
      visibleClass: 'visible',
    }, options);

    this.options.$scope = $(this.options.scope);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Gift Certificates: update requested.'),
      didUpdate: () => console.log('Gift Certificates: update executed.'),
    }, options.callbacks);

    this.certificateAlerts = new Alert($('[data-gift-certificate-errors]'), this.options.scope);

    this.options.$scope.on('submit', '[data-gift-certificate-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  _addCode() {

    const $input = $('[data-gift-certificate-input]', this.options.$scope);
    const code = $input.val();

    if (! this._isValidCode(code)) {
      this.certificateAlerts.error(this.options.context.giftCertificateInputEmpty);
      return this.callbacks.didUpdate();
    }

    // Trigger the loading indicator
    this.callbacks.willUpdate();

    // Apply the gift certificate.
    utils.api.cart.applyGiftCertificate(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.certificateAlerts.error(response.data.errors.join('\n'));
        this.callbacks.didUpdate();
      }
    });
  }

  _isValidCode(code) {
    if (typeof code !== 'string') {
      return false;
    }

    return /^[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/.exec(code);
  }
}
