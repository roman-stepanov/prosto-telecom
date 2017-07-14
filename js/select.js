(function() {
  'use strict';

  var selectCity = document.querySelector('.select--city');
  var selectType = document.querySelector('.select--type');
  var selectSubject = document.querySelector('.select--subject');

  var activeSelect = null;
  var selectedValue = null;
  var activeDropBlock = null;
  var inputValue = null;

  var showDropBlock = function() {
    activeSelect.classList.add('select--dropdown');
    activeDropBlock.style.display = 'block';
    activeDropBlock.addEventListener('click', onClickOption);
    selectedValue.classList.remove('select__value--active');
  };

  var hideDropBlock = function() {
    activeSelect.classList.remove('select--dropdown');
    activeDropBlock.style.display = 'none';
    activeDropBlock.removeEventListener('click', onClickOption);
    if (inputValue.value) {
      selectedValue.classList.add('select__value--active');
    }
  };

  var onClickOption = function(evt) {
    var target = evt.target;

    while (target !== activeDropBlock) {
      if (target.classList.contains('select__option')) {
        selectedValue.innerHTML = target.innerHTML;
        inputValue.value = target.getAttribute('data-value');
        break;
      }
     target = target.parentNode;
    }
  };

  var onClickSelect = function(evt) {
    var target = evt.target;

    while (!target.classList.contains('select')) {
      target = target.parentNode;
    }

    if (activeSelect && activeSelect !== target) {
      hideDropBlock();
    }

    activeSelect = target;
    selectedValue = activeSelect.querySelector('.select__value');
    activeDropBlock = activeSelect.querySelector('.select__dropdown');
    inputValue = activeSelect.querySelector('input[type="hidden"]');

    if (activeSelect.classList.contains('select--dropdown')) {
      hideDropBlock();
    } else {
      showDropBlock();
    }
  }

  selectCity.addEventListener('click', onClickSelect);
  selectType.addEventListener('click', onClickSelect);
  selectSubject.addEventListener('click', onClickSelect);
})();
