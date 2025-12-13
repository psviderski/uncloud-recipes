FROM oven/bun:1-slim AS base
WORKDIR /app

FROM base AS builder

# Uncloud CLI version and architecture.
ARG UNCLOUD_VERSION=v0.15.0
ARG TARGETARCH=amd64

# Download uncloud cli binary
ADD "https://github.com/psviderski/uncloud/releases/download/${UNCLOUD_VERSION}/uncloud_linux_${TARGETARCH}.tar.gz" uncloud.tgz
RUN tar xzf uncloud.tgz

# Install any bun dependencies
COPY package.json .
RUN bun install

FROM base AS final

# Create directory for and copy uncloud config
RUN mkdir -p /root/.config/uncloud
COPY uncloud-config.yaml /root/.config/uncloud/config.yaml

# Copy assets from the builder layer
COPY --from=builder /app/uncloud /usr/local/bin/uc
COPY --from=builder /app/node_modules /app/node_modules

# Copy the application source code last
COPY package.json .
COPY index.ts .
COPY uc-runner.ts .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD ["bun", "-e", "fetch('http://localhost:8080/health').then(r => { if (!r.ok) process.exit(1) })"]

CMD ["bun", "run", "index.ts"]
