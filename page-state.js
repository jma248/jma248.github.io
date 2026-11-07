// Retain the choices that used to live in one document, without changing theme storage.
(() => {
  const page = document.body.dataset.page;
  if (!page) return;
  const key = 'jana-page:' + page;
  const globalKey = 'jana-page:ambient';
  const callbacks = [];
  let values = {}, ambient = {};
  try {
    const type = performance.getEntriesByType('navigation')[0]?.type;
    const internal = document.referrer && new URL(document.referrer).origin === location.origin;
    if (type === 'reload' || (type === 'navigate' && !internal)) {
      sessionStorage.removeItem(key);
      sessionStorage.removeItem(globalKey);
    }
    values = JSON.parse(sessionStorage.getItem(key) || '{}');
    ambient = JSON.parse(sessionStorage.getItem(globalKey) || '{}');
  } catch (_) { /* Navigation still works if storage is unavailable. */ }
  function write() {
    try {
      sessionStorage.setItem(key, JSON.stringify(values));
      sessionStorage.setItem(globalKey, JSON.stringify(ambient));
    } catch (_) { /* Keep this document's choices in memory. */ }
  }
  window.portfolioState = {
    get: (name, fallback) => values[name] ?? fallback,
    set: (name, value) => { values[name] = value; write(); },
    getAmbient: (name, fallback) => ambient[name] ?? fallback,
    setAmbient: (name, value) => { ambient[name] = value; write(); },
    onSave: (callback) => callbacks.push(callback)
  };
  window.addEventListener('pagehide', () => { callbacks.forEach((callback) => callback()); write(); });
})();
