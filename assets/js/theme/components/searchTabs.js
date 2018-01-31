/**
 * Search Tabs Helper
 * Bind simple tab like functionality to the search page
 * One tab displays the normal search results, the other page/content results
 */
import $ from 'jquery';

export function bindSearchTab(tabToggle = '[data-search-tab-toggle]') {

  $('body').on('click tap', tabToggle, (event) => {
    const $target = $(event.currentTarget);
    const target = $target.data('search-tab-toggle');

    $target.addClass('active').siblings().removeClass('active');
    $(`[data-search-tab]`).addClass('hidden');
    $(`[data-search-tab="${target}"]`).removeClass('hidden');
  });

}

// Handle page loading with the section selected (part of search query)
export function changeTabOnUrlParameter(urlParameter, tabToActivate) {

  if (window.location.search.toString().indexOf(urlParameter) > -1) {
    $('[data-search-tab-toggle]').removeClass('active');
    $(`[data-search-tab]`).addClass('hidden');

    $(`[data-search-tab-toggle="${tabToActivate}"]`).addClass('active');
    $(`[data-search-tab="${tabToActivate}"]`).removeClass('hidden');
  }

}
