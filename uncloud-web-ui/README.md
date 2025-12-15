# Uncloud Web UI (proof of concept)

This is a Bun web service that runs commands on a `uc` cli installed in the container.

The container's `uc` client is configured to talk to the host machine's Uncloud unix socket mounted into the container.

It currently just has a few read-only views, but it could be a starting point for more complex operations (anything the `uc` cli can do):
- `/` shows output from a `uc machine ls` and `uc service ls`
- `/service/:name` shows `uc service inspect {name}` output
