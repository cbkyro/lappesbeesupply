import PageManager from '../PageManager';
import ShareLinks from './components/ShareLinks';
import fitVids from 'fitVids';

export default class BlogPost extends PageManager {
  constructor() {
    super();
    new ShareLinks();
  }

  loaded() {
    fitVids('.blog-content');
  }
}
