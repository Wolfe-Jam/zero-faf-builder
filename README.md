# Zero-FAF-Builder

Zero faff from day zero — Grok-ready in one click.

A landing page and onboarding application for initializing projects with FAF (Foundational AI-context Format).

## Features

- **Local Folder**: Run NPX command to initialize FAF in existing projects
- **Start Fresh**: Deploy a new FAF-enabled project to Vercel
- **GitHub Repo**: Get clone + init commands to add FAF to your repo

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (Strict Mode)
- Tailwind CSS 4
- shadcn/ui Components
- Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MCP_SERVER_URL` | MCP server URL for FAF CLI | `https://grok-faf-mcp.vercel.app` |
| `NEXT_PUBLIC_TEMPLATE_REPO_URL` | Template repo for Vercel deploy | `https://github.com/wolfe-jam/zero-faf-builder` |

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wolfe-jam/zero-faf-builder)

### Manual

```bash
npm run build
npm start
```

## Project Structure

```
zero-faf-builder/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Main landing page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   └── ui/              # shadcn/ui library
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
├── tests/               # Playwright E2E tests
└── public/              # Static assets
```

## FAF Compliance

This project follows FAF principles:
- Strict TypeScript (zero errors)
- Domain-first architecture
- Championship-grade quality standards

## License

MIT

## Author

Built with love by [@wolfejam](https://twitter.com/wolfejam)
