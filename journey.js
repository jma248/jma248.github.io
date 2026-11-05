(() => {
  const consolePanel = document.querySelector('.journey-console');
  if (!consolePanel) return;
  const entries = {
    njit: {command:'explore("education")', title:'Building my foundation.', copy:'Studying Software Data Engineering Technology at NJIT, bringing my interests in software, data, and design together.', tags:'SOFTWARE · DATA · DESIGN', progress:'0%'},
    viam: {command:'explore("robotics")', title:'Turning logic into motion.', copy:'Created a palletizer simulation during Viam 101 personal training, exploring a robot arm’s task of lifting a box from a conveyor onto a pallet.', tags:'VIAM 101 · ROBOTICS · SIMULATION', progress:'50%'},
    kyndryl: {command:'explore("AI collaboration")', title:'Kyndryl AI Collaboration.', copy:'Gained exposure to how technology professionals collaborate to solve real-world problems, developing my understanding of teamwork and professional communication.', tags:'AI · TEAMWORK · COMMUNICATION', progress:'100%'}
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
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.journey)));
  select('njit');
})();
