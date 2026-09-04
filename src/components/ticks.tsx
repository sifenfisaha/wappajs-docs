import type { SVGProps } from 'react';

/**
 * Double-check "read receipt" glyph — the wappa mark.
 * Inherits `currentColor` so it can rest grey and turn teal
 * (the read-tick transition) purely via CSS color.
 */
export function DoubleTick(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 19 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M1.4 6.7 4.5 9.8 11 2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.7 6.7 10.8 9.8 17.3 2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
