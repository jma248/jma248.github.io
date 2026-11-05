// Canvas studies for comparing four home introduction directions.
(() => {
  const ease = value => { const x=Math.max(0,Math.min(1,value));return x*x*(3-2*x); };
  function silk(ctx,{width:w,height:h,t,pointer,reveal}) {
    const opening=ease((t-.8)/3.1);
    const mouse=pointer.active?(pointer.x-w/2)/w:0;
    ctx.save();
    // Layered, shaded strips give each ribbon a satin-like fold.
    for(let side of [-1,1])for(let i=0;i<9;i++) {
      const breadth=w*(.15+i*.008);
      const base=w/2+side*(opening*w*.47+i*11);
      const wave=Math.sin(t*.55+i*.45)*22+mouse*35;
      const x=base+wave;
      const gradient=ctx.createLinearGradient(x-breadth,0,x+breadth,0);
      const cream=i%4===0;
      gradient.addColorStop(0,cream?'#735140':'#23050e');
      gradient.addColorStop(.26,cream?'#dbc4a4':'#701a37');
      gradient.addColorStop(.44,cream?'#fff1d5':'#bb6c88');
      gradient.addColorStop(.55,cream?'#d6b894':'#66132d');
      gradient.addColorStop(1,cream?'#806048':'#28060f');
      ctx.globalAlpha=.8-reveal*.22;ctx.fillStyle=gradient;
      ctx.beginPath();ctx.moveTo(x-breadth,-h*.2);
      ctx.bezierCurveTo(x+side*w*.3,h*.15,x-side*w*.28,h*.62,x-breadth*.35,h*1.2);
      ctx.lineTo(x+breadth*.6,h*1.2);
      ctx.bezierCurveTo(x-side*w*.22,h*.65,x+side*w*.34,h*.2,x+breadth*.3,-h*.2);
      ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
  function chrome(ctx,{width:w,height:h,t,reveal,pointer}) {
    const cx=w/2,cy=h*.43,size=Math.min(w*.43,280);
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,size);
    glow.addColorStop(0,'rgba(193,103,137,.22)');glow.addColorStop(1,'rgba(53,6,15,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    ctx.save();ctx.translate(cx,cy);ctx.globalAlpha=1-ease((t-3.3)/1.3);
    const tilt=pointer.active?(pointer.x-cx)/w*.08:Math.sin(t*.6)*.025;
    ctx.rotate(tilt);
    // Metallic gradient bands travel across the initials like a studio reflection.
    const sweep=Math.sin(t*.65)*size*.12;
    const metal=ctx.createLinearGradient(-size*.6+sweep,-size*.5,size*.6+sweep,size*.5);
    [[0,'#482032'],[.18,'#c18499'],[.3,'#ffe8ce'],[.4,'#f9dcd6'],[.46,'#6c334b'],[.53,'#2c0e1e'],[.67,'#dba7ab'],[.78,'#fff4e0'],[1,'#9e5b76']].forEach(([offset,color])=>metal.addColorStop(offset,color));
    ctx.font=`italic ${size}px Georgia, serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.scale(.82+.18*ease(t/2.4),.82+.18*ease(t/2.4));
    ctx.shadowBlur=24;ctx.shadowColor='rgba(190,93,130,.3)';
    ctx.strokeStyle='#e6b7ba';ctx.lineWidth=1;ctx.setLineDash([size*5]);ctx.lineDashOffset=size*5*(1-ease(t/2));ctx.strokeText('JA',0,0);
    ctx.setLineDash([]);ctx.globalAlpha*=ease((t-.8)/2);ctx.fillStyle=metal;ctx.fillText('JA',0,0);
    ctx.restore();
    ctx.save();ctx.globalAlpha=(1-reveal)*.2;ctx.strokeStyle='#d1a0ae';ctx.lineWidth=.7;
    ctx.beginPath();ctx.ellipse(cx,cy,size*.8,size*.43,-.3+t*.025,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  function blueprint(ctx,{width:w,height:h,t,reveal}) {
    const cx=w/2,cy=h*.43,size=Math.min(260,w*.42),fade=1-ease((t-3.6)/1.2);
    ctx.save();ctx.globalAlpha=fade;
    ctx.strokeStyle='rgba(222,189,171,.1)';ctx.lineWidth=.5;
    for(let x=0;x<w;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
    for(let y=0;y<h;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.translate(cx,cy);ctx.font=`${size}px Georgia, serif`;ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.strokeStyle='#f0d8bc';ctx.lineWidth=1.2;ctx.setLineDash([size*5]);ctx.lineDashOffset=size*5*(1-ease(t/2.5));ctx.strokeText('JA',0,0);ctx.setLineDash([]);
    ctx.globalAlpha=fade*ease((t-2)/1.4);ctx.fillStyle='#e4cfb8';ctx.fillText('JA',0,0);
    ctx.globalAlpha=fade*.4;ctx.strokeStyle='#bd809b';ctx.lineWidth=.7;
    for(const [x,y] of [[-size*.66,-size*.55],[size*.66,-size*.55],[-size*.66,size*.55],[size*.66,size*.55]]){
      ctx.beginPath();ctx.moveTo(x-9,y);ctx.lineTo(x+9,y);ctx.moveTo(x,y-9);ctx.lineTo(x,y+9);ctx.stroke();
    }
    ctx.setLineDash([3,8]);ctx.strokeRect(-size*.66,-size*.55,size*1.32,size*1.1);ctx.setLineDash([]);
    ctx.font='9px monospace';ctx.fillStyle='#ddc2ad';ctx.fillText('IDEA → STRUCTURE → IDENTITY',0,size*.73);
    ctx.restore();
  }
  function typography(ctx,{width:w,height:h,t,reveal,particles,pointer,animate}) {
    const radius=Math.min(w*.4,h*.48),gather=ease((t-1.3)/3.1),fade=1-ease((t-4.5)/1.5);
    const letters='JANAABOSHOUEEB';
    ctx.textAlign='center';ctx.textBaseline='middle';
    for(let i=0;i<particles.length;i++){
      const p=particles[i];
      const latitude=Math.acos(2*p.seed-1),angle=p.angle+t*.58;
      const x=Math.sin(latitude)*Math.cos(angle)*radius,y=Math.cos(latitude)*radius*.8,z=Math.sin(latitude)*Math.sin(angle)*radius;
      const perspective=700/(700+z);
      let tx=w/2+x*perspective,ty=h*.43+y*perspective;
      tx+=(p.target.x-tx)*gather;ty+=(p.target.y-ty)*gather;
      if(pointer.active&&animate){const dx=tx-pointer.x,dy=ty-pointer.y,d=Math.hypot(dx,dy);if(d>0&&d<90){tx+=dx/d*(90-d)*.35;ty+=dy/d*(90-d)*.35;}}
      const [r,g,b]=p.color;ctx.fillStyle=`rgba(${r},${g},${b},${fade*(.25+p.seed*.65)})`;
      ctx.font=`${(5+p.radius*7)*perspective}px Georgia,serif`;ctx.fillText(letters[i%letters.length],tx,ty);
    }
  }
  window.portfolioIntroVariants={silk,chrome,blueprint,typography};
})();
