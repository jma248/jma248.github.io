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
  const savedPause = window.portfolioState.get('homePaused', false);
  document.querySelector('#home').classList.toggle('home-motion-paused', savedPause);
  homeMotionButton.setAttribute('aria-pressed', String(savedPause));
  homeMotionButton.textContent = savedPause ? 'Resume motion' : 'Pause motion';
  const syncMotionControl = () => { homeMotionButton.hidden = reducedMotion.matches; };
  syncMotionControl();
  reducedMotion.addEventListener('change', syncMotionControl);
  homeMotionButton.addEventListener('click', () => {
    const paused = document.querySelector('#home').classList.toggle('home-motion-paused');
    window.portfolioState.set('homePaused', paused);
    homeMotionButton.setAttribute('aria-pressed', String(paused));
    homeMotionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
}
if ('IntersectionObserver' in window) {
  const revealTargets = Array.from(document.querySelectorAll('.about-grid, .skill-card, .project-card, .timeline-item'));
  const revealed = new Set(window.portfolioState.get('revealed', []));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealed.add(revealTargets.indexOf(entry.target));
        window.portfolioState.set('revealed', Array.from(revealed));
        if (!reducedMotion.matches) entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element, index) => {
    if (!revealed.has(index)) revealObserver.observe(element);
  });
}

// Each document owns one page; normal links retain native browser navigation.
const activeSection = document.querySelector('main > section');
document.querySelector('.skip-link').addEventListener('click', (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return;
  if (!activeSection) return;
  event.preventDefault();
  activeSection.setAttribute('tabindex', '-1');
  activeSection.focus({ preventScroll: true });
  activeSection.scrollIntoView({ behavior: 'instant', block: 'start' });
});
delete document.documentElement.dataset.initialSection;

// Restore choices that previously remained in the single document between visits.
const pageState = window.portfolioState;
const pauseChoices = ['.hands-pause', '.computer-pause input', '.journey-motion input'];
pauseChoices.forEach((selector) => {
  const input = document.querySelector(selector);
  if (!input) return;
  input.checked = pageState.get(selector, false);
  input.addEventListener('change', () => pageState.set(selector, input.checked));
});
const collection = document.querySelector('.create-collection');
if (collection) {
  collection.open = pageState.get('collectionOpen', false);
  collection.addEventListener('toggle', () => pageState.set('collectionOpen', collection.open));
}

// Filter portfolio projects without changing page navigation.
const projectCards = Array.from(document.querySelectorAll('.project-card[data-category]'));
function filterProjects(button) {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
      if (!card.hidden) count += 1;
    });
    document.querySelector('#project-count').textContent = count + ' project' + (count === 1 ? '' : 's') + ' shown';
    const empty = document.querySelector('.project-empty');
    if (empty) {
      empty.hidden = count !== 0;
      empty.textContent = 'No projects in “' + button.textContent.trim() + '” yet.';
    }
    pageState.set('projectFilter', filter);
}
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => filterProjects(button));
});
const savedFilter = pageState.get('projectFilter', 'all');
const filterButton = Array.from(document.querySelectorAll('[data-filter]')).find((button) => button.dataset.filter === savedFilter);
if (filterButton) filterProjects(filterButton);
