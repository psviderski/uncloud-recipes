# NATS cluster

The config enables Jetstream (streams, KV, object storage) by default, which requires a leader and at least three nodes for the cluster to elect one. You can disable Jetstream in the `nats-server.conf` if you do not need it.

## Setup

### Jetstream volumes

(If not using Jetstream, you can remove the volume config from the compose.yaml and skip this.)

You need to manually create volumes for Jetstream data on each machine you want a NATS node to run. Uncloud currently only creates a volume automatically for the first machine and will then only deploy to that one node (as the others do not have the required volume).

```
uc volume create jetstream_data -m machine1
uc volume create jetstream_data -m machine2
uc volume create jetstream_data -m machine3
```

## Host access

The default compose.yaml maps the client and http ports to the host's **localhost** only (127.0.0.1, specifically).
```
    # disable these ports mappings if access from the host is not needed
    x-ports:
      - 127.0.0.1:4222:4222@host
      - 127.0.0.1:8222:8222@host
```

You can access the host-mapped ports remotely with an ssh command like this:
```
ssh -L 4222:localhost:4222 -L 8222:localhost:8222 machine1
```

### Using `natscli` from host/remote (with port mapping enabled)

First shell:
```
nats subscribe "test.*"
```

Second shell:
```
nats publish test.foo "first shell sees this"
nats publish prod.bar "no one sees this"
```
