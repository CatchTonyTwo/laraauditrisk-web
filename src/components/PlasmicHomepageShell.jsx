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
    'Eight concrete ways to strengthen your internal audit function.',
  ],
  ['Ver todos', 'View all'],
  ['Aseguramiento', 'Assurance'],
  ['Evaluación externa', 'External assessment'],
  ['Diagnóstico de brechas', 'Gap analysis and remediation'],
  ['Talento', 'Talent'],
  ['Banco de preguntas', 'Competency framework'],
  ['Formación', 'Training'],
  ['Regulatorio', 'Implementation'],
  ['CE006/2025', 'Maturity model'],
  ['A medida', 'IIA Standards methodologies'],
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

const spanishText = new Map([
  [
    'Seis formas concretas de trabajar la calidad de su función de auditoría.',
    'Ocho formas concretas de fortalecer su función de auditoría interna.',
  ],
  ['Diagnóstico de brechas', 'Diagnóstico y cierre de brechas'],
  ['Banco de preguntas', 'Marco de competencias'],
  ['Regulatorio', 'Implementación'],
  ['CE006/2025', 'Modelo de madurez'],
  ['A medida', 'Metodologías NGAI'],
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

function replaceSpanishText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.nodeValue;
    const trimmed = value?.trim();
    const replacement = trimmed && spanishText.get(trimmed);

    if (replacement) {
      node.nodeValue = value.replace(trimmed, replacement);
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

    const applyLocaleText = () => {
      if (locale === 'en') {
        translateEnglishText(root);
      } else {
        replaceSpanishText(root);
      }
    };

    applyLocaleText();

    const observer = new MutationObserver(applyLocaleText);
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
      const servicesLink = event.target.closest('a[href="/servicios"]');

      if (servicesLink) {
        event.preventDefault();
        window.location.assign('/en/services');
        return;
      }

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
