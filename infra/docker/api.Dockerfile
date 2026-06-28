# --- Build stage ---
FROM node:20-slim AS build
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/types ./packages/types
COPY services/api ./services/api

RUN pnpm install --filter @axiom/api...
RUN pnpm --filter @axiom/api build

# --- Run stage ---
FROM node:20-slim AS run
WORKDIR /repo
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

COPY --from=build /repo/pnpm-workspace.yaml /repo/package.json ./
COPY --from=build /repo/packages/types ./packages/types
COPY --from=build /repo/services/api/dist ./services/api/dist
COPY --from=build /repo/services/api/package.json ./services/api/package.json
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/services/api/node_modules ./services/api/node_modules

EXPOSE 4000
CMD ["node", "services/api/dist/main.js"]
