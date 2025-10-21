// ...existing code...
console.log('JS chargé ✅');
document.documentElement.classList.add('js-on');
// ...existing code...
// Année de pied de page
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Menu burger + drawer
const burger = document.querySelector('.burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  const toggle = (open) => {
    drawer.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    burger.classList.toggle('open', open);
  };
  burger.addEventListener('click', () => toggle(drawer.hidden));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && toggle(false));
}

// Effet ripple sur les boutons .ripple
document.querySelectorAll('.ripple').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const circle = document.createElement('span');
    const d = Math.max(this.clientWidth, this.clientHeight);
    const r = d / 2;
    circle.style.width = circle.style.height = d + 'px';
    const rect = this.getBoundingClientRect();
    circle.style.left = (e.clientX - rect.left - r) + 'px';
    circle.style.top  = (e.clientY - rect.top - r) + 'px';
    circle.className = 'ink';
    this.appendChild(circle);
    setTimeout(()=> circle.remove(), 600);
  });
});

// Styles pour l'encre (injectés dynamiquement si non présents)
if (!document.getElementById('ink-style')) {
  const s = document.createElement('style');
  s.id = 'ink-style';
  s.textContent = `.ink{position:absolute;border-radius:50%;transform:scale(0);animation:ripple .6s linear;background:rgba(255,255,255,.5);mix-blend-mode:overlay;pointer-events:none}
  @keyframes ripple{to{transform:scale(2.5);opacity:0}} .btn{position:relative;overflow:hidden}`;
  document.head.appendChild(s);
}

// Reveal au scroll
const prefersReduced = !matchMedia('(prefers-reduced-motion: no-preference)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: .15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// Filtres de la page Projets
const chips = document.querySelectorAll('.filters .chip');
const projects = document.querySelectorAll('.project');
if (chips.length && projects.length) {
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const f = chip.dataset.filter;
      projects.forEach(p=>{
        const show = f === 'all' || p.dataset.cat.split(' ').includes(f);
        p.style.display = show ? '' : 'none';
      });
    });
  });
}
