FROM node:20-slim AS base
RUN apt-get update && apt-get install curl -y && apt-get install unzip -y
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Install bun

ENV BUN_INSTALL="/.bun"
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH=$BUN_INSTALL/bin:$PATH

RUN bun --version

# Copy the entire monorepo
COPY . .

# Install dependencies, including workspace dependencies
RUN pnpm install --filter api

# Set the working directory back to the app
WORKDIR /app/apps/api

# Copy only the necessary files for the production build
COPY apps/api/package.json ./
COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./

ENV NODE_ENV production

EXPOSE 3000

CMD ["bun", "src/index.ts"]
