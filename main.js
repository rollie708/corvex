const header = document.querySelector('#header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 18), { passive: true });
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileNav.classList.toggle('open', !open);
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  mobileNav.classList.remove('open');
}));

const sideNav = document.querySelector('#side-nav');
const viewTitle = document.querySelector('#view-title');
const welcomeTitle = document.querySelector('#welcome-title');
sideNav.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  sideNav.querySelectorAll('button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  viewTitle.textContent = button.dataset.view;
  welcomeTitle.textContent = button.dataset.view === 'Overview' ? 'Good morning, operator.' : `${button.dataset.view} preview.`;
}));

const asset = document.querySelector('#rule-asset');
const condition = document.querySelector('#rule-condition');
const value = document.querySelector('#rule-value');
const action = document.querySelector('#rule-action');
const preview = document.querySelector('#rule-preview');
const valueUnit = document.querySelector('#value-unit');
function updateRule() {
  const conditionLabel = condition.value;
  const assetLabel = asset.value;
  valueUnit.textContent = assetLabel === 'Wallet balance' || assetLabel === 'Portfolio allocation' ? '$' : '$';
  const amount = value.value.trim() || '…';
  preview.textContent = `When ${assetLabel} ${conditionLabel} $${amount} → ${action.value}.`;
}
[asset, condition, value, action].forEach(control => control.addEventListener('input', updateRule));
[asset, condition, action].forEach(control => control.addEventListener('change', updateRule));

document.querySelector('[data-jump="builder"]').addEventListener('click', () => {
  document.querySelector('#builder').scrollIntoView({ behavior: 'smooth', block: 'center' });
  value.focus({ preventScroll: true });
});
document.querySelector('#range-btn').addEventListener('click', event => {
  const button = event.currentTarget;
  button.textContent = button.textContent.startsWith('Last 30') ? 'Last 7 days⌄' : 'Last 30 days⌄';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.cap-card,.steps article,.principle-grid article,.roadmap-list article').forEach(item => observer.observe(item));
