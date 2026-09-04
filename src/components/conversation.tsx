'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Cog } from 'lucide-react';
import { cn } from '@/lib/cn';
import { DoubleTick } from './ticks';

export type ConversationItem =
  | { kind: 'out'; text: string; time?: string }
  | { kind: 'in'; text: string; time?: string }
  | { kind: 'tool'; name: string }
  | { kind: 'system'; text: string };

interface ChoreoState {
  /** Items with index < visible are rendered. */
  visible: number;
  typing: boolean;
  /** All outgoing ticks flip grey → teal once true. */
  read: boolean;
  /** True only while the play-once choreography is running/armed. */
  playing: boolean;
}

interface Step {
  at: number;
  patch: Partial<ChoreoState>;
}

/** Build the play-once timeline: typing precedes agent activity, ticks read first. */
function buildSchedule(items: ConversationItem[]): Step[] {
  const steps: Step[] = [];
  let t = 350;
  let visible = 0;
  let typing = false;
  for (const item of items) {
    if (item.kind === 'out') {
      steps.push({ at: t, patch: { visible: ++visible } });
      t += 800;
    } else if (item.kind === 'tool' || item.kind === 'in') {
      if (!typing) {
        steps.push({ at: t, patch: { read: true } });
        t += 400;
        steps.push({ at: t, patch: { typing: true } });
        typing = true;
        t += 1200;
      }
      if (item.kind === 'tool') {
        steps.push({ at: t, patch: { visible: ++visible } });
        t += 1200;
      } else {
        steps.push({ at: t, patch: { visible: ++visible, typing: false } });
        typing = false;
        t += 900;
      }
    } else {
      steps.push({ at: t, patch: { visible: ++visible } });
      t += 700;
    }
  }
  steps.push({ at: t + 200, patch: { playing: false } });
  return steps;
}

/** Silence the SSR useLayoutEffect warning without losing the pre-paint reset. */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const FINISHED: ChoreoState = { visible: Infinity, typing: false, read: true, playing: false };

function TypingIndicator() {
  return (
    <div
      className="bubble-tail-in inline-flex items-center gap-[5px] self-start rounded-bubble rounded-ss-[4px] border border-line bg-surface px-3.5 py-3"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot inline-block h-[5px] w-[5px] rounded-full bg-ink-muted"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * The brand artifact: a chat pane in OUR palette (never a phone mockup).
 * Incoming bubbles = surface + hairline; outgoing = bubble-out; 14px radius
 * with a corner tail on the first bubble of each run; mono timestamps; ✓✓
 * ticks that transition grey → teal.
 *
 * `animate` arms a play-once, IntersectionObserver-triggered choreography:
 * user message in → ticks read → typing dots → tool chip → reply lands.
 * With prefers-reduced-motion (or no JS) the finished state renders instantly.
 */
export function Conversation({
  contact,
  status = 'online',
  items,
  animate = false,
  label,
  className,
}: {
  contact: string;
  status?: string;
  items: ConversationItem[];
  animate?: boolean;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<ChoreoState>(FINISHED);
  const rootRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!animate) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    // Arm: reset to empty before first paint, play when the pane scrolls into view.
    setState({ visible: 0, typing: false, read: false, playing: true });
    const timers: number[] = [];
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (played || !entries.some((e) => e.isIntersecting)) return;
        played = true;
        observer.disconnect();
        for (const step of buildSchedule(items)) {
          timers.push(
            window.setTimeout(() => setState((s) => ({ ...s, ...step.patch })), step.at)
          );
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      for (const t of timers) window.clearTimeout(t);
      setState(FINISHED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- items/animate are static props
  }, []);

  return (
    <div
      ref={rootRef}
      aria-label={label ?? `Example WhatsApp conversation with ${contact}`}
      className={cn(
        'chat-pane flex flex-col overflow-hidden rounded-structure border border-line',
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span className="text-[14px] font-medium text-ink">{contact}</span>
        <span className="font-mono text-[11px] tracking-[0.02em] text-ink-muted">{status}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-3.5 py-4">
        {items.map((item, i) => {
          if (i >= state.visible) return null;
          const entering = state.playing && 'bubble-enter';
          if (item.kind === 'system') {
            return (
              <p
                key={i}
                className={cn(
                  'self-center py-1 text-center font-mono text-[11px] text-ink-muted',
                  entering
                )}
              >
                {item.text}
              </p>
            );
          }
          if (item.kind === 'tool') {
            return (
              <span
                key={i}
                className={cn(
                  'mt-0.5 inline-flex items-center gap-1.5 self-start rounded-btn border border-line bg-surface px-2 py-1 font-mono text-[11px] text-ink-muted',
                  entering
                )}
              >
                <Cog className="h-3 w-3 shrink-0 text-teal" aria-hidden />
                {item.name}
              </span>
            );
          }
          const out = item.kind === 'out';
          const prev = items[i - 1];
          const firstOfRun = prev?.kind !== item.kind;
          return (
            <div
              key={i}
              className={cn(
                'max-w-[85%] rounded-bubble px-3 py-2',
                out
                  ? 'self-end bg-bubble-out'
                  : 'self-start border border-line bg-surface',
                firstOfRun && (out ? 'bubble-tail-out rounded-se-[4px]' : 'bubble-tail-in rounded-ss-[4px]'),
                entering
              )}
            >
              <div className="flex items-end gap-2.5">
                <p className="text-[13.5px] leading-snug text-ink">{item.text}</p>
                {(item.time || out) && (
                  <span className="mb-px inline-flex shrink-0 items-center gap-1">
                    {item.time && (
                      <span className="font-mono text-[10px] leading-none text-ink-muted">
                        {item.time}
                      </span>
                    )}
                    {out && (
                      <DoubleTick
                        className={cn(
                          'h-[9px] w-auto transition-colors duration-700',
                          state.read ? 'text-teal' : 'text-ink-faint'
                        )}
                      />
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {state.typing && <TypingIndicator />}
      </div>
    </div>
  );
}
