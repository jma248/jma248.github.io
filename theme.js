// Apply before the stylesheet loads to prevent a flash of the wrong theme.
(() => {
  const key = 'jana-theme';
  const valid = value => value === 'light' || value === 'dark';
  let preference = null;
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch (_) { /* Themes still work when browser storage is unavailable. */ }

  function apply() {
    const theme = preference || 'dark';
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#35060F' : '#F3E7D7';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.querySelector('.theme-label').textContent = theme === 'dark' ? 'Dark' : 'Light';
      button.title = 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme';
    }
  }

  apply();
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch (_) { /* Keep the session choice. */ }
      apply();
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : null;
      apply();
    }
  });
})();
