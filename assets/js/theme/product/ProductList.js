/**
 * ProductLists
 * Used on category / brand / search for initializing faceted search (etc)
 */

import FacetedSearch from '../components/FacetedSearch';
import {initCompare, updateCompare} from '../components/initCompare';
import ShareLinks from '../components/ShareLinks';
import {setContext} from '../components/returnToLink';
import Loading from 'bc-loading';
import {changeTabOnUrlParameter} from '../components/searchTabs';

export default class ProductList {
  constructor(context, templates={}) {
    this.filterPanel = '.product-list-sidebar';
    this.resultLimit = context.themeSettings.number_of_product_lists;
    this.showMoreTemplate = templates.showMore;

    if ($('[data-faceted-search]').length) {
      this._initializeFacetedSearch();
    }
    new ShareLinks();

    if ($('[data-product-compare]').length) {
      initCompare();
    }

    // Bind our context so users can return to this page from child pages
    setContext(document.querySelector('.page-title').textContent);

    this._bindEvents();
  }

  _bindEvents() {
    $(document).on('click', '.filter-panel-toggle', (event) => {
      $(event.currentTarget).toggleClass('is-active');
      $(this.filterPanel).revealer('toggle');
    });

    $(document).on('keyup', (event) => {
      if (event.keyCode === 27 && $(this.filterPanel).revealer('isVisible')) {
        $('.filter-panel-toggle').removeClass('is-active');
        $(this.filterPanel).revealer('hide');
      }
    });
  }

  _initializeFacetedSearch() {
    // Set up the "Loading" instance and markup for when facets are toggled.
    const loadingOptions = {
      loadingMarkup: '<div class="loading-wrapper"><div class="loading"><div class="spinner la-ball-clip-rotate"><div></div></div></div></div>',
      visibleClass: 'visible',
      scrollLockClass: 'scroll-locked',
    };
    const productListOverlay = new Loading(loadingOptions, true, 'body');

    const facetedSearchOptions = {
      config: {
        category: {products: {limit: this.resultLimit}},
        brand: {products: {limit: this.resultLimit}},
        product_results: {limit: this.resultLimit},
      },
      showMore: this.showMoreTemplate,
      toggleFacet: (event) => this._toggleFacet(event),
      callbacks: {
        willUpdate: () => {
          productListOverlay.show();
          $(this.filterPanel).revealer('hide');
        },
        didUpdate: () => {
          productListOverlay.hide();
          changeTabOnUrlParameter('section=content', 'other');

          if ($('[data-product-compare]').length) {
            updateCompare();
          }

          // Re-init lazy images from Global.js
          $(window).trigger('lazy-images-refresh');

          // Jump back up to top of list after update
          $('html, body').animate({
            scrollTop: $('.product-list-utils').offset().top,
          }, 500);
        },
      },
    };

    new FacetedSearch(facetedSearchOptions);
  }

  _toggleFacet(event) {
    // Handles opening / closing the facet blocks in the sidebar.

    const $target = $(event.currentTarget);
    const $wrapper = $target
      .parents('[data-facet-filter]')
      .children('[data-facet-filter-wrapper]');

    if ($wrapper.hasClass('hidden')) {
      $target.find('span').html('&ndash;');
    } else {
      $target.find('span').html('&#43;');
    }

    $wrapper.toggleClass('hidden');
  }
}
