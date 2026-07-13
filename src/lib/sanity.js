// Lectura de artículos desde Sanity usando la API HTTP directa (sin @sanity/client,
// para mantener el proyecto liviano). Si no hay projectId configurado, o si la
// consulta falla, se usan los artículos de muestra y el sitio compila igual.
import { sampleArticles } from '../content/sampleArticles.js';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = 'v2024-01-01';

export const hasSanity = Boolean(projectId);

const FIELDS = `
  "slug": slug.current, publishedAt, featured,
  titleEs, titleEn, categoryEs, categoryEn, excerptEs, excerptEn, bodyEs, bodyEn
`;
const QUERY = `*[_type == "article" && !(_id in path("drafts.**"))] | order(publishedAt desc){${FIELDS}}`;

let cache = null;

async function fetchAll() {
  if (!hasSanity) return sampleArticles;
  if (cache) return cache;
  const url = `https://${projectId}.apicdn.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(QUERY)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    cache = json.result && json.result.length ? json.result : sampleArticles;
    return cache;
  } catch (e) {
    console.warn('[sanity] fetch failed, using sample articles:', e.message);
    return sampleArticles;
  }
}

export async function getArticles() {
  return fetchAll();
}

export async function getArticle(slug) {
  const all = await fetchAll();
  return all.find((a) => a.slug === slug);
}
