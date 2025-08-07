FROM oven/bun:1.1

WORKDIR /app
COPY package.json ./
RUN bun --bun --smol install

COPY . .
# RUN bun --bun --smol run build
RUN bun --bun --smol run vite build

ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["bun", "./build"]

