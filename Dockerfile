# Build stage
FROM oven/bun:1.1.8 as builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun --bun --smol install --frozen-lockfile

COPY . .

ENV NODE_ENV=production
ENV VITE_BUILD_MODE=production
RUN bun --bun --smol run build


# Runtime stage
FROM oven/bun:1.1.8-slim
WORKDIR /app

COPY --from=builder /app/build build/
COPY server.js .

EXPOSE 3000

ENV NODE_ENV=production
ENV VITE_BUILD_MODE=production
ENV PORT=3000
ENV BUILD_DIR=./build
ENV BASE_PATH=""

CMD ["bun", "--bun", "--smol", "run", "server.js"]
