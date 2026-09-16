'use client';

import { useId, useState } from 'react';
import { CodePane, type CodeLine } from './code-chat';
import { Conversation, type ConversationItem } from './conversation';
import { TextTabs } from './text-tabs';

/**
 * Hero proof of "pluggable transports": three tabs over the SAME agent code,
 * swapping only the transport import + constructor lines (highlighted on
 * switch). The chat side never changes, and never remounts, so the
 * play-once choreography survives tab switching.
 */

function heroLines(importLine: string, ctorLines: string[]): CodeLine[] {
  return [
    { t: "import { Agent, Bot, defineTool } from '@wappajs/core';" },
    { t: "import { AnthropicProvider } from '@wappajs/anthropic';" },
    { t: importLine, c: true },
    { t: "import { z } from 'zod';" },
    { t: '' },
    { t: 'const checkOrderStatus = defineTool({' },
    { t: "  name: 'check_order_status'," },
    { t: "  description: 'Look up an order by number.'," },
    { t: '  parameters: z.object({ orderId: z.string() }),' },
    { t: '  execute: ({ orderId }) =>' },
    { t: "    ({ orderId, status: 'shipped', eta: '2 days' })," },
    { t: '});' },
    { t: '' },
    { t: 'const agent = new Agent({' },
    { t: "  instructions: 'You are Acme Gadgets support. Never guess.'," },
    { t: '  provider: new AnthropicProvider(),' },
    { t: '  tools: [checkOrderStatus],' },
    { t: '});' },
    { t: '' },
    { t: 'const bot = new Bot({' },
    ...ctorLines.map((t) => ({ t, c: true })),
    { t: '  agent,' },
    { t: '});' },
    { t: 'await bot.start();' },
  ];
}

const TABS: Array<{ label: string; lines: CodeLine[] }> = [
  {
    label: 'Baileys',
    lines: heroLines("import { BaileysTransport } from '@wappajs/baileys';", [
      '  transport: new BaileysTransport(),',
    ]),
  },
  {
    label: 'Cloud API',
    lines: heroLines("import { CloudApiTransport } from '@wappajs/cloud-api';", [
      '  transport: new CloudApiTransport({',
      '    accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,',
      '    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,',
      '    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN!,',
      '    port: 3000,',
      '  }),',
    ]),
  },
  {
    label: 'Twilio',
    lines: heroLines("import { TwilioTransport } from '@wappajs/twilio';", [
      '  transport: new TwilioTransport({',
      '    accountSid: process.env.TWILIO_ACCOUNT_SID!,',
      '    authToken: process.env.TWILIO_AUTH_TOKEN!,',
      "    whatsappNumber: 'whatsapp:+14155238886',",
      '    port: 3000,',
      '  }),',
    ]),
  },
];

const CHAT: ConversationItem[] = [
  { kind: 'out', text: "hey, where's my order? A-1001", time: '12:04' },
  { kind: 'tool', name: 'check_order_status' },
  { kind: 'in', text: 'Order A-1001 shipped, it should arrive in 2 days.', time: '12:04' },
];

export function HeroCodeChat({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState(0);
  const id = useId();
  const panelId = `${id}-panel`;

  const onSelect = (i: number) => {
    if (i === active) return;
    setActive(i);
    setFlash((n) => n + 1);
  };

  return (
    <div className={className}>
      <TextTabs
        tabs={TABS.map((t) => t.label)}
        active={active}
        onSelect={onSelect}
        label="WhatsApp transport"
        idBase={id}
        controls={panelId}
        className="-ml-2"
      />
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="mt-2"
      >
        <CodePane
          filename="src/index.ts"
          lines={TABS[active]!.lines}
          markChanged={flash > 0}
          flash={flash}
        />
      </div>
      <p className="my-2.5 text-center font-mono text-[11px] tracking-[0.04em] text-ink-muted">
        ↓ what your customer sees
      </p>
      <Conversation
        contact="Acme Support"
        status="online"
        items={CHAT}
        animate
        className="min-h-[214px]"
      />
    </div>
  );
}
