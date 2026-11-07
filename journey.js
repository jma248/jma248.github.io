(() => {
  const consolePanel = document.querySelector('.journey-console');
  if (!consolePanel) return;
  const entries = {
    njit: {command:'explore("education")', title:'Studying at NJIT', copy:'I’m studying Software Data Engineering Technology at NJIT.', tags:'SOFTWARE · DATA · DESIGN', progress:'0%'},
    viam: {command:'explore("robotics")', title:'Viam 101 training', copy:'I made a palletizer simulation during Viam 101 training to practice moving a box from a conveyor onto a pallet.', tags:'VIAM 101 · ROBOTICS · SIMULATION', progress:'50%'},
    kyndryl: {command:'explore("AI collaboration")', title:'Kyndryl AI Collaboration.', copy:'I learned about technology careers, teamwork, and professional communication through Kyndryl’s AI Collaboration.', tags:'AI · TEAMWORK · COMMUNICATION', progress:'100%'}
  };
  const buttons = consolePanel.querySelectorAll('[data-journey]');
  function select(key) {
    const entry = entries[key];
    if (!entry) return;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.journey === key)));
    consolePanel.style.setProperty('--journey-progress', entry.progress);
    consolePanel.querySelector('.journey-command-text').textContent = entry.command;
    consolePanel.querySelector('.journey-readout-title').textContent = entry.title;
    consolePanel.querySelector('.journey-readout-copy').textContent = entry.copy;
    consolePanel.querySelector('.journey-readout-tags').textContent = entry.tags;
    document.querySelectorAll('[data-experience]').forEach(item => item.classList.toggle('is-current-experience', item.dataset.experience === key));
  }
  buttons.forEach(button => button.addEventListener('click', () => { select(button.dataset.journey); window.portfolioState?.set('journey', button.dataset.journey); }));
  select(window.portfolioState?.get('journey', 'njit') || 'njit');
})();
