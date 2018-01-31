import PageManager from '../PageManager';
import $ from 'jquery';
import _ from 'lodash';

export default class Brands extends PageManager {
  constructor() {
    super();
    this._groupBrands();
  }

  _groupBrands() {
    const brandsTemplate = _.template(`
      <dl class="brands-group">
        <dt class="brand-group-title"><%= brandLetter %></dt>
        <% _.forEach(brands, (brand) => { %>
          <dd class="brand-group-item"><a href="<%- brand.href %>"><%- brand.name %></a></dd>
        <% }); %>
      </dl>
    `);
    const brandGroups = {};

    // Build on object with letters as keys
    $('.brands-list-item').each((index, el) => {
      const firstChar = $(el).text().charAt(0);
      const brand = {
        name: $(el).text(),
        href: $(el).attr('href'),
      };

      brandGroups[firstChar] = brandGroups[firstChar] || [];
      brandGroups[firstChar].push(brand);
    });

    // Print out the list using the template
    for (const letter in brandGroups) {
      $('.brands-index').append(brandsTemplate({
        'brandLetter': letter,
        'brands': brandGroups[letter],
      }));
    }

    $('.brands-list').remove();
  }
}
