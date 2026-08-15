/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONTENT — this is the only file you need to edit.
 *
 * Anything wrapped in {{ DOUBLE_BRACES }} is a placeholder. It renders on the
 * page as a dashed, muted chip so it is impossible to miss, and it is never
 * turned into a real link. Replace the string to make it live.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { EntryIconId } from "@/components/icons";

/** True for unfilled `{{PLACEHOLDER}}` values. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return typeof value === "string" && /^\s*\{\{.*\}\}\s*$/.test(value);
}

/** Strips the braces so `{{EMAIL}}` displays as `EMAIL`. */
export function placeholderLabel(value: string): string {
  return value.replace(/^\s*\{\{\s*/, "").replace(/\s*\}\}\s*$/, "");
}

export type SocialId = "github" | "linkedin" | "npm" | "x";

export const profile = {
  name: "Farzan Khan",
  /** Shows a small verified-style tick next to the name. */
  verified: true,
  title: "Full-Stack & AI Engineer",
  secondary: "FOSSEE Summer Fellow @ IIT Bombay",
  location: "India",
  tagline: "Building AI-native products — measured, not assumed.",
  email: "farzankhan1800@gmail.com",
  /** Drop a file in /public and point at it, e.g. "/avatar.jpg". */
  avatar: "{{AVATAR_IMAGE}}",
  /** Optional. Set to null to hide the résumé link entirely. */
  resume: "https://bit.ly/4gOaCQL" as string | null,
  /** IANA zone driving the live clock in the profile card. */
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
} as const;

/** GitHub account the contribution graph is built from. */
export const githubUser = "M-Khan13";

/**
 * Social row under the profile card and in the footer.
 * Delete an entry to remove the icon; a `{{PLACEHOLDER}}` href renders the icon
 * disabled rather than linking somewhere broken.
 */
export const socials: {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "M-Khan13",
    href: `https://github.com/M-Khan13`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Farzan Khan",
    href: "https://www.linkedin.com/in/farzan-k-06a108313/",
  },
  {
    id: "npm",
    label: "npm",
    handle: "@farzan_khan",
    href: "https://www.npmjs.com/~farzan_khan",
  },
  // X / Twitter — delete this entry if you don't want it shown.
  
];

/**
 * Script heading above the intro, picked by time of day in `profile.timeZone`
 * (IST) — the same for every visitor, wherever they are. Edit the wording here;
 * the cutoffs live in `src/lib/time.ts`.
 */
export const greetings = {
  night: "Still up?", // 00:00 – 05:29
  morning: "Good morning", // 05:30 – 11:59
  afternoon: "Good afternoon", // 12:00 – 16:59
  evening: "Good evening", // 17:00 – 23:59
};

export const intro = {
  bullets: [
    "Final-year B.Tech Computer Science student at VIT Bhopal (CGPA 8.5), building full-stack and AI products.",
    "FOSSEE Summer Fellow at IIT Bombay, contributing to eSim-Cloud — an open-source, browser-based circuit simulator.",
    "MERN + AI integration is home turf: hand-rolled RAG pipelines, LLM eval guards, Gemini API.",
    "I ship with eval harnesses — measured, not assumed.",
  ],
};

export const stack: { no: string; label: string; items: string[] }[] = [
  { no: "01", label: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  {
    no: "02",
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui"],
  },
  {
    no: "03",
    label: "Backend",
    items: ["Node.js", "Express", "Django", "DRF", "Celery"],
  },
  { no: "04", label: "Database", items: ["MongoDB", "PostgreSQL", "Redis"] },
  {
    no: "05",
    label: "AI & RAG",
    items: ["Gemini", "Ollama", "nomic-embed", "RAG", "LLM Eval Guards"],
  },
  {
    no: "06",
    label: "DevOps & Tools",
    items: ["Docker", "GitHub Actions", "Git", "Railway", "nginx"],
  },
];

export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  /** Badge glyph on the entry's left rail — see `entryIcons` in icons.tsx. */
  icon: EntryIconId;
  bullets: string[];
  tech: string[];
  /** Open on first paint. */
  defaultOpen?: boolean;
};

export const experience: Experience[] = [
  {
    company: "IIT Bombay",
    role: "FOSSEE Summer Fellow",
    dates: "2026 — Present",
    location: "Remote",
    icon: "flask",
    defaultOpen: true,
    bullets: [
      "Built the Model & Subcircuit Builder UI for authoring SPICE .model / .subckt blocks with live preview and drag-to-canvas placement. PR #12 merged.",
      "Designed Parametric Sweep Simulation: N parallel Celery jobs, new SweepRun / SweepStep models, polling-based progress, multi-trace overlay viewer.",
      "Added circuit export: SPICE .cir download, PDF, and LTspice .asc via a custom symbol-mapping generator.",
    ],
    tech: ["React", "Django", "DRF", "Celery", "Redis", "PostgreSQL", "Chart.js"],
  },
];

export type ProjectLink = { label: string; href: string };

/**
 * The long-form write-up behind a project, rendered at `/projects/[slug]`.
 *
 * Optional by design: a project without one keeps its card on the homepage and
 * never gets a detail page, so case studies can be written one at a time.
 */
export type CaseStudy = {
  /** How the work was staffed, e.g. "Solo — full-stack". */
  role: string;
  /** Lead image, a path under /public. A `{{PLACEHOLDER}}` draws a frame. */
  cover?: string;
  problem: string;
  /** Rendered as an ordered 01/02/03 list, so order is meaningful. */
  constraints: string[];
  build: {
    intro: string;
    /** Data for the monochrome node diagram — one box per node, in flow order. */
    architecture: {
      nodes: { label: string; sub?: string }[];
      deploy?: string;
    };
    decisions: { title: string; body: string }[];
  };
  /** Stat blocks: a big mono value over a small label. */
  outcome: { value: string; label: string }[];
  /** A `{{PLACEHOLDER}}` src renders a framed placeholder with its caption. */
  gallery?: { src: string; caption: string }[];
  reflection: string;
};

export type Project = {
  /** URL segment for the case-study page: `/projects/[slug]`. */
  slug: string;
  title: string;
  year: string;
  description: string;
  /** Badge glyph on the entry's left rail — see `entryIcons` in icons.tsx. */
  icon: EntryIconId;
  bullets: string[];
  tech: string[];
  links: ProjectLink[];
  defaultOpen?: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "cafe-ops",
    title: "Café Ops",
    year: "2025",
    description: "Full-stack café operations platform.",
    icon: "cup",
    defaultOpen: true,
    bullets: [
      "JWT auth with role-based access and an order state machine.",
      "AI task generation via Gemini, gated by a 5-check eval guard.",
      "Real-time order feed over Socket.IO.",
      "Dockerized, green GitHub Actions CI, deployed on Railway.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini", "Socket.IO", "Docker"],
    links: [
      { label: "Repo", href: "https://github.com/M-Khan13/Cafe-opps" },
      { label: "Live", href: "{{CAFE_OPS_LIVE_URL}}" },
    ],
    caseStudy: {
      role: "Solo — full-stack",
      cover: "{{CAFE_OPS_COVER}}",
      problem:
        "Small cafés run on shouted orders and sticky notes. Front-of-house loses track of what's fired, the kitchen loses track of what's next, and shift leads spend the rush improvising task lists instead of running the floor. I wanted a single surface that kept orders and staff work in sync in real time — without adding another thing for busy staff to babysit.",
      constraints: [
        "AI-generated tasks could never be wrong on the floor. A hallucinated or nonsensical task during a rush is worse than no task at all, so anything the model produced had to pass hard validation before a human ever saw it.",
        "Two very different audiences shared one backend — admins managing orders and staff clearing tasks — so role-based access had to be enforced at the API, not just hidden in the UI.",
        "Order state had to feel instant across every open screen. A tablet at the counter and a phone in the back should reflect the same truth within a blink — polling wasn't going to cut it.",
      ],
      build: {
        intro:
          "A two-sided operations platform: a React client for both admin and staff, a Node/Express API guarding role-based access with JWT, MongoDB for state, a Socket.IO channel pushing the live order feed, and a Gemini task generator sitting behind a 5-check validation guard.",
        architecture: {
          nodes: [
            { label: "CLIENT", sub: "React — admin · staff" },
            { label: "API GATEWAY", sub: "Node · Express · JWT roles" },
            { label: "MongoDB", sub: "state store" },
            { label: "Socket.IO", sub: "live order feed" },
            { label: "Gemini", sub: "→ 5-check guard" },
          ],
          deploy: "Docker → GitHub Actions CI → Railway",
        },
        decisions: [
          {
            title: "The 5-check guard",
            body: "Every AI task runs a gauntlet — schema shape, field bounds, role fit, duplicate detection, and profanity/nonsense screening — and anything that fails is dropped silently rather than shown.",
          },
          {
            title: "Auth at the edge",
            body: "JWT with role claims is verified in Express middleware, so the staff UI physically can't reach admin routes even if the client is tampered with.",
          },
          {
            title: "Events over polling",
            body: "Order changes broadcast over Socket.IO rooms scoped per café, so every screen updates from one write instead of hammering the API.",
          },
          {
            title: "Ship it reproducibly",
            body: "One Dockerfile, a GitHub Actions pipeline that builds and tests on every push, and a one-command deploy to Railway.",
          },
        ],
      },
      outcome: [
        { value: "5", label: "check eval guard on every AI task" },
        { value: "0", label: "bad AI tasks shipped to staff" },
        { value: "<100ms", label: "real-time order feed latency" },
      ],
      gallery: [
        { src: "{{CAFE_OPS_SHOT_KANBAN}}", caption: "Order kanban" },
        { src: "{{CAFE_OPS_SHOT_TASKS}}", caption: "Staff task screen" },
        { src: "{{CAFE_OPS_SHOT_AI_REVIEW}}", caption: "AI task review" },
        { src: "{{CAFE_OPS_SHOT_FEED}}", caption: "Live order feed" },
      ],
      reflection:
        'The guard was the hard part, not the model. Most of the work was deciding what "good enough to show a human" actually meant — and being willing to throw away tasks that weren\'t.',
    },
  },
  {
    slug: "ai-github-repo-explainer",
    title: "AI GitHub Repo Explainer",
    year: "2026",
    description: "Ask a codebase how it works.",
    icon: "branch",
    bullets: [
      "Clones a repo and chunks source with syntax-aware tree-sitter parsing.",
      "Embeds with nomic-embed and retrieves via hand-rolled cosine similarity.",
      "Answers with Gemini grounded generation plus file:line citations.",
      "Eval harness: baseline hit@6 = 90%.",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Ollama", "tree-sitter", "Gemini"],
    links: [],
  },
  {
    slug: "rag-doc-qa",
    title: "RAG Doc Q&A",
    year: "2026",
    description: "Chat with your PDFs.",
    icon: "document",
    bullets: [
      "A RAG loop built by hand, no LangChain: chunk → embed → cosine top-k retrieval → grounded answer.",
      "Cites sources with [n] markers and refuses strictly when the context doesn't support an answer.",
      "Eval harness showed baseline chunking beat both tuning attempts.",
    ],
    tech: ["Node.js", "Express", "MongoDB Atlas", "Ollama", "Gemini", "React"],
    links: [],
  },
  {
    slug: "sen",
    title: "sen",
    year: "2026",
    description: "A CLI command-runner published to npm.",
    icon: "terminal",
    bullets: [
      "Save, list, run, and remove multi-step command sequences.",
      "Stop-on-first-failure execution, persisted to a config file.",
    ],
    tech: ["Node.js", "CLI", "npm"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/@farzan_khan/sen" },
    ],
  },
];

export const education = {
  school: "VIT Bhopal",
  degree: "B.Tech, Computer Science",
  dates: "2023 — 2027",
  icon: "cap" as EntryIconId,
  detail: "CGPA 8.5",
  coursework: [
    "Deep Learning",
    "Computer Vision",
    "Reinforcement Learning",
    "GNNs",
    "NLP",
    "Data Mining",
    "IoT",
    "Numerical Methods",
    "Probability & Statistics",
  ],
};

export const outro = {
  line: "Have something to build? Let's talk.",
};

export const meta = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};
