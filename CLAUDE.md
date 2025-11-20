# CLAUDE.md - Zero-FAF-Builder

## PROJECT STATE: SHIPPING
**Tyre Compound:** SOFT C3 (Race-ready)
**FAF Score:** 92%

---

## Project Identity

- **Name:** Zero-FAF-Builder
- **Purpose:** Landing page for FAF onboarding - three paths to Grok-ready
- **Tagline:** Zero faff from day zero — Grok-ready in one click
- **URL:** https://zero-faf-builder-iota.vercel.app
- **Repo:** https://github.com/Wolfe-Jam/zero-faf-builder

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Runtime:** React 19
- **Styling:** Tailwind CSS 4
- **UI:** shadcn/ui
- **Testing:** Playwright E2E
- **Deployment:** Vercel (auto-deploy)
- **Analytics:** Vercel Analytics

---

## Architecture

```
zero-faf-builder/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Main landing (3 buttons)
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Theme (championship orange)
├── components/ui/       # shadcn/ui library
├── hooks/               # React hooks
├── tests/               # Playwright E2E
└── public/              # Static assets
```

---

## Three User Paths

| Button | User Has | Action |
|--------|----------|--------|
| **Local folder** | Code on machine | Copy `npx faf-cli init` command |
| **Start fresh** | Nothing | Deploy template to Vercel |
| **GitHub repo** | Repo on GitHub | Copy clone+init commands |

All paths lead to Grok MCP integration via `grok-faf-mcp`.

---

## Key Files

- `app/page.tsx` - Main UI, all three workflows
- `project.faf` - FAF DNA
- `tests/e2e.spec.ts` - 4 Playwright tests

---

## Development

```bash
npm install          # Install deps
npm run dev          # Dev server
npm run build        # Production build
npm test             # Run E2E tests
```

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_MCP_SERVER_URL` | `https://grok-faf-mcp.vercel.app` | MCP server URL |
| `NEXT_PUBLIC_TEMPLATE_REPO_URL` | `https://github.com/wolfe-jam/zero-faf-builder` | Vercel deploy template |

---

## Quality Status

- **Build:** Zero TypeScript errors
- **Tests:** 4/4 passing
- **Dependencies:** Cleaned (unused removed)
- **FAF Score:** 92%

---

## Integration

**MCP Server:** grok-faf-mcp
- URL: https://grok-faf-mcp.vercel.app/sse
- 17 MCP tools + 14 bundled commands
- First MCP server for Grok/xAI

---

## For AI Assistants

- This is a landing page, not a SaaS
- No database, no auth, no backend needed
- All three buttons now have working flows
- Championship orange branding (#FF8C00 primary)
- Built for Elon/xAI - high visibility project

---

**STATUS: BI-SYNC ACTIVE**

*Last Sync: Auto*
*Built for Grok. Built for Speed. Built Right.*
