# Farzan Khan — portfolio

Single-page personal portfolio. Next.js (App Router) + TypeScript + Tailwind CSS
v4 + shadcn/ui, deployed on Vercel.

```bash
npm install
cp .env.example .env.local   # then paste a GitHub token, see below
npm run dev                  # http://localhost:3000
```

## Editing content

**Everything on the page comes from [`src/content.ts`](src/content.ts).** No copy
is hard-coded into components. Change a string there and it changes on the site.

Values written as `{{PLACEHOLDER}}` are unfilled. They render as an obvious
dashed chip rather than becoming a dead link, so nothing ships silently broken.
Currently unfilled:

| Placeholder           | Where it shows                    |
| --------------------- | --------------------------------- |
| `{{AVATAR_IMAGE}}`    | Profile card — falls back to an `FK` monogram tile |
| `{{CAFE_OPS_LIVE_URL}}` | Café Ops project links          |

For the avatar, drop a file in `public/` and set `profile.avatar` to e.g.
`"/avatar.jpg"`.

## Contribution graph

GitHub's REST API doesn't expose the contribution calendar, so
[`src/lib/github.ts`](src/lib/github.ts) queries the GraphQL API
(`contributionsCollection.contributionCalendar`) and caches the result for 24h.

The module is marked `server-only`, so `GITHUB_TOKEN` can never be bundled into
client code — importing it from a client component fails the build. A **classic
token with no scopes ticked** is enough for public contribution data.

Without a token the graph degrades to a correctly-dated empty grid plus a note
explaining why, rather than crashing the page.

On Vercel, add `GITHUB_TOKEN` under Project → Settings → Environment Variables.

## Contact form

The form in the Contact section posts to
[`src/app/api/contact/route.ts`](src/app/api/contact/route.ts), which relays to
[Web3Forms](https://web3forms.com) using `WEB3FORMS_KEY`. The browser never sees
the key — do **not** rename it to `NEXT_PUBLIC_WEB3FORMS_KEY`, which would
publish it in the bundle for anyone to send mail with.

Create a key at web3forms.com with the delivery address; the key itself decides
where messages land. A hidden `botcheck` honeypot field is dropped server-side,
answering `200` so bots get no signal that they were caught.

Without a key the form still renders and replies with a "not configured yet"
notice instead of sending. Add `WEB3FORMS_KEY` on Vercel alongside
`GITHUB_TOKEN`.

## Notes on behaviour

- **Theme** — dark by default, persisted to `localStorage`. An inline script in
  `<head>` applies the stored choice during HTML parsing, before first paint, so
  there is no flash. Both palettes are CSS variables in `src/app/globals.css`.
  The light theme is warm off-white paper, not white: nothing in it reaches
  `oklch(1 0 0)`, which keeps the page from glaring and leaves the card surfaces
  somewhere lighter to go. The contribution ramp follows suit — grey down to
  near-black ink on paper, cream off-white in the dark theme.
- **Clock** — the profile card shows live IST, re-aligned to the top of each
  minute, with the offset relative to the viewer's own zone.
- **Greeting** — the script heading greets by **IST**, not the viewer's zone, so
  everyone sees the same thing. Wording is in `greetings` in `src/content.ts`;
  the cutoffs are in `src/lib/time.ts` — 00:00 night, 05:30 morning, 12:00
  afternoon, 17:00 evening. It re-reads the clock every minute, so a tab left
  open across a boundary updates itself.
- **Expand/collapse** — Experience and Projects use a real `<button>` with
  `aria-expanded`. Collapsed panels are `inert`, keeping their links out of the
  tab order. Height animates via `grid-template-rows: 0fr → 1fr`;
  `prefers-reduced-motion` makes it snap instead.
- **Hover** — one treatment sitewide, the `.lift` utilities in
  `globals.css`: a faint brightening of icons, tags, badges and interactive rows
  only. Stack brand marks additionally warm towards their own colour, mixed far
  enough back into the foreground to stay a tint. These rules live in the
  `utilities` layer because the elements also carry `text-muted-foreground`, and
  a later cascade layer beats any specificity a `components` rule could reach.
- **Hero backdrop** — `src/components/iso-mark.tsx` draws "MK" as an extruded
  isometric wireframe from polygon letterforms, fitted to its viewBox at module
  load. A radial mask follows the pointer and reveals a brighter copy of the
  same strokes. Under `prefers-reduced-motion` the pointer layer is never
  mounted and the static art renders alone.
- **Without JS** the page is fully readable — nav, profile, graph, and every
  section render server-side. The limitations are that collapsed Experience and
  Projects entries can't be opened, so the newest entry in each defaults to open
  (`defaultOpen` in `content.ts`), and the contact form needs JS to submit — the
  email and LinkedIn links above it do not.

## Deploy

```bash
npm run build
```

Push to GitHub and import the repo on Vercel; the defaults are correct. Set
`GITHUB_TOKEN` before the first production build so the graph has real data.
