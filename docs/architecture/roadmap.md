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
