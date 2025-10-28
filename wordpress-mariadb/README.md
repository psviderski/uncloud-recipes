# WordPress with MariaDB

This recipe deploys a complete WordPress site with MariaDB database backend using Uncloud. The setup includes automatic TLS certificate management via Uncloud and persistent storage for both the database and WordPress files.

## Setup

### 1. Prepare environment

Run the preparation script to generate your `.env` file with the necessary environment variables:

```bash
./prepare.sh
```

This will:

- Prompt you for your domain name where you want the WordPress installation to live (e.g., `your-domain.com`)
- Generate random passwords for the database

### 2. Deploy the stack

Deploy to your Uncloud infrastructure:

```bash
uc deploy
```

Uncloud will automatically:

- Create the required volumes (`mariadb_data` and `wordpress_data`)
- Set up the services (MariaDB and WordPress)
- Configure TLS certificates for your domain (via Caddy)
- Start the containers

## Usage

Once deployed, access your WordPress site at `https://your-domain.com` (replace with the domain you specified during setup).

On your first visit, WordPress will guide you through the basic configuration steps (selecting your language, creating an admin account, naming your site, etc.)

### Accessing the admin panel

After setup, access the WordPress admin dashboard at:

```
https://your-domain.com/wp-admin
```

## Data Persistence

WordPress and database data are stored in named volumes on the machines of the Uncloud cluster:

- `wordpress_data`: Contains WordPress installation files, themes, plugins, and uploads
- `mariadb_data`: Contains MariaDB database files

These volumes persist across container restarts and redeployments. To back up your site, you can export these volumes or use WordPress backup plugins.

### Reset and start fresh

If you need to completely reset the installation:

1. Remove the deployment: `uc service rm wordpress mariadb`
2. Delete the volumes: `uc volume rm mariadb_data wordpress_data`
3. Re-run `./prepare.sh` (optional: use a new domain or keep the same)
4. Deploy again: `uc deploy`

**Warning**: This will delete all your WordPress content and database!
