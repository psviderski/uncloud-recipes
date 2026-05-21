# External Services

Expose services that run **outside** of your uncloud cluster — bare-metal installs, dedicated appliances, or devices with their own OS (such as a BMC controller or a smart home hub) — via the managed Caddy reverse proxy.

## The problem

Uncloud manages a Caddy instance that handles automatic TLS and DNS for everything it deploys. But some services can't or shouldn't run as containers: a HomeAssistant instance on a dedicated machine, a cluster board's BMC web interface, a NAS admin panel, and so on.

These services are invisible to uncloud, so the usual `x-ports` mechanism doesn't apply. You still want them reachable at a clean `https://service.example.com` URL with a valid TLS certificate.

## Solution

The `uc caddy deploy` command accepts a `--caddyfile` flag pointing at a custom Caddyfile snippet. That snippet is prepended to the auto-generated Caddy config, so your external routes sit alongside all the routes uncloud manages — without touching those routes.

```sh
uc caddy deploy --caddyfile ./my-external-services.caddyfile
```

That's it. No containers to deploy or maintain.

## Prerequisites

- An uncloud cluster with Caddy deployed (`uc caddy deploy` without `--caddyfile` sets it up initially)
- DNS configured to point your domain at the cluster
- Network connectivity from the cluster nodes to the target service (same LAN, VPN, etc.)

## Examples

### HomeAssistant (plain HTTP upstream)

HomeAssistant typically listens on HTTP on a dedicated host. See [`homeassistant.caddyfile`](homeassistant.caddyfile).

```sh
uc caddy deploy --caddyfile ./external-services/homeassistant.caddyfile
```

### BMC controller (HTTPS with self-signed certificate)

BMC interfaces (e.g. TuringPi, iDRAC, iLO) serve HTTPS with self-signed certificates. Caddy needs `tls_insecure_skip_verify` to connect to the upstream while still presenting a valid certificate to the browser. See [`bmc.caddyfile`](bmc.caddyfile).

```sh
uc caddy deploy --caddyfile ./external-services/bmc.caddyfile
```

### Multiple services

Combine multiple sites in one Caddyfile and deploy once:

```
homeassistant.example.com {
  reverse_proxy 192.168.1.10:8123
}

bmc.example.com {
  reverse_proxy https://192.168.1.75 {
    transport http {
      tls_insecure_skip_verify
    }
  }
}
```

```sh
uc caddy deploy --caddyfile ./external.caddyfile
```

## Inspecting the running config

To see the full merged Caddyfile that Caddy is currently serving (your custom snippet + the auto-generated routes):

```sh
uc caddy config
```

## Alternative: stub service via x-caddy

If you prefer to tie proxy configuration to the lifecycle of a `uc deploy` command rather than managing it separately, you can use the `x-caddy` compose extension on a stub service — a minimal container (e.g. `portainer/pause` running a no-op command) that exists purely to inject a Caddyfile block:

```yaml
services:
  homeassistant-proxy:
    image: portainer/pause:latest
    x-caddy: |
      homeassistant.example.com {
        reverse_proxy 192.168.1.x:8123
      }
```

```sh
uc deploy -f compose.yaml
```

This approach is useful when the proxy config is coupled to a broader service deployment (e.g. deploying a companion service alongside the external target). For standalone external service routing, `uc caddy deploy --caddyfile` is simpler.
