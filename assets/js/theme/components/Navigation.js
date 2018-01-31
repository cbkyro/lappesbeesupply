import $ from 'jquery';
import _ from 'lodash';

export default class Navigation {
  constructor() {
    this.navToggle = $('[data-main-nav-toggle]');
    this.pageCover = $('.page-wrap');
    this.$menu = $('.main-menu');
    this.$navBreadcrumbs = $('.nav-multi-breadcrumbs');
    this.breadcrumbTemplate = _.template(
      '<span class="nav-multi-breadcrumb" data-toggle-multi="<%= menuTarget %>"><%= menuName %></span>'
    );
    this.$menus = (targetMenu) => {
      return $(`[data-multi-menu="${targetMenu}"]`);
    };
    this.navPanel = '.nav-multi-panel';
    this.classes = {
      active: 'is-active',
      left: 'is-left',
      right: 'is-right',
      forceState: 'force-state',
    };

    this._bindEvents();
    this._initMulti();
    this._bindMultiEvents();
  }

  _bindEvents() {

    // Expand menu when clicking the navigation button
    this.navToggle.on('click tap', (e) => {
      e.stopPropagation();
      $('body').toggleClass('nav-drawer-open');
    });

    // Close menu when clicking outside of it.
    this.pageCover.on('click tap', () => {
      $('body').removeClass('nav-drawer-open');
    });

    // Highlight the current nav-item link and expand sibling menus
    $('li a', this.$menu).each((index, el) => {
      const $item = $(el);
      const winLocation = window.location.pathname;

      // Parse item's URL
      const parser = document.createElement('a');
      parser.href = $item.attr('href');

      // Add trailing slash in case user-entered link is missing it
      let itemHref = parser.pathname;
      itemHref = (itemHref.slice(-1) === '/') ? itemHref : `${itemHref}/`;

      if (itemHref === winLocation && winLocation !== '/') {
        $item.addClass('active');
        $item.closest('.menu-dropdown').find('.dropdown').show();
      }

      // To make sure blog item doesn't collapse when blog post being viewed
      if (itemHref === '/blog/' && window.location.href.indexOf('/blog/') > -1) {
        $item.addClass('active');
        $item.closest('.menu-dropdown').find('.dropdown').show();
      }

    });

    // Stop items within drop menu from triggering toggle
    this.$menu.on('click', '.menu-dropdown a', (e) => {
      e.stopPropagation();
    });

  }

  _initMulti() {
    $('.nav-multi-item-parent').each((index, element) => {
      let $children = $(element).children('.nav-multi-panel');
      let counter = 1;

      while ($children.length) {
        $children.attr('data-panel-depth', counter).insertAfter($('.nav-multi-panel-parent'));
        $children = $children.children().children('.nav-multi-panel');
        counter += 1;
      }
    });
  }

  _bindMultiEvents() {
    $('.nav-multi-item.has-children').on('click', (event) => {
      event.preventDefault();
      this._traverseDown(event);
    });

    this.$navBreadcrumbs.on('click', '.nav-multi-breadcrumb', (event) => {
      this._traverseUp(event);
    });
  }

  _traverseDown(event) {
    const targetMenu = $(event.currentTarget).children().data('toggle-multi');

    // Move previous active to the left
    $(event.currentTarget)
      .closest(this.navPanel)
      .addClass(this.classes.left)
      .removeClass(this.classes.active);

    // Active new menu and move into place from right
    this.$menus(targetMenu)
      .removeClass(this.classes.right)
      .addClass(this.classes.active);

    // Append breadcrumbs
    this.$navBreadcrumbs
      .addClass(this.classes.active)
      .append(this.breadcrumbTemplate({
        menuTarget: targetMenu,
        menuName: $(event.currentTarget).children().data('multi-name'),
      }));
  }

  _traverseUp(event) {
    const targetMenu = $(event.currentTarget).data('toggle-multi');
    const targetIndex = this.$menus(targetMenu).data('panel-depth');

    // Move previous active to the right
    $(this.navPanel)
      .filter(`.${this.classes.active}`)
      .removeClass(this.classes.active)
      .addClass(this.classes.right);

    // Jump target menu's children back to the right
    $(this.navPanel)
      .filter(`.${this.classes.left}`)
      .each((index, element) => {
        if ($(element).data('panel-depth') > targetIndex) {
          $(element)
            .addClass(this.classes.forceState)
            .removeClass(this.classes.left)
            .addClass(this.classes.right);

          // Redraw to kill the transition
          $(element)[0].offsetHeight;
          $(element).removeClass(this.classes.forceState);
        }
      });

    // Position new active menu from the left
    this.$menus(targetMenu)
      .removeClass(this.classes.left)
      .addClass(this.classes.active);

    // Remove child breadcrumbs
    $(event.currentTarget).nextAll().remove();

    // De-activate the breadcrumbs if we're at the root level
    if ($('.nav-multi-breadcrumb').length === 1) {
      this.$navBreadcrumbs.removeClass(this.classes.active);
    }
  }
}
