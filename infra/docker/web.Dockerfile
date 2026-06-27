# --- Build stage ---
FROM node:20-slim AS build
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/types ./packages/types
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile --filter @axiom/web...
RUN pnpm --filter @axiom/web build

# --- Run stage ---
FROM node:20-slim AS run
WORKDIR /repo
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

COPY --from=build /repo ./

EXPOSE 3000
CMD ["pnpm", "--filter", "@axiom/web", "start"]
