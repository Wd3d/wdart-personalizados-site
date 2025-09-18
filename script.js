// Carrega config e preenche o site
async function loadConfig(){
  const res = await fetch('config.json');
  const cfg = await res.json();

  // Cores brand
  document.documentElement.style.setProperty('--primary', cfg.primaryColor || '#6C5CE7');
  document.documentElement.style.setProperty('--accent', cfg.accentColor || '#00CEC9');

  // SEO
  document.getElementById('seo-title').textContent = cfg.seo?.title || cfg.siteName;
  document.getElementById('seo-description').setAttribute('content', cfg.seo?.description || '');
  document.getElementById('seo-keywords').setAttribute('content', cfg.seo?.keywords || '');
  document.getElementById('og-title').setAttribute('content', cfg.seo?.title || cfg.siteName);
  document.getElementById('og-desc').setAttribute('content', cfg.seo?.description || '');

  // Header/brand
  document.getElementById('site-name').textContent = cfg.siteName;
  document.getElementById('footer-name').textContent = cfg.siteName;
  document.getElementById('site-tagline').textContent = cfg.tagline;

  // Hero
  document.getElementById('hero-headline').textContent = cfg.hero.headline;
  document.getElementById('hero-subheadline').textContent = cfg.hero.subheadline;
  document.getElementById('hero-image').src = cfg.hero.heroImage;
  document.getElementById('hero-cta').textContent = cfg.hero.ctaText;

  // Instagram & WhatsApp
  const insta = cfg.instagramHandle?.replace('@','');
  document.getElementById('instagram-handle').textContent = insta;
  document.getElementById('instagram-link').href = `https://www.instagram.com/${insta}/`;
  const wsp = (cfg.whatsappNumber || '').replace(/\D/g,'');
  const wspLink = wsp ? `https://wa.me/${wsp}?text=${encodeURIComponent('Olá! Quero um personalizado 😊')}` : '#';
  ['btn-whatsapp-header','cta-button','footer-whatsapp','whatsapp-float'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = wspLink;
  });
  document.getElementById('footer-instagram').href = `https://www.instagram.com/${insta}/`;
  const verInsta = document.getElementById('ver-instagram');
  if (verInsta) verInsta.href = `https://www.instagram.com/${insta}/`;

  // Features
  const ul = document.getElementById('features-list');
  ul.innerHTML = '';
  cfg.features.forEach(f=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${f.title}</strong><p>${f.text}</p>`;
    ul.appendChild(li);
  });

  // Produtos
  const grid = document.getElementById('products-grid');
  grid.innerHTML='';
  cfg.products.forEach(p=>{
    const card = document.createElement('article');
    card.className='card product';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h4 class="title">${p.title}</h4>
      <p class="desc">${p.description || ''}</p>
      <p class="price">${p.price}</p>
      <a class="btn outline" href="#contato">Quero este</a>
    `;
    grid.appendChild(card);
  });

  // Galeria
  const g = document.getElementById('gallery-grid');
  g.innerHTML='';
  cfg.gallery.forEach(src=>{
    const img = document.createElement('img');
    img.src = typeof src === 'string' ? src : (src.src || '');
    img.alt = 'Projeto WD Art\'s';
    img.loading='lazy';
    img.className='card';
    if (typeof src === 'object' && src.href){
      const a = document.createElement('a');
      a.href = src.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.appendChild(img);
      g.appendChild(a);
    } else {
      g.appendChild(img);
    }
  });

  // Depoimentos
  const t = document.getElementById('testimonials');
  t.innerHTML='';
  cfg.testimonials.forEach(d=>{
    const div = document.createElement('div');
    div.className='card testimonial';
    div.innerHTML = `
      <img src="${d.avatar}" alt="${d.name}">
      <div><p>"${d.quote}"</p><strong>${d.name}</strong></div>
    `;
    t.appendChild(div);
  });

  // CTA
  document.getElementById('cta-title').textContent = cfg.cta.title;
  document.getElementById('cta-subtitle').textContent = cfg.cta.subtitle;
  document.getElementById('cta-button').textContent = cfg.cta.button;

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
}
loadConfig();
