/* Progressive enhancement only. Every zoom target is a plain <a href="image.png">,
   so without this file clicking still opens the full-size image. */
(function () {
  'use strict';
  var links = document.querySelectorAll('a.shot-zoom');
  if (!links.length) return;

  var box = null, lastFocus = null, lockedScrollY = 0;
  // Measured before shipping: CSS overflow:hidden on <html>/<body> does NOT
  // reliably block window.scrollBy in every engine (verified here - it did not).
  // Pinning body out of flow with position:fixed does, because there is then
  // nothing left for the document to scroll.
  var savedBodyStyle = {};

  function lockScroll() {
    var body = document.body, s = body.style;
    savedBodyStyle = { position: s.position, top: s.top, left: s.left, right: s.right, width: s.width, overflow: s.overflow, paddingRight: s.paddingRight };
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    lockedScrollY = window.scrollY;
    s.position = 'fixed';
    s.top = (-lockedScrollY) + 'px';
    s.left = '0';
    s.right = '0';
    s.width = '100%';
    s.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      var current = parseFloat(getComputedStyle(body).paddingRight) || 0;
      s.paddingRight = (current + scrollbarWidth) + 'px';
    }
  }

  function unlockScroll() {
    var s = document.body.style;
    s.position = savedBodyStyle.position;
    s.top = savedBodyStyle.top;
    s.left = savedBodyStyle.left;
    s.right = savedBodyStyle.right;
    s.width = savedBodyStyle.width;
    s.overflow = savedBodyStyle.overflow;
    s.paddingRight = savedBodyStyle.paddingRight || '';
    window.scrollTo(0, lockedScrollY);
  }

  function close() {
    if (!box) return; // guards a double-close (e.g. Escape fired twice) from double-restoring
    box.parentNode.removeChild(box);
    box = null;
    document.removeEventListener('keydown', onKey);
    unlockScroll();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    // the dialog holds one focusable control, so keep Tab on it
    if (e.key === 'Tab' && box) {
      e.preventDefault();
      var b = box.querySelector('.lightbox-close');
      if (b) b.focus();
    }
  }

  function open(href, alt) {
    lastFocus = document.activeElement;
    lockScroll();

    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', alt || 'Enlarged image');

    var img = document.createElement('img');
    img.src = href;
    img.alt = alt || '';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lightbox-close';
    btn.textContent = 'Close';
    btn.addEventListener('click', close);

    box.appendChild(img);
    box.appendChild(btn);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.body.appendChild(box);
    btn.focus();
    document.addEventListener('keydown', onKey);
  }

  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var im = a.querySelector('img');
      open(a.getAttribute('href'), im ? im.getAttribute('alt') : '');
    });
  });
})();
