'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.case-jump a'));
  const cases = Array.from(document.querySelectorAll('.project-case'));
  if (!links.length || !cases.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('current', link.hash === `#${entry.target.id}`));
    });
  }, { threshold: 0.35, rootMargin: '-15% 0px -45% 0px' });

  cases.forEach((study) => observer.observe(study));
});
