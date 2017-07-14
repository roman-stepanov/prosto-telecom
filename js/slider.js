(function() {
  'use strict';

  var slider = document.querySelector('.slider');
  var dotsContainer = slider.querySelector('.slider__dots');
  var dots = null;
  var slides = slider.querySelectorAll('.slider__slide');
  var activeSlide = [].indexOf.call(slides, slider.querySelector('.slider__slide--active'));

  var btnPrev = slider.querySelector('.slider__btn--prev');
  var btnNext = slider.querySelector('.slider__btn--next');

  var LEFT = 'left';
  var RIGHT = 'right';

  var renderDots = function() {
    var dot = null;

    for (var i = 0; i < slides.length; i++) {
      dot = document.createElement('span');
      dot.classList.add('slider__dot');
      dotsContainer.appendChild(dot);
    }
    dots = dotsContainer.querySelectorAll('.slider__dot');
    dots[activeSlide].classList.add('slider__dot--active');
  };

  var activateSlide = function() {
    slides[activeSlide].classList.add('slider__slide--active');
    dots[activeSlide].classList.add('slider__dot--active');
  };

  var deactivateSlide = function() {
    slides[activeSlide].classList.remove('slider__slide--active');
    dots[activeSlide].classList.remove('slider__dot--active');
  };

  var nextSlide = function(direction) {
    deactivateSlide();
    switch (direction) {
      case LEFT:
        if (--activeSlide < 0) {
          activeSlide = slides.length - 1;
        }
        break;
      default:
        if (++activeSlide > slides.length - 1) {
          activeSlide = 0;
        }
    }
    activateSlide();
  };

  var onClickDot = function(evt) {
    var target = evt.target;

    while (target !== dotsContainer) {
      if (target.classList.contains('slider__dot')) {
        deactivateSlide();
        activeSlide = [].indexOf.call(dots, target);
        activateSlide();
        break;
      }
      target = target.parentNode;
    }
  };

  var onClickPrev = function() {
    nextSlide(LEFT);
  };

  var onClickNext = function() {
    nextSlide(RIGHT);
  };

  renderDots();
  dotsContainer.addEventListener('click', onClickDot);
  btnPrev.addEventListener('click', onClickPrev);
  btnNext.addEventListener('click', onClickNext);
})();
