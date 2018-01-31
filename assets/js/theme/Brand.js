import PageManager from '../PageManager';
import ProductList from './product/productList';

export default class Brand extends PageManager {
  constructor() {
    super();
  }
  loaded() {
    new ProductList(this.context, {
      showMore: 'product-lists/brand-show-more',
    });
  }
}
