// Выполняемые задачи: Утилиты
// Зависимости: constants.js

'use strict';

window.utils = (function () {
  var DEBOUNCE_INTERVAL = 500;

  return {
    // установка задержки
    setDebounce: function (callback) {
      var lastTimeout = null;

      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
      };
    },

    // показать элемент DOM
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },

    // скрыть элемент DOM
    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },

    // очистка DOM узла
    removeChildren: function (parent, children) {
      for (var i = 0; i < children.length; i++) {
        parent.removeChild(children[i]);
      }
    },

    // слайдер
    setSlider: function (pin, callback) {
      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var startCoordsX = evt.clientX;
        var startCoordsY = evt.clientY;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shiftX = startCoordsX - moveEvt.clientX;
          var shiftY = startCoordsY - moveEvt.clientY;

          startCoordsX = moveEvt.clientX;
          startCoordsY = moveEvt.clientY;
          callback((pin.offsetLeft - shiftX), (pin.offsetTop - shiftY));
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },

    // сообщение об ошибке закрузки
    onErrorMessage: function (code) {
      var POPUP = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var INNER = POPUP.querySelector('.error__button');
      var HEADER = POPUP.querySelector('.error__message');

      var hidePopup = function (element) {
        window.constants.MAIN_TAG.removeChild(element);
        document.removeEventListener('keydown', onEscPress);
      };

      var onEscPress = function (evt) {
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
          hidePopup(POPUP);
        }
      };

      INNER.addEventListener('click', function (evt) {
        evt.preventDefault();
        hidePopup(POPUP);
      });

      document.addEventListener('keydown', onEscPress);

      HEADER.textContent = HEADER.textContent + ': ' + code;
      window.constants.MAIN_TAG.appendChild(POPUP);
    },

  };

})();
