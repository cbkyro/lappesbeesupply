import $ from 'jquery';
import _ from 'lodash';
import ProductCompare from 'bc-compare';

const compare = new ProductCompare({
  maxItems: 10,
  itemTemplate: _.template(`
    <li class="compare-item" data-compare-item>
      <div class="compare-item-wrap">
        <a class="compare-item-remove" data-compare-item-remove="<%= id %>"></a>
        <a class="compare-item-link" href="<%= url %>">
          <div class="compare-item-thumb" style="background-image: url(<%= thumbnail %>)"></div>
        </a>
      </div>
    </li>
  `),
});

export function initCompare() {
  compare.on('updated', () => {
    if (compare.compareList.size > 0) {
      $('[data-compare-widget]').revealer('show');
    } else {
      $('[data-compare-widget]').revealer('hide');
    }
  }, true);

  $('[data-compare-remove-all]').on('click', (event) => {
    event.preventDefault();
    compare.removeAll();
  });
}

export function updateCompare() {
  compare.updateCheckboxes();
}
