'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Canvas — light-theme particles ─────────────────────────────────────────
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas ? canvas.getContext('2d') : null;
  let W, H, dpr, pts;
  let mouseX = -9999, mouseY = -9999;

  function resizeCanvas() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W   = window.innerWidth;
    H   = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const N = Math.min(85, Math.round((W * H) / 20000));
    pts = Array.from({ length: N }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.13,
      vy: (Math.random() - 0.5) * 0.13,
      r:  Math.random() * 1.0 + 0.5
    }));
  }
  if (!reduceMotion) {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  const MAX_DIST = 130;

  function renderCanvas() {
    if (!ctx) { requestAnimationFrame(renderCanvas); return; }
    ctx.clearRect(0, 0, W, H);

    // Soft ambient blobs (very subtle on white)
    const t = Date.now() / 10000;
    const paintBlob = (cx, cy, r, color) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };
    paintBlob(
      W * (0.12 + Math.sin(t)       * 0.04), H * (0.16 + Math.cos(t * 0.8) * 0.04),
      W * 0.32, 'rgba(70,72,212,0.04)'
    );
    paintBlob(
      W * (0.88 + Math.cos(t * 0.7) * 0.04), H * (0.78 + Math.sin(t * 0.6) * 0.04),
      W * 0.26, 'rgba(0,101,145,0.03)'
    );
    paintBlob(
      W * (0.5 + Math.sin(t * 1.2) * 0.03), H * (0.48 + Math.cos(t * 0.9) * 0.03),
      W * 0.2, 'rgba(70,72,212,0.02)'
    );

    // Dot grid (isometric-style) — very faint
    ctx.fillStyle = 'rgba(70,72,212,0.06)';
    const gs = 34;
    for (let x = gs; x < W; x += gs) {
      for (let y = gs; y < H; y += gs) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Update particles
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
      const dx = mouseX - p.x, dy = mouseY - p.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 20000) { const f = (1 - d2/20000)*0.011; p.vx += dx*f*0.004; p.vy += dy*f*0.004; }
      p.vx *= 0.987; p.vy *= 0.987;
      if (Math.abs(p.vx) < 0.04) p.vx += (Math.random()-0.5)*0.008;
      if (Math.abs(p.vy) < 0.04) p.vy += (Math.random()-0.5)*0.008;
    }

    // Connection lines
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < MAX_DIST) {
          ctx.strokeStyle = `rgba(70,72,212,${(1-d/MAX_DIST)*0.1})`;
          ctx.lineWidth   = 0.6;
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    }

    // Dots
    for (const p of pts) {
      const d    = Math.hypot(mouseX - p.x, mouseY - p.y);
      const glow = d < 150 ? (1 - d/150) : 0;
      ctx.fillStyle = `rgba(70,72,212,${0.2 + glow*0.45})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r + glow*0.7, 0, Math.PI*2); ctx.fill();
    }

    requestAnimationFrame(renderCanvas);
  }
  if (!reduceMotion) renderCanvas();

  // ─── Cursor spotlight (CSS variable approach) ────────────────────────────────
  if (!reduceMotion) {
    window.addEventListener('pointermove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      root.style.setProperty('--mx', e.clientX + 'px');
      root.style.setProperty('--my', e.clientY + 'px');
    });
  }

  // ─── Scroll progress ─────────────────────────────────────────────────────────
  const scrollBar = document.getElementById('scrollBar');
  function updateProgress() {
    const max = document.body.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ─── Scroll reveal ────────────────────────────────────────────────────────────
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('card-reveal')) {
        const siblings = Array.from(el.parentElement.querySelectorAll('.card-reveal'));
        const idx = siblings.indexOf(el);
        setTimeout(() => el.classList.add('in'), idx * 85);
      } else {
        el.classList.add('in');
      }
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .card-reveal, .tl-reveal').forEach(el => io.observe(el));

  // ─── 3D portrait tilt ─────────────────────────────────────────────────────────
  const stage = document.getElementById('portraitStage');
  let ptx = 0, pty = 0, tptx = 0, tpty = 0;

  if (!reduceMotion) {
    window.addEventListener('pointermove', e => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tptx = nx * 16;
      tpty = -ny * 12;
    });
  }

  (function animPortrait() {
    if (reduceMotion) return;
    ptx += (tptx - ptx) * 0.07;
    pty += (tpty - pty) * 0.07;
    if (stage) stage.style.transform = `perspective(1500px) rotateX(${pty}deg) rotateY(${ptx}deg)`;
    requestAnimationFrame(animPortrait);
  })();

  // ─── Scroll parallax on chips ─────────────────────────────────────────────────
  const chips = document.querySelectorAll('.float-chip');
  if (!reduceMotion) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (stage && sy < window.innerHeight * 1.6) stage.style.translate = `0 ${sy * 0.05}px`;
      chips.forEach((c, i) => { c.style.translate = `0 ${sy * (0.03 + i * 0.02)}px`; });
    }, { passive: true });
  }

  // ─── Card 3D hover tilt ───────────────────────────────────────────────────────
  if (!reduceMotion) document.querySelectorAll('.proj-card, .tl-card, .skill-card, .tools-card').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r  = el.getBoundingClientRect();
      const px = (e.clientX - r.left)  / r.width  - 0.5;
      const py = (e.clientY - r.top)   / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py*3.5}deg) rotateY(${px*4.5}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  // ─── Magnetic buttons ─────────────────────────────────────────────────────────
  if (!reduceMotion) document.querySelectorAll('.btn, .btn-white, .btn-glass').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / r.width;
      const dy = (e.clientY - (r.top  + r.height / 2)) / r.height;
      btn.style.transform = `translate(${dx*7}px, ${dy*7 - 2}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  // ─── Mobile nav ───────────────────────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  function closeMobileNav() {
    if (!navMobile || !navToggle) return;
    navMobile.classList.remove('open');
    navMobile.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navToggle.querySelectorAll('span').forEach((s, i) => {
      s.style.transform = ''; s.style.opacity = '';
    });
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const open = navMobile.classList.toggle('open');
      navMobile.setAttribute('aria-hidden', String(!open));
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      const [s0, s1, s2] = navToggle.querySelectorAll('span');
      if (open) {
        s0.style.transform = 'rotate(45deg) translate(5px,5px)';
        s1.style.opacity   = '0';
        s2.style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else { closeMobileNav(); }
    });
    navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileNav();
    });
    document.addEventListener('click', e => {
      if (!navMobile.contains(e.target) && !navToggle.contains(e.target)) closeMobileNav();
    });
  }

  // ─── Active nav link ──────────────────────────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function updateNav() {
    let active = sections[0]?.id || '';
    sections.forEach(s => { if (s.getBoundingClientRect().top < window.innerHeight * 0.44) active = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ─── Portrait image appearance: glass-frame-reference already has glass frame —
  // Make background transparent so the built-in glass layers show behind the photo
  const portraitImg = document.querySelector('.portrait-img');
  if (portraitImg) {
    portraitImg.addEventListener('load', () => {
      // The glass-frame-reference.png has white margins; set background to surface
      portraitImg.closest('.gl-front').style.background = '#f4f6ff';
    });
    if (portraitImg.complete) {
      const front = portraitImg.closest('.gl-front');
      if (front) front.style.background = '#f4f6ff';
    }
  }

});
