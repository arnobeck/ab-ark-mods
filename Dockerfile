FROM oven/bun:1.1.8

WORKDIR /app
COPY package.json ./
RUN bun --bun --smol install
RUN bun --bun @rollup/rollup-linux-x64-gnu

COPY . .
# RUN bun --bun --smol run build
RUN bun --bun --smol run vite build

ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["bun", "./build"]

