import PageManager from '../PageManager';
import ProductList from './product/productList';
import {bindSearchTab, changeTabOnUrlParameter} from './components/searchTabs';

export default class Search extends PageManager {
  constructor() {
    super();
  }
  loaded() {
    new ProductList(this.context, {
      showMore: 'product-lists/search-show-more',
    });

    // Handle Search Tabs
    bindSearchTab();
    changeTabOnUrlParameter('section=content', 'other');
  }
}
