# AΞIOM∞

> Switch modes, not apps.

An AI-native social operating system. See `/docs/architecture` for the full blueprint.

## Status: Milestone 1 complete (Repo & CI/CD skeleton)

What exists right now: a monorepo with a NestJS API exposing `/health`, and a
Next.js web app that server-fetches that health check and renders it. No
database, no auth, no business logic yet — those start at Milestone 2.

## Project structure

```
apps/web        Next.js frontend
services/api    NestJS backend
packages/types  Shared TypeScript types used by both
infra/docker    Dockerfiles for each service
```

## Local development

Requires Node 20+ and pnpm 9+.

```bash
pnpm install

# run everything (web on :3000, api on :4000)
pnpm dev

# or run just one
pnpm --filter @axiom/api dev
pnpm --filter @axiom/web dev
```

Visit `http://localhost:3000` — it should show API status fetched live from
`http://localhost:4000/health`.

## Testing

```bash
pnpm test
```

## Deployment

Each service has its own Dockerfile under `infra/docker/`. Staging target:
Railway (one service per Dockerfile, plus Postgres/Redis add-ons starting
Milestone 2+).

## Milestones

Tracked in `/docs/architecture/roadmap.md`.
