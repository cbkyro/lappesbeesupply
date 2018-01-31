/**
 * REFRESH CONTENT
 *
 * Utility for the cart page that handles refreshing content when items
 * are updated, removed, etc.
 */

import utils from '@bigcommerce/stencil-utils';

export default function(didUpdate, remove) {
  const $cartFooter = $('[data-cart-footer]');
  const $cartContent = $('[data-cart-content]');
  const $cartItem = $('[data-cart-item]', $cartContent);
  const options = {
    template: {
      content: 'cart/content',
      footer: 'cart/footer',
    },
  };

  // Remove last item from cart? Reload
  if (remove && $cartItem.length === 1) {
    return window.location.reload();
  }

  utils.api.cart.getContent(options, (err, response) => {
    // TODO: Scope the call to this function by area that needs updating
    $cartContent.html(response.content);
    $cartFooter.html(response.footer);

    // TODO: If the loading overlay is scoped to an area that is replaced
    // it does not fade out, but is removed abrubtly (due to being a
    // part of that area's content).
    didUpdate();
  });
}
