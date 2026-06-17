(function () {
  function redirectCachedProductWall() {
    var isHome = window.location.pathname === '/' || window.location.pathname === '';
    var isAlreadyFixedView = window.location.search.indexOf('view=default') !== -1 || window.location.search.indexOf('view=') !== -1;
    if (isHome && !isAlreadyFixedView && document.querySelector('.checkout-home')) {
      window.location.replace('/?view=default');
      return true;
    }
    return false;
  }

  function routeToCatalog(event) {
    var trigger = event.target && event.target.closest && event.target.closest('.addCart');
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    window.location.href = '/collections/all';
  }

  function repairHomepage() {
    document.querySelectorAll('.addCart').forEach(function (button) {
      button.textContent = 'Shop this item';
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', 'Shop this item in the catalog');
    });

    document.querySelectorAll('a[href="#best-sellers"], a[href="#new-arrivals"]').forEach(function (link) {
      link.setAttribute('href', '/collections/all');
    });

    var cartButtons = document.querySelectorAll('[aria-label="Cart"]');
    cartButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '/cart';
      }, true);
    });
  }

  document.addEventListener('click', routeToCatalog, true);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!redirectCachedProductWall()) repairHomepage();
    });
  } else {
    if (!redirectCachedProductWall()) repairHomepage();
  }
})();
