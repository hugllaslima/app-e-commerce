#!/bin/bash

echo "🔄 Reiniciando E-Commerce Application Docker..."

./stop-docker.sh

echo ""
echo "⏳ Aguardando 3 segundos..."
sleep 3

./start-docker.sh
