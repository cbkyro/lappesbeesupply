// Handles the search box in the header

import $ from 'jquery';

const $body = $('body');
const $miniSearch = $('.nav-bar .mini-search');
const $miniSearchInput = $('input', $miniSearch);
const $miniSearchToggle = $('#mini-search-toggle');

// Close the search box when clicking anywhere
$body.on('click tap', () => {
  _closeBox();
});

// ensure the input is focused when search activated
$miniSearch.on('click tap', (event) => {
  event.stopPropagation();
  $miniSearchInput.focus();
});

// Close the search box by unchecking the toggle
function _closeBox() {
  // Closes the search box if it was left open
  if ($miniSearchToggle.is(':checked')) {
    $miniSearchToggle.attr('checked', false);
  }
}

// Close box when pressing 'esc' key.
$miniSearchInput.keyup((event) => {
  if (event.keyCode === 27) {
    _closeBox();
  }
});
