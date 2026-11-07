// Glowing code spirals out of a vortex and gathers into the actual name lettering.
(() => {
  const canvas = document.querySelector('#home-code-canvas');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const home = canvas.closest('section');
  const intro = home.querySelector('.home-intro');
  const skip = home.querySelector('.home-skip');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const glyphs = '01{}[]<>/+=:;*';
  const palette = [[244,221,192],[221,166,182],[178,83,118],[250,236,216]];
  const random = n => { const value = Math.sin(n*127.1+311.7)*43758.5453; return value-Math.floor(value); };
  const ease = value => { const x = Math.max(0,Math.min(1,value)); return x*x*(3-2*x); };
  let width=1,height=1,particles=[],frame=0,elapsed=window.portfolioState?.get('homeElapsed',0)??0,previous=null,lastDraw=-Infinity;
  const pointer={active:false,x:0,y:0};
  const moving=()=>!home.hidden&&!document.hidden&&!reduce.matches&&!home.classList.contains('home-motion-paused');

  function prepare() {
    const bounds=home.getBoundingClientRect();
    if(!bounds.width||!bounds.height)return;
    width=bounds.width;height=bounds.height;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const mask=document.createElement('canvas');mask.width=Math.ceil(width);mask.height=Math.ceil(height);
    const ink=mask.getContext('2d');if(!ink)return;
    ink.fillStyle='#fff';ink.textBaseline='middle';
    // Sample the same size, position, and letter spacing as the visible HTML title.
    for(const line of home.querySelectorAll('.hero-name > span, .hero-name > em')) {
      const box=line.getBoundingClientRect(),style=getComputedStyle(line);
      const fontSize=parseFloat(style.fontSize);
      ink.font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const raw=line.textContent.trim();
      const text=style.textTransform==='uppercase'?raw.toUpperCase():raw;
      const spacing=parseFloat(style.letterSpacing)||0;
      const lengths=[...text].map(character=>ink.measureText(character).width);
      let x=box.left-bounds.left+(box.width-lengths.reduce((a,b)=>a+b,0)-spacing*(text.length-1))/2;
      const y=box.top-bounds.top+box.height/2-fontSize*.035;
      if(Math.abs(spacing)<.01){
        // Draw joined script as one string so the cursive strokes stay connected.
        ink.textAlign='center';ink.fillText(text,box.left-bounds.left+box.width/2,y);ink.textAlign='left';
      }else{
        [...text].forEach((character,i)=>{ink.fillText(character,x,y);x+=lengths[i]+spacing;});
      }
    }
    const image=ink.getImageData(0,0,mask.width,mask.height);
    const targets=[];
    const step=width<650?3:4;
    for(let y=0;y<mask.height;y+=step)for(let x=0;x<mask.width;x+=step) {
      if(image.data[(y*mask.width+x)*4+3]>110)targets.push({x,y});
    }
    if(!targets.length)return;
    const count=width<650?1200:2400;
    particles=Array.from({length:count},(_,i)=>{
      const seed=random(i+12),target=targets[Math.floor(random(i+5100)*targets.length)];
      return {seed,angle:random(i+72)*Math.PI*2,radius:.12+Math.sqrt(random(i+150))*.88,
        target,x:width/2,y:height*.43,color:palette[i%palette.length],glyph:glyphs[i%glyphs.length]};
    });
  }
  function draw(now) {
    frame=0;const animate=moving();
    if(animate&&previous!==null)elapsed+=Math.min(now-previous,80);
    previous=animate?now:null;
    if(animate&&now-lastDraw<32){frame=requestAnimationFrame(draw);return;}
    lastDraw=now;
    const t=reduce.matches?10:elapsed/1000;
    const revealStart=1.4;
    const revealProgress=Math.max(0,Math.min(1,(t-revealStart)/2.35));
    // A softer acceleration and landing avoids a sudden change in opacity.
    const reveal=revealProgress**3*(revealProgress*(revealProgress*6-15)+10);
    home.style.setProperty('--name-reveal',reveal.toFixed(3));
    const details=ease((t-2.45)/1.4);
    home.style.setProperty('--detail-reveal',details.toFixed(3));
    intro.style.pointerEvents=details>.8?'auto':'none';
    skip.hidden=false;skip.textContent=t>=4?'Replay intro ↻':'Skip intro ↗';
    ctx.clearRect(0,0,width,height);
    const cx=width/2,cy=height*.44;
    const aura=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(width,height)*.65);
    aura.addColorStop(0,`rgba(147,37,78,${.2+(1-reveal)*.15})`);aura.addColorStop(.5,'rgba(75,12,35,.12)');aura.addColorStop(1,'rgba(53,6,15,0)');
    ctx.fillStyle=aura;ctx.fillRect(0,0,width,height);
    // A quiet field remains after the main reveal; it responds to the pointer.
    for(let i=0;i<100;i++) {
      let x=random(i+11000)*width,y=random(i+13000)*height;
      if(animate){x+=Math.sin(t*.15+i)*6;y+=Math.cos(t*.17+i)*5;}
      if(pointer.active&&animate){x+=(pointer.x-cx)*.008;y+=(pointer.y-cy)*.008;}
      const alpha=.12+random(i+14000)*.35;
      ctx.fillStyle=`rgba(237,205,188,${alpha})`;ctx.beginPath();ctx.arc(x,y,random(i+15000)>.94?1.5:.65,0,Math.PI*2);ctx.fill();
    }
    // Scattered code stays behind after the vortex becomes solid lettering.
    const marks=['{ }','</>','01','=>','[ ]','++',';','&&','!=','()','*','let'];
    const markFade=.25+.75*ease((t-1.3)/1.8);
    ctx.textAlign='center';ctx.textBaseline='middle';
    for(let i=0;i<(width<650?60:125);i++) {
      let x=random(i+21000)*width,y=random(i+24000)*height;
      if(!reduce.matches){x+=Math.sin(t*.11+i)*9;y+=Math.cos(t*.13+i)*7;}
      if(pointer.active&&animate){x+=(pointer.x-cx)*.014;y+=(pointer.y-cy)*.014;}
      // Keep a quieter pocket around the name, description, and primary link.
      const central=Math.hypot((x-cx)/(width*.34),(y-height*.5)/(height*.34))<1;
      const alpha=(central?.16:.38+random(i+27000)*.22)*markFade;
      ctx.font=`${9+random(i+28000)*5}px "Courier New",monospace`;
      ctx.fillStyle=`rgba(225,174,187,${alpha})`;
      ctx.fillText(marks[i%marks.length],x,y);
    }
    // Crossfade the two versions of the name together, with no position change.
    const particleFade=1-reveal;
    ctx.textAlign='center';ctx.textBaseline='middle';
    for(let i=0;i<particles.length&&particleFade>.001;i++) {
      const p=particles[i];
      const gather=ease((t-.3-p.seed*.25)/1.45);
      const angle=p.angle+t*(1.3+.8*(1-p.radius))+p.radius*8;
      const radius=p.radius*Math.max(width,height)*(.65+.12*Math.sin(t*.65));
      const vx=Math.cos(angle)*radius,vy=Math.sin(angle)*radius*.5;
      const swirlX=cx+vx*Math.cos(.25)-vy*Math.sin(.25),swirlY=cy+vx*Math.sin(.25)+vy*Math.cos(.25);
      let tx=swirlX+(p.target.x-swirlX)*gather,ty=swirlY+(p.target.y-swirlY)*gather;
      if(pointer.active&&animate) {
        const dx=tx-pointer.x,dy=ty-pointer.y,distance=Math.hypot(dx,dy);
        if(distance<110&&distance>.1){const push=(1-distance/110)**2*65;tx+=dx/distance*push;ty+=dy/distance*push;}
      }
      const oldX=p.x,oldY=p.y;
      if(animate){p.x+=(tx-p.x)*.24;p.y+=(ty-p.y)*.24;}else {p.x=tx;p.y=ty;}
      const alpha=(.3+p.seed*.65)*particleFade;
      if(alpha<.002)continue;
      const [r,g,b]=p.color;
      if(gather<.9&&t>.08) {
        ctx.beginPath();ctx.moveTo(oldX,oldY);ctx.lineTo(p.x,p.y);ctx.strokeStyle=`rgba(${r},${g},${b},${alpha*.22})`;ctx.lineWidth=.6;ctx.stroke();
      }
      ctx.fillStyle=`rgba(${r},${g},${b},${alpha})`;
      ctx.font=`${(width<650?4:5)+p.seed*3}px monospace`;
      if(i%13===0){ctx.shadowColor=`rgb(${r},${g},${b})`;ctx.shadowBlur=7;}
      ctx.fillText(t<1.7?glyphs[(i+Math.floor(t*4))%glyphs.length]:p.glyph,p.x,p.y);
      ctx.shadowBlur=0;
    }
    if(animate)frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);previous=null;lastDraw=-Infinity;draw(performance.now());}
  function resize(){prepare();sync();}
  function skipOrReplay(){elapsed=elapsed>=4000?0:4200;if(!elapsed)particles.forEach(p=>{p.x=width/2;p.y=height*.44;});sync();}
  skip.addEventListener('click',skipOrReplay);
  intro.addEventListener('focusin',()=>{if(elapsed<4000){elapsed=4200;sync();}});
  home.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const bounds=home.getBoundingClientRect();pointer.active=true;pointer.x=event.clientX-bounds.left;pointer.y=event.clientY-bounds.top;},{passive:true});
  home.addEventListener('pointerleave',()=>{pointer.active=false;});
  reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(home,{attributes:true,attributeFilter:['class','hidden']});
  window.portfolioState?.onSave(()=>window.portfolioState.set('homeElapsed',elapsed));
  home.dataset.cinema='ready';
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(home);else window.addEventListener('resize',resize);
  resize();if(document.fonts?.ready)document.fonts.ready.then(resize);
})();
