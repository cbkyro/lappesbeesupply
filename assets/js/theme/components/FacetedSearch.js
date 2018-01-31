import { hooks, api } from '@bigcommerce/stencil-utils';
import Url from 'url';

export default class FacetedSearch {
  constructor(options, callback) {
    this.callback = callback;
    this.$body = $(document.body);
    this.$panel = $('.sidebar-block');

    this.options = $.extend({
      config: {
        category: {
          shop_by_price: true
        }
      },
      template: 'product-lists/index',
      facetToggle: '[data-facet-toggle]',
      moreToggle: '[data-facet-more]',
      toggleFacet: () => console.log('Facet toggled.'),
    }, options);

    this.callbacks = $.extend({
      willUpdate: () => console.log("will update"),
      didUpdate: () => console.log("did update"),
    }, options.callbacks);

    this._bindEvents();
  }

  _bindEvents() {
    this.$body.on('click', this.options.facetToggle, (event) => {
      this._toggleFacet(event);
    });

    this.$body.on('click', this.options.moreToggle, (event) => {
      this._showAdditionalFilters(event);
    });

    $(window).on('statechange', this._onStateChange.bind(this));
    hooks.on('facetedSearch-facet-clicked', this._onFacetClick.bind(this));
    hooks.on('facetedSearch-range-submitted', this._onRangeSubmit.bind(this));
    hooks.on('sortBy-submitted', this._onSortBySubmit.bind(this));
  }

  _showAdditionalFilters(event) {
    event.preventDefault();
    this.$panel.addClass('loading');

    const $showMoreLink = $(event.currentTarget);
    const $originalList = $($showMoreLink.siblings('.facet-option'));
    const facet = $showMoreLink.data('facet-more');
    const facetUrl = History.getState().url;

    // Show/Hide extra facets based on settings for product filtering
    if ($showMoreLink.siblings('.faceted-search-option-columns').length == 0) {
      if (this.options.showMore) {
        api.getPage(facetUrl, {
          template: this.options.showMore,
          params: {
            list_all: facet,
          },
        }, (err, response) => {
          if (err) {
            throw new Error(err);
          }
          $(response).insertAfter($originalList);
          $showMoreLink.siblings('.faceted-search-option-columns').toggle();
          this.$panel.removeClass('loading');
        });
      }
    } else {
      $showMoreLink.siblings('.faceted-search-option-columns').toggle();
      this.$panel.removeClass('loading');
    }

    // show/hide original facet list
    $originalList.toggle();

    // Toggle show more/less link
    $showMoreLink.children().toggle();

    return false;
  }

  _toggleFacet(event) {
    this.options.toggleFacet(event);
  }

  _onFacetClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const url = $target.attr('href');

    this._goToUrl(url);
  }

  _onRangeSubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href);
    let queryParams = $(event.currentTarget).serialize();

    if (this.$body.hasClass('template-search')) {
      const currentSearch = `search_query=${$('[data-faceted-search]').data('search-query')}` || '';
      queryParams = `${queryParams}&${currentSearch}`;
    }

    this._goToUrl(Url.format({
      pathname: url.pathname,
      search: `?${queryParams}`,
    }));
  }

  _onSortBySubmit(event) {
    event.preventDefault();

    const url = Url.parse(location.href, true);
    const queryParams = $(event.currentTarget).serialize().split('=');

    url.query[queryParams[0]] = queryParams[1];
    delete url.query['page'];

    this._goToUrl(Url.format({ pathname: url.pathname, query: url.query }));
  }

  _onStateChange(event) {
    // Fetches the page content via Ajax and updates markup in page.
    this.callbacks.willUpdate();

    api.getPage(History.getState().url, this.options, (err, content) => {
      if (err) {
        this.callbacks.didUpdate();
        throw new Error(err);
      }

      if (content) {
        $('[data-facet-content]').html(content);
        this.callbacks.didUpdate();
      }
    });
  }

  _goToUrl(url) {
    History.pushState({}, document.title, url);
  }
}
