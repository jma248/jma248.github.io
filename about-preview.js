(() => {
  const options = document.querySelectorAll('[data-about-choice]');
  const panels = [document.querySelector('#about-option-1'), document.querySelector('#about-option-2')];
  if (panels.some(panel => !panel)) return;
  function choose(value) {
    options.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.aboutChoice === value)));
    panels.forEach((panel, i) => { panel.hidden = String(i + 1) !== value; });
  }
  options.forEach(button => button.addEventListener('click', () => choose(button.dataset.aboutChoice)));
  choose(new URLSearchParams(location.search).get('about') === '2' ? '2' : '1');
})();
