# YourGPT Developer Guide

Developer documentation for the [YourGPT](https://yourgpt.ai) platform — covering the embeddable chatbot widget and dashboard integrations.

Built with [Fumadocs](https://fumadocs.dev) + Next.js.

---

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the docs locally.

## Build

```bash
bun run build
bun start
```

---

## Content

Documentation lives in `content/docs/` as MDX files.

| Section | Path | Description |
|---|---|---|
| Widget | `content/docs/widget/` | Embeddable chatbot widget — setup, configuration, architecture |
| Dashboard | `content/docs/dashboard/` | YourGPT dashboard and integrations |

### Widget docs covers

- Widget types (Compact, Tabs, Search)
- Session lifecycle and multi-session support
- Build system and script injection
- Theming, i18n, embedding, triggers, whitelabel
- Helpdesk integration
- Message flow, streaming, stores, socket, network API reference
- AI Actions, content types

---

## Project Structure

| Path | Description |
|---|---|
| `app/(home)` | Landing page |
| `app/docs` | Documentation layout and pages |
| `app/api/search/route.ts` | Full-text search route handler |
| `lib/source.ts` | Fumadocs content source adapter |
| `content/docs/` | All MDX documentation files |
| `source.config.ts` | Fumadocs MDX config (frontmatter schema, etc.) |

---

## Adding Docs

1. Create a `.mdx` file in the relevant `content/docs/<section>/` folder.
2. Add frontmatter: `title` and `description`.
3. Register the slug in the section's `meta.json` under `pages`.

```mdx
---
title: My New Page
description: What this page covers.
---

## Section

Content here.
```
