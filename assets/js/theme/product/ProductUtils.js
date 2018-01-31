import utils from '@bigcommerce/stencil-utils';
import Alert from '../components/Alert';

/**
 * PxU's handler for a couple product-related ajax features.
 * ---------------------------------------------------------
 *
 * lodash templating:
 * ------------------
 *   Updates to product pricing are handled by lodash's templating engine https://lodash.com/docs#template.
 *   Product pricing markup and logic in price.html should therefore be mirrored in productViewTemplates.js
 *
 * callbacks:
 * ----------
 *   willUpdate:   executed on product form submission.
 *                   passes a jQuery object of the product options form
 *
 *   didUpdate:    executed on product cart request response.
 *                   passes as arguments:
 *                   {boolean} isError  - whether or not the request was successful
 *                   {object}  response - response data from Bigcommerce
 *                   {jQuery}  $form    - the product options form jQuery element
 *
 *   switchImage:  executed on product variation change if and when the returned set of options has an image associated.
 *                   passes the url of the image. The code as it stands assumes a configured 'product' image size in config.json
 *
 */

export default class ProductUtils {
  constructor(el, options) {
    this.$el = $(el);
    this.options = options;
    this.productId = this.$el.find('[data-product-id]').val();

    // class to add or remove from cart-add button depending on variation availability
    this.buttonDisabledClass = 'button-disabled';

    // two alert locations based on action
    this.cartAddAlert = new Alert(this.$el.find('[data-product-cart-message]'));
    this.cartOptionAlert = new Alert(this.$el.find('[data-product-option-message]'));

    this.callbacks = $.extend({
      willUpdate: () => {},
      didUpdate: () => {},
      switchImage: (url) => {},
      defaultImage: (url) => {},
    }, options.callbacks);

    // Trigger initial attribute update
    if (this.$el.hasClass('product-info-wrapper')) {
      this._updateAttributes(window.BCData.product_attributes);
    }
  }

  /**
   * pass in the page context and bind events
   */
  init(context) {
    this.context = context;

    this._bindProductOptionChange();
    this._bindCartAdd();

    // Trigger initial attribute update on quickshop
    if (!this.$el.hasClass('product-info-wrapper')) {
      utils.hooks.emit('product-option-change');
    }
  }

  /**
   * Cache an object of jQuery elements for DOM updating
   * @param  jQuery $el - a wrapping element of the scoped product
   * @return {object} - buncha jQuery elements which may or may not exist on the page
   */
  _getViewModel($el) {
    return {
      $price: $('[data-price="without-tax"]', $el),
      $priceWithTax: $('[data-price="with-tax"]', $el),
      $saved: $('[data-price-saved]', $el),
      $sku: $('[data-product-sku]', $el),
      $weight: $('[data-product-weight]', $el),
      $addToCart: $('[data-button-purchase]', $el),
      stock: {
        $selector: $('[data-product-stock]', $el),
        $level: $('[data-product-stock-level]', $el),
      },
    };
  }

  /**
   * Bind product options changes.
   */
  _bindProductOptionChange() {
    utils.hooks.on('product-option-change', (event, changedOption) => {
      const $changedOption = $(changedOption);
      const $form = $changedOption.parents('form');

      // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
      if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
        return;
      }

      utils.api.productAttributes.optionChange(this.productId, $form.serialize(), (err, response) => {
        const viewModel = this._getViewModel(this.$el);
        const data = response ? response.data : {};

        // If our form data doesn't include the product-options-count with a positive value, return
        if (this.$el.find('[data-product-options-count]'). val < 1) {
          return;
        }

        this._updateAttributes(data);

        this.cartAddAlert.clear(true);

        // updating price
        if (data.price) {
          if (viewModel.$price.length) {
            const priceStrings = {
              price: data.price,
              excludingTax: this.context.productExcludingTax,
            };
            viewModel.$price.html(this.options.priceWithoutTaxTemplate(priceStrings));
          }

          if (viewModel.$priceWithTax.length) {
            const priceStrings = {
              price: data.price,
              includingTax: this.context.productIncludingTax,
            };
            viewModel.$priceWithTax.html(this.options.priceWithTaxTemplate(priceStrings));
          }

          if (viewModel.$saved.length) {
            const priceStrings = {
              price: data.price,
              savedString: this.context.productYouSave,
            };
            viewModel.$saved.html(this.options.priceSavedTemplate(priceStrings));
          }
        }

        // stock
        if (data.stock) {
          viewModel.stock.$selector.removeClass('hidden');
          viewModel.stock.$level.text(data.stock);
        } else {
          viewModel.stock.$level.text('0');
        }

        // update sku if exists
        if (viewModel.$sku.length) {
          viewModel.$sku.html(data.sku);
        }

        // update weight if exists
        if (data.weight && viewModel.$weight.length) {
          viewModel.$weight.html(data.weight.formatted);
        }

        // handle product variant image if exists
        if (data.image) {
          this.callbacks.switchImage(data.image);
        } else {
          this.callbacks.defaultImage();
        }

        this.cartOptionAlert.clear();

        // update submit button state
        if (!data.purchasable || !data.instock) {
          // Only display message if one was returned
          if (data.purchasing_message) this.cartOptionAlert.error(data.purchasing_message);
          viewModel.$addToCart
            .addClass(this.buttonDisabledClass)
            .prop('disabled', true);
        } else {
          viewModel.$addToCart
            .removeClass(this.buttonDisabledClass)
            .prop('disabled', false);
        }
      });
    });
  }

  _updateAttributes(data) {
    if (data === undefined) { return; }

    const behavior = data.out_of_stock_behavior;
    const inStockIds = data.in_stock_attributes;
    const outOfStockMessage = ` (${data.out_of_stock_message})`;

    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }

    $('[data-product-attribute-value]', this.$el).each((i, attribute) => {
      const $attribute = $(attribute);
      const attrId = parseInt($attribute.data('product-attribute-value'), 10);

      if (inStockIds.indexOf(attrId) !== -1) {
        this._enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        this._disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }

  _disableAttribute($attribute, behavior, outOfStockMessage) {
    if (this._getAttributeType($attribute) === 'set-select') {
      return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }

    if (behavior === 'hide_option') {
      $attribute.hide();
    } else {
      $attribute.addClass('option-unavailable');
    }
  }

  disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
    } else {
      $attribute.attr('disabled', 'disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }

  _enableAttribute($attribute, behavior, outOfStockMessage) {
    if (this._getAttributeType($attribute) === 'set-select') {
      return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('option-unavailable');
    }
  }

  enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.removeAttr('disabled');
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }

  _getAttributeType($attribute) {
    const $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('product-attribute') : null;
  }

  /**
   * Add a product to cart
   */
  _bindCartAdd() {
    utils.hooks.on('cart-item-add', (event, form) => {
      // Do not do AJAX if browser doesn't support FormData
      if (window.FormData === undefined) { return; }

      event.preventDefault();

      this.callbacks.willUpdate($(form));

      // Add item to cart
      utils.api.cart.itemAdd(new FormData(form), (err, response) => {
        let isError = false;

        if (err || response.data.error) {
          isError = true;
          response = err || response.data.error;
        }

        this._updateMessage(isError, response);
        this.callbacks.didUpdate(isError, response, $(form));
      });
    });
  }

  /**
   * Validate and update quantity input value
   */
  _updateQuantity(event) {
    const $target = $(event.currentTarget);
    const $quantity = $target.closest('[data-product-quantity]').find('[data-product-quantity-input]');
    const min = parseInt($quantity.prop('min'), 10);
    const max = parseInt($quantity.prop('max'), 10);
    let newQuantity = parseInt($quantity.val(), 10);

    this.cartAddAlert.clear();
    this.cartOptionAlert.clear();

    if ($target.is('[data-quantity-increment]') && (!max || newQuantity < max)) {
      newQuantity = newQuantity + 1;
    } else if ($target.is('[data-quantity-decrement]') && newQuantity > min) {
      newQuantity = newQuantity - 1;
    }

    $quantity.val(newQuantity);
  }

  /**
   * interpret and display cart-add response message
   */
  _updateMessage(isError, response) {
    let message = '';

    if (isError) {
      message = response;
    } else {
      message = this.context.addSuccess;
      message = message.replace('*product*', this.$el.find('[data-product-title]').data('product-title'));
    }

    this.cartAddAlert.message(message, (isError ? 'error' : 'success'));
  }
}
