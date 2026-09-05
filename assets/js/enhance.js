/* Progressive enhancement only. Every zoom target is a plain <a href="image.png">,
   so without this file clicking still opens the full-size image. */
(function () {
  'use strict';
  var links = document.querySelectorAll('a.shot-zoom');
  if (!links.length) return;

  var box = null, lastFocus = null;

  function close() {
    if (!box) return;
    box.parentNode.removeChild(box);
    box = null;
    document.removeEventListener('keydown', onKey);
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
