import PageManager from '../PageManager';
import _ from 'lodash';
import evenHeights from './utils/evenHeights';
import imagesLoaded from 'imagesloaded';

export default class Compare extends PageManager {
  constructor() {
    super();
  }

  loaded() {
    $(window).on('resize', _.debounce(this._evenEachColumn, 300));
    $('.compare-page').imagesLoaded(this._evenEachColumn);
  }

  _evenEachColumn() {
    // Each set is triggered separately so we're not resizing other elements.
    evenHeights('.compare-details:nth-child(1)');
    evenHeights('.compare-details:nth-child(2)');
    evenHeights('.compare-details:nth-child(3)');
  }
}
