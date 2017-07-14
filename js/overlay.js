window.overlay = (function() {
  'use strict';

  var overlay = document.querySelector('.overlay');

  var showOverlay = function() {
    overlay.classList.add('overlay--show');
  };

  var hideOverlay = function() {
    overlay.classList.remove('overlay--show');
  }

  return {
    show: showOverlay,
    hide: hideOverlay
  };
})();
