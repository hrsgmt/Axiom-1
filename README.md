# AΞIOM∞

> Switch modes, not apps.

An AI-native social operating system. See `/docs/architecture` for the full blueprint.

## Status: Milestone 1.5 complete (Render deploy pipeline)

What exists right now: a monorepo with a NestJS API exposing `/health`, and a
Next.js web app that server-fetches that health check and renders it. No
auth, no business logic yet — that starts at Milestone 2.

## Project structure

```
apps/web        Vite + React frontend
services/api    NestJS backend
packages/types  Shared TypeScript types used by both
infra/docker    Dockerfiles (kept for reference / non-Render deploys)
render.yaml     Render Blueprint — defines both services for auto-deploy
```

## Why Vite instead of Next.js

The original Milestone 1 used Next.js. It was replaced with Vite + React
because Next.js's compiler (SWC) has no Android arm64 build, so it cannot
run in Termux under any configuration — confirmed via direct 404 from
npm's registry for `@next/swc-android-arm64`. Vite has no such native
dependency and runs correctly on Termux.

**Tradeoff:** this drops server-side rendering (SSR). Pages now fetch data
client-side after load, rather than server-rendering with data already
included. This matters later for SEO on public-facing pages (profiles,
public posts) — revisit if/when that becomes a real requirement. Nothing
about this choice blocks switching back to an SSR framework later; it's an
isolated frontend-tooling decision made at the scaffolding stage.

## Development workflow

This project is developed without a local dev server. Code is written and
packaged externally, pushed to GitHub, and Render builds + runs it from
there. To sync new code:

```bash
# extract the provided archive, then from inside the project folder:
git add .
git commit -m "describe the change"
git push
```

Render is connected to this repo's `main` branch and redeploys automatically
on every push (see render.yaml).

## Testing

GitHub Actions runs lint/build/test on every push — check the Actions tab
on the repo. There is no local `pnpm dev` in this workflow; the live Render
URLs are the way to verify a deploy.

## Deployment

Defined in `render.yaml` (Render Blueprint, IaC). Two services:
- `axiom-api` — NestJS, port from `PORT` env var
- `axiom-web` — Vite + React, calls `axiom-api` via `VITE_API_URL` (baked
  in at build time — changing this value requires a rebuild, not just a
  restart)

Dockerfiles under `infra/docker/` are kept for reference / future
non-Render deployment options but are not used by the current Render setup.

## Milestones

Tracked in `/docs/architecture/roadmap.md`.
