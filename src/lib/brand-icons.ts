/**
 * Brand marks for the Stack section, pulled from `simple-icons`.
 *
 * Only the icons named here are imported, so the 3,400-icon package is
 * tree-shaken down to the handful actually rendered.
 *
 * A few entries in the stack have no brand mark at all — RAG, LLM Eval Guards,
 * nomic-embed and DRF are techniques or acronyms, not products. They are simply
 * absent from this map and the Stack component falls back to a neutral glyph.
 */

import {
  siCelery,
  siDjango,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGooglegemini,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPython,
  siRailway,
  siReact,
  siRedis,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

/** The subset of a simple-icons entry we actually render. */
export type BrandIcon = { title: string; path: string; hex: string };

const BRANDS: Record<string, BrandIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Python: siPython,

  React: siReact,
  "Next.js": siNextdotjs,
  Vite: siVite,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,

  "Node.js": siNodedotjs,
  Express: siExpress,
  Django: siDjango,
  Celery: siCelery,

  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  Redis: siRedis,

  Gemini: siGooglegemini,
  Ollama: siOllama,

  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Git: siGit,
  Railway: siRailway,
  nginx: siNginx,
};

/** `undefined` for anything without a brand mark — render the neutral glyph. */
export function brandIcon(label: string): BrandIcon | undefined {
  return BRANDS[label];
}
