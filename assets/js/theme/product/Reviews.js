import $ from 'jquery';
import Modal from 'bc-modal';
import FormValidator from '../utils/FormValidator';

export default class ProductReviews {
  constructor(context) {
    this.context = context;

    this.hiddenReviews = $('.review-item.hidden');
    this.Validator = new FormValidator(this.context);

    this.reviewModal = new Modal({
      el: $('#modal-review-form'),
      modalClass: 'modal-leave-review',
      afterShow: () => {
        const $form = $('#form-leave-a-review');
        this.Validator.initSingle($form);
      },
    });

    this._bindEvents();
  }

  _bindEvents() {
    $('.review-link').click((event) => {
      event.preventDefault();
      this.reviewModal.open();
    });

    $('[data-more-reviews]').click((event) => {
      event.preventDefault();
      this.hiddenReviews.removeClass('hidden');
      $(event.currentTarget).remove();
    });
  }
}
