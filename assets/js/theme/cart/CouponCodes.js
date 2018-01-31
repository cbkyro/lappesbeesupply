/**
 * COUPON CODES
 *
 * Functionality on the cart page re: registering a coupon
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
 * Also requires markup with the following elements within the scope
 *    - [data-coupon-code-form] : The form that is submitted with coupon code entered
 *    - [data-coupon-errors] : Div to load alert flash messages into.
 *    - [data-coupon-code-input] : Input holding the actual coupon code value.
 */

import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';
import refreshContent from './refreshContent';

export default class CouponCodes {
  constructor(options) {
    this.options = $.extend({
      scope: '[data-cart-totals]',
      visibleClass: 'visible',
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log('Coupon Codes: update requested.'),
      didUpdate: () => console.log('Coupon Codes: update executed.'),
    }, options.callbacks);

    this.options.$scope = $(this.options.scope);

    // Instantiate error messages
    this.couponAlerts = new Alert($('[data-coupon-errors]'), this.options.scope);

    this.options.$scope.on('submit', '[data-coupon-code-form]', (event) => {
      event.preventDefault();
      this._addCode();
    });
  }

  _addCode() {
    const $input = $('[data-coupon-code-input]', this.options.$scope);
    const code = $input.val();

    this.couponAlerts.clear();
    this.callbacks.willUpdate();

    if (!code) {
      this.couponAlerts.error(this.options.context.couponCodeEmptyInput);
      return this.callbacks.didUpdate();
    }

    utils.api.cart.applyCode(code, (err, response) => {
      if (response.data.status === 'success') {
        refreshContent(this.callbacks.didUpdate);
      } else {
        this.couponAlerts.error(response.data.errors.join('\n'));
        this.callbacks.didUpdate();
      }
    });
  }
}
