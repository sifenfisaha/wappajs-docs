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

1. **`<Conversation>`** (retired): was the brand artifact. A chat pane styled in OUR palette
   (never a phone mockup): paper ground, incoming bubbles = surface + hairline,
   outgoing = bubble-out, 14px radius + tail, mono timestamps ("12:04"), ✓✓ ticks
   (inline SVG, two overlapping checks) that transition grey→teal, and a
   typing-indicator (three dots, staggered bounce) that precedes agent replies when
   animated. Header row: contact name + mono "online" / "last seen just now".
   Reduced-motion: everything renders instantly, no bounce.
   Deleted when the landing dropped to three panels and the hero went type-first.
   It is the single best thing to bring back if the home page ever needs a product
   shot again, and it is in git history.
2. **`<CodeChat>`** (retired): the split pair: real TypeScript (left, code block with filename
   header + copy button) → `<Conversation>` (right) showing what that exact code
   produces. Stacks vertically on mobile (code, then chat). Used in hero and feature
   sections. The hero instance animates ONCE on load: user message in, typing dots,
   tool-call chip appears in the chat ("⚙ check_order_status"), reply bubble lands,
   ticks turn teal. IntersectionObserver-triggered, ~6s total, then rests.
3. **`<TickList>`** (retired): list whose markers were ✓✓ SVGs, used for capability
   lists. Deleted with the feature bands; in git history if it is ever wanted again.
4. **`<InstallCmd>`** — mono one-liner `npm create wappa-agent my-bot` with copy
   button (Check swap, 2s) and pm tabs (npm/pnpm/bun) as quiet mono text-tabs.
5. **QR corner ornament** (retired): the small 7×7 module grid that decorated band
   headers. Superseded by `<QrWall>` below, which does the same job once, at scale.
6. **Section band** (retired as markup, kept as a rule): full-width, hairline top
   border, mono label, oversized Bricolage heading. The `band` utility still exists.
   Whatever the landing grows next, sections are bands or panels, never floating cards.
7. **`<QrWall>`**: the same QR idea at architectural scale: a real version-1 (21×21)
   module grid with true finder patterns and timing rails, deterministic payload, no
   encoder shipped. Hero only, ink-faint, clipped by the panel edge. It is the
   product's own iconography, which is why the hero needs no orb, sphere or gradient.
8. **Panels**: the ONE large radius on the site (`--radius-panel`, 30px), used exactly
   three times: the night hero, the quickstart panel that laps over it, and the closing
   CTA. Hairline border, flat fill, NO drop shadow. The overlap does the work, not a
   blur. Two stacked panels are a composition; more than that would be a card stack,
   which is still banned.
9. **Pills**: `.pill-solid` (ink fill, teal on hover) and `.pill-ghost` (hairline).
   Press is a 1px nudge. The only rounded-full elements on the page, apart from the
   theme switch.
10. **`<HeroNav>`** - the home page's nav, living inside the night panel. Wordmark plus
   ✓✓ on the left; GitHub mark, search trigger and theme switch on the right. The last
   two are Fumadocs slots (`layouts/shared/slots/search-trigger`, `.../theme-switch`),
   so ⌘K and the theme toggle behave exactly as they do in the docs. They read
   `--color-fd-*`, which resolve through the palette vars, so `.night` recolours them
   with no extra work. GitHub's mark is inlined because lucide dropped brand icons.

## Landing page (app/(home)/page.tsx) — section by section

Nav: the home page has NO sticky bar. Fumadocs' nav is switched off for this route
(`nav={{ enabled: false }}` in `(home)/layout.tsx`) and `<HeroNav>` sits inside the night
panel instead, which is what lets the hero own the top of the page. The docs keep the
shared Fumadocs shell, untouched: same wordmark, sidebar, search and theme toggle.

1. **HERO**: a night panel, inset from the page edges, rounded to `--radius-panel`.
   The palette is inverted in place by the `.night` utility (a shade deeper than the
   dark theme's own paper, so it still reads as a panel when the whole site is dark);
   every child component follows without new props. It is NOT full-bleed: the nav is
   sticky, so a full-bleed dark hero would either leave a hard light seam under the
   nav or drag a dark nav onto light content when scrolled.
   Type-first, single column, capped at 34rem: mono kicker
   `THE WHATSAPP AGENT FRAMEWORK`; H1 **"The agent framework for WhatsApp."** at
   clamp(2.9rem, 7.4vw, 5.4rem), leading 0.95; sub in Schibsted ink-muted; a pill pair
   (Read the docs / GitHub); `<InstallCmd>`. Nothing else. The MIT/429/3/0 stat row
   that used to close the hero is gone: the numbers were true but they read as
   badge-collecting, and the quickstart panel is a better next beat.
   The right half is `<QrWall>` alone, vertically centred and cropped by the panel's
   right edge. Its width and bleed are per-breakpoint (440px from `lg`, 620px from
   `xl`) because it is absolutely positioned: at a fixed size it slides under the
   headline on narrow laptops. Below `lg` it is hidden entirely. The crop is not decoration-by-accident: a COMPLETE QR at that size
   invites a scan, and this one carries no payload, so it must always run off an edge.
   Hidden below `md`, where the hero is pure type.

2. **"NINETY SECONDS TO A LIVE AGENT"** (paper panel, mono label `01 — QUICKSTART`).
   Laps over the night hero by about 4 to 5rem of negative margin: the two interlocking
   panels are the page's signature move. Centred statement heading, one-line lede,
   then THREE numbered columns (`01 / 02 / 03` in teal mono, hairline top rule each):
   scaffold it · pick a body and a brain · scan it, then text it. Each column carries
   the literal command in mono plus an honest annotation. Three columns, not five
   steps: the rail was accurate but long, and the panel wants a single glance.

3. **CLOSING PANEL + FOOTER** (paper panel). Heading: "Give your users a number to
   text.", the same pill pair, and a repeat `<InstallCmd>`. Below the panel, a hairline
   rule, the etymology line in mono, the footer nav, and the ✓✓ mark bottom-right.

The landing stops there, deliberately. The agent loop, transports, human handoff,
testing and the fine print all live in the docs; repeating them on the home page made it
a second, worse copy of `/docs` that had to be kept in sync. The home page now has one
job: say what this is, prove it with a real thread, and get the reader to the docs.

The components those sections used (`<CodeChat>`, `<TickList>`, the small QR corner
ornament, `<HeroCodeChat>`) were deleted when their last consumer went. They are in git
history if a section ever comes back. The `band` utility is kept for the same reason.

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
