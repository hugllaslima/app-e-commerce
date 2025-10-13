#!/bin/bash

echo "🛑 Parando E-Commerce Application Docker..."

# Para containers
docker stop backend-app frontend-app 2>/dev/null

# Remove containers
docker rm backend-app frontend-app 2>/dev/null

echo "✅ Containers parados e removidos"

# Mostrar containers restantes
echo ""
echo "📋 Containers Docker:"
docker ps -a
