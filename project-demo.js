(() => {
  const dialog = document.querySelector('#palletizer-demo');
  const open = document.querySelector('.demo-open');
  if (!dialog || !open || typeof dialog.showModal !== 'function') return;
  const find = selector => dialog.querySelector(selector);
  const play = find('.demo-play');
  const step = find('.demo-step');
  const arm = find('.demo-arm');
  const shadow = find('.demo-arm-shadow');
  const highlight = find('.demo-arm-highlight');
  const elbow = find('.demo-elbow');
  const wrist = find('.demo-wrist');
  const gripper = find('.demo-gripper');
  const box = find('.demo-box');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, elapsed = 0, previous = null, paused = reduce.matches;
  const ease = t => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  const between = (a, b, t) => a + (b - a) * ease(t);
  function draw(now) {
    frame = 0;
    const running = dialog.open && !paused && !document.hidden;
    if (running && previous !== null) elapsed += Math.min(now - previous, 80);
    previous = running ? now : null;
    const t = (elapsed / 1000) % 9;
    let x = 180, y = 220, label = '01 / Grip the box';
    if (t >= 1 && t < 2.5) { y = between(220, 300 - Math.sqrt(90000 - 220 ** 2), (t - 1) / 1.5); label = '02 / Lift from the conveyor'; }
    else if (t >= 2.5 && t < 5) { x = between(180, 640, (t - 2.5) / 2.5); y = 300 - Math.sqrt(90000 - (x - 400) ** 2); label = '03 / Move above the pallet'; }
    else if (t >= 5 && t < 6.5) { x = 640; y = between(120, 250, (t - 5) / 1.5); label = '04 / Lower onto the pallet'; }
    else if (t >= 6.5 && t < 7.2) { x = 640; y = between(250, 120, (t - 6.5) / .7); label = '05 / Release the box'; }
    else if (t >= 7.2 && t < 8.5) { x = between(640, 180, (t - 7.2) / 1.3); y = 300 - Math.sqrt(90000 - (x - 400) ** 2); label = '06 / Return for the next box'; }
    else if (t >= 8.5) { y = between(300 - Math.sqrt(90000 - 220 ** 2), 220, (t - 8.5) / .5); label = '06 / Return for the next box'; }
    // Two-link inverse kinematics keeps the robot's joints connected throughout.
    const dx = x - 400, dy = y - 300, length = 150;
    const distance = Math.min(300, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx) + (dx < 0 ? 1 : -1) * Math.acos(distance / (length * 2));
    const ex = 400 + Math.cos(angle) * length, ey = 300 + Math.sin(angle) * length;
    const path = `M400 300 L${ex} ${ey} L${x} ${y}`;
    for (const line of [arm, shadow, highlight]) line.setAttribute('d', path);
    elbow.setAttribute('cx', ex); elbow.setAttribute('cy', ey);
    wrist.setAttribute('cx', x); wrist.setAttribute('cy', y);
    const gap = t < .7 || t >= 6.5 ? 26 : 21;
    gripper.setAttribute('d', `M${x} ${y} V${y + 10} M${x-gap} ${y+30} V${y+10} H${x+gap} V${y+30}`);
    box.setAttribute('transform', t >= 6.5 ? 'translate(640 250)' : `translate(${x} ${y})`);
    if (step.textContent !== label) step.textContent = label;
    play.textContent = paused ? 'Play demo' : 'Pause demo';
    play.setAttribute('aria-pressed', String(paused));
    if (running) frame = requestAnimationFrame(draw);
  }
  function sync() { cancelAnimationFrame(frame); previous = null; draw(performance.now()); }
  open.hidden = false;
  open.addEventListener('click', () => { elapsed = 0; paused = reduce.matches; dialog.showModal(); sync(); });
  find('.demo-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { cancelAnimationFrame(frame); open.focus(); });
  play.addEventListener('click', () => { paused = !paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener('change', () => { paused = reduce.matches; sync(); });
})();
