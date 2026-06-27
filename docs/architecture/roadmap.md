# Roadmap & Milestone Log

Status key: ✅ done · 🚧 in progress · ⬜ not started

## Phase 0 — Foundations
- ✅ **M1** — Repo & CI/CD skeleton (pnpm + Turborepo monorepo, NestJS API
  with `/health`, Next.js web app, GitHub Actions CI, Dockerfiles for both
  services)
- ⬜ **M2** — Auth (email + OAuth, JWT + refresh rotation, `users` table)
- ⬜ **M3** — User profiles (read/update, avatar upload stub)
- ⬜ **M4** — Design system & navigation shell (Tailwind tokens, mode
  switcher nav, shared component library)
- ⬜ **M5** — Staging deploy to Railway (Postgres + Redis provisioned)
- ⬜ **M6–M10** — TBD, refined as M2–M5 land

## Phase 1 — Think Mode + Social Graph
⬜ M11–M20 (see /docs/blueprint.md §8 for scope)

## Later phases
See the original blueprint for Phases 2–9. Each phase's milestones get
itemized here as the prior phase nears completion — itemizing all 100+ now
would mean designing against requirements we haven't validated yet.

## Decision log
- **2026-06-28**: Chose pnpm + Turborepo over plain pnpm workspaces, for
  build caching once package count grows.
- **2026-06-28**: Chose Railway over Render/Fly for staging — fastest path
  to a deployed URL with managed Postgres/Redis add-ons.
- **2026-06-28**: Modular monolith (NestJS) confirmed over microservices for
  the API at this stage. Revisit when Realtime or Media has a concrete
  scaling/ownership reason to split out (see blueprint §4.2).
