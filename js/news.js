(function() {
  'use strict';

  var newsSection = document.querySelector('.news');
  var tabsContainer = newsSection.querySelector('.news__tabs');
  var tabs = tabsContainer.querySelectorAll('.news__tab');
  var activeTab = tabsContainer.querySelector('.news__tab--active');
  var newsItemsContainer = newsSection.querySelector('.news__tab-content');
  var loader = newsSection.querySelector('.news__loader');
  var newsItems = null;
  var activeNews = 0;
  var dotsContainer = newsSection.querySelector('.news__dots');
  var dots = null;
  var btnMoreNews = newsSection.querySelector('.btn--news');

  var xhr = new XMLHttpRequest();
  var xhrInProgress = false;

  var TAB_NEWS = 'Новости';
  var TAB_PUBLICATIONS = 'Публикации';
  var MORE_NEWS = 'Еще новости';
  var MORE_PUBLICATIONS = 'Еще публикации';

  var NEWS_DATA = 'http://localhost:3000/data/news.json';
  var ITEM_NEWS = 'news';
  var ITEM_PUBLICATION = 'publication';

  var showLoader = function() {
    loader.classList.add('news__loader--show');
    xhrInProgress = true;
  };

  var hideLoader = function () {
    loader.classList.remove('news__loader--show')
    xhrInProgress = false;
  };

  var updateNewsItems = function() {
    newsItems = newsItemsContainer.querySelectorAll('.news__item');
    activeNews = [].indexOf.call(newsItems, newsItemsContainer.querySelector('.news__item--active'));
    if (activeNews < 0) {
      activeNews = 0;
    }
  };

  var clearNewsItems = function() {
    [].forEach.call(newsItems, function(item) {
      newsItemsContainer.removeChild(item);
    });
    clearDots();
    updateNewsItems();
  };

  var updateDots = function() {
    dots = dotsContainer.querySelectorAll('.news__dot');
  };

  var clearDots = function() {
    [].forEach.call(dots, function(dot) {
      dotsContainer.removeChild(dot);
    });
    updateDots();
  };

  var renderDots = function(n) {
    var dot = null;

    for (var i = 0; i < n; i++) {
      dot = document.createElement('span');
      dot.classList.add('news__dot');
      dotsContainer.appendChild(dot);
    }
    updateDots();
    activateNewsItem(activeNews);
  };

  var showButton = function() {
    btnMoreNews.classList.remove('btn--hidden');
  };

  var hideButton = function() {
    btnMoreNews.classList.add('btn--hidden');
  };

  var renameButton = function() {
    switch (activeTab.innerHTML) {
      case TAB_PUBLICATIONS:
        btnMoreNews.innerHTML = MORE_PUBLICATIONS;
        break;
      default:
        btnMoreNews.innerHTML = MORE_NEWS;
    }
  };

  var activateTab = function(n, cb) {
    activeTab.classList.remove('news__tab--active');
    activeTab = tabs[n];
    activeTab.classList.add('news__tab--active');
    if (typeof cb === 'function') {
     cb();
    }
  };

  var activateNewsItem = function(n) {
    if (newsItems[n] !== activeNews) {
      newsItems[activeNews].classList.remove('news__item--active');
      dots[activeNews].classList.remove('news__dot--active');
      activeNews = n;
      newsItems[activeNews].classList.add('news__item--active');
      dots[activeNews].classList.add('news__dot--active');
    }
  };

  var sendRequest = function() {
    if (!xhrInProgress) {
      showLoader();
      xhr.open('GET', NEWS_DATA);
      xhr.send();
    }
  };

  var isItemNews = function(itemData) {
    return (itemData.type === ITEM_NEWS);
  };

  var isItemPublication = function(itemData) {
    return (itemData.type === ITEM_PUBLICATION);
  };

  var filterItems = function(items) {
    return items.filter(function(item) {
      switch (activeTab.innerHTML) {
        case TAB_PUBLICATIONS:
          return isItemPublication(item);
        default:
          return isItemNews(item);
      }
    });
  };

  var getElement = function(itemData) {
    var element = document.createElement('article');
    var title = document.createElement('h3');
    var link = document.createElement('a');
    var text = document.createElement('p');
    var date = document.createElement('span');

    element.classList.add('news__item');
    title.classList.add('news__title');
    link.innerHTML = itemData.title;
    link.setAttribute('href', itemData.link);
    text.classList.add('news__text');
    text.innerHTML = itemData.text;
    date.classList.add('news__date');
    date.innerHTML = itemData.date;

    element.appendChild(title);
    title.appendChild(link);
    element.appendChild(text);
    element.appendChild(date);

    return element;
  };

  var renderItems = function(items) {
    var COUNT = 3;
    var outputItems = filterItems(items);

    if ((outputItems.length > 0) && (outputItems.length - newsItems.length > 0)) {

      if (outputItems.length - newsItems.length > COUNT) {
        outputItems = outputItems.slice(newsItems.length, newsItems.length + COUNT);
      } else {
        outputItems = outputItems.slice(newsItems.length);
        hideButton();
      }

      outputItems.forEach(function(item) {
        newsItemsContainer.appendChild(getElement(item));
      });
      updateNewsItems();
      renderDots(outputItems.length);
    }
  };

  var onActivateTab = function() {
    clearNewsItems();
    showButton();
    renameButton();
    sendRequest();
  };

  var onErrorLoadData = function(evt) {
    console.log('не удалось загрузить news.json');
    hideLoader();
  };

  var onLoadData = function(evt) {
    if (evt.target.status >= 400) {
      onErrorLoadData(evt);
    } else if (evt.target.status >= 200) {
      renderItems(JSON.parse(evt.target.response));
      hideLoader();
    }
  };

  var onClickTab = function(evt) {
    var target = evt.target;

    while (target !== tabsContainer) {
      if (target.classList.contains('news__tab') && (target !== activeTab)) {
        activateTab([].indexOf.call(tabs, target), onActivateTab);
        break;
      }
      target = target.parentNode;
    }
  };

  var onClickDot = function(evt) {
    var target = evt.target;

    while (target !== dotsContainer) {
      if (target.classList.contains('news__dot')) {
        activateNewsItem([].indexOf.call(dots, target));
        break;
      }
      target = target.parentNode;
    }
  };

  var onClickMoreNews = function(evt) {
    evt.preventDefault();
    sendRequest();
  };

  updateNewsItems();
  renderDots(newsItems.length);
  tabsContainer.addEventListener('click', onClickTab);
  dotsContainer.addEventListener('click', onClickDot);
  btnMoreNews.addEventListener('click', onClickMoreNews);
  xhr.addEventListener('error', onErrorLoadData);
  xhr.addEventListener('timeout', onErrorLoadData);
  xhr.addEventListener('load', onLoadData);
})();
