FROM oven/bun:latest

WORKDIR /app
COPY package.json ./
RUN bun --bun --smol install

COPY . .
RUN bun --bun --smol run build

ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["bun", "./build"]

