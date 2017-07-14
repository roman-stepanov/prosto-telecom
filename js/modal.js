(function() {
  'use strict';

  var btnLogin = document.querySelector('.user__btn--login');
  var btnCallMe = document.querySelector('.user__btn--call-me');

  var modalLogin = document.querySelector('.modal--login');
  var modalCallMe = document.querySelector('.modal--call-me');

  var activeModal = null;

  var showModal = function(modal) {
    if (window.mobileMenu.isOpen()) {
      window.mobileMenu.close();
    }
    window.overlay.show();
    modal.classList.add('modal--show');
    modal.querySelector('.modal__btn-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', pressESCHandler);
    activeModal = modal;
  };

  var closeModal = function() {
    activeModal.classList.remove('modal--show');
    window.overlay.hide();
    activeModal.querySelector('.modal__btn-close').removeEventListener('click', closeModal);
    document.removeEventListener('keydown', pressESCHandler);
    activeModal = null;
  };


  var showLogin = function(evt) {
    evt.preventDefault();
    showModal(modalLogin);
  };

  var showCallMe = function(evt) {
    evt.preventDefault();
    showModal(modalCallMe);
  };

  var pressESCHandler = function (evt) {
    if (window.evtPressKey.isPressESC(evt)) {
      closeModal();
    }
  };


  btnLogin.addEventListener('click', showLogin);
  btnCallMe.addEventListener('click', showCallMe);
})();
