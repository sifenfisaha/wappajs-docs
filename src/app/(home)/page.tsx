import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CodeChat, CodePane } from '@/components/code-chat';
import { Conversation } from '@/components/conversation';
import { HeroCodeChat } from '@/components/hero-code-chat';
import { InstallCmd } from '@/components/install-cmd';
import { QrOrnament } from '@/components/qr-ornament';
import { TickList } from '@/components/tick-list';
import { DoubleTick } from '@/components/ticks';
import { gitConfig } from '@/lib/shared';

const description =
  'wappa is an open-source TypeScript framework for building LLM agents that live on WhatsApp. Pluggable transports, any model with tools, one small agent loop.';

export const metadata: Metadata = {
  title: { absolute: 'wappa — agents people can text' },
  description,
  openGraph: {
    title: 'wappa — agents people can text',
    description,
  },
};

const github = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/* ---------- shared shells ---------- */

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className ?? ''}`}>{children}</div>
  );
}

function Band({
  label,
  title,
  small = false,
  children,
}: {
  label: string;
  title: string;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="band">
      <Container className={small ? 'relative py-14 sm:py-16' : 'relative py-16 sm:py-24'}>
        <QrOrnament
          seed={label}
          className="pointer-events-none absolute right-5 top-14 hidden text-line sm:right-8 md:block"
        />
        <p className="mono-label">{label}</p>
        <h2
          className={`mt-3 max-w-[26ch] font-display font-bold leading-[1.05] tracking-[-0.015em] ${
            small
              ? 'text-[clamp(1.35rem,2.6vw,1.85rem)]'
              : 'text-[clamp(1.8rem,3.8vw,2.7rem)]'
          }`}
        >
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}

function Terminal({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-structure border border-line bg-surface ${className ?? ''}`}
    >
      <div className="border-b border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.02em] text-ink-muted">
        {title}
      </div>
      <pre className="overflow-x-auto p-3.5 font-mono text-[12px] leading-[1.6] text-ink">
        {children}
      </pre>
    </div>
  );
}

/* ---------- 1 · hero ---------- */

function Hero() {
  return (
    <section>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,10fr)_minmax(0,9fr)] lg:items-center lg:gap-16">
          <div>
            <p className="mono-label">The WhatsApp agent framework</p>
            <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.02em]">
              Agents people can&nbsp;text.
            </h1>
            <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-ink-muted">
              wappa is an open-source TypeScript framework for building LLM agents that live on
              WhatsApp. Pluggable transports, any model with tools, one small agent loop.
            </p>
            <InstallCmd className="mt-8 max-w-sm" />
            <p className="mt-5">
              <Link
                href="/docs"
                className="font-medium text-teal underline decoration-teal/50 decoration-dotted underline-offset-4 hover:text-teal-deep hover:decoration-teal-deep"
              >
                Read the docs →
              </Link>
            </p>
            <p className="mt-8 font-mono text-[12px] tracking-[0.05em] text-ink-muted">
              MIT · 429 tests · three transports · zero lock-in
            </p>
          </div>
          <HeroCodeChat />
        </div>
      </Container>
    </section>
  );
}

/* ---------- 2 · quickstart ---------- */

const QR_ART = `█▀▀▀▀▀█ ▄█▄▀▄ █▀▀▀▀▀█
█ ███ █ ▀▄█▄▀ █ ███ █
█ ▀▀▀ █ █▄ ▄█ █ ▀▀▀ █
▀▀▀▀▀▀▀ ▀ █ ▀ ▀▀▀▀▀▀▀
▀▄██▀▀▄▄▀▄▀█▄▀▄▄█▀▄▄▀
█▀▀▀▀▀█ ▄▀▄▄ ██▄ ▀▄ █
█ ███ █ █▄▀██▀ ▄▀██▄▀
█ ▀▀▀ █ ▄▀ ▄▀▄█▄██▀ ▄
▀▀▀▀▀▀▀ ▀▀ ▀▀▀ ▀▀ ▀▀▀`;

const STEPS: Array<{
  cmd: string;
  mono: boolean;
  note: string;
  extra?: ReactNode;
}> = [
  {
    cmd: 'npm create wappa-agent my-bot',
    mono: true,
    note: 'scaffolds src/index.ts, tsconfig, .env.example — pnpm and bun work too',
  },
  {
    cmd: 'Pick a transport and a model',
    mono: false,
    note: '--transport baileys | cloud-api | twilio · --provider anthropic | openai (prompted if omitted)',
  },
  {
    cmd: 'npm start',
    mono: true,
    note: 'after npm install && npm run build — Baileys prints a QR code on first start',
    extra: (
      <Terminal title="terminal" className="mt-4 max-w-xs">
        <span aria-hidden="true">{QR_ART}</span>
        {'\n\n'}scan from WhatsApp to log in
      </Terminal>
    ),
  },
  {
    cmd: 'Scan it from WhatsApp',
    mono: false,
    note: 'Settings → Linked devices → Link a device · auth persists in ./wappa-auth',
  },
  {
    cmd: 'Text your agent',
    mono: false,
    note: 'Baileys transport · personal number · no webhook, no public server',
  },
];

function Quickstart() {
  return (
    <Band label="01 — Quickstart" title="Ninety seconds to a live agent.">
      <ol className="mt-10 flex max-w-2xl flex-col">
        {STEPS.map((step, i) => (
          <li key={i} className="flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-structure border border-line bg-surface font-mono text-[12px] text-ink-muted">
                {i + 1}
              </span>
              {i < STEPS.length - 1 && <span className="w-px flex-1 bg-line" aria-hidden="true" />}
            </div>
            <div className={`min-w-0 flex-1 pt-1 ${i < STEPS.length - 1 ? 'pb-8' : 'pb-1'}`}>
              {step.mono ? (
                <p className="font-mono text-[13.5px] font-medium text-ink">
                  <span aria-hidden="true" className="select-none text-ink-faint">
                    ${' '}
                  </span>
                  {step.cmd}
                </p>
              ) : (
                <p className="text-[15px] font-medium text-ink">{step.cmd}</p>
              )}
              <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-ink-muted">
                {step.note}
              </p>
              {step.extra}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-[38ch] font-display text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold leading-snug">
        No Meta business account. No tunnel. A QR code and a phone.
      </p>
    </Band>
  );
}

/* ---------- 3 · the agent loop ---------- */

const LOOP_CODE = [
  { t: "import { Agent, defineTool } from '@wappa/core';" },
  { t: "import { AnthropicProvider } from '@wappa/anthropic';" },
  { t: "import { z } from 'zod';" },
  { t: '' },
  { t: 'const checkOrderStatus = defineTool({' },
  { t: "  name: 'check_order_status'," },
  { t: "  description: 'Look up an order by number.'," },
  { t: '  parameters: z.object({ orderId: z.string() }),' },
  { t: '  // results are stringified for the model — return objects' },
  { t: '  execute: ({ orderId }) =>' },
  { t: "    ({ orderId, status: 'left warehouse', eta: 'tomorrow' })," },
  { t: '});' },
  { t: '' },
  { t: 'const agent = new Agent({' },
  { t: "  instructions: 'Answer with check_order_status. Never guess.'," },
  { t: '  provider: new AnthropicProvider(),' },
  { t: '  tools: [checkOrderStatus],' },
  { t: '  maxTurns: 8,' },
  { t: '});' },
];

function AgentLoop() {
  return (
    <Band label="02 — The agent loop" title="One loop. Your tools. Any model.">
      <CodeChat
        className="mt-10"
        code={<CodePane filename="src/agent.ts" lines={LOOP_CODE} />}
        chat={
          <Conversation
            contact="Acme Support"
            status="online"
            items={[
              { kind: 'out', text: "where's my order? it's #1042", time: '09:12' },
              { kind: 'tool', name: 'check_order_status' },
              {
                kind: 'in',
                text: 'Order #1042 left the warehouse yesterday — it should be with you tomorrow.',
                time: '09:12',
              },
            ]}
          />
        }
      />
      <TickList
        className="mt-10 max-w-4xl gap-4 sm:grid sm:grid-cols-2 sm:gap-x-12"
        items={[
          'Windowed memory that never sends an invalid history — the window always opens on a user message.',
          'Tool errors go back to the model as text, not to the user.',
          'maxTurns caps the tool loop (default 8) — no runaway provider bills.',
          'Per-chat queues: messages in one conversation run strictly in order.',
        ]}
      />
    </Band>
  );
}

/* ---------- 4 · transports ---------- */

const TRANSPORTS = [
  {
    index: '01',
    name: 'Baileys',
    pkg: '@wappa/baileys',
    href: '/docs/transports/baileys',
    fact: 'A personal WhatsApp number, logged in by scanning a QR code. No business account, no webhook, no public server — the fastest route to a live agent.',
    note: 'unofficial · use a number you can afford to lose',
    chips: ['groups: yes', 'buttons: text-fallback', 'typing: yes', 'media: buffer · url · path'],
  },
  {
    index: '02',
    name: 'Cloud API',
    pkg: '@wappa/cloud-api',
    href: '/docs/transports/cloud-api',
    fact: "Meta's official WhatsApp Cloud API: inbound via webhook, outbound through the Graph API. Official, supported, no ban risk — the production transport.",
    note: 'official · dm-only · webhook + graph api',
    chips: ['groups: —', 'buttons: native ×3', 'typing: best-effort', 'media: buffer · url · path'],
  },
  {
    index: '03',
    name: 'Twilio',
    pkg: '@wappa/twilio',
    href: '/docs/transports/twilio',
    fact: 'WhatsApp through Twilio as your BSP: sandbox in minutes, Twilio owns the Meta relationship. Built on fetch and node:http — no Twilio SDK.',
    note: 'official · dm-only · sandbox in minutes',
    chips: ['groups: —', 'buttons: text-fallback', 'typing: —', 'media: url-only'],
  },
];

function Transports() {
  return (
    <Band label="03 — Transports" title="Three ways onto WhatsApp.">
      <div className="mt-10">
        {TRANSPORTS.map((t, i) => (
          <Link
            key={t.name}
            href={t.href}
            className={`group block rounded-structure border-t border-line px-2 py-6 transition-transform duration-150 hover:-translate-y-[2px] hover:bg-surface hover:shadow-[3px_3px_0_0_var(--line)] sm:px-4 ${
              i === TRANSPORTS.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
              <span className="pt-1.5 font-mono text-[12px] text-ink-muted">{t.index}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.01em]">
                    {t.name}
                  </h3>
                  <span className="font-mono text-[11.5px] text-ink-muted">{t.pkg}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-auto h-4 w-4 self-center text-teal opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-muted">
                  {t.fact}
                </p>
                <p className="mt-2 font-mono text-[11.5px] tracking-[0.03em] text-ink-muted">
                  {t.note}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {t.chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-structure border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-8">
        <Link
          href="/docs/transports"
          className="font-medium text-teal underline decoration-teal/50 decoration-dotted underline-offset-4 hover:text-teal-deep hover:decoration-teal-deep"
        >
          Compare transports →
        </Link>
      </p>
    </Band>
  );
}

/* ---------- 5 · handoff & sessions ---------- */

function Handoff() {
  return (
    <Band label="04 — Human handoff" title="Escalate like a person, not a ticket.">
      <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="max-w-prose">
          <p className="text-[15px] leading-relaxed text-ink-muted">
            One tool call sets <code className="font-mono text-[13px] text-ink">ctx.session.paused</code>{' '}
            and the chat belongs to a human: from the next message on, the router and the agent
            are skipped until an operator resumes it with{' '}
            <code className="font-mono text-[13px] text-ink">bot.resume(chatId)</code>. The current
            turn still finishes, so the model says a proper goodbye instead of going silent
            mid-sentence.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            Sessions are plain data behind a store interface. Swap the in-memory default for{' '}
            <code className="font-mono text-[13px] text-ink">FileSessionStore</code> and history,
            user data and the paused flag all survive a restart — an escalated chat stays with
            the human until someone explicitly hands it back. The support-agent example ships the
            whole flow, operator notification and{' '}
            <code className="font-mono text-[13px] text-ink">/resume</code> command included.
          </p>
        </div>
        <Conversation
          contact="Acme Support"
          status="last seen just now"
          items={[
            { kind: 'out', text: 'can I talk to a real person?', time: '15:32' },
            { kind: 'in', text: 'Of course — getting someone for you now.', time: '15:32' },
            { kind: 'tool', name: 'escalate_to_human' },
            { kind: 'system', text: '— agent paused · operator notified —' },
            {
              kind: 'in',
              text: "Hi, this is Dana. I can see your order — give me two minutes.",
              time: '15:33',
            },
          ]}
        />
      </div>
    </Band>
  );
}

/* ---------- 6 · testing ---------- */

const TEST_CODE = [
  { t: "import { expect, it } from 'vitest';" },
  { t: "import { Agent, Bot } from '@wappa/core';" },
  { t: "import { MockTransport, ScriptedProvider } from '@wappa/core/testing';" },
  { t: '' },
  { t: "it('answers without WhatsApp or an API key', async () => {" },
  { t: '  const transport = new MockTransport();' },
  { t: "  const provider = new ScriptedProvider(['pong']);" },
  { t: '  const bot = new Bot({' },
  { t: '    transport,' },
  { t: "    agent: new Agent({ instructions: 'Reply briefly.', provider })," },
  { t: '  });' },
  { t: '  await bot.start();' },
  { t: '' },
  { t: "  await transport.receive({ text: 'ping' });" },
  { t: '' },
  { t: '  expect(transport.sent).toEqual([' },
  { t: "    { chatId: 'test-chat', payload: { text: 'pong' } }," },
  { t: '  ]);' },
  { t: '});' },
];

function Testing() {
  return (
    <Band label="05 — Testing" title="Test conversations offline.">
      <CodeChat
        className="mt-10"
        code={<CodePane filename="src/bot.test.ts" lines={TEST_CODE} />}
        chat={
          <div>
            <Terminal title="terminal">
              <span className="text-ink-muted">$ npx vitest run</span>
              {'\n\n'}
              {' Test Files  '}
              <span className="text-teal">25 passed</span>
              {' (25)\n'}
              {'      Tests  '}
              <span className="text-teal">429 passed</span>
              {' (429)\n'}
              {'   Duration  3.15s'}
            </Terminal>
            <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-ink-muted">
              <code className="font-mono text-[13px] text-ink">MockTransport</code> records every
              send. <code className="font-mono text-[13px] text-ink">ScriptedProvider</code>{' '}
              replays canned model turns and fails loudly past the end of its script. The whole
              pipeline — middleware, routing, agent loop, tools, sessions — runs in-memory,
              deterministic. wappa&apos;s own 429 tests run exactly this way.
            </p>
          </div>
        }
      />
    </Band>
  );
}

/* ---------- 7 · honesty band ---------- */

function FinePrint() {
  return (
    <Band label="06 — Fine print" title="Two things other sites put in the footnotes." small>
      <div className="mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <p className="mono-label">Baileys is unofficial</p>
          <p className="mt-2 font-mono text-[12.5px] leading-[1.7] text-ink-muted">
            It automates WhatsApp Web on a personal number. That can violate WhatsApp&apos;s
            terms, and numbers can get banned. Prototype on Baileys; ship on Cloud API or Twilio.
          </p>
        </div>
        <div>
          <p className="mono-label">The 24-hour window</p>
          <p className="mt-2 font-mono text-[12.5px] leading-[1.7] text-ink-muted">
            On Cloud API and Twilio you can message freely for 24 hours after a customer&apos;s
            last message. Outside it, WhatsApp requires pre-approved templates — and template
            sending is not in wappa yet.
          </p>
        </div>
      </div>
    </Band>
  );
}

/* ---------- 8 · footer ---------- */

function Footer() {
  return (
    <footer className="band">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          <div>
            <InstallCmd className="max-w-sm" />
            <p className="mt-8 font-mono text-[12px] leading-relaxed text-ink-muted">
              wappa <span className="italic">(n.)</span> — what happens when WhatsApp meets a
              framework.
            </p>
            <p className="mt-2 font-mono text-[12px] text-ink-muted">
              Built in the open. — the wappa maintainers
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-col gap-2.5 font-mono text-[13px] md:items-end"
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
        <div className="mt-12 flex justify-end">
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
      <Quickstart />
      <AgentLoop />
      <Transports />
      <Handoff />
      <Testing />
      <FinePrint />
      <Footer />
    </div>
  );
}
