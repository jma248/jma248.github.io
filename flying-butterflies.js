// Curved wing surfaces projected in 3D, with theme-aware light and soft trails.
(() => {
  const canvas=document.querySelector('#flying-butterflies');
  const ctx=canvas?.getContext('2d');if(!ctx)return;
  const toggle=document.querySelector('.butterfly-toggle');
  const home=document.querySelector('#home');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let width=1,height=1,elapsed=0,previous=null,frame=0,lastDraw=-Infinity,paused=false;
  const perches=[];
  let candidates=[],lastSearch=-Infinity;
  const running=()=>home.hidden&&!paused&&!reduce.matches&&!document.hidden;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const palettes={
    light:{base:[88,6,29],edge:[112,13,37],shine:[170,54,87],halo:'rgba(112,13,37,.12)',glow:'#700d25',body:'#49091d'},
    dark:{base:[167,101,27],edge:[241,192,96],shine:[255,244,202],halo:'rgba(247,193,102,.18)',glow:'#ffdc93',body:'#e6bc74'}
  };
  function cubic(a,b,c,d,t){const u=1-t;return [u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]];}
  const segments=[[[0,0],[5,-24],[26,-48],[39,-44]],[[39,-44],[56,-24],[44,-2],[11,4]],[[11,4],[37,3],[36,27],[20,33]],[[20,33],[6,34],[3,12],[0,0]]];
  const boundary=[];
  for(const segment of segments)for(let i=0;i<14;i++)boundary.push(cubic(...segment,i/14));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  function landing(t,i){
    if(!perches[i]?.point)return 0;
    if(reduce.matches)return 1;
    const phase=(t+i*3)%16;
    return smooth((phase-2)/3)*(1-smooth((phase-10)/3));
  }
  function refreshPerches(t){
    if(t-lastSearch>.5||!candidates.length){
      candidates=Array.from(document.querySelectorAll('main > section:not([hidden]) .skill-card, main > section:not([hidden]) .project-card:not([hidden]), main > section:not([hidden]) .timeline-item, main > section:not([hidden]) .contact-link, main > section:not([hidden]) .curiosity, main > section:not([hidden]) .board-code, main > section:not([hidden]) .create-scene')).filter(element=>{
        const r=element.getBoundingClientRect();return r.width>30&&r.height>20&&r.top>35&&r.top<height-45&&r.right>30&&r.right<width+10;
      });lastSearch=t;
    }
    for(let i=0;i<(width<650?2:3);i++){
      const cycle=Math.floor((t+i*3)/16);
      if(!perches[i]||perches[i].cycle!==cycle||!candidates.includes(perches[i].element)){
        perches[i]={cycle,element:candidates.length?candidates[(cycle+i)%candidates.length]:null};
      }
      const perch=perches[i],r=perch.element?.getBoundingClientRect();
      perch.point=r&&r.width&&r.top>20&&r.top<height-25?[Math.max(22,Math.min(width-22,r.right-14)),r.top+2]:null;
    }
  }
  function position(t,i){
    const phase=i*2.1;
    const free=[width*(.5+.37*Math.sin(t*.105+phase)),height*(.48+.34*Math.sin(t*.165+phase*1.4))];
    const weight=landing(t,i),point=perches[i]?.point;
    return point?free.map((value,index)=>value+(point[index]-value)*weight):free;
  }
  function butterfly(t,i,palette){
    const [cx,cy]=position(t,i);
    const resting=landing(t,i);
    const scale=(width<650?.24:i===1?.34:.28)*(1+.08*Math.sin(t*.3+i));
    const roll=(Math.sin(t*.165+i*2.1)*.3-.25)*(1-resting)+resting*.28;
    const yaw=Math.sin(t*.45+i)*(.45-resting*.3);
    const flightBeat=.35+.92*(.5+.5*Math.sin(t*4.8+i*1.7));
    const restBeat=.22+.12*(.5+.5*Math.sin(t*1.8+i));
    const beat=reduce.matches?.45:flightBeat+(restBeat-flightBeat)*resting;
    function vertex(x,y,r,side){
      const wx=x*r*side,wy=y*r;
      const curve=Math.sin(r*Math.PI)*9+Math.sin(y*.055)*r*3;
      const fold=side*beat;
      let px=wx*Math.cos(fold)+curve*Math.sin(fold),pz=-wx*Math.sin(fold)+curve*Math.cos(fold);
      const rotatedX=px*Math.cos(yaw)+pz*Math.sin(yaw);pz=-px*Math.sin(yaw)+pz*Math.cos(yaw);
      const perspective=330/(330-pz);
      return {x:cx+(rotatedX*Math.cos(roll)-wy*Math.sin(roll))*scale*perspective,y:cy+(rotatedX*Math.sin(roll)+wy*Math.cos(roll))*scale*perspective,z:pz,nx:rotatedX,ny:wy};
    }
    function normal(a,b,c){
      const u=[b.nx-a.nx,b.ny-a.ny,b.z-a.z],v=[c.nx-a.nx,c.ny-a.ny,c.z-a.z];
      let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
      const length=Math.hypot(...n)||1;n=n.map(x=>x/length);if(n[2]<0)n=n.map(x=>-x);
      return clamp(n[0]*-.28+n[1]*-.5+n[2]*.82);
    }
    const aura=ctx.createRadialGradient(cx,cy,0,cx,cy,72*scale);
    aura.addColorStop(0,palette.halo);aura.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=aura;ctx.fillRect(cx-80*scale,cy-80*scale,160*scale,160*scale);
    // A blurred silhouette supplies bloom underneath the detailed curved surfaces.
    for(const side of [-1,1]){
      const outline=boundary.map(([x,y])=>vertex(x,y,1,side));
      ctx.save();ctx.shadowColor=palette.glow;ctx.shadowBlur=16*scale;ctx.fillStyle=palette.halo;
      ctx.beginPath();outline.forEach((p,j)=>j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill();ctx.restore();
    }
    const faces=[];
    for(const side of [-1,1])for(let ring=0;ring<5;ring++)for(let j=0;j<boundary.length;j++){
      const next=(j+1)%boundary.length,[x,y]=boundary[j],[xx,yy]=boundary[next];
      const a=vertex(x,y,ring/5,side),b=vertex(xx,yy,ring/5,side),c=vertex(xx,yy,(ring+1)/5,side),d=vertex(x,y,(ring+1)/5,side);
      faces.push({v:[a,b,c],r:(ring+.5)/5},{v:[a,c,d],r:(ring+.5)/5});
    }
    faces.sort((a,b)=>a.v.reduce((s,p)=>s+p.z,0)-b.v.reduce((s,p)=>s+p.z,0));
    for(const face of faces){
      const light=normal(...face.v),specular=Math.pow(light,10)*.75;
      const blend=.22+light*.55,edge=Math.pow(face.r,3)*.18;
      const color=palette.base.map((base,k)=>Math.round(base+(palette.edge[k]-base)*blend+(palette.shine[k]-palette.edge[k])*specular+edge*25));
      const lightTheme=document.documentElement.dataset.theme==='light';
      ctx.fillStyle=`rgba(${color.join(',')},${lightTheme?.38:.2})`;ctx.strokeStyle=`rgba(${palette.edge.join(',')},${lightTheme?.48:.36})`;ctx.lineWidth=.25;
      ctx.beginPath();face.v.forEach((p,j)=>j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill();ctx.stroke();
    }
    // Trace the silhouette once so the transparent wings retain delicate edges.
    ctx.save();ctx.strokeStyle=palette.glow;ctx.lineWidth=.65;ctx.globalAlpha=.75;
    for(const side of [-1,1]){
      ctx.beginPath();boundary.forEach(([x,y],j)=>{const p=vertex(x,y,1,side);if(j)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);});ctx.closePath();ctx.stroke();
    }
    ctx.restore();
    // Fine wing veins follow the same projection instead of floating above it.
    ctx.save();ctx.strokeStyle=palette.glow;ctx.globalAlpha=.24;ctx.lineWidth=.55;
    for(const side of [-1,1])for(const index of [8,16,24,34,44]){
      const [x,y]=boundary[index];ctx.beginPath();for(let j=0;j<=12;j++){const p=vertex(x,y,j/12,side);if(j)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y);}ctx.stroke();
    }
    ctx.restore();
    ctx.save();ctx.translate(cx,cy);ctx.rotate(roll);ctx.scale(scale,scale);
    ctx.shadowColor=palette.glow;ctx.shadowBlur=7;ctx.strokeStyle=palette.body;ctx.lineWidth=3.1;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(0,-10);ctx.quadraticCurveTo(-2,3,0,20);ctx.stroke();
    ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(0,-9);ctx.quadraticCurveTo(-5,-19,-10,-20);ctx.moveTo(0,-9);ctx.quadraticCurveTo(5,-19,10,-20);ctx.stroke();ctx.restore();
    if(!reduce.matches&&resting<.98)for(let j=1;j<=6;j++){
      const [x,y]=position(Math.max(0,t-j*.16),i),alpha=(1-j/7)*.25*(1-resting);
      ctx.fillStyle=`rgba(${palette.edge.join(',')},${alpha})`;ctx.beginPath();ctx.arc(x+Math.sin(j*3+i)*4,y+Math.cos(j*4)*4,.6+(j%2)*.4,0,Math.PI*2);ctx.fill();
    }
  }
  function draw(now){
    frame=0;const animate=running();if(animate&&previous!==null)elapsed+=Math.min(now-previous,80);previous=animate?now:null;
    if(animate&&now-lastDraw<32){frame=requestAnimationFrame(draw);return;}lastDraw=now;
    ctx.clearRect(0,0,width,height);if(!home.hidden)return;
    refreshPerches(elapsed/1000);
    const palette=palettes[document.documentElement.dataset.theme==='light'?'light':'dark'];
    for(let i=0;i<(width<650?2:3);i++)butterfly(elapsed/1000,i,palette);
    if(animate)frame=requestAnimationFrame(draw);
  }
  function sync(){cancelAnimationFrame(frame);previous=null;lastDraw=-Infinity;toggle.hidden=!home.hidden;toggle.disabled=reduce.matches;toggle.textContent=paused||reduce.matches?'Resume butterflies':'Pause butterflies';toggle.setAttribute('aria-pressed',String(paused||reduce.matches));draw(performance.now());}
  function resize(){width=window.innerWidth;height=window.innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);sync();}
  toggle.addEventListener('click',()=>{paused=!paused;sync();});reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(home,{attributes:true,attributeFilter:['hidden']});
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  window.addEventListener('scroll',()=>{lastSearch=-Infinity;},{passive:true});
  window.addEventListener('resize',resize);resize();
})();
