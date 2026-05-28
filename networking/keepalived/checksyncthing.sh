#!/bin/bash
# Whatever tests are needed
# E.g., send request and verify response
# Check if the container is running
if docker ps | grep -q 'syncthing-syncthing'; then
    exit 0
else
    exit 1
fi
