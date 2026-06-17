const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !siteNav?.classList.contains('open')) return;
  siteNav.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
});

document.addEventListener('click', (event) => {
  if (!siteNav?.classList.contains('open')) return;
  if (siteNav.contains(event.target) || navToggle?.contains(event.target)) return;
  siteNav.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.setProperty('--delay', `${el.dataset.delay || 0}ms`);
    el.classList.add('visible');
    observer.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const steps = 36;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        el.textContent = `${Math.floor(current)}${suffix}`;
      }
    }, 28);
    counterObserver.unobserve(el);
  });
}, { threshold: .7 });

counters.forEach((el) => counterObserver.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

const copyEmailButton = document.querySelector('.copy-email');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  const originalText = copyEmailButton.textContent;

  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = 'Đã sao chép email';
    copyEmailButton.classList.add('copied');
  } catch (error) {
    copyEmailButton.textContent = email;
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = originalText;
    copyEmailButton.classList.remove('copied');
  }, 1800);
});
