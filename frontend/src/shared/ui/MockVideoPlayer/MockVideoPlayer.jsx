import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize2, FiMinimize2, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import './MockVideoPlayer.css';

const SCENES = [
  { id:1,  tag:'NEURAL GENESIS',    title:'The Awakening',              subtitle:'In the darkness of the network, a new intelligence stirs. Forty-two billion connections forming in silence.',                                                 duration:8, accentColor:'#00e5ff', bgGlow:'rgba(0,100,255,0.04)'   },
  { id:2,  tag:'COMMAND CENTER',    title:'One Intelligent Platform',   subtitle:'A unified AI Operations Center spanning every continent — monitoring, predicting, and protecting in real time.',                                               duration:8, accentColor:'#2563eb', bgGlow:'rgba(37,99,235,0.05)'   },
  { id:3,  tag:'INCIDENT INTAKE',   title:'User Creates a Request',     subtitle:'A customer reports a fiber outage in Sector 5. The moment of submission triggers the entire NEXORA AI pipeline.',                                            duration:7, accentColor:'#00e5ff', bgGlow:'rgba(0,229,255,0.04)'   },
  { id:4,  tag:'COGNITIVE ANALYSIS',title:'AI Receives the Request',    subtitle:'The ticket enters neural pathways — priority, urgency, location, and network topology assessed in 0.003 seconds.',                                           duration:7, accentColor:'#a78bfa', bgGlow:'rgba(167,139,250,0.04)' },
  { id:5,  tag:'SMART ASSIGNMENT',  title:'AI Decision Engine',         subtitle:'Thousands of configurations evaluated. Skill-match, live traffic, distance, and availability — converging on one answer.',                                    duration:7, accentColor:'#10b981', bgGlow:'rgba(16,185,129,0.04)'  },
  { id:6,  tag:'FIELD DISPATCH',    title:'Engineer Receives Task',     subtitle:'ENG_PRIYA_S gets a futuristic notification. Route initialized. Status pulsing from Assigned to On Site.',                                                     duration:7, accentColor:'#f59e0b', bgGlow:'rgba(245,158,11,0.04)'  },
  { id:7,  tag:'LIVE TELEMETRY',    title:'Real-time Resolution',       subtitle:'Every repair log streams directly to the dashboard. SLA threats drop to zero. Satisfaction scores climb.',                                                      duration:7, accentColor:'#00e5ff', bgGlow:'rgba(0,229,255,0.04)'   },
  { id:8,  tag:'FEATURE HOLOGRAM',  title:'Infinite Capabilities',      subtitle:'Predictive maintenance. Self-healing networks. Smart dispatch. Real-time analytics. All running autonomously.',                                                duration:7, accentColor:'#818cf8', bgGlow:'rgba(129,140,248,0.04)' },
  { id:9,  tag:'FUTURE VISION',     title:'The Connected World',        subtitle:'Telecom towers, orbital satellites, and fiber grids — all orchestrated under a single NEXORA AI brain.',                                                       duration:7, accentColor:'#00e5ff', bgGlow:'rgba(0,229,255,0.04)'   },
  { id:10, tag:'NEXORA AI',         title:'Intelligent Telecom Ops',    subtitle:'The future of telecom begins here. Powered by Artificial Intelligence.',                                                                                        duration:7, accentColor:'#00e5ff', bgGlow:'rgba(0,229,255,0.06)'   },
];

const TOTAL_DURATION = SCENES.reduce(function(s, sc){ return s + sc.duration; }, 0);

function rotX(x,y,z,a){ var c=Math.cos(a),s=Math.sin(a); return [x, y*c-z*s, y*s+z*c]; }
function rotY(x,y,z,a){ var c=Math.cos(a),s=Math.sin(a); return [x*c+z*s, y, -x*s+z*c]; }

function glowText(ctx, text, x, y, color, blur, font, align){
  align = align||'center';
  ctx.save(); ctx.font=font; ctx.textAlign=align;
  ctx.shadowColor=color; ctx.shadowBlur=blur; ctx.fillStyle=color;
  ctx.fillText(text,x,y); ctx.restore();
}

function glassCard(ctx, x, y, w, h, r, borderColor, fillAlpha){
  fillAlpha = (fillAlpha!==undefined)?fillAlpha:0.18;
  ctx.save();
  ctx.shadowBlur=20; ctx.shadowColor=borderColor;
  ctx.fillStyle='rgba(5,15,35,'+fillAlpha+')';
  ctx.strokeStyle=borderColor; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fill(); ctx.stroke();
  ctx.restore();
}

function fmtTime(s){ var m=Math.floor(s/60),sec=Math.floor(s%60); return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); }
function fmtNow(t){ var h=9,m=Math.floor(t%60),sec=Math.floor((t*10)%60); return h+':'+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); }

// ── SCENE 1: NEURAL GENESIS ──────────────────────────────────────────────────
function drawScene1(ctx, p, t, W, H, st){
  var nodes=st.nodes, converge=Math.max(0,(p-0.45)/0.55);
  nodes.forEach(function(n){
    n.x+=n.vx*(1-converge*0.95); n.y+=n.vy*(1-converge*0.95); n.pulse+=0.05;
    if(Math.abs(n.x)>380)n.vx*=-1; if(Math.abs(n.y)>200)n.vy*=-1;
    var tx=Math.sin(n.x*0.03+t*0.4)*50, ty=Math.cos(n.y*0.03+t*0.3)*15;
    var cx=n.x*(1-converge)+tx*converge, cy=n.y*(1-converge)+ty*converge;
    var pulse=0.5+0.5*Math.sin(n.pulse);
    ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=6*pulse;
    ctx.fillStyle='rgba(0,229,255,'+(0.3+0.5*pulse)+')';
    ctx.beginPath(); ctx.arc(cx,cy,n.size,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
  for(var i=0;i<nodes.length;i++){
    for(var j=i+1;j<nodes.length;j++){
      var dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y, d=Math.sqrt(dx*dx+dy*dy);
      if(d<70){
        var f=converge;
        var x1=nodes[i].x*(1-f)+Math.sin(nodes[i].x*0.03+t*0.4)*50*f;
        var y1=nodes[i].y*(1-f)+Math.cos(nodes[i].y*0.03+t*0.3)*15*f;
        var x2=nodes[j].x*(1-f)+Math.sin(nodes[j].x*0.03+t*0.4)*50*f;
        var y2=nodes[j].y*(1-f)+Math.cos(nodes[j].y*0.03+t*0.3)*15*f;
        ctx.save(); ctx.strokeStyle='rgba(0,140,255,'+((1-d/70)*0.2)+')'; ctx.lineWidth=0.6;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore();
      }
    }
  }
  if(p>0.5){
    var o=Math.min(1,(p-0.5)/0.3);
    ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=35*o;
    ctx.fillStyle='rgba(255,255,255,'+o+')'; ctx.font='bold '+(28+6*o)+"px 'Sora',sans-serif";
    ctx.textAlign='center'; ctx.fillText('NEXORA AI',0,-8);
    ctx.shadowBlur=12; ctx.fillStyle='rgba(0,229,255,'+(o*0.85)+')';
    ctx.font='9px monospace'; ctx.fillText('THE FUTURE OF TELECOM INTELLIGENCE',0,18);
    ctx.shadowBlur=0; ctx.strokeStyle='rgba(0,229,255,'+(o*0.6)+')'; ctx.lineWidth=0.8;
    var lw=80*o;
    ctx.beginPath(); ctx.moveTo(-lw-120,0); ctx.lineTo(-120,0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(120,0); ctx.lineTo(120+lw,0); ctx.stroke();
    ctx.restore();
  }
  if(p<0.5){
    var lines=['> NEXORA_AI.BOOT // INITIALIZING NEURAL ENGINE','> LOADING_MODULES: '+Math.floor(p*200)+' / 200','> ESTABLISHING GLOBAL_NETWORK_LINK...',p>0.2?'> CONNECTION: ESTABLISHED':'> CONNECTION: SEARCHING...',p>0.35?'> AI_CONSCIOUSNESS: ONLINE':'> AI_CONSCIOUSNESS: STARTING...'];
    ctx.save(); ctx.font='7px monospace'; ctx.textAlign='left';
    lines.forEach(function(line,i){ if(p>i*0.08){ ctx.fillStyle='rgba(0,229,255,'+(0.5-i*0.06)+')'; ctx.fillText(line,-W/2+20,-H/2+55+i*12); } });
    ctx.restore();
  }
}

// ── SCENE 2: COMMAND CENTER 3D GLOBE ─────────────────────────────────────────
function drawScene2(ctx, p, t, W, H, st){
  st.globeAngle+=0.006;
  var ga=st.globeAngle, tilt=0.35, scale=Math.min(W,H)*0.32, verts=st.globeVerts, N=20;
  var projected=verts.map(function(v){
    var r=rotY(v[0],v[1],v[2],ga); r=rotX(r[0],r[1],r[2],tilt);
    var fov=500, pS=fov/(fov+r[2]*scale+scale*0.5);
    return {px:r[0]*scale*pS, py:r[1]*scale*pS, ps:pS, z:r[2]};
  });
  ctx.save();
  for(var i=0;i<verts.length;i++){
    if(projected[i].z<-0.1)continue;
    var row=Math.floor(i/N), col=i%N;
    if(col<N-1&&projected[i+1]&&projected[i+1].z>=-0.1){
      ctx.strokeStyle='rgba(0,180,255,'+(0.04+projected[i].ps*0.06)+')'; ctx.lineWidth=0.4;
      ctx.beginPath(); ctx.moveTo(projected[i].px,projected[i].py); ctx.lineTo(projected[i+1].px,projected[i+1].py); ctx.stroke();
    }
    if(row<N-1&&projected[i+N]&&projected[i+N].z>=-0.1){
      ctx.strokeStyle='rgba(37,99,235,'+(0.04+projected[i].ps*0.05)+')'; ctx.lineWidth=0.3;
      ctx.beginPath(); ctx.moveTo(projected[i].px,projected[i].py); ctx.lineTo(projected[i+N].px,projected[i+N].py); ctx.stroke();
    }
    var glow=projected[i].z>0.3;
    ctx.fillStyle=glow?'rgba(0,229,255,0.7)':'rgba(37,99,235,0.25)';
    ctx.beginPath(); ctx.arc(projected[i].px,projected[i].py,glow?1.8:0.7,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();
  var arcs=[{from:10,to:150,color:'#00e5ff'},{from:55,to:210,color:'#2563eb'},{from:88,to:320,color:'#a78bfa'},{from:120,to:45,color:'#00e5ff'}];
  arcs.forEach(function(arc,ai){
    var p1=projected[arc.from%projected.length], p2=projected[arc.to%projected.length];
    if(!p1||!p2||p1.z<0||p2.z<0)return;
    var anim=((t*0.3+ai*0.25)%1), mX=(p1.px+p2.px)/2-30, mY=(p1.py+p2.py)/2-30;
    ctx.save(); ctx.shadowColor=arc.color; ctx.shadowBlur=8;
    ctx.strokeStyle=arc.color; ctx.globalAlpha=0.5; ctx.lineWidth=1.2;
    ctx.setLineDash([4,8]); ctx.lineDashOffset=-anim*60;
    ctx.beginPath(); ctx.moveTo(p1.px,p1.py); ctx.quadraticCurveTo(mX,mY,p2.px,p2.py); ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha=1;
    var bx=(1-anim)*(1-anim)*p1.px+2*(1-anim)*anim*mX+anim*anim*p2.px;
    var by=(1-anim)*(1-anim)*p1.py+2*(1-anim)*anim*mY+anim*anim*p2.py;
    ctx.fillStyle=arc.color; ctx.shadowBlur=15; ctx.beginPath(); ctx.arc(bx,by,2.5,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
  if(p>0.25){
    var po=Math.min(1,(p-0.25)/0.3);
    glassCard(ctx,-W/2+18,-60,110,120,6,'rgba(0,229,255,'+(po*0.25)+')',0.15);
    ctx.save(); ctx.textAlign='left';
    ctx.fillStyle='rgba(0,229,255,'+(po*0.8)+')'; ctx.font='bold 6px monospace'; ctx.fillText('NETWORK STATUS',-W/2+26,-48);
    var stats=[['UPTIME','99.97%','#10b981'],['LATENCY','2.3ms','#00e5ff'],['THROUGHPUT','148Gbps','#a78bfa'],['NODES_UP','4,291','#10b981']];
    stats.forEach(function(s,i){ ctx.fillStyle='rgba(148,163,184,'+(po*0.7)+')'; ctx.font='5px monospace'; ctx.fillText(s[0],-W/2+26,-30+i*18); ctx.fillStyle=s[2]; ctx.font='bold 8px monospace'; ctx.fillText(s[1],-W/2+26,-19+i*18); });
    ctx.restore();
  }
  if(p>0.65){
    var oo=Math.min(1,(p-0.65)/0.25);
    glowText(ctx,'ONE INTELLIGENT PLATFORM',0,-H/2+40,'rgba(255,255,255,'+oo+')',20,'bold 14px Sora,sans-serif');
    glowText(ctx,'UNLIMITED NETWORK VISIBILITY',0,-H/2+58,'rgba(0,229,255,'+(oo*0.8)+')',8,'500 9px monospace');
  }
}

// ── SCENE 3: USER REQUEST PORTAL ─────────────────────────────────────────────
function drawScene3(ctx,p,t,W,H,st){
  var tp=Math.min(1,p/0.55), submitted=p>0.62, burst=p>0.72?(p-0.72)/0.28:0;
  var cs=submitted?Math.max(0.02,1-burst*0.98):1, co=submitted?Math.max(0,1-burst*1.2):1;
  ctx.save(); ctx.scale(cs,cs); ctx.globalAlpha*=co;
  var CW=220,CH=155;
  glassCard(ctx,-CW/2,-CH/2,CW,CH,10,'rgba(0,180,255,0.3)',0.22);
  var hg=ctx.createLinearGradient(-CW/2,-CH/2,CW/2,-CH/2);
  hg.addColorStop(0,'rgba(37,99,235,0.5)'); hg.addColorStop(1,'rgba(0,229,255,0.2)');
  ctx.fillStyle=hg; ctx.beginPath(); ctx.roundRect(-CW/2,-CH/2,CW,22,[10,10,0,0]); ctx.fill();
  ctx.font='bold 6.5px monospace'; ctx.fillStyle='#00e5ff'; ctx.textAlign='left';
  ctx.fillText('NEXORA AI // SERVICE REQUEST PORTAL',-CW/2+10,-CH/2+14);
  var fields=[
    {label:'CUSTOMER_ID',val:'CUS_MH_004829',y:-CH/2+38},
    {label:'ISSUE_TYPE',val:'Fiber Outage - Sector 5, Noida',y:-CH/2+62,typing:true},
    {label:'PRIORITY',val:'CRITICAL',y:-CH/2+86},
    {label:'LOCATION',val:'28.5355 N, 77.3910 E',y:-CH/2+110},
  ];
  fields.forEach(function(f){
    ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='5px monospace'; ctx.textAlign='left';
    ctx.fillText(f.label,-CW/2+12,f.y);
    ctx.fillStyle='rgba(0,0,20,0.4)'; ctx.beginPath(); ctx.roundRect(-CW/2+10,f.y+3,CW-20,14,3); ctx.fill();
    ctx.strokeStyle='rgba(0,229,255,0.2)'; ctx.lineWidth=0.5; ctx.stroke();
    var display=f.val;
    if(f.typing){ var chars=Math.floor(tp*f.val.length); display=f.val.substring(0,chars)+(tp<1?'_':''); }
    ctx.fillStyle=f.label==='PRIORITY'?'#ef4444':'#e2e8f0'; ctx.font='bold 6px monospace';
    ctx.fillText(display,-CW/2+14,f.y+13);
  });
  if(tp>0.8){
    var bO=Math.min(1,(tp-0.8)/0.2), flash=submitted&&!burst;
    ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=flash?25:8;
    var bg2=ctx.createLinearGradient(-55,0,55,0);
    bg2.addColorStop(0,flash?'#00e5ff':'rgba(37,99,235,0.6)'); bg2.addColorStop(1,flash?'#a78bfa':'rgba(0,229,255,0.4)');
    ctx.fillStyle=bg2; ctx.globalAlpha*=bO; ctx.beginPath(); ctx.roundRect(-55,CH/2-28,110,18,4); ctx.fill();
    ctx.strokeStyle='#00e5ff'; ctx.lineWidth=0.8; ctx.stroke();
    ctx.fillStyle=flash?'#000':'#fff'; ctx.font='bold 6.5px monospace'; ctx.textAlign='center';
    ctx.fillText('SUBMIT REQUEST',0,CH/2-17); ctx.restore();
  }
  ctx.restore();
  if(burst>0){
    ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=20;
    for(var i=0;i<60;i++){
      var ang=(i/60)*Math.PI*2+Math.sin(i*1.3), rr=burst*(80+Math.random()*120);
      ctx.fillStyle='rgba('+(i%2===0?'0,229,255':'167,139,250')+','+Math.max(0,1-burst*1.2)+')';
      ctx.globalAlpha=Math.max(0,1-burst*1.2);
      ctx.beginPath(); ctx.arc(Math.cos(ang)*rr,Math.sin(ang)*rr,1.5,0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle='rgba(0,229,255,'+Math.max(0,1-burst*2)+')'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(0,0,burst*200,0,Math.PI*2); ctx.stroke(); ctx.restore();
  }
  if(burst>0.3){ var ob=Math.min(1,(burst-0.3)/0.3); glowText(ctx,'REQUEST DIGITIZED INTO NEXORA AI PIPELINE',0,30,'rgba(0,229,255,'+ob+')',15,'bold 9px monospace'); }
}

// ── SCENE 4: AI PIPELINE ─────────────────────────────────────────────────────
function drawScene4(ctx,p,t,W,H,st){
  var parts=st.pipeParticles;
  for(var i=0;i<12;i++){
    var rz=((i/12+(t*0.15%1))%1)*500, sc=350/(350+rz), rd=Math.max(2,150*sc), al=(1-rz/500)*0.12;
    var hu=i%3===0?'0,180,255':i%3===1?'167,139,250':'37,99,235';
    ctx.save(); ctx.strokeStyle='rgba('+hu+','+al+')'; ctx.lineWidth=0.6;
    ctx.beginPath(); ctx.arc(0,0,rd,0,Math.PI*2); ctx.stroke(); ctx.restore();
  }
  parts.forEach(function(pp){
    pp.z-=pp.speed*0.8; if(pp.z<=1)pp.z=300;
    var sc=300/(300+pp.z), px=Math.cos(pp.angle)*pp.r*120*sc, py=Math.sin(pp.angle)*pp.r*120*sc;
    var sz=Math.max(0.4,3*sc), al=Math.max(0,1-pp.z/300);
    ctx.save(); ctx.shadowColor=pp.color; ctx.shadowBlur=6;
    ctx.fillStyle=pp.color==='#a78bfa'?'rgba(167,139,250,'+al+')':'rgba(0,229,255,'+al+')';
    ctx.beginPath(); ctx.arc(px,py,sz,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
  var tags=[
    {thr:0.08,label:'URGENCY LEVEL',val:'CRITICAL - TIER 1',color:'#ef4444',x:-W/2+18,y:-80},
    {thr:0.22,label:'NETWORK_NODE',val:'SECT5-OLT-MH-42A',color:'#00e5ff',x:-W/2+18,y:-52},
    {thr:0.38,label:'SYS_STATUS',val:'FIBER_BREAK DETECTED',color:'#f59e0b',x:-W/2+18,y:-24},
    {thr:0.52,label:'AFFECTED_USERS',val:'1,247 SUBSCRIBERS',color:'#a78bfa',x:-W/2+18,y:4},
    {thr:0.66,label:'ENG_AVAILABLE',val:'8 QUALIFIED ENGINEERS',color:'#00e5ff',x:-W/2+18,y:32},
    {thr:0.80,label:'AI_CONFIDENCE',val:'99.1% MATCHED',color:'#10b981',x:-W/2+18,y:60},
  ];
  tags.forEach(function(tag){
    if(p<tag.thr)return;
    var to=Math.min(1,(p-tag.thr)/0.1);
    glassCard(ctx,tag.x-4,tag.y-13,165,22,3,'rgba(0,180,255,'+(to*0.2)+')',0.1);
    ctx.save(); ctx.fillStyle='rgba(148,163,184,'+(to*0.6)+')'; ctx.font='4.5px monospace'; ctx.textAlign='left';
    ctx.fillText(tag.label,tag.x+4,tag.y-4); ctx.fillStyle=tag.color; ctx.font='bold 7px monospace'; ctx.fillText(tag.val,tag.x+4,tag.y+7); ctx.restore();
  });
  var bv=[]; var ang=t*1.2;
  for(var ii=0;ii<8;ii++){ var lat=(ii/8)*Math.PI-Math.PI/2; for(var jj=0;jj<8;jj++){ var lon=(jj/8)*Math.PI*2; bv.push([Math.cos(lat)*Math.cos(lon)*30,Math.sin(lat)*30,Math.cos(lat)*Math.sin(lon)*30]); } }
  ctx.save(); ctx.translate(W/2-70,0);
  bv.forEach(function(v){ var r=rotY(v[0],v[1],v[2],ang); r=rotX(r[0],r[1],r[2],0.5); ctx.fillStyle=r[2]>0?'rgba(0,229,255,0.8)':'rgba(37,99,235,0.3)'; ctx.beginPath(); ctx.arc(r[0],r[1],r[2]>0?1.5:0.6,0,Math.PI*2); ctx.fill(); });
  glowText(ctx,'AI',0,6,'rgba(0,229,255,0.9)',20,'bold 14px Sora,sans-serif');
  glowText(ctx,'THINKING...',0,22,'rgba(0,229,255,0.6)',6,'5px monospace');
  ctx.restore();
}

// ── SCENE 5: SMART ASSIGNMENT RADAR ──────────────────────────────────────────
function drawScene5(ctx,p,t,W,H,st){
  st.radarAngle+=0.025; var ra=st.radarAngle;
  for(var r=25;r<=150;r+=25){ ctx.save(); ctx.strokeStyle='rgba(0,229,255,0.06)'; ctx.lineWidth=0.5; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
  ctx.save(); ctx.strokeStyle='rgba(0,229,255,0.05)'; ctx.lineWidth=0.5;
  [0,Math.PI/2,Math.PI,Math.PI*1.5].forEach(function(a){ ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*155,Math.sin(a)*155); ctx.stroke(); });
  ctx.restore();
  ctx.save();
  var sg=ctx.createLinearGradient(0,0,Math.cos(ra)*155,Math.sin(ra)*155);
  sg.addColorStop(0,'rgba(0,229,255,0.18)'); sg.addColorStop(1,'rgba(0,229,255,0)');
  ctx.fillStyle=sg; ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,155,ra-0.4,ra); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(0,229,255,0.45)'; ctx.lineWidth=1.2;
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(ra)*155,Math.sin(ra)*155); ctx.stroke(); ctx.restore();
  st.candidates.forEach(function(cand,ci){
    if(p<ci*0.12)return;
    var win=cand.match&&p>0.55, nc=win?'#10b981':'#00e5ff';
    if(win){ ctx.save(); ctx.strokeStyle='rgba(16,185,129,'+(0.3*(1-(t*2%1)))+')'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cand.x,cand.y,8+(t*40%25),0,Math.PI*2); ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.shadowColor=nc; ctx.shadowBlur=win?20:6; ctx.fillStyle=nc; ctx.beginPath(); ctx.arc(cand.x,cand.y,win?5.5:3.5,0,Math.PI*2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.strokeStyle=win?'rgba(16,185,129,0.2)':'rgba(0,229,255,0.1)'; ctx.setLineDash([3,6]); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(cand.x,cand.y); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    glassCard(ctx,cand.x+10,cand.y-22,110,44,4,win?'rgba(16,185,129,0.5)':'rgba(0,229,255,0.15)',0.12);
    ctx.save(); ctx.textAlign='left';
    ctx.fillStyle=win?'#10b981':'rgba(0,229,255,0.8)'; ctx.font='bold 5.5px monospace'; ctx.fillText(cand.name,cand.x+15,cand.y-12);
    ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='4.5px monospace'; ctx.fillText(cand.skill+' | '+cand.dist,cand.x+15,cand.y-2);
    ctx.fillStyle=win?'#10b981':'rgba(0,229,255,0.6)'; ctx.font='bold 7px monospace'; ctx.fillText('MATCH: '+cand.score+'%',cand.x+15,cand.y+12); ctx.restore();
  });
  if(p>0.6){
    var oo=Math.min(1,(p-0.6)/0.2);
    glassCard(ctx,-90,70,180,38,6,'rgba(16,185,129,'+(oo*0.6)+')',0.2);
    ctx.save(); ctx.shadowColor='#10b981'; ctx.shadowBlur=20*oo; ctx.textAlign='center';
    ctx.font='bold 7px monospace'; ctx.fillStyle='rgba(16,185,129,'+oo+')'; ctx.fillText('AI SMART ASSIGNMENT',0,84);
    ctx.fillStyle='rgba(255,255,255,'+(oo*0.8)+')'; ctx.font='5.5px monospace'; ctx.fillText('ENG_PRIYA_S  //  ROUTE INITIALIZED',0,98); ctx.restore();
  }
  if(p>0.35){
    var po=Math.min(1,(p-0.35)/0.25);
    var metrics=[['SKILL_MATCH','99.1%'],['DISTANCE','1.2 km'],['TRAFFIC','CLEAR'],['ETA','4 min']];
    glassCard(ctx,W/2-118,-80,100,75,5,'rgba(0,229,255,'+(po*0.2)+')',0.1);
    metrics.forEach(function(m,i){ ctx.save(); ctx.fillStyle='rgba(148,163,184,'+(po*0.7)+')'; ctx.font='4.5px monospace'; ctx.textAlign='left'; ctx.fillText(m[0],W/2-112,-66+i*18); ctx.fillStyle='rgba(0,229,255,'+po+')'; ctx.font='bold 8px monospace'; ctx.fillText(m[1],W/2-112,-55+i*18); ctx.restore(); });
  }
}

// ── SCENE 6: FIELD DISPATCH SMARTPHONE ───────────────────────────────────────
function drawScene6(ctx,p,t,W,H,st){
  var PW=90,PH=168, tx=Math.sin(t*0.5)*0.08, ty=Math.sin(t*0.3)*0.06;
  ctx.save(); ctx.transform(1,tx,ty,1,0,0);
  ctx.shadowColor='rgba(0,0,0,0.8)'; ctx.shadowBlur=40;
  ctx.fillStyle='#070f1a'; ctx.strokeStyle='rgba(0,180,255,0.35)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.roundRect(-PW/2,-PH/2,PW,PH,14); ctx.fill(); ctx.stroke(); ctx.shadowBlur=0;
  ctx.fillStyle='#050c16'; ctx.beginPath(); ctx.roundRect(-18,-PH/2+6,36,10,5); ctx.fill();
  var SW=PW-8,SH=PH-28;
  ctx.fillStyle='#020a18'; ctx.beginPath(); ctx.roundRect(-SW/2,-PH/2+20,SW,SH,6); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.roundRect(-SW/2,-PH/2+20,SW,SH,6); ctx.clip();
  ctx.strokeStyle='rgba(0,100,200,0.08)'; ctx.lineWidth=0.4;
  for(var gx=-SW/2;gx<SW/2;gx+=10){ ctx.beginPath(); ctx.moveTo(gx,-PH/2+20); ctx.lineTo(gx,-PH/2+20+SH); ctx.stroke(); }
  for(var gy=-PH/2+20;gy<-PH/2+20+SH;gy+=10){ ctx.beginPath(); ctx.moveTo(-SW/2,gy); ctx.lineTo(SW/2,gy); ctx.stroke(); }
  [[-25,-30,20,12],[10,-30,15,12],[-25,-10,10,18],[5,-10,20,10],[-25,18,15,10],[5,18,18,10]].forEach(function(b){
    ctx.fillStyle='rgba(37,99,235,0.08)'; ctx.fillRect(b[0],b[1],b[2],b[3]);
    ctx.strokeStyle='rgba(37,99,235,0.15)'; ctx.lineWidth=0.4; ctx.strokeRect(b[0],b[1],b[2],b[3]);
  });
  var s={x:-15,y:40},e={x:20,y:-42};
  ctx.strokeStyle='rgba(37,99,235,0.25)'; ctx.lineWidth=2.5; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(s.x,0); ctx.lineTo(e.x,0); ctx.lineTo(e.x,e.y); ctx.stroke(); ctx.setLineDash([]);
  var s1=p<0.33?p/0.33:1, s2=p>0.33&&p<0.66?(p-0.33)/0.33:(p>=0.66?1:0), s3=p>0.66?(p-0.66)/0.34:0;
  ctx.save(); ctx.strokeStyle='#00e5ff'; ctx.lineWidth=2.5; ctx.shadowColor='#00e5ff'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(s.x,s.y);
  if(s1<1){ctx.lineTo(s.x,s.y+(0-s.y)*s1);}else{ctx.lineTo(s.x,0);if(s2<1){ctx.lineTo(s.x+(e.x-s.x)*s2,0);}else{ctx.lineTo(e.x,0);ctx.lineTo(e.x,(e.y)*s3);}}
  ctx.stroke(); ctx.restore();
  var dx=s.x,dy=s.y;
  if(p<0.33)dy=s.y+(0-s.y)*(p/0.33);
  else if(p<0.66){dy=0;dx=s.x+(e.x-s.x)*((p-0.33)/0.33);}
  else{dx=e.x;dy=(e.y)*((p-0.66)/0.34);}
  ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=14; ctx.fillStyle='#00e5ff'; ctx.beginPath(); ctx.arc(dx,dy,3.5,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(0,229,255,'+(0.3*(1-(t*2%1)))+')'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(dx,dy,3.5+(t*15%10),0,Math.PI*2); ctx.stroke(); ctx.restore();
  ctx.save(); ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=10; ctx.beginPath(); ctx.arc(e.x,e.y,3,0,Math.PI*2); ctx.fill(); ctx.restore();
  var status='ASSIGNED',sc='#a78bfa';
  if(p>0.2){status='TRAVELLING';sc='#f59e0b';} if(p>0.6){status='ON SITE';sc='#10b981';} if(p>0.88){status='WORKING';sc='#00e5ff';}
  ctx.fillStyle='rgba(5,12,28,0.9)'; ctx.strokeStyle=sc; ctx.lineWidth=0.8;
  ctx.beginPath(); ctx.roundRect(-SW/2+4,SH/2-PH/2+20-20,SW-8,16,4); ctx.fill(); ctx.stroke();
  ctx.fillStyle=sc; ctx.font='bold 6px monospace'; ctx.textAlign='center'; ctx.shadowColor=sc; ctx.shadowBlur=8;
  ctx.fillText(status,0,SH/2-PH/2+20-9); ctx.restore(); ctx.restore();
  ctx.save(); ctx.transform(1,tx,ty,1,0,0); ctx.fillStyle='rgba(0,229,255,0.7)'; ctx.font='bold 5.5px monospace'; ctx.textAlign='center'; ctx.fillText('NEXORA AI // FIELD DISPATCH',0,-PH/2+30); ctx.restore();
  if(p<0.3){ var no=Math.min(1,p/0.1); glassCard(ctx,-W/2+15,-H/2+30,165,50,6,'rgba(0,229,255,'+(no*0.3)+')',0.2); ctx.save(); ctx.globalAlpha=no; ctx.fillStyle='#00e5ff'; ctx.font='bold 6px monospace'; ctx.textAlign='left'; ctx.fillText('NEW TASK ASSIGNED',-W/2+24,-H/2+46); ctx.fillStyle='rgba(203,213,225,0.8)'; ctx.font='5px monospace'; ctx.fillText('Fiber Outage - Sect 5, Noida',-W/2+24,-H/2+58); ctx.fillText('Priority: CRITICAL  |  ETA: 4 min',-W/2+24,-H/2+68); ctx.restore(); }
}

// ── SCENE 7: LIVE OPERATIONS DASHBOARD ───────────────────────────────────────
function drawScene7(ctx,p,t,W,H,st){
  var DW=Math.min(W*0.88,500),DH=Math.min(H*0.75,280),DX=-DW/2,DY=-DH/2;
  glassCard(ctx,DX,DY,DW,DH,10,'rgba(0,180,255,0.12)',0.1);
  var hg=ctx.createLinearGradient(DX,DY,DX+DW,DY); hg.addColorStop(0,'rgba(37,99,235,0.4)'); hg.addColorStop(1,'rgba(0,229,255,0.15)');
  ctx.fillStyle=hg; ctx.beginPath(); ctx.roundRect(DX,DY,DW,22,[10,10,0,0]); ctx.fill();
  ctx.fillStyle='#00e5ff'; ctx.font='bold 6.5px monospace'; ctx.textAlign='left'; ctx.fillText('NEXORA AI  //  OPERATIONS COMMAND CENTER  //  LIVE',DX+12,DY+14);
  ['#10b981','#f59e0b','#ef4444'].forEach(function(c,i){ ctx.fillStyle=c; ctx.beginPath(); ctx.arc(DX+DW-16-i*12,DY+11,3,0,Math.PI*2); ctx.fill(); });
  var kpis=[
    {label:'RESOLVED',val:Math.floor(p*234),color:'#10b981'},
    {label:'OPEN TICKETS',val:Math.max(0,Math.floor(28-p*24)),color:'#f59e0b'},
    {label:'AVG RESPONSE',val:(14.2-p*9.8).toFixed(1)+'m',color:'#00e5ff'},
    {label:'AI ACCURACY',val:(94+p*4.9).toFixed(1)+'%',color:'#a78bfa'},
    {label:'CSAT',val:(4.1+p*0.85).toFixed(2)+'x',color:'#10b981'},
  ];
  var kW=(DW-20)/kpis.length-4;
  kpis.forEach(function(kpi,i){
    var kx=DX+10+i*(kW+4), ky=DY+28;
    glassCard(ctx,kx,ky,kW,48,5,'rgba(0,180,255,0.15)',0.08);
    ctx.save(); ctx.fillStyle=kpi.color; ctx.font='bold 13px Sora,sans-serif'; ctx.textAlign='center'; ctx.shadowColor=kpi.color; ctx.shadowBlur=10; ctx.fillText(String(kpi.val),kx+kW/2,ky+28); ctx.shadowBlur=0; ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='4px monospace'; ctx.fillText(kpi.label,kx+kW/2,ky+41); ctx.restore();
  });
  var cX=DX+14,cY=DY+90,cW=DW*0.55,cH=80;
  glassCard(ctx,cX,cY,cW,cH,5,'rgba(0,180,255,0.1)',0.06);
  ctx.fillStyle='rgba(0,229,255,0.5)'; ctx.font='bold 5px monospace'; ctx.textAlign='left'; ctx.fillText('NETWORK EFFICIENCY  //  LIVE',cX+6,cY+12);
  var pts=st.chartHistory, pc=Math.max(2,Math.floor(p*pts.length)), ps=(cW-20)/(pts.length-1);
  ctx.save(); var ag=ctx.createLinearGradient(0,cY+20,0,cY+cH-10); ag.addColorStop(0,'rgba(0,229,255,0.15)'); ag.addColorStop(1,'rgba(0,229,255,0)'); ctx.fillStyle=ag;
  ctx.beginPath(); ctx.moveTo(cX+10,cY+cH-10);
  for(var i=0;i<pc;i++){ ctx.lineTo(cX+10+i*ps, cY+cH-10-(pts[i].efficiency/100)*(cH-25)); }
  ctx.lineTo(cX+10+(pc-1)*ps,cY+cH-10); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.strokeStyle='#00e5ff'; ctx.lineWidth=1.5; ctx.shadowColor='#00e5ff'; ctx.shadowBlur=8; ctx.beginPath();
  for(var i=0;i<pc;i++){ var ppx=cX+10+i*ps, ppy=cY+cH-10-(pts[i].efficiency/100)*(cH-25); i===0?ctx.moveTo(ppx,ppy):ctx.lineTo(ppx,ppy); }
  ctx.stroke(); var ldX=cX+10+(pc-1)*ps, ldY=cY+cH-10-(pts[pc-1].efficiency/100)*(cH-25); ctx.fillStyle='#00e5ff'; ctx.beginPath(); ctx.arc(ldX,ldY,3,0,Math.PI*2); ctx.fill(); ctx.restore();
  var bX=cX+cW+8,bY=cY,bW=DW-cW-30,bH=cH;
  glassCard(ctx,bX,bY,bW,bH,5,'rgba(0,180,255,0.1)',0.06);
  ctx.fillStyle='rgba(0,229,255,0.5)'; ctx.font='bold 5px monospace'; ctx.textAlign='left'; ctx.fillText('RESOLUTION RATE',bX+6,bY+12);
  [{label:'Fiber',pct:0.92,c:'#10b981'},{label:'Broadband',pct:0.78,c:'#2563eb'},{label:'SIM',pct:0.95,c:'#a78bfa'},{label:'Billing',pct:0.88,c:'#f59e0b'}].forEach(function(cat,ci){
    var by2=bY+22+ci*13;
    ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='4.5px monospace'; ctx.textAlign='left'; ctx.fillText(cat.label,bX+6,by2+7);
    ctx.fillStyle='rgba(255,255,255,0.05)'; ctx.fillRect(bX+38,by2,bW-60,7);
    ctx.fillStyle=cat.c; ctx.shadowColor=cat.c; ctx.shadowBlur=4; ctx.fillRect(bX+38,by2,(bW-60)*cat.pct*p,7); ctx.shadowBlur=0;
    ctx.fillStyle=cat.c; ctx.font='bold 4.5px monospace'; ctx.textAlign='right'; ctx.fillText(Math.floor(cat.pct*p*100)+'%',bX+bW-6,by2+7);
  });
  var lX=DX+10,lY=DY+DH-60,lW=DW-20,lH=50;
  glassCard(ctx,lX,lY,lW,lH,5,'rgba(0,180,255,0.1)',0.06);
  var logs=['['+fmtNow(t)+'] ENG_PRIYA_S fiber spliced - Sector 5 restored','['+fmtNow(t-0.6)+'] AI_ENGINE Ticket TKT-48291 closed - SLA met','['+fmtNow(t-1.2)+'] MONITOR Node MH-42A online - 1247 subscribers reconnected','['+fmtNow(t-1.8)+'] CSAT Customer feedback 4.9 received'];
  logs.forEach(function(log,li){ if(p>li*0.22){ ctx.fillStyle='rgba(0,229,255,'+(0.5-li*0.08)+')'; ctx.font='4.5px monospace'; ctx.textAlign='left'; ctx.fillText(log,lX+8,lY+12+li*10); } });
}

// ── SCENE 8: HOLOGRAM FEATURE CAROUSEL ───────────────────────────────────────
function drawScene8(ctx,p,t,W,H,st){
  st.carouselAngle+=0.012; var ca=st.carouselAngle, feats=st.features, rad=Math.min(W,H)*0.28;
  var fd=feats.map(function(f,i){ var a=ca+(i/feats.length)*Math.PI*2, x=Math.sin(a)*rad, z=Math.cos(a)*rad; return {name:f.name,icon:f.icon,color:f.color,x:x,z:z,depth:z}; });
  fd.sort(function(a,b){return a.depth-b.depth;});
  fd.forEach(function(f){
    var sc=280/(280+f.z+rad), cW=95*sc, cH=55*sc, cx=f.x*0.85, da=0.3+0.7*((-f.z+rad)/(2*rad));
    ctx.save(); ctx.translate(cx,-15*sc); ctx.scale(sc,sc);
    ctx.shadowColor=f.color; ctx.shadowBlur=20*da; ctx.fillStyle='rgba(5,15,40,'+(0.85*da)+')';
    ctx.strokeStyle=f.color; ctx.lineWidth=1;
    ctx.beginPath(); ctx.roundRect(-cW/2,-cH/2,cW,cH,8); ctx.fill();
    ctx.globalAlpha=da*0.5; ctx.stroke(); ctx.globalAlpha=1;
    ctx.font='16px sans-serif'; ctx.textAlign='center'; ctx.fillStyle=f.color; ctx.shadowColor=f.color; ctx.shadowBlur=10; ctx.fillText(f.icon,0,-8);
    ctx.shadowBlur=0; ctx.fillStyle='rgba(255,255,255,'+(da*0.9)+')'; ctx.font='bold 7px Sora,sans-serif'; ctx.fillText(f.name,0,10); ctx.restore();
  });
  var og=ctx.createRadialGradient(0,0,0,0,0,35); og.addColorStop(0,'rgba(0,229,255,0.25)'); og.addColorStop(0.6,'rgba(37,99,235,0.1)'); og.addColorStop(1,'rgba(0,0,0,0)');
  ctx.save(); ctx.fillStyle=og; ctx.beginPath(); ctx.arc(0,0,35,0,Math.PI*2); ctx.fill();
  ctx.shadowColor='#00e5ff'; ctx.shadowBlur=30; ctx.strokeStyle='rgba(0,229,255,0.4)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(0,0,30,0,Math.PI*2); ctx.stroke(); ctx.restore();
  glowText(ctx,'NX',0,6,'#00e5ff',20,'bold 16px Sora,sans-serif');
  glowText(ctx,'8 AI MODULES ACTIVE',0,H/2-25,'rgba(0,229,255,0.7)',6,'bold 7px monospace');
}

// ── SCENE 9: FUTURISTIC CITY + SATELLITES ─────────────────────────────────────
function drawScene9(ctx,p,t,W,H,st){
  st.cityAngle+=0.004; var ca=st.cityAngle, tilt=0.5, fov=400;
  ctx.save(); ctx.strokeStyle='rgba(0,100,255,0.06)'; ctx.lineWidth=0.4;
  for(var gx=-400;gx<=400;gx+=40){
    var r1=rotY(gx,80,-400,ca); r1=rotX(r1[0],r1[1],r1[2],tilt); var r2=rotY(gx,80,400,ca); r2=rotX(r2[0],r2[1],r2[2],tilt);
    var s1=fov/(fov+r1[2]),s2=fov/(fov+r2[2]); ctx.beginPath(); ctx.moveTo(r1[0]*s1,r1[1]*s1); ctx.lineTo(r2[0]*s2,r2[1]*s2); ctx.stroke();
  }
  for(var gz=-400;gz<=400;gz+=40){
    var r1=rotY(-400,80,gz,ca); r1=rotX(r1[0],r1[1],r1[2],tilt); var r2=rotY(400,80,gz,ca); r2=rotX(r2[0],r2[1],r2[2],tilt);
    var s1=fov/(fov+r1[2]),s2=fov/(fov+r2[2]); ctx.beginPath(); ctx.moveTo(r1[0]*s1,r1[1]*s1); ctx.lineTo(r2[0]*s2,r2[1]*s2); ctx.stroke();
  }
  ctx.restore();
  var pt=st.towers.map(function(tw){
    var b=rotY(tw.x,80,tw.z,ca); b=rotX(b[0],b[1],b[2],tilt);
    var top=rotY(tw.x,80-tw.h,tw.z,ca); top=rotX(top[0],top[1],top[2],tilt);
    var sb=fov/(fov+b[2]+1), st2=fov/(fov+top[2]+1);
    return {bx:b[0]*sb,by:b[1]*sb,tx:top[0]*st2,ty:top[1]*st2,w:tw.w*sb,bz:b[2],h:tw.h,phase:tw.phase};
  }).sort(function(a,b){return b.bz-a.bz;});
  pt.forEach(function(tw){
    if(tw.bz>400)return; var al=Math.max(0.05,1-tw.bz/400);
    ctx.fillStyle='rgba(5,15,50,'+(al*0.9)+')'; ctx.strokeStyle='rgba(37,99,235,'+(al*0.2)+')'; ctx.lineWidth=0.4;
    ctx.fillRect(tw.bx-tw.w/2,tw.ty,tw.w,tw.by-tw.ty); ctx.strokeRect(tw.bx-tw.w/2,tw.ty,tw.w,tw.by-tw.ty);
    ctx.fillStyle='rgba(0,229,255,'+(al*0.06)+')';
    for(var wy=tw.ty+2;wy<tw.by-2;wy+=5){ for(var wx=tw.bx-tw.w/2+2;wx<tw.bx+tw.w/2-2;wx+=4){ if(Math.sin(wx*7+wy*3+tw.phase)>0.3)ctx.fillRect(wx,wy,2,3); } }
    if(Math.sin(t*3+tw.phase)>0.4&&tw.bz<200){ ctx.save(); ctx.shadowColor='#ef4444'; ctx.shadowBlur=8; ctx.fillStyle='#ef4444'; ctx.beginPath(); ctx.arc(tw.tx,tw.ty,2,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  });
  [{ox:-100,oy:-90,label:'SAT_NX_01'},{ox:120,oy:-110,label:'SAT_NX_02'},{ox:40,oy:-130,label:'GEO_NX_07'}].forEach(function(sat,si){
    var sx=sat.ox+Math.sin(t*0.12+si)*8, sy=sat.oy+Math.cos(t*0.08+si)*4;
    ctx.save(); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=15; ctx.fillStyle='#00e5ff'; ctx.beginPath(); ctx.arc(sx,sy,2.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(0,229,255,0.5)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(sx-10,sy); ctx.lineTo(sx-5,sy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(sx+5,sy); ctx.lineTo(sx+10,sy); ctx.stroke();
    ctx.fillStyle='rgba(37,99,235,0.6)'; ctx.fillRect(sx-10,sy-1,5,3); ctx.fillRect(sx+5,sy-1,5,3);
    ctx.strokeStyle='rgba(0,229,255,0.08)'; ctx.lineWidth=0.6; ctx.setLineDash([4,10]); ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(Math.sin(t*0.2+si)*30,60); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='rgba(0,229,255,0.5)'; ctx.font='4px monospace'; ctx.textAlign='left'; ctx.fillText(sat.label,sx+4,sy-4); ctx.restore();
  });
  if(p>0.7){ var oo=Math.min(1,(p-0.7)/0.2); glowText(ctx,'THE FUTURE OF TELECOM BEGINS HERE',0,-H/2+40,'rgba(255,255,255,'+oo+')',18,'bold 13px Sora,sans-serif'); glowText(ctx,'5G  FIBER  AI  SATELLITES  AUTONOMOUS NETWORKS',0,-H/2+58,'rgba(0,229,255,'+(oo*0.7)+')',6,'500 7px monospace'); }
}

// ── SCENE 10: NEXORA ENDING ───────────────────────────────────────────────────
function drawScene10(ctx,p,t,W,H,st){
  st.endParticles.forEach(function(pp,i){
    var ang=pp.angle+t*pp.speed*(1+p*2), cr=pp.r*(1-p*0.85), px=Math.cos(ang)*cr, py=Math.sin(ang)*cr*0.5;
    var al=Math.max(0,0.6-(1-p)*0.3)*Math.min(1,p*3);
    ctx.save(); ctx.shadowColor=i%3===0?'#a78bfa':'#00e5ff'; ctx.shadowBlur=4;
    ctx.fillStyle=i%3===0?'rgba(167,139,250,'+al+')':i%3===1?'rgba(0,229,255,'+al+')':'rgba(37,99,235,'+al+')';
    ctx.beginPath(); ctx.arc(px,py,pp.size,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
  if(p>0.2){
    var co=Math.min(1,(p-0.2)/0.3);
    var cr=ctx.createRadialGradient(0,0,0,0,0,80*co); cr.addColorStop(0,'rgba(0,229,255,'+(co*0.3)+')'); cr.addColorStop(0.4,'rgba(37,99,235,'+(co*0.12)+')'); cr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=cr; ctx.beginPath(); ctx.arc(0,0,200,0,Math.PI*2); ctx.fill();
  }
  if(p>0.35){
    var lo=Math.min(1,(p-0.35)/0.25), ls=0.7+lo*0.3;
    ctx.save(); ctx.scale(ls,ls); ctx.shadowColor='#00e5ff'; ctx.shadowBlur=40*lo;
    ctx.fillStyle='rgba(255,255,255,'+lo+')'; ctx.font='bold 34px Sora,sans-serif'; ctx.textAlign='center'; ctx.fillText('NEXORA AI',0,-10);
    ctx.shadowBlur=15; ctx.fillStyle='rgba(0,229,255,'+(lo*0.9)+')'; ctx.font='500 8px monospace'; ctx.fillText('INTELLIGENT TELECOM OPERATIONS',0,15);
    ctx.shadowBlur=0; ctx.fillStyle='rgba(148,163,184,'+(lo*0.6)+')'; ctx.font='6px monospace'; ctx.fillText('POWERED BY ARTIFICIAL INTELLIGENCE',0,34);
    ctx.strokeStyle='rgba(0,229,255,'+(lo*0.5)+')'; ctx.lineWidth=0.8; var dl=60+60*lo;
    ctx.beginPath(); ctx.moveTo(-dl-115,2); ctx.lineTo(-115,2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(115,2); ctx.lineTo(115+dl,2); ctx.stroke(); ctx.restore();
  }
  if(p>0.7){ var oo=Math.min(1,(p-0.7)/0.2); ctx.save(); ctx.fillStyle='rgba(0,229,255,'+(oo*0.5)+')'; ctx.font='5px monospace'; ctx.textAlign='center'; ctx.fillText('nexora.ai  //  enterprise telecom intelligence',0,H/2-28); ctx.restore(); }
  if(p>0.5){ var lo2=(p-0.5)/0.5; var fr=ctx.createRadialGradient(0,0,0,0,0,40); fr.addColorStop(0,'rgba(0,229,255,'+(lo2*0.4)+')'); fr.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=fr; ctx.beginPath(); ctx.arc(0,0,100,0,Math.PI*2); ctx.fill(); }
}

// ── REACT COMPONENT ───────────────────────────────────────────────────────────
export default function MockVideoPlayer(){
  const [isPlaying,setIsPlaying]=useState(true);
  const [isMuted,setIsMuted]=useState(false);
  const [isFullscreen,setIsFullscreen]=useState(false);
  const [currentTime,setCurrentTime]=useState(0);
  const [sceneIdx,setSceneIdx]=useState(0);
  const [sceneProgress,setSceneProgress]=useState(0);
  const [showControls,setShowControls]=useState(true);

  const containerRef=useRef(null);
  const canvasRef=useRef(null);
  const timeRef=useRef(0);
  const rafRef=useRef(null);
  const hideTimer=useRef(null);

  const stateRef=useRef({
    nodes:Array.from({length:80},function(){return{x:(Math.random()-0.5)*700,y:(Math.random()-0.5)*380,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6,size:Math.random()*1.8+0.5,pulse:Math.random()*Math.PI*2};}),
    globeAngle:0,
    globeVerts:(function(){var v=[];for(var i=0;i<20;i++){var lat=(i/20)*Math.PI-Math.PI/2;for(var j=0;j<20;j++){var lon=(j/20)*2*Math.PI;v.push([Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)]);}}return v;})(),
    pipeParticles:Array.from({length:80},function(){return{angle:Math.random()*Math.PI*2,r:Math.random()*0.4+0.05,z:Math.random()*300,speed:Math.random()*3+2,color:Math.random()>0.7?'#a78bfa':'#00e5ff'};}),
    radarAngle:0,
    candidates:[
      {name:'ENG_RAHUL_K',skill:'Fiber',dist:'3.7km',score:87,x:-90,y:-55,match:false},
      {name:'ENG_PRIYA_S',skill:'ONT',dist:'1.2km',score:98,x:55,y:30,match:true},
      {name:'ENG_ARUN_V',skill:'Broadband',dist:'5.1km',score:74,x:-40,y:65,match:false},
      {name:'ENG_MEENA_R',skill:'Router',dist:'2.9km',score:91,x:80,y:-45,match:false},
    ],
    chartHistory:Array.from({length:30},function(_,i){return{efficiency:30+i*2+Math.random()*8,tickets:28-i*0.8+Math.random()*3};}),
    carouselAngle:0,
    features:[
      {name:'AI Assignment',icon:'\u26A1',color:'#00e5ff'},
      {name:'Predictive Maint',icon:'\uD83D\uDD2E',color:'#a78bfa'},
      {name:'Net Monitoring',icon:'\uD83D\uDCE1',color:'#2563eb'},
      {name:'Live Analytics',icon:'\uD83D\uDCCA',color:'#10b981'},
      {name:'Self-Healing',icon:'\u267B',color:'#f59e0b'},
      {name:'Smart Dispatch',icon:'\uD83D\uDDFA',color:'#00e5ff'},
      {name:'Eng Tracking',icon:'\uD83D\uDCCD',color:'#a78bfa'},
      {name:'Fiber Mgmt',icon:'\uD83D\uDD17',color:'#2563eb'},
    ],
    cityAngle:0,
    towers:Array.from({length:22},function(){return{x:(Math.random()-0.5)*600,z:(Math.random()-0.5)*600+80,h:Math.random()*100+40,w:Math.random()*18+8,phase:Math.random()*Math.PI*2};}),
    endParticles:Array.from({length:150},function(_,i){return{angle:(i/150)*Math.PI*2,r:180+Math.random()*60,speed:0.3+Math.random()*0.7,size:Math.random()*2+0.5};}),
    ambientParticles:Array.from({length:60},function(){return{x:(Math.random()-0.5)*800,y:(Math.random()-0.5)*500,vx:(Math.random()-0.5)*0.3,vy:-Math.random()*0.4-0.1,size:Math.random()*1.2+0.2,opacity:Math.random()*0.4+0.1};}),
  });

  const getScene=useCallback(function(t){
    var acc=0;
    for(var i=0;i<SCENES.length;i++){ if(t<acc+SCENES[i].duration)return{idx:i,progress:(t-acc)/SCENES[i].duration}; acc+=SCENES[i].duration; }
    return{idx:SCENES.length-1,progress:1};
  },[]);

  const toggleFullscreen=useCallback(function(){
    if(!containerRef.current)return;
    if(!document.fullscreenElement){if(containerRef.current.requestFullscreen)containerRef.current.requestFullscreen();}
    else{if(document.exitFullscreen)document.exitFullscreen();}
  },[]);

  useEffect(function(){
    var h=function(){setIsFullscreen(!!document.fullscreenElement);};
    document.addEventListener('fullscreenchange',h);
    return function(){document.removeEventListener('fullscreenchange',h);};
  },[]);

  const resetHide=useCallback(function(){
    setShowControls(true); clearTimeout(hideTimer.current);
    hideTimer.current=setTimeout(function(){setShowControls(false);},3000);
  },[]);

  useEffect(function(){
    var canvas=canvasRef.current; if(!canvas)return;
    var ctx=canvas.getContext('2d'); var tNow=Date.now();
    var resize=function(){ var rect=canvas.getBoundingClientRect(); var dpr=window.devicePixelRatio||1; canvas.width=rect.width*dpr; canvas.height=rect.height*dpr; ctx.scale(dpr,dpr); };
    resize(); window.addEventListener('resize',resize);
    var st=stateRef.current;
    var render=function(){
      var now=Date.now(); var dt=Math.min((now-tNow)/1000,0.05); tNow=now;
      if(isPlaying){ timeRef.current+=dt; if(timeRef.current>=TOTAL_DURATION)timeRef.current=0; }
      var tv=timeRef.current; var sc=getScene(tv);
      setCurrentTime(tv); setSceneIdx(sc.idx); setSceneProgress(sc.progress);
      var W=canvas.width/(window.devicePixelRatio||1); var H=canvas.height/(window.devicePixelRatio||1); var CX=W/2,CY=H/2;
      ctx.fillStyle='#00050f'; ctx.fillRect(0,0,W,H);
      var scene=SCENES[sc.idx];
      var bg=ctx.createRadialGradient(CX,CY,0,CX,CY,Math.max(W,H)*0.8); bg.addColorStop(0,scene.bgGlow); bg.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      ctx.save(); ctx.strokeStyle='rgba(0,100,200,0.025)'; ctx.lineWidth=0.5;
      for(var gx=0;gx<W;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
      for(var gy=0;gy<H;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
      ctx.restore();
      st.ambientParticles.forEach(function(pp){
        pp.x+=pp.vx; pp.y+=pp.vy; if(pp.y<-H/2)pp.y=H/2; if(pp.x<-W/2)pp.x=W/2; if(pp.x>W/2)pp.x=-W/2;
        ctx.fillStyle='rgba(0,180,255,'+pp.opacity+')'; ctx.beginPath(); ctx.arc(CX+pp.x,CY+pp.y,pp.size,0,Math.PI*2); ctx.fill();
      });
      ctx.save(); ctx.translate(CX,CY);
      var fi=Math.min(1,sc.progress*5), fo=1-Math.max(0,(sc.progress-0.85)*6.67);
      ctx.globalAlpha=Math.max(0,Math.min(fi,fo));
      switch(sc.idx){
        case 0:drawScene1(ctx,sc.progress,tv,W,H,st);break;
        case 1:drawScene2(ctx,sc.progress,tv,W,H,st);break;
        case 2:drawScene3(ctx,sc.progress,tv,W,H,st);break;
        case 3:drawScene4(ctx,sc.progress,tv,W,H,st);break;
        case 4:drawScene5(ctx,sc.progress,tv,W,H,st);break;
        case 5:drawScene6(ctx,sc.progress,tv,W,H,st);break;
        case 6:drawScene7(ctx,sc.progress,tv,W,H,st);break;
        case 7:drawScene8(ctx,sc.progress,tv,W,H,st);break;
        case 8:drawScene9(ctx,sc.progress,tv,W,H,st);break;
        case 9:drawScene10(ctx,sc.progress,tv,W,H,st);break;
        default:break;
      }
      ctx.globalAlpha=1; ctx.restore();
      var vg=ctx.createRadialGradient(CX,CY,Math.min(W,H)*0.3,CX,CY,Math.max(W,H)*0.8); vg.addColorStop(0,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,0.65)'); ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
      rafRef.current=requestAnimationFrame(render);
    };
    rafRef.current=requestAnimationFrame(render);
    return function(){window.removeEventListener('resize',resize);cancelAnimationFrame(rafRef.current);};
  },[isPlaying,getScene]);

  const handleScrub=useCallback(function(e){ var rect=e.currentTarget.getBoundingClientRect(); timeRef.current=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width))*TOTAL_DURATION; },[]);

  const jumpScene=useCallback(function(dir){
    var acc=0;
    for(var i=0;i<SCENES.length;i++){
      if(i===sceneIdx){ var tgt=dir>0?acc+SCENES[i].duration:acc-(i>0?SCENES[i-1].duration:0); timeRef.current=Math.max(0,Math.min(TOTAL_DURATION-0.1,tgt)); break; }
      acc+=SCENES[i].duration;
    }
  },[sceneIdx]);

  var currentScene=SCENES[sceneIdx]||SCENES[0];

  return (
    <div ref={containerRef} className={'mvp-frame'+(isFullscreen?' mvp-fullscreen':'')} onMouseMove={resetHide} onMouseEnter={resetHide}>
      <canvas ref={canvasRef} className="mvp-canvas"/>
      <div className="mvp-lb-top"/><div className="mvp-lb-bottom"/>
      <div className="mvp-hud-tl">
        <div className="mvp-hud-logo">NEXORA <span>AI</span></div>
        <div>CINEMATIC ENGINE v2.0</div>
        <div>TC: {String(Math.floor(timeRef.current/60)).padStart(2,'0')}:{String(Math.floor(timeRef.current%60)).padStart(2,'0')}</div>
        <div>SCENE: {sceneIdx+1}/10 @ {(sceneProgress*100).toFixed(0)}%</div>
      </div>
      <div className="mvp-hud-tr">
        <div>RESOLUTION: 3840x2160 // 4K</div>
        <div>FRAME_RATE: 60 FPS</div>
        <div>ENGINE: CANVAS_3D</div>
        <div style={{color:currentScene.accentColor}}>&bull; {currentScene.tag}</div>
      </div>
      <div className="mvp-title-card" style={{'--scene-color':currentScene.accentColor}}>
        <div className="mvp-scene-tag">{currentScene.tag}</div>
        <div className="mvp-scene-title">{currentScene.title}</div>
        <div className="mvp-scene-sub">{currentScene.subtitle}</div>
      </div>
      {!isPlaying&&(<div className="mvp-pause-overlay" onClick={function(){setIsPlaying(true);}}><div className="mvp-play-btn-big"><FiPlay/></div></div>)}
      <div className={'mvp-controls'+(showControls?' mvp-controls-visible':'')}>
        <div className="mvp-timeline-wrap">
          <div className="mvp-timeline" onClick={handleScrub}>
            {SCENES.map(function(sc,i){
              var acc=0; for(var j=0;j<i;j++)acc+=SCENES[j].duration;
              return(<div key={i} className={'mvp-chapter-dot'+(i===sceneIdx?' active':'')} style={{left:(acc/TOTAL_DURATION*100)+'%','--dot-color':sc.accentColor}}/>);
            })}
            <div className="mvp-progress" style={{width:(currentTime/TOTAL_DURATION*100)+'%','--bar-color':currentScene.accentColor}}/>
          </div>
          <div className="mvp-time-labels">
            <span>{fmtTime(currentTime)}</span>
            <span style={{color:currentScene.accentColor}}>{currentScene.tag}</span>
            <span>{fmtTime(TOTAL_DURATION)}</span>
          </div>
        </div>
        <div className="mvp-btn-row">
          <div className="mvp-btn-group">
            <button className="mvp-btn" onClick={function(){jumpScene(-1);}}><FiSkipBack size={11}/></button>
            <button className="mvp-btn mvp-btn-play" onClick={function(){setIsPlaying(function(pr){return !pr;});}}>{isPlaying?<FiPause size={14}/>:<FiPlay size={14}/>}</button>
            <button className="mvp-btn" onClick={function(){jumpScene(1);}}><FiSkipForward size={11}/></button>
            <button className="mvp-btn" onClick={function(){setIsMuted(function(m){return !m;});}}>{isMuted?<FiVolumeX size={11}/>:<FiVolume2 size={11}/>}</button>
            <div className="mvp-scene-counter">Scene {sceneIdx+1}<span> / {SCENES.length}</span></div>
          </div>
          <div className="mvp-btn-group">
            <div className="mvp-quality-badge" style={{'--badge-color':currentScene.accentColor}}>4K HDR</div>
            <button className="mvp-btn" onClick={toggleFullscreen}>{isFullscreen?<FiMinimize2 size={11}/>:<FiMaximize2 size={11}/>}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
