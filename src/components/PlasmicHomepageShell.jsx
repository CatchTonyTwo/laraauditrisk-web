import * as React from 'react';
import Homepage from './Homepage';
import { LocaleContextProvider } from './plasmic/lara_website/PlasmicGlobalVariant__Locale';

const routes = {
  es: '/',
  en: '/en/',
};

const englishText = new Map([
  ['Servicios', 'Services'],
  [
    'Seis formas concretas de trabajar la calidad de su función de auditoría.',
    'Six concrete ways to strengthen the quality of your audit function.',
  ],
  ['Ver todos', 'View all'],
  ['Aseguramiento', 'Assurance'],
  ['Evaluación externa', 'External assessment'],
  ['Diagnóstico de brechas', 'Gap analysis'],
  ['Talento', 'Talent'],
  ['Banco de preguntas', 'Question bank'],
  ['Formación', 'Training'],
  ['Regulatorio', 'Regulatory'],
  ['A medida', 'Tailored'],
  ['Perspectivas', 'Perspectives'],
  [
    'Notas sobre las Normas 2024, la calidad y la regulación, sin relleno.',
    'Notes on the 2024 Standards, quality and regulation, without the filler.',
  ],
  ['Temas', 'Topics'],
  ['Normas 2024', '2024 Standards'],
  ['Calidad (PAMC)', 'Quality (QAIP)'],
  ['Más', 'More'],
  ['Regulación', 'Regulation'],
  ['Ética', 'Ethics'],
  ['Competencias', 'Competencies'],
  ['Leer primero', 'Start here'],
  ['Guía del primer año', 'First-year guide'],
  ['Acreditaciones', 'Credentials'],
]);

function translateEnglishText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.nodeValue;
    const trimmed = value?.trim();
    const translation = trimmed && englishText.get(trimmed);

    if (translation) {
      node.nodeValue = value.replace(trimmed, translation);
    }

    node = walker.nextNode();
  }
}

function emphasizeCommittee(root, locale) {
  const heading = root.querySelector('h1');
  const word = locale === 'en' ? 'Committee' : 'Comité';
  const text = heading?.textContent;
  const index = text?.indexOf(word) ?? -1;

  if (!heading || !text || index < 0 || heading.querySelector('em')) {
    return;
  }

  const emphasis = document.createElement('em');
  emphasis.textContent = word;
  heading.replaceChildren(
    document.createTextNode(text.slice(0, index)),
    emphasis,
    document.createTextNode(text.slice(index + word.length))
  );
}

export default function PlasmicHomepageShell({ locale = 'es' }) {
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    for (const button of root.querySelectorAll('[data-set-lang]')) {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.setLang === locale)
      );
    }

    emphasizeCommittee(root, locale);

    if (locale !== 'en') {
      return;
    }

    translateEnglishText(root);

    const observer = new MutationObserver(() => translateEnglishText(root));
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [locale]);

  const handleClick = (event) => {
    const languageButton = event.target.closest('[data-set-lang]');

    if (languageButton) {
      const destination = routes[languageButton.dataset.setLang];

      if (destination) {
        event.preventDefault();
        window.location.assign(destination);
      }

      return;
    }

    if (locale === 'en') {
      const homeLink = event.target.closest('a[href="/"]');

      if (homeLink) {
        event.preventDefault();
        window.location.assign(routes.en);
      }
    }
  };

  return (
    <LocaleContextProvider value={locale}>
      <div
        ref={rootRef}
        className={`plasmic-homepage-locale plasmic-homepage-locale-${locale}`}
        onClick={handleClick}
      >
        <Homepage />
      </div>
    </LocaleContextProvider>
  );
}
