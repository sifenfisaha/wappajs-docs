'use client';

import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';

/**
 * Quiet mono text-tabs (pm switcher, hero transport tabs). Real buttons with
 * the ARIA tabs pattern: roving tabindex + arrow-key navigation; the
 * focus-visible signal ring comes from the global stylesheet.
 */
export function TextTabs({
  tabs,
  active,
  onSelect,
  label,
  idBase,
  controls,
  className,
}: {
  tabs: readonly string[];
  active: number;
  onSelect: (index: number) => void;
  label: string;
  idBase: string;
  /** id of the (single) tabpanel these tabs control. */
  controls?: string;
  className?: string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = (active + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn('flex items-center gap-1', className)}
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${idBase}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={controls}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onSelect(i)}
          className={cn(
            'rounded-btn px-2 py-1 font-mono text-[11.5px] tracking-[0.04em] transition-colors',
            i === active
              ? 'text-teal underline decoration-2 underline-offset-4'
              : 'text-ink-muted hover:text-ink'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
