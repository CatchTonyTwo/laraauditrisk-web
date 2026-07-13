// Artículos de muestra. Se usan mientras Sanity no esté conectado, para que la
// sección Perspectivas no quede vacía y el sitio compile. Cuando conectes Sanity,
// estos se reemplazan automáticamente por el contenido real que escriba tu papá.

const p = (text) => ({ _type: 'block', style: 'normal', _key: Math.random().toString(36).slice(2), children: [{ _type: 'span', text }] });
const h = (text) => ({ _type: 'block', style: 'h2', _key: Math.random().toString(36).slice(2), children: [{ _type: 'span', text }] });

export const sampleArticles = [
  {
    slug: 'guia-primer-ano-normas-2024',
    featured: true,
    publishedAt: '2026-02-10',
    categoryEs: 'Normas 2024 · Leer primero',
    categoryEn: '2024 Standards · Start here',
    titleEs: 'El primer año bajo las Normas 2024, para un DEA que acaba de heredar el problema',
    titleEn: 'The first year under the 2024 Standards, for a CAE who just inherited the problem',
    excerptEs: 'Cambiar de marco no es archivar papeles nuevos. Son unas pocas decisiones que conviene tomar temprano para no llegar a la evaluación externa improvisando.',
    excerptEn: "Switching frameworks isn't about filing new paperwork. It's a handful of decisions worth taking early so you don't reach the external assessment improvising.",
    bodyEs: [
      p('Cuando alguien hereda una función de auditoría interna, lo primero que siente es que tiene que arreglarlo todo a la vez. No es así. El primer año se gana con pocas decisiones, tomadas en orden.'),
      h('Primero, entienda a su Comité'),
      p('Antes de tocar un papel de trabajo, hay que saber qué espera el Comité de Auditoría y qué le preocupa. Eso define las prioridades más que cualquier norma.'),
      h('Después, arme la evidencia'),
      p('La evaluación externa no premia buenas intenciones. Premia trazabilidad. Cada conclusión debe poder defenderse con evidencia, no con memoria.'),
    ],
    bodyEn: [
      p('When someone inherits an internal audit function, the first instinct is to fix everything at once. It doesn\'t work that way. The first year is won with a few decisions, taken in order.'),
      h('First, understand your Committee'),
      p('Before touching a working paper, you need to know what the Audit Committee expects and what worries them. That sets priorities more than any standard.'),
      h('Then, build the evidence'),
      p('The external assessment doesn\'t reward good intentions. It rewards traceability. Every conclusion must be defensible with evidence, not memory.'),
    ],
  },
  {
    slug: 'pamc-que-el-comite-lea',
    publishedAt: '2026-01-22',
    categoryEs: 'Calidad', categoryEn: 'Quality',
    titleEs: 'Un PAMC que el Comité lea de verdad, no que solo reciba',
    titleEn: 'A QAIP your Committee actually reads, not just receives',
    excerptEs: 'Métricas, cadencia de reporte y el equilibrio entre evaluación interna continua y periódica.',
    excerptEn: 'Metrics, reporting cadence and the balance between ongoing and periodic internal assessment.',
    bodyEs: [ p('Un buen PAMC no es un documento largo. Es uno que el Comité entiende en cinco minutos y del que sale una decisión.'), p('La clave está en elegir pocas métricas que importen y reportarlas siempre igual, para que se vea la tendencia.') ],
    bodyEn: [ p('A good QAIP isn\'t a long document. It\'s one the Committee understands in five minutes and acts on.'), p('The trick is picking a few metrics that matter and reporting them the same way every time, so the trend is visible.') ],
  },
  {
    slug: 'cumple-generalmente-no-es-la-meta',
    publishedAt: '2026-01-05',
    categoryEs: 'Evaluación externa', categoryEn: 'External assessment',
    titleEs: '"Cumple generalmente" pasa la prueba, pero no es la meta',
    titleEn: '"Generally conforms" passes, but it isn\'t the goal',
    excerptEs: 'Qué separa una función que cumple de una que genera valor real para la organización.',
    excerptEn: 'What separates a conforming function from one that delivers real value.',
    bodyEs: [ p('Cumplir es el piso, no el techo. La diferencia real está en si la auditoría cambia decisiones.') ],
    bodyEn: [ p('Conformance is the floor, not the ceiling. The real difference is whether audit changes decisions.') ],
  },
  {
    slug: 'ce006-2025-sin-el-susto',
    publishedAt: '2025-12-14',
    categoryEs: 'Regulación', categoryEn: 'Regulation',
    titleEs: 'La CE006/2025 sin el susto: qué pide y qué no',
    titleEn: "CE006/2025 without the panic: what it asks and what it doesn't",
    excerptEs: 'Implicaciones de gobierno y auditoría para entidades vigiladas por la Superintendencia Financiera.',
    excerptEn: 'Governance and audit implications for entities supervised by the financial regulator.',
    bodyEs: [ p('La circular asusta más por su extensión que por su fondo. Leída con calma, pide cosas razonables sobre gobierno de la auditoría.') ],
    bodyEn: [ p('The circular scares people by its length more than its substance. Read calmly, it asks reasonable things about audit governance.') ],
  },
  {
    slug: 'codigo-de-etica-normas-2024',
    publishedAt: '2025-11-30',
    categoryEs: 'Ética', categoryEn: 'Ethics',
    titleEs: 'El Código de Ética bajo las Normas 2024, sin moralina',
    titleEn: 'The Code of Ethics under the 2024 Standards, without the sermon',
    excerptEs: 'Diagnóstico de brechas frente a integridad, objetividad, competencia y confidencialidad.',
    excerptEn: 'Gap analysis against integrity, objectivity, competency and confidentiality.',
    bodyEs: [ p('La ética no se audita con discursos. Se audita con evidencia de que los principios se aplican en decisiones concretas.') ],
    bodyEn: [ p('Ethics isn\'t audited with speeches. It\'s audited with evidence that the principles show up in concrete decisions.') ],
  },
  {
    slug: 'psicometria-mide-la-prueba',
    publishedAt: '2025-11-08',
    categoryEs: 'Competencias', categoryEn: 'Competency',
    titleEs: 'Por qué la psicometría mide la prueba y no al auditor',
    titleEn: 'Why psychometrics measures the test, not the auditor',
    excerptEs: 'El análisis psicométrico evalúa la calidad del instrumento. La analogía del termómetro.',
    excerptEn: 'Psychometric analysis measures instrument quality. The thermometer analogy.',
    bodyEs: [ p('Antes de tomar la temperatura hay que calibrar el termómetro. Con las pruebas de competencias pasa igual.') ],
    bodyEn: [ p('Before taking a temperature you calibrate the thermometer. Competency tests are no different.') ],
  },
];

export default sampleArticles;
