// Navigation stays visible when JavaScript is unavailable.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileScreen = window.matchMedia('(max-width: 650px)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.add('is-collapsed');
}

function updateMenu() {
  // Move focus before hiding a navigation link during a resize.
  if (mobileScreen.matches && navigation.contains(document.activeElement)) {
    menuButton.hidden = false;
    menuButton.focus();
  }
  if (!mobileScreen.matches && document.activeElement === menuButton) {
    navigation.classList.remove('is-collapsed');
    navigation.querySelector('a').focus();
  }
  menuButton.hidden = !mobileScreen.matches;
  if (mobileScreen.matches) {
    closeMenu();
  } else {
    navigation.classList.remove('is-collapsed');
    menuButton.setAttribute('aria-expanded', 'false');
  }
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-collapsed', isOpen);
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobileScreen.matches) return;
  closeMenu();
  // Put keyboard focus at the destination, outside the collapsed menu.
  const section = document.querySelector(link.getAttribute('href'));
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileScreen.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

mobileScreen.addEventListener('change', updateMenu);
updateMenu();
document.querySelector('#year').textContent = new Date().getFullYear();

// Animate each section once as it enters view. Nothing is hidden beforehand.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!reducedMotion.matches) entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.about-grid, .skill-card, .project-card, .timeline-item').forEach((element) => {
    revealObserver.observe(element);
  });
}
