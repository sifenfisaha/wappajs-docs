import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { CopyButton } from './copy-button';

/** One line of a fixed landing snippet. `c` marks it as a transport line that changes per tab. */
export interface CodeLine {
  t: string;
  c?: boolean;
}

/**
 * Minimal deterministic highlighter for the FIXED landing snippets (keywords,
 * single-quoted strings, // comments). Not a general tokenizer — the snippets
 * are authored to stay inside what it handles.
 */
const TOKEN =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*')|\b(import|from|export|const|new|await|async|return|type)\b/g;

function highlightLine(line: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  TOKEN.lastIndex = 0;
  for (let m = TOKEN.exec(line); m !== null; m = TOKEN.exec(line)) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    const [text, comment, str] = m;
    const cls = comment ? 'tok-cm' : str ? 'tok-str' : 'tok-kw';
    parts.push(
      <span key={key++} className={cls}>
        {text}
      </span>
    );
    last = m.index + text.length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

/**
 * Styled code pane: surface chrome, hairline border, filename header, copy
 * button. `markChanged` tints lines flagged `c`; bumping `flash` replays the
 * changed-line highlight animation (used by the hero transport tabs).
 */
export function CodePane({
  filename,
  lines,
  markChanged = false,
  flash = 0,
  className,
}: {
  filename: string;
  lines: CodeLine[];
  markChanged?: boolean;
  flash?: number;
  className?: string;
}) {
  const raw = lines.map((l) => l.t).join('\n');
  return (
    <div
      className={cn('overflow-hidden rounded-structure border border-line bg-surface', className)}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-1.5">
        <span className="font-mono text-[11px] tracking-[0.02em] text-ink-muted">{filename}</span>
        <CopyButton text={raw} label={`Copy ${filename}`} className="h-6 w-6 border-0" />
      </div>
      <pre
        key={flash}
        tabIndex={0}
        aria-label={filename}
        className={cn(
          'overflow-x-auto py-3.5 font-mono text-[12.5px] leading-[1.75] text-ink',
          flash > 0 && 'code-flash'
        )}
      >
        <code className="block w-fit min-w-full">
          {lines.map((line, i) => (
            <span
              key={i}
              className={cn(
                'code-line block px-4',
                markChanged && line.c && 'code-line-changed'
              )}
            >
              {line.t === '' ? ' ' : highlightLine(line.t)}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/**
 * The split pair: real TypeScript on one side, the `<Conversation>` it
 * produces on the other. Side-by-side from lg up (unless `vertical`),
 * stacked on mobile — code first, then chat.
 */
export function CodeChat({
  code,
  chat,
  vertical = false,
  className,
}: {
  code: ReactNode;
  chat: ReactNode;
  vertical?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-start gap-4',
        !vertical && 'lg:items-center',
        !vertical && 'lg:grid-cols-2 lg:gap-6',
        className
      )}
    >
      <div className="min-w-0">{code}</div>
      <div className="min-w-0">{chat}</div>
    </div>
  );
}
