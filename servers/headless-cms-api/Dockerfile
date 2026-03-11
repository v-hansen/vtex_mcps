# Build from monorepo root: docker build -f servers/headless-cms-api/Dockerfile .
FROM node:20-slim AS builder
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./
COPY packages/shared/ packages/shared/
COPY servers/headless-cms-api/ servers/headless-cms-api/
RUN pnpm install --frozen-lockfile && pnpm build

FROM node:20-slim
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app
COPY --from=builder /app/ /app/
ENV NODE_ENV=production
ENTRYPOINT ["node", "servers/headless-cms-api/dist/cli.js"]
CMD ["--transport", "stdio"]
