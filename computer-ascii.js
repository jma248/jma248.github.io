// A monitor, stand, and keyboard built out of characters, with a typing screen.
(() => {
  const scene=document.querySelector('.computer-scene');
  const canvas=scene?.querySelector('canvas'),ctx=canvas?.getContext('2d');if(!ctx)return;
  const pause=scene.querySelector('input'),section=scene.closest('section');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const symbols='{}[]<>/01+=:;';
  const lines=['// jana.workspace','const interests = [','  "design", "computers"','];','','function create(idea) {','  return learn(idea);','}'];
  const total=lines.reduce((n,line)=>n+line.length+1,0);
  const points=[];
  for(let y=-120;y<=170;y+=7)for(let x=-182;x<=182;x+=5){
    const monitor=Math.abs(x)<=155&&y<=80;
    const screen=Math.abs(x)<143&&y>-108&&y<64;
    const stand=Math.abs(x)<17&&y>80&&y<113;
    const foot=(x/72)**2+((y-118)/6)**2<1;
    const keyboard=y>=143&&y<=168&&Math.abs(x)<150+(y-143)*.8;
    if((monitor&&!screen)||stand||foot||keyboard){
      const edge=Math.abs(x)>148||y<-112||y>70;
      points.push({x,y,alpha:keyboard?.5:stand?.5:edge?.75:.4,seed:Math.abs(Math.floor(x*7+y*11))});
    }
  }
  let width=1,height=340,frame=0,previous=null,elapsed=0,lastDraw=-Infinity,visible=false;
  const running=()=>visible&&!section.hidden&&!document.hidden&&!pause.checked&&!reduce.matches;
  function draw(now){
    frame=0;const moving=running();if(moving&&previous!==null)elapsed+=Math.min(now-previous,80);previous=moving?now:null;
    if(moving&&now-lastDraw<40){frame=requestAnimationFrame(draw);return;}lastDraw=now;
    ctx.clearRect(0,0,width,height);
    const scale=Math.min(width/400,1),cx=width/2,cy=height*.43;
    const light=document.documentElement.dataset.theme==='light';
    ctx.save();ctx.translate(cx,cy);ctx.scale(scale,scale);
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='8px "Courier New",monospace';
    const tick=Math.floor(elapsed/800);
    for(const point of points){ctx.fillStyle=`rgba(${light?'112,13,37':'239,213,192'},${point.alpha})`;ctx.fillText(symbols[(point.seed+tick)%symbols.length],point.x,point.y);}
    ctx.textAlign='left';ctx.font='10px "Courier New",monospace';
    let budget=reduce.matches?total:Math.floor(elapsed/50)%(total+55);
    for(let i=0;i<lines.length;i++){
      const text=lines[i].slice(0,Math.max(0,budget));
      ctx.fillStyle=light?(i===0?'#89525f':'#700d25'):(i===0?'#ae8c9a':i===2?'#becfa8':'#e4cfb8');
      ctx.fillText(text,-125,-88+i*18);
      if(budget>=0&&budget<=lines[i].length&&(!moving||Math.floor(elapsed/500)%2===0))ctx.fillText('▍',-125+text.length*6,-88+i*18);
      budget-=lines[i].length+1;
    }
    ctx.restore();if(moving)frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);previous=null;lastDraw=-Infinity;draw(performance.now());}
  function resize(){const b=canvas.getBoundingClientRect();if(!b.width)return;width=b.width;height=b.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);sync();}
  pause.addEventListener('change',sync);reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(section,{attributes:true,attributeFilter:['hidden']});
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if('IntersectionObserver'in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(scene);else visible=true;
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
  resize();
})();
