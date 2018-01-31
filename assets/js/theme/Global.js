import Blazy from 'blazy';
import PageManager from '../PageManager';
import FormValidator from './utils/FormValidator';
import modernizr from './utils/modernizr';
import CurrencySelector from './components/CurrencySelector';
import Navigation from './components/Navigation';
import {init as minCartInit} from './components/minCart';
import QuickShop from './components/QuickShop';
import QuickSearch from './components/QuickSearch';
import miniSearch from './components/searchBox';
import './core/selectOption';

export default class Global extends PageManager {
  constructor() {
    super();

    new CurrencySelector('[data-currency-selector]');
    new Navigation();
    new QuickSearch();

    this.blazy = new Blazy({
      selector: '.lazy-image',
      successClass: 'lazy-loaded',
    });

    $(window).on('lazy-images-refresh', () => {
      this.blazy.revalidate();
    });
  }

  loaded(next) {
    // global form validation
    this.validator = new FormValidator(this.context);
    this.validator.initGlobal();

    minCartInit({events: 'header [data-mini-cart]'});

    // QuickShop
    if ($('[data-quick-shop]').length) {
      new QuickShop(this.context);
    }

  }
}
