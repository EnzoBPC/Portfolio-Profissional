document.addEventListener('DOMContentLoaded', () => {
  // ===== Rolagem suave até #contato =====
  const contactLink = document.querySelector('a.contact-btn[href="#contato"]');
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault(); // impede o salto instantâneo
      const alvo = document.getElementById('contato');

      // respeita quem prefere menos animações
      const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      alvo?.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });

      // foca no campo "Nome" após a rolagem
      setTimeout(() => document.getElementById('name')?.focus(), 600);
    });
  }

  // ===== Tabs =====
  const tabs = document.querySelectorAll('.about-tab');
  const panes = {
    'sobre-mim': document.getElementById('pane-sobre-mim'),
    'competencias': document.getElementById('pane-competencias'),
    'habilidades': document.getElementById('pane-habilidades'),
  };

  function activate(key) {
    if (!panes[key]) return;
    tabs.forEach(t => {
      const isTarget = t.dataset.tab === key;
      t.classList.toggle('is-active', isTarget);
      t.setAttribute('aria-selected', String(isTarget));
    });
    Object.entries(panes).forEach(([k, el]) => {
      const show = k === key;
      el.hidden = !show;
      el.classList.toggle('is-active', show);
    });
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => activate(t.dataset.tab));
    // acessibilidade com teclado
    t.addEventListener('keydown', (e) => {
      const idx = [...tabs].indexOf(t);
      if (['ArrowDown','ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const next = tabs[(idx + 1) % tabs.length];
        next.focus(); next.click();
      } else if (['ArrowUp','ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus(); prev.click();
      }
    });
  });

  // aba inicial
  activate('sobre-mim');
});