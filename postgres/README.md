# PostgreSQL

This is just a basic, single instance setup for now.

TODOs:
- Backup service
- Primary and secondary instances with replication
- Add `postgresql.conf` config file

## Setup

1. Copy `.env.example` to `.env` and set database, username, and password.
2. Optionally, set specific machine target in `compose.yaml` via `x-machines` property.
3. Deploy: `uc deploy`

## Usage

Inside the cluster, connect to `postgres.internal:5432`.

Host access is enabled on `127.0.0.1:5432`.

### Connecting via ssh port-forwarding

Where `$machine`, `$dbuser`, and `$dbname` from your setup earlier:
```
ssh -fN -L 5555:localhost:5432 $machine
psql -h localhost -p 5555 -U $dbuser $dbname
```

## Data Persistence

Data is stored in the `postgres_data` volume.
