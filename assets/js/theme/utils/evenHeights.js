import $ from 'jquery';

export default function evenHeights(selector) {
  const $items = $(selector);
  $items.height('auto');
  let tallest = 0;

  $items.each(function() {
    const $this = $(this);
    if ($this.outerHeight() > tallest) { tallest = $this.outerHeight(); }
  });

  $items.height(tallest);
}
