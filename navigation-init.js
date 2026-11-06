// Establish the initial section before the page can paint. Without JavaScript,
// navigation and all sections remain visible as before.
(() => {
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  const section = location.hash.slice(1);
  document.documentElement.dataset.initialSection = sections.includes(section) ? section : 'home';
})();
