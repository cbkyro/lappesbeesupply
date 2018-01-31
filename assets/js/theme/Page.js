import PageManager from '../PageManager';
import fitVids from 'fitVids';
import {setContext} from './components/returnToLink';

export default class Page extends PageManager {
  constructor() {
    super();

    // Bind our context so users can return to this page from child pages
    setContext(document.querySelector('.page-title').textContent);
  }
  loaded() {
    fitVids('.user-content');
  }
}
