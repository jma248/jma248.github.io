// Resolve older shared section URLs before painting; real page links stay native.
(() => {
  const pages = { home: 'index.html', about: 'about.html', skills: 'skills.html', projects: 'projects.html', experience: 'experience.html', contact: 'contact.html' };
  const filename = location.pathname.split('/').pop() || 'index.html';
  function redirectLegacySection() {
    const legacy = location.hash.slice(1);
    if (filename !== 'index.html' || !pages[legacy] || legacy === 'home') return false;
    document.documentElement.style.visibility = 'hidden';
    location.replace(new URL(pages[legacy], location.href).href);
    return true;
  }
  window.addEventListener('hashchange', redirectLegacySection);
  if (redirectLegacySection()) return;
  const page = Object.keys(pages).find((name) => pages[name] === filename);
  if (page) document.documentElement.dataset.initialSection = page;
})();
