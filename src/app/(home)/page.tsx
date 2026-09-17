import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HeroNav } from '@/components/hero-nav';
import { InstallCmd } from '@/components/install-cmd';
import { QrWall } from '@/components/qr-wall';
import { DoubleTick } from '@/components/ticks';
import { gitConfig } from '@/lib/shared';

const description =
  'wappa is an open-source TypeScript framework for building LLM agents that live on WhatsApp. Pluggable transports, any model with tools, one small agent loop.';

export const metadata: Metadata = {
  title: { absolute: 'wappa: agents people can text' },
  description,
  openGraph: {
    title: 'wappa: agents people can text',
    description,
  },
};

const github = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className ?? ''}`}>{children}</div>
  );
}

/* ---------- 1 · the hero ---------- */

function Hero() {
  return (
    <section className="pt-3 sm:pt-5">
      <Container>
        <div className="relative overflow-hidden rounded-panel border border-line bg-hero px-4 pb-24 pt-5 sm:px-10 sm:pb-32 sm:pt-6 lg:px-14 lg:pb-40">
          {/* The product's own iconography at architectural scale, bleeding off the
              right edge and clipped by the panel radius. Logging a bot in means
              scanning one of these, which is why this hero needs no orb. */}
          <QrWall
            seed="agents people can text"
            size={620}
            className="pointer-events-none absolute top-1/2 hidden h-auto w-[440px] -translate-y-1/2 text-ink-faint/25 lg:-right-40 lg:block xl:-right-56 xl:w-[620px]"
          />

          <HeroNav github={github} />

          <div className="relative max-w-[34rem]">
            <p className="mono-label">The WhatsApp agent framework</p>
            <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(2.9rem,7.4vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              The agent framework for WhatsApp.
            </h1>
            <p className="mt-7 max-w-[44ch] text-[17px] leading-relaxed text-ink-muted">
              An open-source TypeScript framework for LLM agents that live on WhatsApp.
              Pluggable transports, any model with tools, one small agent loop.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/docs" className="pill pill-solid">
                Read the docs
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <a href={github} className="pill pill-ghost">
                GitHub
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>

            <InstallCmd className="mt-9 max-w-sm" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- 2 · the panel that laps over the hero ---------- */

const CAPABILITIES = [
  {
    index: '01',
    title: 'Transports',
    items: [
      'Baileys: personal number, QR login, groups',
      'Cloud API: official Meta webhook and Graph API',
      'Twilio: WhatsApp Business API through a BSP',
      'One normalized message model across all three',
    ],
  },
  {
    index: '02',
    title: 'Bot pipeline',
    items: [
      'Per-chat queues, concurrent across chats',
      'Middleware chain with command() and hears()',
      'Sessions saved on every message, failures included',
      'Pause and resume for human handoff',
    ],
  },
  {
    index: '03',
    title: 'Agent loop',
    items: [
      'History windows always open on a user message',
      'Tool call and result groups are never split',
      'Failed turns roll back before the error propagates',
      'maxTurns cap, then a final call without tools',
    ],
  },
  {
    index: '04',
    title: 'Tools',
    items: [
      'Argument types inferred from zod schemas',
      'Model arguments validated before execute runs',
      'Invalid arguments return as retryable results',
      'A failing tool never crashes the loop',
    ],
  },
  {
    index: '05',
    title: 'Models',
    items: [
      '@wappajs/anthropic, default claude-sonnet-5',
      '@wappajs/openai, default gpt-5',
      'Any OpenAI-compatible server via baseURL',
      'A custom provider is one generate() method',
    ],
  },
  {
    index: '06',
    title: 'Testing',
    items: [
      'MockTransport records everything the bot sent',
      'ScriptedProvider replays turns and tool calls',
      'The whole pipeline runs offline',
      'No QR, no webhook, no API key',
    ],
  },
] as const;

const MATRIX = {
  head: ['', 'baileys', 'cloud-api', 'twilio'],
  rows: [
    ['Official / ToS-safe', 'no, ban risk', 'yes', 'yes'],
    ['Groups', 'yes', 'DM only', 'DM only'],
    ['Quick-reply buttons', 'numbered fallback', 'native, max 3', 'numbered fallback'],
    ['Typing indicator', 'yes', 'best effort', 'not supported'],
    ['Read receipts', 'yes', 'yes', 'not supported'],
    ['Outbound media', 'buffer, url, path', 'buffer, url, path', 'public url only'],
    ['Proactive messages', 'any time', '24h window', '24h window'],
  ],
} as const;

function Capabilities() {
  return (
    <div className="relative z-10 -mt-16 sm:-mt-20">
      <Container>
        <div className="panel px-4 py-16 sm:px-10 sm:py-20 lg:px-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mono-label">Capabilities</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.02] tracking-[-0.02em]">
              The parts you would otherwise write yourself.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
              Transport differences, conversation memory, tool validation and per-chat ordering
              all live in the core.
            </p>
          </div>

          <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <li key={cap.index} className="border-t border-line pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11.5px] tracking-[0.08em] text-teal">
                    {cap.index}
                  </span>
                  <h3 className="font-display text-[19px] font-semibold leading-snug tracking-[-0.01em]">
                    {cap.title}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] leading-relaxed text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* The claim above is that a transport is interchangeable. This is the receipt:
              the differences you actually inherit, stated rather than glossed. */}
          <div className="mt-20 border-t border-line pt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="mono-label">Transport capabilities</p>
              <Link
                href="/docs/transports"
                className="font-mono text-[12px] text-ink-muted transition-colors hover:text-teal"
              >
                full comparison
                <ArrowRight aria-hidden="true" className="ml-1.5 inline h-3 w-3" />
              </Link>
            </div>

            <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr>
                    {MATRIX.head.map((cell, i) => (
                      <th
                        key={cell}
                        scope="col"
                        className={`pb-3 font-mono text-[11.5px] font-normal tracking-[0.08em] ${
                          i === 0 ? 'text-ink-faint' : 'text-teal'
                        }`}
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.rows.map(([label, ...values]) => (
                    <tr key={label} className="border-t border-line">
                      <th
                        scope="row"
                        className="py-3 pr-6 text-[13.5px] font-normal leading-snug text-ink"
                      >
                        {label}
                      </th>
                      {values.map((value, i) => (
                        <td
                          key={`${label}-${i}`}
                          className="py-3 pr-6 font-mono text-[12px] leading-snug text-ink-muted"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 max-w-[62ch] text-[14px] leading-relaxed text-ink-muted">
              Because the message model is normalized, a bot written against one transport runs
              on the others.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ---------- 3 · closing panel + footer ---------- */

function Footer() {
  return (
    <footer className="mt-20 sm:mt-28">
      <Container className="pb-16 sm:pb-20">
        <div className="panel px-4 py-14 text-center sm:px-10 sm:py-16">
          <h2 className="mx-auto max-w-[18ch] font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            Give your users a number to text.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs" className="pill pill-solid">
              Read the docs
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            <a href={github} className="pill pill-ghost">
              GitHub
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
          <InstallCmd className="mx-auto mt-10 max-w-sm text-left" />
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-[12px] leading-relaxed text-ink-muted">
              wappa <span className="italic">(n.)</span>: what happens when WhatsApp meets a
              framework.
            </p>
            <p className="mt-2 font-mono text-[12px] text-ink-muted">
              Built by{' '}
              <a
                href="https://seefun.dev"
                className="text-ink transition-colors hover:text-teal"
              >
                seefun.dev
              </a>
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2.5 font-mono text-[13px] md:justify-end"
          >
            <a href={github} className="text-ink-muted transition-colors hover:text-ink">
              github
            </a>
            <Link href="/docs" className="text-ink-muted transition-colors hover:text-ink">
              docs
            </Link>
            <a
              href={`${github}/blob/${gitConfig.branch}/LICENSE`}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              license (mit)
            </a>
            {/* eslint-disable-next-line next/no-html-link-for-pages -- /llms.txt is a route handler (plain text), not a page */}
            <a href="/llms.txt" className="text-ink-muted transition-colors hover:text-ink">
              llms.txt
            </a>
          </nav>
        </div>

        <div className="mt-10 flex justify-end">
          <DoubleTick className="h-[10px] w-auto text-teal" aria-hidden="true" />
        </div>
      </Container>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1">
      <Hero />
      <Capabilities />
      <Footer />
    </div>
  );
}
