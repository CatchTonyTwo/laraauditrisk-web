import * as React from 'react';
import Services from './Services';
import { LocaleContextProvider } from './plasmic/lara_website/PlasmicGlobalVariant__Locale';

const routes = {
  es: '/servicios',
  en: '/en/services',
};

const navigationText = {
  es: new Map([
    ['Seis formas concretas de trabajar la calidad de su función de auditoría.', 'Ocho formas concretas de fortalecer su función de auditoría interna.'],
    ['Diagnóstico de brechas', 'Diagnóstico y cierre de brechas'],
    ['Banco de preguntas', 'Marco de competencias'],
    ['Regulatorio', 'Implementación'],
    ['CE006/2025', 'Modelo de madurez'],
    ['A medida', 'Metodologías NGAI'],
  ]),
  en: new Map([
    ["Six concrete ways to work on your audit function's quality.", 'Eight concrete ways to strengthen your internal audit function.'],
    ['Gap analysis', 'Gap analysis and remediation'],
    ['Question bank', 'Competency framework'],
    ['Regulatory', 'Implementation'],
    ['CE006/2025', 'Maturity model'],
    ['Tailored', 'IIA Standards methodologies'],
  ]),
};

function replaceNavigationText(root, locale) {
  const replacements = navigationText[locale];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.nodeValue;
    const trimmed = value?.trim();
    const replacement = trimmed && replacements.get(trimmed);

    if (replacement) {
      node.nodeValue = value.replace(trimmed, replacement);
    }

    node = walker.nextNode();
  }
}

export default function PlasmicServicesShell({ locale = 'es' }) {
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    for (const button of root.querySelectorAll('header button')) {
      const language = button.textContent?.trim().toLowerCase();

      if (language === 'es' || language === 'en') {
        button.dataset.setServicesLang = language;
        button.setAttribute('aria-pressed', String(language === locale));
      }
    }

    replaceNavigationText(root, locale);
    const observer = new MutationObserver(() => replaceNavigationText(root, locale));
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [locale]);

  const handleClick = (event) => {
    const button = event.target.closest('button');
    const buttonText = button?.textContent?.trim();

    if (buttonText === 'ES' || buttonText === 'EN') {
      event.preventDefault();
      window.location.assign(routes[buttonText.toLowerCase()]);
      return;
    }

    if (locale === 'en') {
      const link = event.target.closest('a');
      const href = link?.getAttribute('href');

      if (href === '/') {
        event.preventDefault();
        window.location.assign('/en/');
      } else if (href === '/servicios') {
        event.preventDefault();
        window.location.assign(routes.en);
      }
    }
  };

  return (
    <LocaleContextProvider value={locale}>
      <div
        ref={rootRef}
        className={`plasmic-services-locale plasmic-services-locale-${locale}`}
        onClick={handleClick}
      >
        <Services />
      </div>
    </LocaleContextProvider>
  );
}
