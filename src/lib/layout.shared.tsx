import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { DoubleTick } from '@/components/ticks';
import { gitConfig } from './shared';

/**
 * Shared nav shell, so home and docs read as ONE site.
 * Wordmark: "wappa" in Bricolage 700 lowercase, followed by the ✓✓ mark.
 * Links render in the mono register (13px IBM Plex Mono, via global.css).
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-1.5">
          <span className="font-display text-lg font-bold lowercase leading-none tracking-tight text-fd-foreground">
            wappa
          </span>
          <DoubleTick className="mt-0.5 h-[11px] w-auto shrink-0 text-teal" />
        </span>
      ),
    },
    links: [
      {
        text: 'docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'github',
        url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        external: true,
      },
    ],
  };
}
