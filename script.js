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
const homeMotionButton = document.querySelector('.home-motion-toggle');
if (homeMotionButton) {
  const syncMotionControl = () => { homeMotionButton.hidden = reducedMotion.matches; };
  syncMotionControl();
  reducedMotion.addEventListener('change', syncMotionControl);
  homeMotionButton.addEventListener('click', () => {
    const paused = document.querySelector('#home').classList.toggle('home-motion-paused');
    homeMotionButton.setAttribute('aria-pressed', String(paused));
    homeMotionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
}
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

// Show one section at a time while keeping shareable URLs and browser history.
const sections = Array.from(document.querySelectorAll('main > section'));
const sectionLinks = document.querySelectorAll('a[href^="#"]');
const originalTitle = document.title;

function sectionFromHash() {
  return sections.find((section) => '#' + section.id === window.location.hash) || sections[0];
}

function showSection(section, moveFocus = false) {
  sections.forEach((item) => {
    item.hidden = item !== section;
  });
  navigation.querySelectorAll('a').forEach((link) => {
    if (link.getAttribute('href') === '#' + section.id) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  const currentLink = navigation.querySelector('[aria-current="page"]');
  document.title = section.id === 'home' ? originalTitle : currentLink.textContent.trim() + ' — Jana Abo Shoueeb';
  if (mobileScreen.matches) closeMenu();
  if (moveFocus) {
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}

sectionLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const section = sections.find((item) => '#' + item.id === link.getAttribute('href'));
    // Keep skip links and modified clicks (such as open in new tab) native.
    if (!section || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    if (window.location.hash !== '#' + section.id) {
      window.history.pushState(null, '', '#' + section.id);
    }
    showSection(section, true);
  });
});

window.addEventListener('popstate', () => showSection(sectionFromHash(), true));
window.addEventListener('hashchange', () => showSection(sectionFromHash(), true));
document.body.classList.add('section-navigation');
showSection(sectionFromHash());

// Filter the illustrative project placeholders without changing page navigation.
const projectCards = Array.from(document.querySelectorAll('.project-card[data-category]'));
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count += 1;
    });
    document.querySelector('#project-count').textContent = count + ' project placeholder' + (count === 1 ? '' : 's') + ' shown';
  });
});
