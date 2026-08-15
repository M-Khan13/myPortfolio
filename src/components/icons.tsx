import type { SocialId } from "@/content";

type IconProps = { className?: string };

/*
 * Brand marks are hand-inlined rather than pulled from an icon package: there
 * are only four, and lucide has no npm or X glyph.
 */

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function NpmIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763ZM5.13 5.323h13.837v13.34h-3.076V8.4h-3.33v10.263H5.13V5.323Z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.063-6.932Zm-1.29 19.5h2.039L6.486 3.24H4.298l13.312 17.413Z" />
    </svg>
  );
}

export const socialIcons: Record<SocialId, (p: IconProps) => React.ReactElement> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  npm: NpmIcon,
  x: XIcon,
};

export function VerifiedIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5l2.4 2.06 3.15-.35 1.1 2.98 2.85 1.36-.7 3.1.7 3.1-2.85 1.36-1.1 2.98-3.15-.35L12 22.5l-2.4-2.06-3.15.35-1.1-2.98-2.85-1.36.7-3.1-.7-3.1 2.85-1.36 1.1-2.98 3.15.35L12 1.5Z" />
      <path
        d="m8.4 12.2 2.5 2.5 4.8-4.9"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/*
 * Entry glyphs — the marks that sit inside the badge on each Experience,
 * Project and Education row. Same 24px stroked grid as the icons above so the
 * three sections share one visual language. Pick one per entry in content.ts.
 */

export type EntryIconId =
  | "flask"
  | "cup"
  | "branch"
  | "document"
  | "terminal"
  | "cap";

function Stroked({ className, d }: IconProps & { d: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/*
 * Case-study section glyphs. Fixed per section rather than chosen in
 * content.ts — every write-up has the same three narrative beats — so they sit
 * outside `entryIcons`. Same stroked grid as everything above.
 */
export const caseStudyIcons = {
  // The problem: a flagged warning.
  problem: (p: IconProps) => (
    <Stroked
      {...p}
      d="M12 4.5 20.8 19.5H3.2L12 4.5ZM12 10.2v3.6M12 16.4v.6"
    />
  ),
  // Constraints: hard bounds either side of the work.
  constraints: (p: IconProps) => (
    <Stroked
      {...p}
      d="M9 4.5H6.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2H9M15 4.5h2.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H15M12 8.5v7"
    />
  ),
  // What I built: assembled parts.
  build: (p: IconProps) => (
    <Stroked
      {...p}
      d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z"
    />
  ),
} satisfies Record<string, (p: IconProps) => React.ReactElement>;

export const entryIcons: Record<
  EntryIconId,
  (p: IconProps) => React.ReactElement
> = {
  // Research / fellowship work.
  flask: (p) => (
    <Stroked
      {...p}
      d="M9.5 3v6.2L4.6 17.6A2 2 0 0 0 6.3 20.6h11.4a2 2 0 0 0 1.7-3L14.5 9.2V3M8 3h8M7.4 15h9.2"
    />
  ),
  // Hospitality / café.
  cup: (p) => (
    <Stroked
      {...p}
      d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM17 9.5h1.5a2.75 2.75 0 0 1 0 5.5H17M7.5 2.5v2M11 2.5v2M14.5 2.5v2"
    />
  ),
  // Repository / source analysis.
  branch: (p) => (
    <Stroked
      {...p}
      d="M6.5 7.5v11M4.5 5.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15.5 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0M4.5 20.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0M17.5 10v1.5a4 4 0 0 1-4 4h-7"
    />
  ),
  // Documents / retrieval.
  document: (p) => (
    <Stroked
      {...p}
      d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3ZM13.5 3v5.5H19M8.5 12.5h7M8.5 16.5h4.5"
    />
  ),
  // Command line tooling.
  terminal: (p) => (
    <Stroked {...p} d="M4.5 4.5h15v15h-15zM8 9.5l2.75 2.5L8 14.5M13 15h4" />
  ),
  // Education.
  cap: (p) => (
    <Stroked
      {...p}
      d="M12 3.5 22 8.25 12 13 2 8.25 12 3.5ZM6.5 10.6V16c0 1.6 2.5 3.2 5.5 3.2s5.5-1.6 5.5-3.2v-5.4M21 9v5.5"
    />
  ),
};
