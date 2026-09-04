'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Copy-to-clipboard button with the Check swap (2s) and a polite
 * aria-live announcement. Focus ring comes from the global
 * :focus-visible signal outline.
 */
export function CopyButton({
  text,
  label = 'Copy to clipboard',
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      title={copied ? 'Copied' : label}
      className={cn(
        'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-btn border border-line bg-surface text-ink-muted transition-colors hover:text-ink',
        copied && 'text-teal hover:text-teal',
        className
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
      <span className="sr-only">{label}</span>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
