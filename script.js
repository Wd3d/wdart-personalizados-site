async function loadConfig(){
  const res = await fetch('config.json'); const cfg = await res.json();
  const set=(id,val,attr)=>{const el=document.getElementById(id); if(!el) return; if(attr==='src') el.src=val; else if(attr==='href') el.href=val; else el.textContent=val;};
  document.documentElement.style.setProperty('--primary', cfg.primaryColor);
  document.documentElement.style.setProperty('--accent', cfg.accentColor);
  document.body.style.background = cfg.bgSoft || '#FFF7FB';
  set('site-name', cfg.siteName); set('footer-name', cfg.siteName); set('site-tagline', cfg.tagline);
  set('hero-headline', cfg.hero.headline); set('hero-subheadline', cfg.hero.subheadline); set('hero-image', cfg.hero.heroImage, 'src');
  const badges=document.getElementById('hero-badges'); badges.innerHTML=''; (cfg.hero.badges||[]).forEach(b=>{const s=document.createElement('a'); s.href=wspLink; s.target='_blank'; s.rel='noopener'; s.textContent=b; s.className='badge-link'; badges.appendChild(s);});
  const insta=cfg.instagramHandle.replace('@',''); const instaUrl=`https://www.instagram.com/${insta}/`;
  ['insta-link','footer-insta','cta-insta','sticky-insta'].forEach(id=>{const el=document.getElementById(id); if(el) el.href=instaUrl;});
  const wsp=(cfg.whatsappNumber||'').replace(/\D/g,''); const wspLink=wsp?`https://wa.me/${wsp}?text=${encodeURIComponent('Vi seu site e quero o meu personalizado !')}`:'#';
  ['cta-wsp','footer-wsp','whatsapp-float','sticky-wsp','hero-cta'].forEach(id=>{const el=document.getElementById(id); if(el) el.href=wspLink;});

  const grid=document.getElementById('products-grid'); grid.innerHTML='';
  cfg.products.forEach(p=>{const card=document.createElement('article'); card.className='card product'; card.innerHTML=`<div class='glow'></div><img src='${p.image}' alt='${p.title}' loading='lazy'><div class='body'><h4 class='title'>${p.title}</h4><p class='desc'>${p.description||''}</p><div class='row' style='display:flex;align-items:center;justify-content:space-between'><span class='price'>${p.price}</span><a class='btn outline'>Quero este</a></div></div>`; card.addEventListener('mousemove',(e)=>{const r=card.getBoundingClientRect(); card.style.setProperty('--mx',(e.clientX-r.left)+'px'); card.style.setProperty('--my',(e.clientY-r.top)+'px');}); card.querySelector('.btn').addEventListener('click',()=>{window.open(wspLink, '_blank');}); grid.appendChild(card);});

  const gg=document.getElementById('gallery-grid'); gg.innerHTML=''; (cfg.gallery||[]).forEach(src=>{const img=document.createElement('img'); img.src=src; img.alt="Projeto WD Art's"; img.loading='lazy'; img.addEventListener('click',()=>openLightbox(src)); gg.appendChild(img);});

  const track=document.getElementById('track'); track.innerHTML=''; (cfg.testimonials||[]).forEach(d=>{const item=document.createElement('div'); item.className='card testi'; item.innerHTML=`<img src='${d.avatar}' alt='${d.name}'><div><p style='margin:0 0 6px'>"${d.quote}"</p><strong>${d.name}</strong></div>`; track.appendChild(item);});
  document.querySelector('.nav.prev').addEventListener('click',()=>track.scrollBy({left:-340,behavior:'smooth'}));
  document.querySelector('.nav.next').addEventListener('click',()=>track.scrollBy({left:340,behavior:'smooth'}));

  const faq=document.getElementById('faq-list'); faq.innerHTML=''; (cfg.faq||[]).forEach(x=>{const wrap=document.createElement('div'); wrap.className='item'; wrap.innerHTML=`<div class='q'>${x.q}</div><div class='a'>${x.a}</div>`; wrap.querySelector('.q').addEventListener('click',()=>{const a=wrap.querySelector('.a'); const open=a.style.display==='block'; a.style.display=open?'none':'block';}); faq.appendChild(wrap);});

  document.getElementById('year').textContent=new Date().getFullYear();

  const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible'); obs.unobserve(e.target);}})},{threshold:.15}); document.querySelectorAll('.appear').forEach(el=>obs.observe(el));
  document.querySelectorAll('.confetti').forEach(btn=>{btn.addEventListener('click',()=>sprinkle(btn));});
}
function sprinkle(el){const n=18; for(let i=0;i<n;i++){const p=document.createElement('span'); p.style.position='fixed'; p.style.pointerEvents='none'; p.style.width='8px'; p.style.height='12px'; const r=el.getBoundingClientRect(); p.style.left=(r.left+el.offsetWidth/2)+'px'; p.style.top=(r.top)+'px'; p.style.background=`hsl(${Math.random()*360},90%,65%)`; p.style.transform=`rotate(${Math.random()*360}deg)`; p.style.borderRadius='2px'; document.body.appendChild(p); const dx=(Math.random()-0.5)*300; const dy=(Math.random()*-200)-100; p.animate([{transform:p.style.transform,opacity:1,offset:0},{transform:`translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`,opacity:0,offset:1}],{duration:900+Math.random()*600,easing:'cubic-bezier(.2,.6,.2,1)'}).onfinish=()=>p.remove();}}
function openLightbox(src){const dlg=document.getElementById('lightbox'); const img=document.getElementById('lightbox-img'); img.src=src; if(!dlg.open) dlg.showModal();}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('lightbox-close').addEventListener('click',()=>document.getElementById('lightbox').close());});
loadConfig();