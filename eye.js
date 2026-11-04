// Character by character, an eye with radial iris fibers and shaded eyelids.
(() => {
  const canvas = document.querySelector('#curiosity-eye');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const panel = canvas.closest('.curiosity');
  const stage = panel.querySelector('.eye-stage');
  const pause = panel.querySelector('.eye-pause');
  const section = panel.closest('section');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let paused = false;
  let frame = 0;
  let previous = 0;
  let clock = 0;
  let blinkStart = -10;
  let nextBlink = 3.8;
  let gazeX = 0;
  let gazeY = 0;
  const pointer = { active: false, x: 0, y: 0 };
  const symbols = '01{}[]<>/=+;:constletreturn';
  const running = () => visible && !section.hidden && !document.hidden && !paused && !reduce.matches;
  const noise = (x, y) => {
    const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  function draw(now) {
    frame = 0;
    const animate = running();
    if (animate && previous) clock += Math.min((now - previous) / 1000, .05);
    previous = animate ? now : 0;
    if (animate && clock >= nextBlink) {
      blinkStart = clock;
      nextBlink = clock + 4.5 + noise(clock, 3) * 3;
    }
    const blinkAge = clock - blinkStart;
    const blink = animate && blinkAge >= 0 && blinkAge < .38 ? Math.sin(blinkAge / .38 * Math.PI) : 0;
    const open = 1 - blink * .98;
    if (animate) {
      gazeX += ((pointer.active ? pointer.x * 60 : Math.sin(clock * .43) * 32) - gazeX) * .08;
      gazeY += ((pointer.active ? pointer.y * 26 : Math.sin(clock * .61) * 10) - gazeY) * .08;
    }
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, 1100, 430);
    ctx.font = '12px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const irisX = 550 + gazeX;
    const irisY = 231 + gazeY;
    for (let row = 0, y = 35; y < 395; y += 12, row++) {
      for (let col = 0, x = 86; x < 1020; x += 8, col++) {
        const nx = (x - 550) / 448;
        if (Math.abs(nx) >= 1) continue;
        const arch = Math.pow(1 - nx * nx, .78);
        const tilt = nx * 8;
        const top = 231 + tilt - 131 * arch * open;
        const bottom = 231 + tilt + 100 * arch * open;
        const inside = y >= top && y <= bottom;
        const lid = Math.min(Math.abs(y - top), Math.abs(y - bottom));
        const crease = Math.abs(y - (top - 22 * arch - 7));
        const brow = Math.abs(y - (86 - 24 * arch + nx * 9));
        const radius = Math.hypot(x - irisX, y - irisY);
        const angle = Math.atan2(y - irisY, x - irisX);
        const grain = noise(col, row);
        let alpha = 0;
        if (lid < 8) alpha = .95 - lid * .055;
        if (crease < 5 && Math.abs(nx) < .92) alpha = Math.max(alpha, .25);
        if (brow < 9 && Math.abs(nx) < .78 && grain > .23) alpha = Math.max(alpha, .22 + grain * .15);
        // Short character strokes at the outer upper lid suggest eyelashes.
        const lash = (x % 40 < 9) && Math.abs(nx) > .45 && Math.abs(nx) < .95;
        if (lash && y < top && y > top - 19 * Math.abs(nx)) alpha = Math.max(alpha, .48);
        if (inside) {
          if (radius < 106) {
            if (radius > 34) {
              const fibers = (Math.sin(angle * 59 + radius * .09) + Math.sin(angle * 97 - radius * .14)) * .19;
              const ring = Math.sin(radius * .34 + Math.sin(angle * 13)) * .08;
              alpha = Math.max(alpha, .44 + fibers + ring + grain * .17);
              if (radius > 98) alpha = .85;
              if (radius < 43) alpha = .65 + grain * .25;
            } else alpha = .025;
            if (Math.hypot(x - irisX + 28, y - irisY + 36) < 14) alpha = 1;
            if (Math.hypot(x - irisX - 30, y - irisY - 25) < 6) alpha = .9;
          } else {
            const shadow = Math.min(1, (y - top) / 30);
            alpha = Math.max(alpha, (.19 + grain * .24 + .12 * arch) * shadow);
          }
        }
        if (alpha < .07) continue;
        const offset = Math.floor(clock * 1.5 + grain * 11);
        const glyph = alpha > .9 ? '@' : symbols[(col + row * 7 + offset) % symbols.length];
        ctx.fillStyle = `rgba(245, 221, 201, ${Math.min(1, alpha)})`;
        ctx.fillText(glyph, x, y);
      }
    }
    if (animate) frame = requestAnimationFrame(draw);
  }
  function sync() {
    cancelAnimationFrame(frame);
    previous = 0;
    draw(performance.now());
  }
  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = stage.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    pointer.active = true;
  }, { passive: true });
  stage.addEventListener('pointerleave', () => { pointer.active = false; });
  stage.addEventListener('click', () => { if (running()) blinkStart = clock; });
  pause.hidden = false;
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.setAttribute('aria-pressed', String(paused));
    pause.textContent = paused ? 'Resume eye' : 'Pause eye';
    sync();
  });
  reduce.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  new MutationObserver(sync).observe(section, { attributes: true, attributeFilter: ['hidden'] });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(panel);
  } else visible = true;
  sync();
})();
