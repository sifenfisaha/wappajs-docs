# wappa.dev — Design System & Build Brief ("Read Receipt")

The brand thesis: **wappa's product is conversation, so the site is typeset like
correspondence and proven by real conversations.** We quote WhatsApp by TEXTURE
(bubble geometry with tails, ✓✓ read receipts, typing-indicator dots, chat-wallpaper
paper, "last seen" microcopy, QR module grids) and NEVER by hue — no #25D366, no
gradient orbs, no glassmorphism, no dark-Linear clone. Light-first paper-and-ink,
editorial, typographic. Every claim ships with a receipt.

## Tokens

Light (default):
- `--paper`: #F6F1E7 (page ground — warm chat-wallpaper)
- `--surface`: #FFFDF8 (cards, incoming bubbles, code-block chrome)
- `--ink`: #14211B (text — green-tinted near-black)
- `--ink-muted`: #5C6B62
- `--ink-faint`: #8A968D
- `--teal`: #0A5C50 (PRIMARY. Links, sent-bubble text, active states, buttons. Used as INK, never as glow.)
- `--teal-deep`: #084A40 (hover)
- `--bubble-out`: #DCF0D0 (outgoing bubble fill — a shifted quote of WhatsApp's #DCF8C6)
- `--signal`: #FF6247 (coral. RARE: focus rings, "new" badges, one accent per viewport max)
- `--line`: #DCD4C4 (1px hairlines everywhere; borders are the structure, shadows almost never)
- `--tick`: #53BDEB-adjacent is WhatsApp's blue tick — instead use `--teal` for read ticks.

Dark ("night wallpaper" — required, docs users expect it):
- `--paper`: #101713, `--surface`: #18211C, `--ink`: #EDE7DA, `--ink-muted`: #9AA79E,
  `--teal`: #4FB79A, `--teal-deep`: #6BCBB0, `--bubble-out`: #1F3328, `--line`: #2A342E,
  `--signal`: #FF7A63.

Map ALL Fumadocs `--color-fd-*` variables onto these (background, foreground, muted,
muted-foreground, card, card-foreground, border, primary, primary-foreground, accent,
accent-foreground, secondary, ring → signal). Nothing may read "default preset".

Radius: structure 4px; buttons 6px; chat bubbles 14px with a CSS corner-tail on the
first bubble of each run. Shadows: none, except a 1px-offset hard shadow on hover for
interactive cards (translate + hard shadow, not blur).

## Type

All via `next/font/google`, subsets latin, `display: swap`:
- **Bricolage Grotesque** (variable; use opsz + weight) — display/headings. Big sizes
  get the quirky optical character; H1 hero at clamp(2.8rem, 7vw, 5.2rem), tight
  leading (0.98), slight negative tracking.
- **Schibsted Grotesk** — body/UI. 16px docs body, 1.65 line-height.
- **IBM Plex Mono** — code, and AS A DISPLAY REGISTER: uppercase tracked section
  labels (`01 — TRANSPORTS`), metadata chips (`[transport: baileys]`), timestamps,
  nav items in docs, and the "last seen" microcopy. Mono ornament is a core brand
  element (2026 technical-mono register).

## Signature components (build these; they carry the whole identity)

1. **`<Conversation>`** — the brand artifact. A chat pane styled in OUR palette
   (never a phone mockup): paper ground, incoming bubbles = surface + hairline,
   outgoing = bubble-out, 14px radius + tail, mono timestamps ("12:04"), ✓✓ ticks
   (inline SVG, two overlapping checks) that transition grey→teal, and a
   typing-indicator (three dots, staggered bounce) that precedes agent replies when
   animated. Header row: contact name + mono "online" / "last seen just now".
   Reduced-motion: everything renders instantly, no bounce.
2. **`<CodeChat>`** — the split pair: real TypeScript (left, code block with filename
   header + copy button) → `<Conversation>` (right) showing what that exact code
   produces. Stacks vertically on mobile (code, then chat). Used in hero and feature
   sections. The hero instance animates ONCE on load: user message in, typing dots,
   tool-call chip appears in the chat ("⚙ check_order_status"), reply bubble lands,
   ticks turn teal. IntersectionObserver-triggered, ~6s total, then rests.
3. **`<TickList>`** — list where markers are ✓✓ SVGs (teal). Used for capability lists.
4. **`<InstallCmd>`** — mono one-liner `npm create wappa-agent my-bot` with copy
   button (Check swap, 2s) and pm tabs (npm/pnpm/bun) as quiet mono text-tabs.
5. **QR corner ornament** — subtle deterministic QR-ish module grid (SVG, ~7×7,
   line-color, low contrast) used as corner decoration on section bands (top-right of
   band headers). Decorative only, aria-hidden.
6. **Section band** — full-width, hairline top border, mono label left
   (`02 — THE AGENT LOOP`), oversized Bricolage heading, body copy max-w-prose.
   Sections are bands, not floating cards.

## Landing page (app/(home)/page.tsx) — section by section

Nav (shared shell): wordmark "wappa" set in Bricolage 700 lowercase + tiny teal ✓✓
after it; right: mono links — docs, github (with star count fetched at build or
static), and theme toggle. Hairline bottom border.

1. **HERO** — two-column on desktop.
   Left: mono kicker `THE WHATSAPP AGENT FRAMEWORK`; H1: **"Agents people
   can text."**; sub (Schibsted, ink-muted): "wappa is an open-source TypeScript
   framework for building LLM agents that live on WhatsApp. Pluggable transports,
   any model with tools, one small agent loop." `<InstallCmd>` + secondary link
   "Read the docs →" (teal, dotted underline). Under it, mono footnote:
   "MIT · 429 tests · three transports · zero lock-in".
   Right: `<CodeChat>` with transport tabs (Baileys / Cloud API / Twilio) above the
   code side — switching tabs swaps ONLY the transport lines in the code (highlight
   the changed lines), chat side identical: proof of "pluggable".
   Code sample = real wappa API (support-agent condensed: defineTool check_order_status
   + Agent + Bot). MUST compile against the real API — verify names against
   ../fram/packages/core/src/index.ts.

2. **"NINETY SECONDS TO A LIVE AGENT"** (band, mono label `01 — QUICKSTART`).
   Bun-style stepped walkthrough, 5 numbered steps in a vertical rail (numbers in
   mono, hairline connector): ① `npm create wappa-agent my-bot` ② pick a transport +
   model ③ `npm start` → terminal prints a QR (show a small terminal block with
   ASCII-ish QR) ④ scan it from WhatsApp ⑤ text your agent. Each step: one line of
   command/output, honest annotation in mono-muted ("Baileys transport · personal
   number · ~4s cold start to first reply"). End line: "No Meta business account.
   No tunnel. A QR code and a phone."

3. **THE AGENT LOOP** (band, `02 — THE AGENT LOOP`). Enumeration voice heading:
   "One loop. Your tools. Any model." `<CodeChat>`: left defineTool with zod +
   Agent({instructions, provider, tools}); right conversation where the user asks
   "where's my order?" → typing → tool chip → "Order #1042 left the warehouse
   yesterday — ✓✓". Below, `<TickList>` of loop facts (windowed memory that never
   sends an invalid history; tool errors go back to the model, not to the user;
   maxTurns safety net; per-chat queues keep conversations ordered).

4. **TRANSPORTS** (band, `03 — TRANSPORTS`). Heading: "Three ways onto WhatsApp."
   Three ledger rows (better-auth numbered style, hairline-separated, NOT cards):
   Baileys (personal number, QR login, minutes to start — honest mono note:
   "unofficial · use a number you can afford to lose"), Cloud API (Meta's official
   API, webhooks, production), Twilio (BSP, sandbox in minutes). Each row: name in
   Bricolage, facts in Schibsted, capability chips in mono (`buttons: native`,
   `typing: —`, `media: url-only`). Link: "Compare transports →" to docs.

5. **HANDOFF & SESSIONS** (band, `04 — HUMAN HANDOFF`). Heading: "Escalate like a
   person, not a ticket." `<Conversation>` showing: customer asks for a human →
   agent replies "Getting someone for you" + tool chip escalate_to_human → mono
   system line "— agent paused · operator notified —" → operator bubble. Short copy
   about sessions persisting, pause/resume, FileSessionStore.

6. **TESTING** (band, `05 — TESTING`). Heading: "Test conversations offline."
   Code block: MockTransport + ScriptedProvider vitest test (real API from
   @wappajs/core/testing), right side small terminal: `✓ 429 tests` vitest output.
   Copy: one paragraph — no WhatsApp, no API keys, deterministic.

7. **HONESTY BAND** (`06 — FINE PRINT`, slightly smaller). Two short columns in
   mono-ish register: "Baileys is unofficial — numbers can get banned; use Cloud API
   or Twilio for production." / "Outside WhatsApp's 24-hour window you need template
   messages." Trust through candor; no other dev site does this.

8. **FOOTER** — hairline top. Repeat `<InstallCmd>`. Etymology line in mono:
   `wappa (n.): what happens when WhatsApp meets a framework.` Signed line:
   "Built in the open. — the wappa maintainers". Links: GitHub, docs, LICENSE (MIT),
   llms.txt. Tiny ✓✓ as the final glyph on the page.

## Docs theme

- Redefine every --color-fd-* token per palette; prose in Schibsted; headings
  Bricolage; sidebar + TOC labels in IBM Plex Mono (13px, slightly tracked);
  code blocks on `--surface` with hairline border + filename headers.
- Sidebar order comes from content/docs meta.json (already ported); rename nothing.
- Callouts styled as incoming chat bubbles (tail, surface fill, teal left icon).
- Keep Fumadocs search; style the dialog surface to palette.
- layout.shared.tsx: same wordmark + github link so home and docs feel like ONE site.

## Copy rules

Zed/Sentry register: short declaratives, zero "supercharge/blazing/seamless",
numbers over adjectives, at most two dry parentheticals on the whole page. Every
feature claim must be true of the actual framework (check ../fram source/docs).

## Hard NOs (the anti-slop contract)

No gradient orbs/mesh/bokeh. No glassmorphism. No emoji feature grids. No purple.
No Inter. No 3D phone mockups. No floating card stacks with soft shadows. No
"Trusted by" with fake logos. No lorem, no fake metrics. Nothing that could be
dropped into the Fumadocs showcase unnoticed.

## Motion rules

Only: bubble/typing choreography in Conversation, tick color transitions, copy-button
check swap, hover translate+hard-shadow on ledger rows, focus-visible signal ring.
All gated by prefers-reduced-motion. No scroll-jacking, no parallax.

## Accessibility & QA bar

WCAG AA contrast on every pair (teal #0A5C50 on paper passes; verify all).
Keyboard: tabs, copy buttons, theme toggle all operable; focus-visible everywhere.
Responsive: 360px, 768px, 1280px clean; CodeChat stacks; no horizontal scroll.
`npm run build` + `types:check` green.
