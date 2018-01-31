import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';

export default class QuickShop {
  constructor() {
    this.$quickSearch = $('[data-quick-search]');
    this.spinner = $('[data-quick-search] .spinner').prop('outerHTML');

    this._bindEvents();
  }

  _bindEvents() {
    $('.mini-search input').on({
      keyup: _.debounce((event) => {
        const searchQuery = $(event.currentTarget).val();

        // Only perform search with at least 3 characters
        if (searchQuery.length < 3) {
          this.$quickSearch.revealer('hide');

          return;
        } else {
          this.$quickSearch.revealer('show').html(this.spinner);
        }

        this._doSearch(searchQuery);
      }, 100),
      blur: _.debounce(() => {
        this.$quickSearch.revealer('hide');
      }, 100),
    });
  }

  _doSearch(searchQuery) {
    utils.api.search.search(searchQuery, { template: 'quick-results' }, (err, response) => {
      if (err) {
        return false;
      }

      this.$quickSearch.html(response);
    });
  }
}
