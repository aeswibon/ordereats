#!/usr/bin/env bash
set -euo pipefail

printf "api" > /tmp/container-role

cd /app

echo "running migrations..."
python manage.py migrate

echo "loading fixtures..."
python manage.py load_data

echo "starting server..."
python manage.py runserver 0.0.0.0:9000
