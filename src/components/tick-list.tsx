import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { DoubleTick } from './ticks';

/** List whose markers are the teal ✓✓ read-receipt glyph. */
export function TickList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <DoubleTick className="mt-[6px] h-[10px] w-auto shrink-0 text-teal" />
          <span className="text-[15px] leading-relaxed text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}
