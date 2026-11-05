// A stylized geographic mask sampled onto a shaded, rotating ASCII sphere.
(() => {
  const scene=document.querySelector('.earth-scene'),canvas=scene?.querySelector('canvas'),ctx=canvas?.getContext('2d');if(!ctx)return;
  const section=scene.closest('section'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const pause=scene.querySelector('[data-earth="pause"]');
  const polygons=[
    [[-168,70],[-135,72],[-123,55],[-125,49],[-115,32],[-103,23],[-87,21],[-81,10],[-77,10],[-80,25],[-66,39],[-55,60],[-80,75]],
    [[-81,10],[-66,11],[-49,-2],[-35,-7],[-40,-23],[-54,-39],[-68,-55],[-75,-42],[-72,-18]],
    [[-17,32],[9,37],[33,31],[51,11],[42,-1],[35,-22],[19,-35],[11,-25],[7,-4],[-16,11]],
    [[-10,36],[-10,58],[6,63],[28,71],[58,70],[90,77],[142,60],[170,64],[179,52],[145,45],[131,32],[120,19],[106,5],[99,6],[95,22],[80,8],[72,22],[56,26],[46,14],[36,31],[25,40],[14,36]],
    [[112,-22],[129,-11],[143,-13],[154,-28],[146,-39],[133,-34],[115,-35]],
    [[-53,60],[-27,68],[-20,81],[-47,84],[-62,76]],[[46,-13],[51,-15],[48,-26],[43,-23]],[[130,32],[141,43],[145,41],[138,31]],[[166,-35],[178,-40],[168,-47]],[[97,5],[119,2],[139,-7],[132,-10],[109,-7]]
  ];
  function inside(x,y,points){let result=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])result=!result;}return result;}
  const random=n=>{const v=Math.sin(n*127.1)*43758.5453;return v-Math.floor(v);};
  const ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
  let width=1,height=360,radius=140,cells=[],visible=false,paused=false,frame=0,previous=null,elapsed=0,buildTime=0,lastDraw=-Infinity,rotation=-.9;
  const running=()=>visible&&!section.hidden&&!document.hidden&&!paused&&!reduce.matches;
  function prepare(){
    const b=canvas.getBoundingClientRect();if(!b.width)return;width=b.width;height=b.height;radius=Math.min(width*.4,height*.4);
    const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    cells=[];let seed=0;
    for(let y=-radius;y<=radius;y+=7)for(let x=-radius;x<=radius;x+=5){
      const nx=x/radius,ny=y/radius,z2=1-nx*nx-ny*ny;if(z2<0)continue;
      const z=Math.sqrt(z2),rx=nx*Math.cos(.22)-ny*Math.sin(.22),ry=nx*Math.sin(.22)+ny*Math.cos(.22);
      cells.push({x,y,z,lat:Math.asin(-ry)*180/Math.PI,lon:Math.atan2(rx,z)*180/Math.PI,shade:Math.max(.12,nx*-.35+ny*-.4+z*.84),seed:seed++});
    }
  }
  function draw(now){
    frame=0;const moving=running();const dt=moving&&previous!==null?Math.min(now-previous,80):0;previous=moving?now:null;
    elapsed+=dt;buildTime+=dt;if(moving)rotation+=dt*.000065;
    if(moving&&now-lastDraw<40){frame=requestAnimationFrame(draw);return;}lastDraw=now;
    ctx.clearRect(0,0,width,height);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='8px "Courier New",monospace';
    const light=document.documentElement.dataset.theme==='light',t=elapsed/1000;
    const bloom=ctx.createRadialGradient(width/2,height/2,radius*.7,width/2,height/2,radius*1.32);
    bloom.addColorStop(0,light?'rgba(112,13,37,.08)':'rgba(143,185,182,.1)');bloom.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bloom;ctx.fillRect(0,0,width,height);
    for(const p of cells){
      let lon=((p.lon+rotation*180/Math.PI+540)%360)-180;
      const land=p.lat<-74||polygons.some(shape=>inside(lon,p.lat,shape));
      const build=reduce.matches?1:ease((buildTime/1000-random(p.seed)*1.2)/2.6);
      const angle=random(p.seed+3000)*Math.PI*2;
      const scatter=radius*(1.2+random(p.seed+5000));
      const x=width/2+p.x*build+Math.cos(angle)*scatter*(1-build),y=height/2+p.y*build+Math.sin(angle)*scatter*.65*(1-build);
      const alpha=(.2+p.shade*.78)*(.25+.75*build);
      const glyph=land?'01{}#'[p.seed%5]:'.:~'[Math.floor(p.shade*2.9)];
      const color=light?(land?'112,13,37':'73,111,118'):(land?'228,204,159':'112,167,175');
      ctx.fillStyle=`rgba(${color},${alpha})`;ctx.fillText(glyph,x,y);
    }
    if(moving)frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);previous=null;lastDraw=-Infinity;pause.textContent=paused?'Resume Earth':'Pause Earth';pause.setAttribute('aria-pressed',String(paused));draw(performance.now());}
  function resize(){prepare();sync();}
  pause.addEventListener('click',()=>{paused=!paused;sync();});
  reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(section,{attributes:true,attributeFilter:['hidden']});new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if('IntersectionObserver'in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(scene);else visible=true;
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(canvas);else window.addEventListener('resize',resize);
  resize();
})();
