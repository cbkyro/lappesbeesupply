/**
 * MINICART Module
 *
 * Cart that displays in the header of the page.
 * Shows basic summary of items for purchase
 * Coded as an es6 module rather than typical class.
 *
 */

import utils from '@bigcommerce/stencil-utils';
import QuantityWidget from './QuantityWidget';
import Loading from 'bc-loading';
import _ from 'lodash';
import loadingOptions from './loadingOptions';

const LoadingIndicator = new Loading(loadingOptions, false, '.mini-cart-preview');

// Define the scope for these controls (useful defaults)
let scope = {
  events: '[data-mini-cart]',
  count: '[data-mini-cart-count]',
  content: '[data-mini-cart-content]',
};

// To be bound during init.
const $scope = {};

// Initialize - attach the cart functionality to the page
export function init(options = {}) {

  scope = $.extend(scope, options);

  $scope.events = $(scope.events);
  $scope.count = $(scope.count);
  $scope.content = $(scope.content);

  new QuantityWidget({scope: scope.events});

  _bindEvents();
}

// Take care of binding the events to the dom.
function _bindEvents() {

  $scope.events.on('click', '[data-mini-cart-link]', (event) => {
    event.preventDefault();
    $scope.content.revealer('toggle');
  });

  // Bind changing quantities
  $scope.events.on('change', '[data-quantity-control]', (event) => {
    updateQty(event);
  });

  // Bind removal links
  $scope.events.on('click', '[data-mini-cart-remove]', (event) => {
    itemRemove(event);
  });

  // Clicking outside of the element autocloses the preview
  $('body').on('click', ()=>{
    if($scope.content.revealer('isVisible')) {
      $scope.content.revealer('hide');
    }
  });
  $scope.events.on('click', (event) => {
    event.stopPropagation();
  });

}

// Update the quantity of an item after changing it's quantity
function _updateCartItemQty(event) {
  const $currentTarget = $(event.currentTarget);
  const itemID = $currentTarget.data('quantity-control');
  const $itemInput = $currentTarget.find('input');
  const itemQty = $itemInput.val();

  utils.api.cart.itemUpdate(itemID, itemQty, (err, response)=> {
    if (response.data.status === 'failed') {
      alert(response.data.errors[0]);
      $itemInput.val($itemInput.attr('value'));
    } else {
      refreshCart();
    }
  });
}
// Debounce so this isn't run for every quick little increment
const updateQty = _.debounce(_updateCartItemQty, 750);

// Remove a particular item from the cart.
function itemRemove(event) {
  event.preventDefault();
  const $currentTarget = $(event.currentTarget);
  const itemID = $currentTarget.data('mini-cart-remove');

  utils.api.cart.itemRemove(itemID, () => {
    refreshCart();
  });

}

// Refresh the mini cart template
export function refreshCart() {
  const options = {
    template: {
      content: 'cart/mini-cart-content',
      count: 'cart/mini-cart-count',
    },
  };

  LoadingIndicator.show();

  utils.api.cart.getContent(options, (err, response) => {
    $scope.content.html(response.content);
    $scope.count.html(response.count);
    LoadingIndicator.hide();
  });
}
