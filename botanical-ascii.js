// Roses rendered with changing ASCII characters.
(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=x=>Math.max(0,Math.min(1,x));
  const code='01{}[]<>/=+;:constletreturn';
  const noise=(x,y)=>{const v=Math.sin(x*12.9898+y*78.233)*43758.5453;return v-Math.floor(v);};
  document.querySelectorAll('.botanical-scene').forEach(scene=>{
    const canvas=scene.querySelector('canvas');const ctx=canvas?.getContext('2d');if(!ctx)return;
    const pause=scene.querySelector('input');const section=scene.closest('section');
    let width=1,height=260,roses=[],visible=false,frame=0,previous=null,elapsed=0,lastDraw=-Infinity;
    const running=()=>visible&&!section.hidden&&!document.hidden&&!pause.checked&&!reduce.matches;
    function rose(cx,cy,size){
      const points=[];
      for(let y=-size;y<155;y+=7)for(let x=-size-6;x<size+6;x+=5){
        const radius=Math.hypot(x,y*1.12),angle=Math.atan2(y*1.12,x);
        const edge=size*(.9+.07*Math.sin(angle*5)+.035*Math.cos(angle*9));
        let light=0;
        if(radius<edge){
          const folds=Math.sin(angle*5+radius*.1+Math.sin(radius*.085)*2);
          const spiral=Math.sin(angle*2-radius*.21);
          light=.16+.25*(1-radius/size)+Math.max(0,folds)*.37+Math.max(0,spiral)*.15;
          if(edge-radius<4)light=.7;
        }
        const stemX=Math.sin((y-size*.3)/80)*7;
        if(y>size*.4&&Math.abs(x-stemX)<3.3)light=Math.max(light,.45);
        for(const side of [-1,1]){
          const lx=x-side*23,ly=y-(side<0?95:123);
          const u=lx*.8+ly*side*.6,v=-lx*side*.6+ly*.8;
          const leaf=(u/29)**2+(v/10)**2;
          if(leaf<1)light=Math.max(light,.2+.4*(1-leaf));
        }
        if(light>.05)points.push({x:cx+x,y:cy+y,alpha:light,seed:Math.floor(noise(x,y)*code.length)});
      }
      return points;
    }
    function prepare(){
      const bounds=canvas.getBoundingClientRect();if(!bounds.width)return;
      width=bounds.width;height=bounds.height;
      const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      const size=Math.min(66,width*.16);
      roses=rose(width*(width<650?.25:.22),80,size);
      if(width>=650)roses.push(...rose(width*.81,99,size*.73));
    }
    function draw(now){
      frame=0;const moving=running();if(moving&&previous!==null)elapsed+=Math.min(now-previous,80);previous=moving?now:null;
      if(moving&&now-lastDraw<50){frame=requestAnimationFrame(draw);return;}lastDraw=now;
      const t=elapsed/1000,tick=Math.floor(t*2);ctx.clearRect(0,0,width,height);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='8px "Courier New",monospace';
      for(const p of roses){
        const shimmer=reduce.matches?1:.91+.09*Math.sin(t*.8+p.x*.02);
        ctx.fillStyle=`rgba(239,213,192,${p.alpha*shimmer})`;ctx.fillText(code[(p.seed+tick)%code.length],p.x,p.y);
      }
      if(moving)frame=requestAnimationFrame(draw);
    }
    function sync(){cancelAnimationFrame(frame);previous=null;lastDraw=-Infinity;draw(performance.now());}
    function resize(){prepare();sync();}
    pause.addEventListener('change',sync);reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
    new MutationObserver(sync).observe(section,{attributes:true,attributeFilter:['hidden']});
    if('IntersectionObserver'in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(scene);else visible=true;
    if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
    resize();
  });
})();
