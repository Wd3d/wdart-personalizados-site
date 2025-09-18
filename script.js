async function loadConfig(){
  try{
    const res = await fetch('config.json'); const cfg = await res.json();
    const insta = (cfg.instagramHandle||'').replace('@',''); const instaUrl=`https://www.instagram.com/${insta}/`;
    const wspDigits = (cfg.whatsappNumber||'').replace(/\D/g,''); const wspLink = wspDigits ? `https://wa.me/${wspDigits}?text=${encodeURIComponent('Vi seu site e quero o meu personalizado !')}` : '#';

    ['sticky-insta','insta-link','cta-insta','footer-insta'].forEach(id=>{const el=document.getElementById(id); if(el) el.href=instaUrl;});
    ['sticky-wsp','nav-wsp','cta-wsp','footer-wsp','whatsapp-float','hero-cta'].forEach(id=>{const el=document.getElementById(id); if(el){ el.href=wspLink; el.setAttribute('target','_blank'); el.setAttribute('rel','noopener'); }});
    document.querySelectorAll('.badge-link').forEach(a=>{a.href=wspLink; a.target='_blank'; a.rel='noopener';});

    const grid=document.getElementById('products-grid'); grid.innerHTML='';
    (cfg.products||[]).forEach(p=>{
      const card=document.createElement('article'); card.className='card product';
      card.innerHTML = `<img src="${p.image}" alt="${p.title}" loading="lazy"><div class="body"><h4 class="title">${p.title}</h4><p class="desc">${p.description||''}</p><div class="row" style="display:flex;align-items:center;justify-content:space-between"><span class="price">${p.price}</span><a class="btn outline" target="_blank" rel="noopener">Quero este</a></div></div>`;
      card.querySelector('.btn').href = wspLink;
      grid.appendChild(card);
    });

    const gg=document.getElementById('gallery-grid'); gg.innerHTML='';
    (cfg.gallery||[]).forEach(src=>{
      const img=document.createElement('img'); img.src=src; img.alt="Projeto WD Art's"; img.loading='lazy';
      img.addEventListener('click',()=>openLightbox(src)); gg.appendChild(img);
    });

    const track=document.getElementById('track'); track.innerHTML='';
    (cfg.testimonials||[]).forEach(d=>{
      const item=document.createElement('div'); item.className='card testi';
      item.innerHTML = `<img src="${d.avatar}" alt="${d.name}"><div><p style="margin:0 0 6px">"${d.quote}"</p><strong>${d.name}</strong></div>`;
      track.appendChild(item);
    });
    document.querySelector('.nav.prev').addEventListener('click',()=>track.scrollBy({left:-340,behavior:'smooth'}));
    document.querySelector('.nav.next').addEventListener('click',()=>track.scrollBy({left:340,behavior:'smooth'}));

    const faq=document.getElementById('faq-list'); faq.innerHTML='';
    (cfg.faq||[]).forEach(x=>{
      const wrap=document.createElement('div'); wrap.className='item';
      wrap.innerHTML = `<div class="q">${x.q}</div><div class="a">${x.a}</div>`;
      wrap.querySelector('.q').addEventListener('click',()=>{
        const a=wrap.querySelector('.a'); a.style.display = a.style.display==='block' ? 'none' : 'block';
      });
      faq.appendChild(wrap);
    });

    const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target);} }); }, {threshold:.15});
    document.querySelectorAll('.appear').forEach(el=> obs.observe(el));

    document.getElementById('year').textContent = new Date().getFullYear();
  }catch(e){ console.error('Config load error', e); }
}
function openLightbox(src){const dlg=document.getElementById('lightbox'); const img=document.getElementById('lightbox-img'); img.src=src; if(!dlg.open) dlg.showModal();}
document.addEventListener('DOMContentLoaded',()=>{const close=document.getElementById('lightbox-close'); if(close){ close.addEventListener('click',()=>document.getElementById('lightbox').close());} loadConfig();});