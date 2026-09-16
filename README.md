# wappajs-docs

The documentation site and landing page for
[wappa](https://github.com/sifenfisaha/wappajs), a TypeScript framework for building
WhatsApp agents. Built with Next.js and [Fumadocs](https://fumadocs.dev).

## Develop

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

```bash
pnpm build         # production build
pnpm types:check   # next typegen && tsc --noEmit
pnpm lint          # oxlint
```

## Layout

| Path | What it is |
| --- | --- |
| `content/docs` | The MDX documentation pages |
| `src/app/(home)` | Landing page |
| `src/app/docs` | Docs layout and pages |
| `src/app/api/search/route.ts` | Search route handler |
| `src/lib/source.ts` | Content source adapter |
| `src/lib/shared.ts` | App name and GitHub repo config |
| `DESIGN.md` | The "Read Receipt" brand and the anti-slop contract |

## Writing docs

Pages live in `content/docs` as MDX, with `meta.json` controlling sidebar order. Two
house rules:

1. Every factual claim must be true of the framework itself. Check the source in the
   [wappa repo](https://github.com/sifenfisaha/wappajs) before writing a claim, and update
   the landing page stats when the test count changes.
2. No em dashes in prose. The only exceptions are the mono band labels (`01 — Quickstart`)
   and the handoff system line, which `DESIGN.md` defines as brand ornaments.
