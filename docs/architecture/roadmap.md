# Roadmap & Milestone Log

Status key: ✅ done · 🚧 in progress · ⬜ not started

## Phase 0 — Foundations
- ✅ **M1** — Repo & CI/CD skeleton (pnpm monorepo, NestJS API with
  `/health`, Next.js web app, GitHub Actions CI)
- ✅ **M1.5** — Render deploy pipeline (render.yaml Blueprint, auto-deploy
  on push to main, Render Postgres provisioned)
- 🚧 **M2** — Auth (email + OAuth, JWT + refresh rotation, `users` table,
  Prisma schema)
- ⬜ **M3** — User profiles (read/update, avatar upload stub)
- ⬜ **M4** — Design system & navigation shell (Tailwind tokens, mode
  switcher nav, shared component library)
- ⬜ **M5–M10** — TBD, refined as M2–M4 land

## Phase 1 — Think Mode + Social Graph
⬜ M11–M20 (see /docs/blueprint.md §8 for scope)

## Later phases
See the original blueprint for Phases 2–9. Each phase's milestones get
itemized here as the prior phase nears completion.

## Decision log
- **2026-06-28**: Chose pnpm + Turborepo over plain pnpm workspaces, for
  build caching once package count grows.
- **2026-06-28**: Chose Railway over Render/Fly for staging — fastest path
  to a deployed URL with managed Postgres/Redis add-ons.
- **2026-06-28**: Modular monolith (NestJS) confirmed over microservices for
  the API at this stage. Revisit when Realtime or Media has a concrete
  scaling/ownership reason to split out (see blueprint §4.2).
- **2026-06-28 (revised)**: Switched staging target from Railway to
  **Render** (developer's choice). Database: Render Postgres free tier.
- **2026-06-28**: **Dropped Turborepo.** Developer's environment (Termux on
  Android arm64) cannot run Turborepo or Next.js's native compiler — no
  Android arm64 builds exist for either. Workflow changed to: code is
  authored externally, packaged, pushed via Termux git commands, and built
  exclusively by Render/GitHub Actions (both run on standard Linux/x86,
  unaffected by this limitation). Local `pnpm dev` is no longer part of the
  workflow; GitHub Codespaces remains a fallback option for interactive
  debugging if ever needed, but is not required day-to-day.
- **2026-06-28 (bugfix)**: Render deploy and CI were both failing with
  "exited with status 1 while building" because `pnpm-lock.yaml` was never
  committed to the repo — code was authored and packaged without ever
  running `pnpm install` in that environment, so no lockfile existed to
  commit. Every build command used `--frozen-lockfile`, which hard-fails
  with no lockfile present. Fixed by removing `--frozen-lockfile` from
  render.yaml, ci.yml, and both Dockerfiles, and committing a real
  `pnpm-lock.yaml` generated from the Codespace (the one environment we've
  confirmed runs `pnpm install` successfully). Going forward, any new
- **2026-06-28**: **Switched apps/web from Next.js to Vite + React.**
  Confirmed Next.js's SWC compiler has no Android arm64 build (404 from npm
  registry, not a config issue) — cannot run in Termux under any setup.
  Vite has no native-binary dependency and runs on Termux. Tradeoff: lost
  SSR, pages now fetch client-side via useEffect instead of server-side
  fetch. Revisit if/when SEO on public pages becomes a real requirement —
  reversible later, isolated to the frontend tooling layer only. Env var
  convention changed from `NEXT_PUBLIC_*` to `VITE_*`; note Vite bakes
  these in at build time, not runtime — changing `VITE_API_URL` later
  requires a rebuild, not just a restart.
