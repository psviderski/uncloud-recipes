#!/usr/bin/bash
set -eu

echo "WordPress + MariaDB Setup"
echo "========================="
echo

read -r -p "Enter domain name for your WordPress site (e.g., example.com): " DOMAIN_NAME

if [ -z "$DOMAIN_NAME" ]; then
    echo "Error: Domain name cannot be empty"
    exit 1
fi

# Set default values
DB_USER="wordpress"
DB_NAME="wordpress"

# Generate secure random passwords (32 characters each)
DB_PASSWORD=$(tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 32)
DB_ROOT_PASSWORD=$(tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 32)

# Create .env file
echo "Writing values to .env file..."
cat > .env << EOF
# Database Configuration
export DB_USER=${DB_USER}
export DB_PASSWORD=${DB_PASSWORD}
export DB_NAME=${DB_NAME}
export DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}

# Domain Configuration
export WP_DOMAIN=${DOMAIN_NAME}
EOF

echo ".env file created successfully."
