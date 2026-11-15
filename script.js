(() => {
  'use strict';
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  const frames = document.querySelectorAll('iframe[data-src]');
  const activate = frame => {
    if (frame.dataset.activated) return;
    frame.dataset.activated = 'yes';
    const parent = frame.closest('.viz-frame');
    frame.addEventListener('load', () => parent?.classList.add('loaded'), {once:true});
    frame.src = frame.dataset.src;
  };
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {if (e.isIntersecting) {activate(e.target); obs.unobserve(e.target);}});
    }, {rootMargin:'700px 0px'});
    frames.forEach(f => obs.observe(f));
  } else frames.forEach(activate);
  const heater = document.querySelector('.spotlight-media img[data-fallback]');
  if (heater) heater.addEventListener('error', () => {
    if (!heater.dataset.retried) {
      heater.dataset.retried = 'yes';
      heater.src = heater.dataset.fallback;
    } else {
      heater.style.display = 'none';
      const notice = document.createElement('p');
      notice.textContent = 'The product image could not be loaded. Use the GitHub link below to view the source file.';
      heater.parentElement.insertBefore(notice, heater.nextSibling);
    }
  });
})();
