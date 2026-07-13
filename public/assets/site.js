(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll('[data-set-lang]');
  const savedLanguage = localStorage.getItem('lara-ara-language');
  const language = savedLanguage === 'en' ? 'en' : 'es';

  function setLanguage(nextLanguage) {
    root.lang = nextLanguage;
    localStorage.setItem('lara-ara-language', nextLanguage);
    languageButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.setLang === nextLanguage);
      button.setAttribute('aria-pressed', String(button.dataset.setLang === nextLanguage));
    });
  }

  setLanguage(language);
  languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');
  if (menuButton && navigation) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });
  }

  document.querySelectorAll('.acc-item').forEach((item) => {
    const button = item.querySelector('.acc-head');
    if (!button) return;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    if (observer) observer.observe(element);
    else element.classList.add('revealed');
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const productCards = document.querySelectorAll('[data-product]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((candidate) => candidate.classList.toggle('active', candidate === button));
      productCards.forEach((card) => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.product !== filter);
      });
    });
  });

  const contactForm = document.querySelector('[data-contact]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = contactForm.querySelector('.form-msg');
      if (message) message.style.display = 'block';
      contactForm.querySelector('button[type="submit"]').disabled = true;
    });
  }

  const freeDownloadLinks = document.querySelectorAll('[data-free-download]');
  if (freeDownloadLinks.length) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="download-modal__backdrop" data-modal-close></div>
      <div class="download-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="download-title">
        <button class="download-modal__close" type="button" data-modal-close aria-label="Cerrar">×</button>
        <span class="eyebrow"><span data-lang="es">Recurso gratuito</span><span data-lang="en">Free resource</span></span>
        <h2 id="download-title"><span data-lang="es">Reciba la herramienta</span><span data-lang="en">Get the tool</span></h2>
        <p class="download-product" data-download-product></p>
        <form data-download-form>
          <div class="form-grid">
            <div class="form-row">
              <div><label><span data-lang="es">Nombre</span><span data-lang="en">Name</span></label><input type="text" name="name" required></div>
              <div><label><span data-lang="es">Organización</span><span data-lang="en">Organization</span></label><input type="text" name="organization" required></div>
            </div>
            <div><label>Email</label><input type="email" name="email" required></div>
            <button class="btn btn-gold" type="submit"><span data-lang="es">Recibir herramienta</span><span data-lang="en">Get the tool</span></button>
            <p class="download-note"><span data-lang="es">Usaremos estos datos únicamente para enviarle el recurso y comunicaciones relacionadas con auditoría interna.</span><span data-lang="en">We will use this information only to send the resource and related internal audit communications.</span></p>
            <p class="download-success" hidden><span data-lang="es">Gracias. El recurso quedará listo para enviarse a su email.</span><span data-lang="en">Thank you. The resource is ready to be sent to your email.</span></p>
          </div>
        </form>
      </div>`;
    document.body.appendChild(modal);

    const productLabel = modal.querySelector('[data-download-product]');
    const downloadForm = modal.querySelector('[data-download-form]');
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    freeDownloadLinks.forEach((link) => link.addEventListener('click', (event) => {
      event.preventDefault();
      productLabel.textContent = link.dataset.freeDownload;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => modal.querySelector('input').focus(), 50);
    }));
    modal.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
    downloadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      downloadForm.querySelector('.download-success').hidden = false;
      downloadForm.querySelector('button[type="submit"]').disabled = true;
    });
    setLanguage(root.lang);
  }
})();
