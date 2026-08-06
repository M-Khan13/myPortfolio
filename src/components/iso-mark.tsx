"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Isometric wireframe of the initials, sitting behind the hero card.
 *
 * The letters lie flat on the isometric floor plane and are raised into thin
 * slabs — panels dropped on the ground, seen from above and to one side. The
 * slab stays thin on purpose: a deep extrusion turns the sheared letterforms
 * into an unreadable pile of beams. Drawing the floor face, the top face and
 * every edge between them gives a true wireframe, hidden edges included, which
 * is the point.
 *
 * At rest the whole thing is a whisper. A radial mask follows the pointer and
 * reveals a second, brighter copy of the same strokes underneath it, so the art
 * lights up locally and fades as the pointer leaves. Under
 * `prefers-reduced-motion` the pointer layer is never mounted and the baseline
 * art renders alone.
 *
 * This wraps the hero rather than sitting beside it, so pointer moves over the
 * profile card still drive the glow — the card is on top and would otherwise
 * swallow every event.
 */

const VIEW = { w: 340, h: 200 };

/** Radius of the pointer glow, in viewBox units. */
const GLOW_RADIUS = 84;

/** Blocky letterforms, drawn flat: [u, v] pairs, clockwise from the top-left. */
const LETTERS: [number, number][][] = [
  // M
  [
    [0, 0],
    [3, 0],
    [6, 5],
    [9, 0],
    [12, 0],
    [12, 16],
    [9, 16],
    [9, 6],
    [6, 10],
    [3, 6],
    [3, 16],
    [0, 16],
  ],
  // K, set to the right of the M.
  [
    [14, 0],
    [17, 0],
    [17, 6.2],
    [21.6, 0],
    [25.2, 0],
    [20.2, 7.5],
    [25.6, 16],
    [21.8, 16],
    [17, 8.6],
    [17, 16],
    [14, 16],
  ],
];

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

/** How far the slabs stand off the floor, in letterform units. */
const THICKNESS = 2.1;

/*
 * The letters are turned on the floor before being projected. Laid down square
 * to the isometric axes the word cascades away at 45° and stops reading as
 * "MK"; turning it back brings the baseline close to horizontal while the
 * uprights keep their diagonal lean. Rotating the full 45° would cancel the
 * shear completely and just leave squashed flat text, so this stops short.
 */
const GROUND_TURN = (26 * Math.PI) / 180;
const TURN_COS = Math.cos(GROUND_TURN);
const TURN_SIN = Math.sin(GROUND_TURN);

/** Turns a letterform point on the floor, then shears it into the projection. */
function toFloor([u, v]: [number, number]): [number, number] {
  const tu = u * TURN_COS + v * TURN_SIN;
  const tv = v * TURN_COS - u * TURN_SIN;

  return [(tu - tv) * COS30, (tu + tv) * SIN30];
}

/*
 * How much of the viewBox the mark occupies, and where its centre sits. It is
 * deliberately not full-bleed and not dead centre: it reads as something the
 * card is sitting in front of rather than a background the card is stamped on.
 */
const FILL = { w: 0.62, h: 0.72 };
const CENTRE = { x: 0.57, y: 0.56 };

/*
 * Fit the geometry to the viewBox once, at module load. Deriving the fit from
 * the letterforms means they can be edited freely above without anyone
 * hand-tuning a scale factor.
 */
const { faces, offset } = (() => {
  const floor = LETTERS.map((letter) => letter.map(toFloor));
  const points = floor.flat();
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  // The raised copy lifts the top of the bounds by the slab thickness.
  const minY = Math.min(...ys) - THICKNESS;
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  const scale = Math.min((VIEW.w * FILL.w) / width, (VIEW.h * FILL.h) / height);
  const originX = VIEW.w * CENTRE.x - (minX + width / 2) * scale;
  const originY = VIEW.h * CENTRE.y - (minY + height / 2) * scale;

  return {
    faces: floor.map((letter) =>
      letter.map(
        ([x, y]) =>
          [x * scale + originX, y * scale + originY] as [number, number],
      ),
    ),
    offset: [0, -THICKNESS * scale] as [number, number],
  };
})();

function toPath(points: [number, number][], shift: [number, number]): string {
  return `${points
    .map(
      ([x, y], i) =>
        `${i === 0 ? "M" : "L"}${(x + shift[0]).toFixed(1)} ${(y + shift[1]).toFixed(1)}`,
    )
    .join("")}Z`;
}

const NO_SHIFT: [number, number] = [0, 0];

/** Floor face, raised top face, and the connecting edge at every vertex. */
function Wireframe({ strokeWidth }: { strokeWidth: number }) {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    >
      {faces.map((face, index) => (
        <g key={index}>
          <path d={toPath(face, NO_SHIFT)} />
          {/* The top face is the one being looked at, so it takes the hatch. */}
          <path d={toPath(face, offset)} fill="url(#iso-hatch)" />
          {face.map(([x, y], vertex) => (
            <line
              key={vertex}
              x1={x}
              y1={y}
              x2={x + offset[0]}
              y2={y + offset[1]}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

export function IsoMark({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [glow, setGlow] = useState({ x: VIEW.w / 2, y: VIEW.h / 2, on: false });

  // Mount the pointer layer only when motion is welcome. Re-checks live so the
  // OS setting can be flipped without a reload.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setInteractive(!query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const host = hostRef.current;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // The SVG is `xMidYMid meet`, so undo the letterboxing by hand to get from
    // client pixels back into viewBox units.
    const scale = Math.min(rect.width / VIEW.w, rect.height / VIEW.h);
    const x = (event.clientX - rect.left - (rect.width - VIEW.w * scale) / 2) / scale;
    const y = (event.clientY - rect.top - (rect.height - VIEW.h * scale) / 2) / scale;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      setGlow({ x, y, on: true });
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setGlow((previous) => ({ ...previous, on: false }));
  }, []);

  return (
    <div
      className="relative"
      {...(interactive ? { onPointerMove, onPointerLeave } : {})}
    >
      <div
        ref={hostRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[max(100%,17rem)] overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="size-full"
        >
          <defs>
            <pattern
              id="iso-hatch"
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="7"
                stroke="var(--iso-hatch)"
                strokeWidth="1"
              />
            </pattern>

            <radialGradient id="iso-glow-falloff">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="55%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>

            <mask id="iso-glow-mask">
              <circle
                cx={glow.x}
                cy={glow.y}
                r={GLOW_RADIUS}
                fill="url(#iso-glow-falloff)"
              />
            </mask>
          </defs>

          {/* Baseline art — dim, and all there is under reduced motion. */}
          <g style={{ color: "var(--iso-stroke)" }}>
            <Wireframe strokeWidth={0.9} />
          </g>

          {interactive ? (
            <g
              mask="url(#iso-glow-mask)"
              style={{ color: "var(--iso-glow)" }}
              className="transition-opacity duration-500 ease-out"
              opacity={glow.on ? 1 : 0}
            >
              <Wireframe strokeWidth={1} />
            </g>
          ) : null}
        </svg>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
