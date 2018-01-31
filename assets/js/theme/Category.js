import PageManager from '../PageManager';
import ProductList from './product/ProductList';

export default class Category extends PageManager {
  constructor() {
    super();
  }
  loaded() {
    new ProductList(this.context, {
      showMore: 'product-lists/category-show-more',
    });
  }
}
