FROM oven/bun:1.1.8

WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
# COPY . .
RUN ls -lah

RUN bun --bun --smol install


COPY . .
RUN bun --bun --smol run build
# RUN bun --bun --smol run vite build

ENV NODE_ENV=production
ENV PORT=3000
ENV BUILD_DIR=./build

EXPOSE 3000
# ENTRYPOINT ["bun", "/app/build"]
ENTRYPOINT ["bun", "run", "./server.js"]
