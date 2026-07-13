// Esquema de artículo bilingüe para el Studio de Sanity de Lara ARA.
// Copia este archivo a tu proyecto de Sanity Studio (carpeta schemaTypes/)
// y regístralo en schemaTypes/index.js.
export default {
  name: 'article',
  title: 'Artículo (Perspectiva)',
  type: 'document',
  fields: [
    { name: 'titleEs', title: 'Título (ES)', type: 'string', validation: (R) => R.required() },
    { name: 'titleEn', title: 'Título (EN)', type: 'string' },
    {
      name: 'slug', title: 'Slug (URL)', type: 'slug',
      options: { source: 'titleEs', maxLength: 96 }, validation: (R) => R.required(),
    },
    { name: 'featured', title: 'Destacado (aparece arriba)', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime', validation: (R) => R.required() },
    { name: 'categoryEs', title: 'Categoría (ES)', type: 'string' },
    { name: 'categoryEn', title: 'Categoría (EN)', type: 'string' },
    { name: 'excerptEs', title: 'Resumen (ES)', type: 'text', rows: 3 },
    { name: 'excerptEn', title: 'Resumen (EN)', type: 'text', rows: 3 },
    { name: 'bodyEs', title: 'Cuerpo (ES)', type: 'array', of: [{ type: 'block' }] },
    { name: 'bodyEn', title: 'Cuerpo (EN)', type: 'array', of: [{ type: 'block' }] },
  ],
  orderings: [
    { title: 'Más reciente', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: { select: { title: 'titleEs', subtitle: 'categoryEs' } },
};
