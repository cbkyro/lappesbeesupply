import $ from 'jquery';

export default class ShareLinks {
  constructor() {
    this._bindEvents();
  }

  _bindEvents() {
    $(document.body).on('click', '[data-share]', (event) => {
      event.preventDefault();
      const $target = $(event.currentTarget);
      const shareUrl = $target.attr('href');
      this._openPopup(shareUrl);
    });

    $(document.body).on('click', '[data-share-print]', (event) => {
      event.preventDefault();
      window.print();
    });
  }

  _openPopup(url){
    const width = 500;
    const height = 300;

    const leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    const topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    const windowFeatures = `status=no,height=${height},width=${width},resizable=yes,left=${leftPosition},top=${topPosition},screenX=${leftPosition},screenY=${topPosition},toolbar=no,menubar=no,scrollbars=no,location=no,directories=no`;

    window.open(url, 'Sharing Article', windowFeatures);
  }
}
