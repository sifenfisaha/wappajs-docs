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

/* ---------- 1 · the night hero ---------- */

function Hero() {
  return (
    <section className="pt-3 sm:pt-5">
      <Container>
        <div className="night relative overflow-hidden rounded-panel border border-line bg-paper px-4 pb-24 pt-5 sm:px-10 sm:pb-32 sm:pt-6 lg:px-14 lg:pb-40">
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

const START_STEPS = [
  {
    index: '01',
    title: 'Scaffold it',
    cmd: 'npm create wappa-agent my-bot',
    body: 'Writes src/index.ts, a tsconfig and .env.example, with the packages for your answers already pinned. pnpm and bun work too.',
  },
  {
    index: '02',
    title: 'Pick a body and a brain',
    cmd: '--transport baileys --provider anthropic',
    body: 'Baileys, Cloud API or Twilio for the transport. Claude, GPT or any OpenAI-compatible server for the model. Omit the flags and it asks.',
  },
  {
    index: '03',
    title: 'Scan it, then text it',
    cmd: 'npm start',
    body: 'Baileys prints a QR code on first start. Link it from WhatsApp once, auth persists in ./wappa-auth, and the agent is live.',
  },
] as const;

function Start() {
  return (
    <div className="relative z-10 -mt-16 sm:-mt-20">
      <Container>
        <div className="panel px-4 py-16 sm:px-10 sm:py-20 lg:px-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mono-label">Quickstart</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.02] tracking-[-0.02em]">
              Ninety seconds to a live agent.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
              No Meta business account. No tunnel. No public server. A QR code and a phone.
            </p>
          </div>

          <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-3">
            {START_STEPS.map((step) => (
              <li key={step.index} className="border-t border-line pt-6">
                <p className="font-mono text-[11.5px] tracking-[0.08em] text-teal">{step.index}</p>
                <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink">
                  <span aria-hidden="true" className="select-none text-ink-faint">
                    ${' '}
                  </span>
                  {step.cmd}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
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
      <Start />
      <Footer />
    </div>
  );
}
