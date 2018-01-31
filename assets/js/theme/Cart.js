import $ from 'jquery';
import PageManager from '../PageManager';
import CartUtils from './cart/CartUtils';
import ShippingCalcModal from './cart/ShippingCalcModal';
import CouponCodes from './cart/CouponCodes';
import GiftCertificates from './cart/GiftCertificates';
import GiftWrapping from './cart/GiftWrapping';
import QuantityWidget from './components/QuantityWidget';
import Loading from 'bc-loading';
import loadingOptions from './components/loadingOptions';
import {refreshCart} from './components/minCart';

export default class Cart extends PageManager {
  constructor() {
    super();

    if (window.ApplePaySession && $('.dev-environment').length) {
      $(document.body).addClass('apple-pay-supported');
    }
  }

  loaded(next) {
    const context = this.context;
    this.quantityControl = new QuantityWidget({scope: '[data-cart-content]'});

    new GiftWrapping({scope: '[data-cart-content]', context});
    const cartContentOverlay = new Loading(loadingOptions, false, '[data-cart-content]');
    const cartFooterOverlay = new Loading(loadingOptions, false, '[data-cart-footer]');

    this.ShippingCalculator = new ShippingCalcModal();

    this.CouponCodes = new CouponCodes({
      context,
      scope: '[data-cart-footer]',
      callbacks: {
        willUpdate: ()=> {cartFooterOverlay.show();},
        didUpdate: ()=> {cartFooterOverlay.hide();},
      },
    });

    this.GiftCertificates = new GiftCertificates({
      context,
      scope: '[data-cart-footer]',
      callbacks: {
        willUpdate: ()=> {cartFooterOverlay.show();},
        didUpdate: ()=> {cartFooterOverlay.hide();},
      },
    });

    this.CartUtils = new CartUtils({
      callbacks: {
        willUpdate: () => {
          cartContentOverlay.show();
          cartFooterOverlay.show();
        },
        didUpdate: () => {
          cartContentOverlay.hide();
          cartFooterOverlay.hide();
          refreshCart();
        },
      },
    });

    // Keep Shopping Link - Just sends back to previous page.
    $('[data-keep-shopping]').click((e) => {
      e.preventDefault();
      window.history.back();
    });

    next();
  }
}
