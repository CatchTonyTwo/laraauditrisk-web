# Lara Audit Risk Advisory — sitio web

Sitio de José Antonio Lara construido en **Astro** (HTML/CSS/JS estático, sin frameworks pesados) con la piel de marca petróleo / verde mineral / cobre. Los artículos de la sección **Perspectivas** se pueden editar desde **Sanity** (panel visual para tu papá).

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist (lo que publica Cloudflare)
npm run preview  # revisa el build
```

Node 18+ requerido.

## Estructura

- `src/layouts/Base.astro` — cabecera (logo ARA, mega-menú, selector ES/EN) y pie compartidos.
- `src/pages/*.astro` — una página por ruta: `/`, `/servicios`, `/perspectivas`, `/herramientas`, `/herramientas/matriz-brechas`, `/nosotros`.
- `src/pages/perspectivas/[slug].astro` — página de artículo (se genera una por cada artículo).
- `src/lib/sanity.js` — lee los artículos desde Sanity; si no hay Sanity configurado, usa `src/content/sampleArticles.js`.
- `src/content/sampleArticles.js` — artículos de muestra (se reemplazan solos al conectar Sanity).
- `public/assets/` — `styles.css` y `site.js` (selector de idioma, menú móvil, animaciones).
- `sanity/schemaTypes/article.js` — el esquema de artículo bilingüe para el Studio de Sanity.

## Artículos (Sanity)

Mientras `PUBLIC_SANITY_PROJECT_ID` esté vacío, el sitio muestra artículos de muestra y compila normal. Cuando conectes Sanity (ver `LANZAMIENTO.md`), los artículos reales de tu papá reemplazan a los de muestra automáticamente.

## Estado (demo)

Según lo acordado en el handoff, estos flujos quedan como **demostración visual**, sin conectar todavía:

- Pagos de la Matriz de diagnóstico de brechas (USD 29 / COP 99.000).
- Descargas de las herramientas gratuitas.
- Envío real del formulario de contacto y de los formularios de entrega.
- Foto profesional de José Antonio Lara en `/nosotros` (hay un espacio reservado).

Cada uno tiene su punto de integración marcado para activarlo cuando lo decidas.
