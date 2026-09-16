import type { SVGProps } from 'react';

/** FNV-1a hash of a string → 32-bit seed. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32, a tiny deterministic PRNG. */
function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Version-1 QR geometry: 21 modules square. Real structure, decorative payload. */
const N = 21;
const CELL = 6;
const GAP = 1.4;
const STEP = CELL + GAP;
const SIZE = N * CELL + (N - 1) * GAP;

/** The three finder squares, by their top-left module. */
const FINDERS = [
  [0, 0],
  [N - 7, 0],
  [0, N - 7],
] as const;

/** A module inside a finder's 7x7 ring-and-core, or inside its 1-module quiet separator. */
function finderAt(x: number, y: number): 'on' | 'off' | null {
  for (const [fx, fy] of FINDERS) {
    const dx = x - fx;
    const dy = y - fy;
    if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
      if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return 'off'; // separator
      const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6;
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return ring || core ? 'on' : 'off';
    }
  }
  return null;
}

/**
 * A QR code drawn at architectural scale: the hero's geometric anchor.
 *
 * It is the product's own iconography rather than decoration. Logging a bot in
 * means scanning one of these. Real finder patterns and timing rows carry the
 * silhouette; the payload modules are deterministic noise, so this renders
 * identically on server and client without shipping an encoder.
 *
 * Always render it cropped by its container. A complete QR at this size reads as
 * something you could scan, and this one carries no payload.
 *
 * Decorative (aria-hidden). Draws in `currentColor`.
 */
export function QrWall({
  seed = 'wappa',
  size = 520,
  ...props
}: SVGProps<SVGSVGElement> & { seed?: string; size?: number }) {
  const rand = mulberry32(hashSeed(seed));
  const cells: Array<[number, number]> = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const finder = finderAt(x, y);
      if (finder !== null) {
        if (finder === 'on') cells.push([x, y]);
        continue;
      }
      // Timing patterns: the alternating rails that let a scanner find the grid.
      if (y === 6 || x === 6) {
        if ((x + y) % 2 === 0) cells.push([x, y]);
        continue;
      }
      if (rand() < 0.46) cells.push([x, y]);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x * STEP}
          y={y * STEP}
          width={CELL}
          height={CELL}
          rx={1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
