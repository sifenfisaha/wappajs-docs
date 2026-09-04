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

/** mulberry32 — tiny deterministic PRNG. */
function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 7;
const CELL = 7;
const GAP = 2;
const SIZE = N * CELL + (N - 1) * GAP;

/**
 * Deterministic QR-ish module grid — corner ornament for section bands.
 * Decorative only (aria-hidden); renders in `currentColor`, so pass a
 * low-contrast color class such as `text-line`.
 */
export function QrOrnament({
  seed = 'wappa',
  size = 44,
  ...props
}: SVGProps<SVGSVGElement> & { seed?: string; size?: number }) {
  const rand = mulberry32(hashSeed(seed));
  const cells: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // finder-ish anchors in three corners, random modules elsewhere
      const corner =
        (x === 0 && y === 0) || (x === N - 1 && y === 0) || (x === 0 && y === N - 1);
      if (corner || rand() < 0.42) cells.push({ x, y });
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
      {cells.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x * (CELL + GAP)}
          y={y * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={1.5}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
