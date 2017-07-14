window.mobileMenu = (function() {
  'use strict';

  var MAX_MOBILE_WIDTH = 779;

  var nav = document.querySelector('.main-nav');
  var navToggle = nav.querySelector('.main-nav__toggle');
  var menuItems = nav.querySelector('.menu__items');

  var isMenuOpen = function() {
    return nav.classList.contains('main-nav--opened');
  };

  var isMobileScreen = function() {
    return (window.innerWidth <= MAX_MOBILE_WIDTH);
  }

  var showMenu = function() {
    window.overlay.show();
    nav.classList.remove('main-nav--closed');
    nav.classList.add('main-nav--opened');
    menuItems.addEventListener('click', dropdownItemHandler);
    document.addEventListener('keydown', pressESCHandler);
    window.addEventListener('resize', resizeWindowHandler);
  };

  var closeMenu = function() {
    nav.classList.remove('main-nav--opened');
    nav.classList.add('main-nav--closed');
    window.overlay.hide();
    menuItems.removeEventListener('click', dropdownItemHandler);
    document.removeEventListener('keydown', pressESCHandler);
    window.removeEventListener('resize', resizeWindowHandler);
  };

  var onClickToggle = function() {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      showMenu();
    }
  };

  var pressESCHandler = function(evt) {
    if (window.evtPressKey.isPressESC(evt) && isMenuOpen()) {
      closeMenu();
    }
  };

  var resizeWindowHandler = function() {
    if (!isMobileScreen() && isMenuOpen()) {
      closeMenu();
    }
  };

  var dropdownItem = function(item) {
    if (item.classList.contains('menu__item-link--dropdown')) {
      item.classList.remove('menu__item-link--dropdown');
    } else {
      item.classList.add('menu__item-link--dropdown');
    }
  };

  var dropdownItemHandler = function(evt) {
    var target = evt.target;

    if (isMobileScreen()) {
      while (target !== menuItems) {
        if (target.classList.contains('menu__item-link')) {
          evt.preventDefault();
          dropdownItem(target);
          break;
        }
       target = target.parentNode;
      }
    }
  };

  navToggle.addEventListener('click', onClickToggle);

  return {
    isOpen: isMenuOpen,
    show: showMenu,
    close: closeMenu,
  }
})();
