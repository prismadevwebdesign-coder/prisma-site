(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 768px) and (pointer: fine)').matches;
  const root = document.documentElement;

  /* ---- Menu mobile ---- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('menu');
  const outside = document.querySelectorAll('main, footer');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    root.style.overflow = open ? 'hidden' : '';
    outside.forEach(el => { el.inert = open; });
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  nav.querySelectorAll('a[href]').forEach(a => a.addEventListener('click', () => setMenu(false)));
  matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  /* ---- Fallback das capas ---- */
  document.querySelectorAll('.card__media img').forEach(img => {
    const fail = () => img.parentElement.classList.add('is-fallback');
    if (img.complete && !img.naturalWidth) fail();
    img.addEventListener('error', fail);
  });

  /* ---- Revelação ao rolar ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* ---- Etapas da seção 01 ---- */
  const section = document.querySelector('.scrolly');
  const device = section.querySelector('.device');
  const screens = section.querySelectorAll('.screen');
  const steps = section.querySelectorAll('.step');
  const setStep = i => {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    screens.forEach((s, k) => s.classList.toggle('is-active', k === i));
  };
  const stepIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) setStep(+e.target.dataset.step);
  }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => stepIO.observe(s));
  setStep(0);

  /* ---- Cabeçalho, progresso e dispositivo ---- */
  const header = document.querySelector('.header');
  const progress = document.querySelector('.progress');
  const hero = document.querySelector('.hero');
  let ticking = false;

  const onScroll = () => {
    const y = scrollY;
    const max = root.scrollHeight - innerHeight;
    header.classList.toggle('is-solid', y > hero.offsetHeight - 80);
    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    if (!reduce) {
      const r = section.getBoundingClientRect();
      const range = r.height - innerHeight;
      const p = range > 0 ? Math.min(Math.max(-r.top / range, 0), 1) : 0;
      const open = p < .15 ? p / .15 : p > .85 ? (1 - p) / .15 : 1;
      device.style.setProperty('--open', open.toFixed(3));
      device.style.setProperty('--turn', p.toFixed(3));
    }
    ticking = false;
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  onScroll();

  if (reduce || !desktop) return;

  /* ---- Parallax da abertura ---- */
  const planes = hero.querySelectorAll('.plane');
  let px = 0, py = 0, pending = false;
  hero.addEventListener('pointermove', e => {
    px = e.clientX / innerWidth - .5;
    py = e.clientY / innerHeight - .5;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      planes.forEach(p => { p.style.setProperty('--mx', px); p.style.setProperty('--my', py); });
      pending = false;
    });
  });

  /* ---- Inclinação 3D + reflexo nos cartões ---- */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - .5) * 6}deg`);
      card.style.setProperty('--rx', `${(.5 - y) * 6}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
    });
  });
})();
