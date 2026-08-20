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
  avatar: "/avatar.png",
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
  /**
   * Lead image. `src` is a path under /public; a `{{PLACEHOLDER}}` draws the
   * empty frame instead, with `caption` set inside it.
   */
  cover?: { src: string; caption: string };
  problem: string;
  /** Rendered as an ordered 01/02/03 list, so order is meaningful. */
  constraints: string[];
  build: {
    intro: string;
    architecture: {
      /**
       * The node diagram, one array per row of the flow. Rows stack top to
       * bottom with an arrow between them, and a row holding several nodes
       * renders them side by side — that's how a single spine branches out.
       */
      rows: { label: string; sub?: string }[][];
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
      { label: "Repository", href: "https://github.com/M-Khan13/Cafe-opps" },
      // { label: "Live site", href: "{{CAFE_OPS_LIVE_URL}}" },
    ],
    caseStudy: {
      role: "Solo — full-stack",
      cover: {
        src: "/images/Admin_dashboard.png",
        caption: "Cover — admin order kanban",
      },
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
          // Client and gateway form the spine; everything the gateway talks to
          // sits on the branch row beneath it.
          rows: [
            [{ label: "CLIENT", sub: "React — admin · staff" }],
            [{ label: "API GATEWAY", sub: "Node · Express · JWT roles" }],
            [
              { label: "MongoDB", sub: "state store" },
              { label: "Socket.IO", sub: "live order feed" },
              { label: "Gemini", sub: "→ 5-check guard" },
            ],
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
        { src: "/images/Staff_dashboard.png", caption: "Staff task screen",  },
        { src: "/images/Live_order.png", caption: "Live order feed" },
        { src: "/images/Login_screen.png", caption: "Login Screen" },
        { src: "/images/Ai_task.png", caption: "AI Task" },
      ],
      reflection:
        'The guard was the hard part, not the model. Most of the work was deciding what "good enough to show a human" actually meant — and being willing to throw away tasks that weren\'t.',
    },
  },
  {
    slug: "repo-explainer",
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
    caseStudy: {
      role: "Solo — backend / AI",
      problem:
        'Dropping into an unfamiliar codebase is slow. You want to ask "how does auth work here?" and get an answer grounded in the actual code — with file and line citations — not a confident guess from a model that has never seen the repo. I wanted a tool that reads a repository and answers questions about it, honestly.',
      constraints: [
        "A whole repo doesn't fit in a context window, so source had to be chunked intelligently. Splitting by arbitrary line counts returns half-functions that mean nothing — the chunking had to respect code structure.",
        'Answers had to be grounded in real code with file:line citations. A plausible-sounding hallucination about someone\'s own codebase is worse than "I don\'t know."',
        "The whole pipeline runs on local embeddings via Ollama — no paid embedding API. So retrieval quality had to come from design, not from throwing a bigger model at it.",
      ],
      build: {
        intro:
          "Clone a repo, chunk its source with syntax-aware tree-sitter parsing, embed each chunk with nomic-embed via Ollama, store and retrieve by hand-rolled cosine similarity, then answer with Gemini grounded generation that cites file:line. An eval harness scores retrieval so every change is measured, not assumed.",
        architecture: {
          // A straight pipeline — every stage feeds exactly one successor, so
          // each gets a row of its own.
          rows: [
            [{ label: "INGEST", sub: "clone · tree-sitter chunk" }],
            [{ label: "EMBED", sub: "nomic-embed · Ollama" }],
            [{ label: "STORE", sub: "MongoDB vectors" }],
            [{ label: "RETRIEVE", sub: "cosine top-k" }],
            [{ label: "GENERATE", sub: "Gemini · file:line citations" }],
          ],
          deploy: "Local Ollama · Node + Express",
        },
        decisions: [
          {
            title: "Syntax-aware chunking",
            body: "tree-sitter parses functions and classes as whole units instead of cutting mid-body, so every retrieved chunk is a complete, meaningful piece of code.",
          },
          {
            title: "Grounded, with citations",
            body: "Every answer cites the file and line it came from, and the model is instructed to refuse when the retrieved context doesn't actually support an answer.",
          },
          {
            title: "Measured retrieval",
            body: 'Built a 10-question retrieval eval; baseline hit@6 = 90%. When I "improved" it by dropping short chunks, the score dropped — so I kept the baseline. Measured, not assumed.',
          },
          {
            title: "Honest about gaps",
            body: "Express route handlers written as call expressions aren't extracted yet. It's documented as a known limitation rather than hidden.",
          },
        ],
      },
      outcome: [
        { value: "90%", label: "hit@6 on retrieval eval" },
        { value: "107", label: "chunks indexed from a real repo" },
        { value: "0", label: "paid embedding calls — fully local" },
      ],
      // gallery: [
      //   { src: "{{REPO_EXPLAINER_SHOT_EVAL}}", caption: "Eval harness output" },
      //   {
      //     src: "{{REPO_EXPLAINER_SHOT_CITATIONS}}",
      //     caption: "Grounded answer with citations",
      //   },
      //   { src: "{{REPO_EXPLAINER_SHOT_ARCHITECTURE}}", caption: "Architecture" },
      //   {
      //     src: "{{REPO_EXPLAINER_SHOT_CHUNKING}}",
      //     caption: "Chunking breakdown",
      //   },
      // ],
      reflection:
        'The finding that "improving" the chunking made retrieval worse was the whole point. Without the eval harness I\'d have shipped a worse system, convinced it was better.',
    },
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
    caseStudy: {
      role: "Solo — backend / AI",
      problem:
        "You have documents — PDFs, notes — and you want to ask questions and get answers grounded in them, with citations, not a chatbot that invents things. I also wanted to build the retrieval loop by hand, no LangChain, so I actually understood every step instead of importing a black box.",
      constraints: [
        "No framework doing the thinking for me. I wrote the chunking, embedding, and cosine retrieval directly so every step is understood and debuggable.",
        "Answers had to carry [n] citations back to source chunks, and the system had to refuse when the documents simply don't contain the answer — no confident hallucinations.",
        '"Better" had to be provable. The eval harness was part of the build from the start, not bolted on after.',
      ],
      build: {
        intro:
          "A hand-rolled RAG loop, no LangChain: chunk documents, embed with nomic-embed via Ollama, store in MongoDB Atlas, retrieve top-k by cosine similarity, then answer with Gemini — grounded, cited as [n], and refusing when the context doesn't support an answer.",
        architecture: {
          rows: [
            [{ label: "INGEST", sub: "PDF · chunk" }],
            [{ label: "EMBED", sub: "nomic-embed · Ollama" }],
            [{ label: "STORE", sub: "MongoDB Atlas" }],
            [{ label: "RETRIEVE", sub: "cosine top-k" }],
            [{ label: "GENERATE", sub: "Gemini · [n] citations · refusal" }],
          ],
          deploy: "Node + Express · React client",
        },
        decisions: [
          {
            title: "Hand-rolled, no LangChain",
            body: "Wrote chunking, the embedding calls, and cosine retrieval myself to understand the full pipeline end to end rather than trusting a framework's defaults.",
          },
          {
            title: "Grounded answers + refusal",
            body: "Responses cite their source chunks as [n], and the prompt enforces a simple rule: if the retrieved context doesn't answer it, say so.",
          },
          {
            title: "Eval-first",
            body: 'An 8-question eval harness scored retrieval and answer quality. The finding: baseline chunking beat both of my "improvement" attempts, so I kept the baseline.',
          },
        ],
      },
      outcome: [
        { value: "8", label: "question eval harness" },
        { value: "baseline", label: "beat both tuning attempts" },
        { value: "0", label: "LangChain dependencies" },
      ],
      // gallery: [
      //   { src: "{{RAG_DOC_QA_SHOT_CITATIONS}}", caption: "Q&A with citations" },
      //   { src: "{{RAG_DOC_QA_SHOT_EVAL}}", caption: "Eval harness table" },
      //   { src: "{{RAG_DOC_QA_SHOT_ARCHITECTURE}}", caption: "Architecture" },
      //   { src: "{{RAG_DOC_QA_SHOT_REFUSAL}}", caption: "Refusal example" },
      // ],
      reflection:
        'This is where the discipline that runs through everything since started: build the eval first, then let the numbers tell you what actually works. The "improvements" that lost turned out to be the most useful result.',
    },
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
