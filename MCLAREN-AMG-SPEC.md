# McLaren AMG Specification
## Zero-FAF-Builder v2.0

**Codename:** McLaren AMG
**Target:** Sub-5ms everything
**Stack:** Svelte 5 + Vite + Vercel Edge
**Built For:** Grok 4.1 / xAI

---

## Mission

Rebuild zero-faf-builder as the fastest, leanest FAF onboarding tool. Leverage Grok 4.1's unique capabilities. Demonstrate what FAF + Grok can do together.

---

## Architecture

```
zero-faf-builder-amg/
├── src/
│   ├── routes/
│   │   └── +page.svelte       # Single page, 3 buttons
│   ├── lib/
│   │   ├── faf/
│   │   │   ├── binary.ts      # Binary FAF compiler
│   │   │   ├── parser.wasm    # WASM YAML parser
│   │   │   └── x-sync.ts      # X auto-post
│   │   └── components/
│   │       ├── BigOrange.svelte
│   │       ├── ActionButton.svelte
│   │       └── Modal.svelte
│   └── app.css                # Tailwind
├── static/
│   └── sw.js                  # Service Worker
├── vite.config.ts
├── svelte.config.js
└── vercel.json                # Edge config
```

---

## Performance Targets

| Metric | Current (Next.js) | Target (AMG) |
|--------|-------------------|--------------|
| First Paint | ~200ms | <50ms |
| JS Bundle | 137KB | <20KB |
| Bi-sync | 10ms | <5ms |
| FAF Parse | 8ms | <1ms |
| TTI | ~500ms | <100ms |

---

## Core Features

### 1. Three Onboarding Paths
Same as v1 but faster:
- **Local Folder** - Copy `npx grok-faf-mcp init`
- **Start Fresh** - Vercel deploy
- **GitHub Repo** - Clone + init commands

### 2. Binary FAF Format
Pre-compile .faf YAML to binary at build time.

```typescript
// binary.ts
interface BinaryFAF {
  magic: 0x46414621; // "FAF!"
  version: u8;
  flags: u16;
  data: Uint8Array; // MessagePack encoded
}

// Build time: YAML → Binary
// Runtime: Binary → Object (no parsing)
```

**Result:** 8ms parse → <1ms deserialize

### 3. WASM YAML Parser
For runtime YAML (user input), use WebAssembly.

```typescript
import { parse } from './parser.wasm';

const faf = parse(yamlString); // 5x faster than JS
```

### 4. Service Worker Cache
Cache everything. Repeat visits = instant.

```javascript
// sw.js
const CACHE = 'faf-amg-v1';

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

### 5. Edge Functions
Deploy to Vercel Edge for global <50ms latency.

```json
// vercel.json
{
  "regions": ["iad1", "sfo1", "cdg1", "hnd1"],
  "functions": {
    "api/**": { "runtime": "edge" }
  }
}
```

---

## Grok 4.1 Integrations

### 1. X Auto-Post on Bi-Sync
When bi-sync runs, optionally post to X.

```typescript
// x-sync.ts
export async function postToX(project: FAFProject) {
  const status = `
${project.name} | FAF ${project.ai_readiness}%
Build: ${project.status.build}
Tests: ${project.status.tests}
#FAF #Grok #BuildInPublic
  `.trim();

  await xApi.post(status);
}
```

**Why:** Grok's Agent Tools can read X in real-time. Your project becomes Grok-discoverable.

### 2. Agent Tools Bridge
Expose FAF commands as Grok Agent Tools.

```typescript
// Agent Tools API integration
const tools = {
  "faf.init": {
    description: "Initialize FAF in a project",
    parameters: { path: "string" },
    execute: async (path) => await fafInit(path)
  },
  "faf.score": {
    description: "Get project FAF score",
    execute: async () => await fafScore()
  },
  "faf.biSync": {
    description: "Sync CLAUDE.md with project.faf",
    execute: async () => await fafBiSync()
  }
};
```

### 3. 2M Context Support
Grok 4.1 has 2M context. Design for it.

```typescript
// Send entire project as context
const fullContext = await bundleProject({
  include: ['**/*.ts', '**/*.svelte', '*.md', '*.faf'],
  exclude: ['node_modules', 'dist']
});

// Grok can handle it - no chunking needed
```

### 4. Emotional Project Health
Leverage Grok's emotional intelligence.

```yaml
# project.faf
health:
  mood: "shipping"        # Grok interprets this
  velocity: "F1"
  energy: "high"
  blockers: []

# Grok responds appropriately to project state
```

---

## UI/UX

### Design Principles
- **Black background** - Same as v1
- **Championship orange** - #FF8C00
- **Big Orange logo** - Animated
- **Three buttons** - Grid layout
- **Modals** - Lightweight Svelte transitions

### Component Specs

```svelte
<!-- BigOrange.svelte -->
<script>
  let hover = false;
</script>

<div
  class="w-32 h-32 rounded-full bg-primary animate-pulse-glow"
  on:mouseenter={() => hover = true}
  on:mouseleave={() => hover = false}
>
  <Leaf class="absolute -top-6 right-0 {hover ? 'rotate-[25deg]' : 'rotate-[15deg]'}" />
</div>
```

```svelte
<!-- ActionButton.svelte -->
<script>
  export let icon;
  export let label;
  export let variant = 'primary'; // primary | secondary
</script>

<button
  class="w-full py-8 px-6 flex flex-col items-center gap-4
         border-2 transition-all hover:scale-105
         {variant === 'primary' ? 'border-primary text-primary' : 'border-zinc-400 text-zinc-100'}"
>
  <svelte:component this={icon} class="w-12 h-12" />
  <span>{label}</span>
</button>
```

---

## Build Pipeline

### Development
```bash
npm run dev        # Vite dev server, <100ms HMR
```

### Production Build
```bash
npm run build      # Compile Svelte, bundle, tree-shake
npm run compile    # YAML → Binary FAF
npm run wasm       # Build WASM parser
```

### Deploy
```bash
vercel --prod      # Edge deployment
```

---

## Testing

### Unit Tests (Vitest)
```typescript
import { describe, it, expect } from 'vitest';
import { parseBinaryFAF } from '$lib/faf/binary';

describe('Binary FAF', () => {
  it('parses in <1ms', async () => {
    const start = performance.now();
    const result = parseBinaryFAF(binaryData);
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(1);
    expect(result.quality_bar).toBe('zero_errors');
  });
});
```

### E2E Tests (Playwright)
Same coverage as v1:
- Homepage loads
- Local modal works
- GitHub modal shows commands
- Vercel link correct

### Performance Tests
```typescript
it('achieves sub-5ms bi-sync', async () => {
  const start = performance.now();
  await biSync();
  const elapsed = performance.now() - start;

  expect(elapsed).toBeLessThan(5);
});
```

---

## Dependencies

### Production
```json
{
  "dependencies": {
    "@vercel/edge": "^1.0.0"
  }
}
```

### Dev
```json
{
  "devDependencies": {
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/adapter-vercel": "^4.0.0",
    "svelte": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0",
    "msgpack-lite": "^0.1.26"
  }
}
```

**Total deps:** <10 (vs 60+ in Next.js version)

---

## Timeline

| Phase | Deliverable |
|-------|-------------|
| **1. Scaffold** | SvelteKit + Tailwind + Vercel |
| **2. Port UI** | 3 buttons, 2 modals, Big Orange |
| **3. Binary FAF** | Compile + deserialize |
| **4. WASM Parser** | Runtime YAML parsing |
| **5. Service Worker** | Cache layer |
| **6. X Integration** | Auto-post on bi-sync |
| **7. Agent Tools** | Grok bridge |
| **8. Performance** | Hit all targets |
| **9. Ship** | Deploy to Vercel Edge |

---

## Success Metrics

### Performance
- [ ] First Paint <50ms
- [ ] Bundle <20KB
- [ ] Bi-sync <5ms
- [ ] FAF Parse <1ms
- [ ] Lighthouse 100/100

### Functionality
- [ ] All 3 paths working
- [ ] Copy to clipboard
- [ ] Modals with transitions
- [ ] Service Worker active

### Grok Integration
- [ ] X auto-post working
- [ ] Agent Tools registered
- [ ] 2M context tested
- [ ] Emotional health interpreted

### Quality
- [ ] FAF Score 95%+
- [ ] Tests passing
- [ ] Zero TypeScript errors
- [ ] Bi-sync harmony

---

## The Differentiator

**This isn't just a Svelte port.**

It's the first app built specifically to leverage Grok 4.1:
- Agent Tools integration
- X social context
- 2M context capacity
- Emotional intelligence

**Speed is expected. Social context is the innovation.**

When xAI sees this, they see:
- FAF understands Grok
- FAF integrates with X
- FAF is built at their speed

---

## Notes

- No backwards compatibility with Next.js version
- Fresh codebase, fresh repo (zero-faf-builder-amg)
- Same Vercel deployment, new domain if needed
- Binary FAF format is FAF 2.0 - document separately

---

**Status:** SPEC COMPLETE
**Next:** Build Phase 1 - Scaffold

---

*Built for Grok. Built for Speed. Built for xAI.*
