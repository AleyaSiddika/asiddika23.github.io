'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.getElementById('scrollProgress');
  const glow = document.getElementById('pointerLight');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  function updateProgress() {
    if (!progress) return;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const percent = available > 0 ? window.scrollY / available * 100 : 0;
    progress.style.width = `${Math.min(100, percent)}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (!reduceMotion && glow) {
    window.addEventListener('pointermove', (event) => {
      glow.style.setProperty('--x', `${event.clientX}px`);
      glow.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
  }

  if (!reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach((panel) => {
      panel.addEventListener('pointermove', (event) => {
        const box = panel.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        panel.style.transform = `perspective(1200px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg)`;
      });
      panel.addEventListener('pointerleave', () => {
        panel.style.transform = '';
      });
    });

    document.querySelectorAll('[data-motion-card]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        card.style.setProperty('--card-rx', `${-y * 2.4}deg`);
        card.style.setProperty('--card-ry', `${x * 3.2}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--card-rx', '0deg');
        card.style.setProperty('--card-ry', '0deg');
      });
    });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((node) => reveal.observe(node));

  const navItems = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  function highlightNav() {
    let active = sections[0] ? sections[0].id : '';
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.43) active = section.id;
    });
    navItems.forEach((item) => item.classList.toggle('active', item.hash === `#${active}`));
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
});
