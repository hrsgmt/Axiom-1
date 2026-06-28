# Roadmap & Milestone Log

Status key: ✅ done · 🚧 in progress · ⬜ not started

## Phase 0 — Foundations
- ✅ **M1** — Repo & CI/CD skeleton (pnpm monorepo, NestJS API with
  `/health`, Vite + React web app, GitHub Actions CI). **Verified working
  end-to-end on Termux/Android arm64** — the developer's actual target
  device — via `pnpm dev` in both services and a successful fetch from
  localhost:3000 to localhost:4000.
- 🚧 **M1.5** — Render deploy pipeline (render.yaml Blueprint exists;
  pending: push regenerated lockfile for Vite deps, then confirm live
  deploy succeeds)
- 🚧 **M2** — Auth (email/password signup+login, JWT access tokens,
  rotating single-use refresh tokens, bcrypt hashing, Prisma + Postgres).
  Built, pending local test on Termux. OAuth deferred to M2b.
- ⬜ **M2b** — Google OAuth (oauth_accounts table, callback flow)
- ⬜ **M3** — User profiles (read/update, avatar upload stub, username
  chosen here)
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
- **2026-06-28**: **M2 auth scope decisions.** Email-only at signup;
  username/display name deferred to M3 (profiles) since it belongs with
  the rest of profile data rather than splitting identity setup across two
  milestones. Refresh tokens are random bytes (not JWTs), stored only as
  SHA-256 hashes, single-use with rotation — replay of an already-redeemed
  token is detectable and rejected. Access tokens are short-lived JWTs
  (15 min) signed with JWT_ACCESS_SECRET.
- **2026-06-28 (bugfix)**: **Switched password hashing from argon2 to
  bcryptjs.** argon2's native module failed to compile in Termux with
  `gyp: Undefined variable android_ndk_path` — node-gyp attempts Android
  NDK cross-compilation that Termux doesn't have configured, and this
  isn't fixable with standard build tools (`pkg install python clang
  make` doesn't resolve it). `bcrypt` (the native version) has the same
  problem. `bcryptjs` is a pure-JS reimplementation with no native
  compilation step, confirmed to install cleanly. Tradeoff: bcrypt is
  marginally more vulnerable to GPU-based cracking at extreme scale than
  argon2id, but remains industry-standard and adequate at current scale.
  Not a permanent lock-in — hashes can be upgraded opportunistically on
  next login if revisited later.
